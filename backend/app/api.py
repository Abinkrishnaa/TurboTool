import os
import tempfile
import zipfile
import io
import subprocess
import shutil
from contextlib import asynccontextmanager
from typing import List

from fastapi import FastAPI, File, UploadFile, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

from pdf2docx import Converter
import fitz  # PyMuPDF


# Get CORS origins from environment variable
# For production, set this to your Vercel domain: https://your-app.vercel.app
# For development, it defaults to allowing localhost
def get_cors_origins() -> List[str]:
    cors_origin = os.environ.get("CORS_ORIGIN", "")
    if cors_origin:
        return [cors_origin.strip()]
    # Default: allow localhost for development
    return [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
    ]


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Auxkit PDF Converter API started")
    yield
    print("Auxkit PDF Converter API stopped")


app = FastAPI(
    title="Auxkit PDF Converter API",
    description="Convert PDF to Word, PDF to Images, and Word to PDF",
    version="1.0.0",
    lifespan=lifespan,
)

# Configure CORS securely
app.add_middleware(
    CORSMiddleware,
    allow_origins=get_cors_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Auxkit PDF Converter API", "status": "running"}


@app.get("/health")
async def health_check():
    return {"status": "healthy"}


def convert_with_libreoffice(input_path: str, output_dir: str) -> str:
    """Convert DOCX to PDF using LibreOffice headless"""
    cmd = [
        'libreoffice',
        '--headless',
        '--convert-to', 'pdf',
        '--outdir', output_dir,
        input_path
    ]
    result = subprocess.run(
        cmd,
        capture_output=True,
        text=True,
        timeout=120
    )
    
    if result.returncode != 0:
        raise Exception(f"LibreOffice conversion failed: {result.stderr}")
    
    # LibreOffice outputs the file with same name but .pdf extension
    base_name = os.path.splitext(os.path.basename(input_path))[0]
    pdf_file = os.path.join(output_dir, f"{base_name}.pdf")
    
    if not os.path.exists(pdf_file):
        raise Exception("PDF file was not created")
    
    return pdf_file


@app.post("/api/pdf-to-word")
async def convert_pdf_to_word(file: UploadFile = File(...)):
    """Convert PDF to Word (DOCX) format using pdf2docx"""
    
    if not file.filename:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No file provided"
        )
    
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File must be a PDF"
        )
    
    temp_dir = tempfile.mkdtemp()
    
    try:
        pdf_path = os.path.join(temp_dir, file.filename)
        docx_path = pdf_path.replace('.pdf', '.docx')
        
        with open(pdf_path, "wb") as buffer:
            content = await file.read()
            if len(content) > 50 * 1024 * 1024:
                raise HTTPException(
                    status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                    detail="File too large. Maximum size is 50MB"
                )
            buffer.write(content)
        
        # Convert PDF to DOCX using pdf2docx
        cv = Converter(pdf_path)
        cv.convert(docx_path, start=0, end=None)
        cv.close()
        
        with open(docx_path, "rb") as f:
            docx_data = f.read()
        
        output_filename = file.filename.replace('.pdf', '.docx')
        
        return StreamingResponse(
            io.BytesIO(docx_data),
            media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            headers={
                "Content-Disposition": f"attachment; filename={output_filename}"
            }
        )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Conversion failed: {str(e)}"
        )
    
    finally:
        try:
            if 'pdf_path' in locals() and os.path.exists(pdf_path):
                os.unlink(pdf_path)
            if 'docx_path' in locals() and os.path.exists(docx_path):
                os.unlink(docx_path)
            if os.path.exists(temp_dir):
                shutil.rmtree(temp_dir)
        except Exception:
            pass


@app.post("/api/pdf-to-image")
async def convert_pdf_to_image(
    file: UploadFile = File(...),
    quality: int = 2
):
    """Convert PDF to Images (ZIP of PNG files)"""
    
    if not file.filename:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No file provided"
        )
    
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File must be a PDF"
        )
    
    quality = max(1, min(quality, 3))
    temp_dir = tempfile.mkdtemp()
    
    try:
        pdf_path = os.path.join(temp_dir, file.filename)
        
        with open(pdf_path, "wb") as buffer:
            content = await file.read()
            if len(content) > 50 * 1024 * 1024:
                raise HTTPException(
                    status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                    detail="File too large"
                )
            buffer.write(content)
        
        doc = fitz.open(pdf_path)
        zip_buffer = io.BytesIO()
        
        with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zipf:
            for page_num in range(len(doc)):
                page = doc[page_num]
                zoom = quality
                mat = fitz.Matrix(zoom, zoom)
                pix = page.get_pixmap(matrix=mat)
                img_data = pix.tobytes("png")
                zipf.writestr(f"page_{page_num + 1}.png", img_data)
        
        doc.close()
        
        output_filename = file.filename.replace('.pdf', '_images.zip')
        zip_buffer.seek(0)
        
        return StreamingResponse(
            zip_buffer,
            media_type="application/zip",
            headers={
                "Content-Disposition": f"attachment; filename={output_filename}"
            }
        )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Conversion failed: {str(e)}"
        )
    
    finally:
        try:
            if os.path.exists(pdf_path):
                os.unlink(pdf_path)
            if os.path.exists(temp_dir):
                shutil.rmtree(temp_dir)
        except Exception:
            pass


@app.post("/api/word-to-pdf")
async def convert_word_to_pdf(file: UploadFile = File(...)):
    """Convert Word (DOCX) to PDF using LibreOffice"""
    
    if not file.filename:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No file provided"
        )
    
    valid_extensions = ['.docx', '.doc']
    if not any(file.filename.lower().endswith(ext) for ext in valid_extensions):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File must be a Word document (DOCX)"
        )
    
    temp_dir = tempfile.mkdtemp()
    output_dir = tempfile.mkdtemp()
    
    try:
        docx_path = os.path.join(temp_dir, file.filename)
        
        with open(docx_path, "wb") as buffer:
            content = await file.read()
            if len(content) > 50 * 1024 * 1024:
                raise HTTPException(
                    status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                    detail="File too large"
                )
            buffer.write(content)
        
        # Convert DOCX to PDF using LibreOffice
        pdf_path = convert_with_libreoffice(docx_path, output_dir)
        
        if not os.path.exists(pdf_path) or os.path.getsize(pdf_path) == 0:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Conversion failed. Please ensure LibreOffice is installed."
            )
        
        with open(pdf_path, "rb") as f:
            pdf_data = f.read()
        
        output_filename = file.filename.replace('.docx', '.pdf').replace('.doc', '.pdf')
        
        return StreamingResponse(
            io.BytesIO(pdf_data),
            media_type="application/pdf",
            headers={
                "Content-Disposition": f"attachment; filename={output_filename}"
            }
        )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Conversion failed: {str(e)}"
        )
    
    finally:
        try:
            if os.path.exists(temp_dir):
                shutil.rmtree(temp_dir)
            if os.path.exists(output_dir):
                shutil.rmtree(output_dir)
        except Exception:
            pass


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
