# Auxkit - All-in-One Online Tools Platform

A comprehensive collection of free online tools for images, documents, and productivity. Built with Next.js (frontend) and FastAPI (backend).

![Next.js](https://img.shields.io/badge/Next.js-15-black) ![FastAPI](https://img.shields.io/badge/FastAPI-00.svg) ![Vercel](https://img.shields.io/badge/Vercel-black) ![Render](https://img.shields.io/badge/Render-purple)

## Features

- **Image Tools**
  - Background Remover (AI-powered)
  - Image Compressor
  - Image Cropper
  - Image to PDF
  - PDF to Images

- **Document Tools**
  - Word to PDF
  - PDF to Word
  - PDF to Images

- **Productivity Tools**
  - OCR (Text Extraction)
  - Age Calculator
  - JSON Formatter
  - Password Generator

- **AI Tools**
  - AI Text Humanizer

## Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | Next.js 15, React 19, TypeScript |
| Backend | FastAPI, Python 3.11 |
| Styling | Tailwind CSS, Framer Motion |
| Deployment | Vercel (Frontend), Render (Backend) |
| Image Processing | @imgly/background-removal, browser-image-compression |
| PDF Processing | PyMuPDF, pdf2docx, LibreOffice |
| OCR | Tesseract.js |

## Project Structure

```
Turbotool/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/          # Next.js app router pages
│   │   ├── components/   # React components
│   │   ├── utils/        # Utility functions
│   │   └── constants/     # Static constants
│   ├── public/            # Static assets
│   ├── package.json       # Frontend dependencies
│   └── next.config.ts    # Next.js configuration
│
├── backend/                # FastAPI backend application
│   ├── app/
│   │   └── api.py        # API endpoints
│   ├── requirements.txt   # Python dependencies
│   ├── Dockerfile        # Docker configuration
│   └── build.sh          # Build script for Render
│
├── render.yaml            # Render deployment configuration
├── package.json          # Root scripts (dev:all)
└── README.md             # This file
```

## Prerequisites

- **Node.js** 18.x or later
- **Python** 3.11 or later
- **Git**
- **LibreOffice** (for local Word to PDF conversion - optional)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Auxstel/Turbotool.git
cd Turbotool
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

### 3. Backend Setup

#### Option A: Direct Install (Recommended for Quick Setup)

```bash
cd backend
pip install -r requirements.txt
```

#### Option B: With Virtual Environment (Optional - Better for Isolating Dependencies)

```bash
# Create virtual environment
python -m venv venv

# Activate on Windows
venv\Scripts\activate

# Activate on Mac/Linux
source venv/bin/activate

# Install dependencies
cd backend
pip install -r requirements.txt
```

## Development

### Running Locally

#### Option 1: Run Both Frontend and Backend Together

```bash
# From root directory
npm run dev:all
```

This will start:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000

#### Option 2: Run Frontend Only

```bash
cd frontend
npm run dev
```

#### Option 3: Run Backend Only

```bash
cd backend
uvicorn app.api:app --reload --port 8000
```

## Environment Variables

### Frontend (.env)

Create `frontend/.env`:

```env
# Local Development
NEXT_PUBLIC_API_URL=http://localhost:8000
GEMINI_API_KEY=your_gemini_api_key_here

# Production (set in Vercel)
# NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
# GEMINI_API_KEY=your_gemini_api_key_here
```

### Backend (.env) - Optional

```env
# For production (set in Render dashboard)
CORS_ORIGIN=https://your-frontend.vercel.app
```

## Deployment

### Frontend: Vercel

1. Go to [Vercel Dashboard](https://vercel.com)
2. Import your GitHub repository
3. Configure:
   - Framework Preset: Next.js
   - Root Directory: `frontend`
   - Build Command: `next build`
   - Output Directory: `.next`
4. Add Environment Variables:
   - `NEXT_PUBLIC_API_URL`: Your Render backend URL
   - `GEMINI_API_KEY`: Your Gemini API key
5. Deploy

### Backend: Render (Docker)

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Create **New Web Service**
3. Configure:
   - Type: Docker
   - Root Directory: `backend`
   - Dockerfile Path: `Dockerfile`
4. Add Environment Variables:
   - `CORS_ORIGIN`: Your Vercel frontend URL
5. Deploy

**Alternative: Use render.yaml**
- The `render.yaml` file in the root directory can be used with Render Blueprint for automatic deployment configuration.

## HEIC Support

This project includes automatic HEIC (iPhone photo) to JPEG conversion for all image tools. When a user uploads a .heic file:

1. The Dropzone automatically detects the format
2. Shows "Converting HEIC..." message
3. Converts to JPEG using heic2any library
4. Proceeds with normal processing

## iOS/Mobile Optimization

The platform includes device-specific optimizations:

- **iOS Safari**: Stricter memory limits (0.25MB, 640px max)
- **iOS**: Aggressive optimization (0.3MB, 800px max)
- **Android Mobile**: Moderate optimization (0.5MB, 1000px max)
- **Desktop**: Full quality (2MB, 2048px max)

## API Endpoints

The backend exposes these endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Health check |
| `/health` | GET | API status |
| `/api/pdf-to-word` | POST | Convert PDF to Word |
| `/api/pdf-to-image` | POST | Convert PDF to Images (ZIP) |
| `/api/word-to-pdf` | POST | Convert Word to PDF |

## Building

### Frontend Build

```bash
cd frontend
npm run build
```

### Backend (Docker Build)

```bash
cd backend
docker build -t auxkit-backend .
docker run -p 8000:8000 auxkit-backend
```

## Troubleshooting

### Common Issues

1. **HEIC Conversion Fails**
   - Ensure browser supports WebAssembly
   - Try smaller HEIC files (<5MB)

2. **Backend Not Connecting**
   - Check CORS_ORIGIN matches your frontend URL
   - Verify NEXT_PUBLIC_API_URL is set correctly

3. **LibreOffice Not Found (Local)**
   - Install LibreOffice: https://www.libreoffice.org/download/download/
   - Add LibreOffice to system PATH

4. **ESLint Build Errors**
   - Run `npm run lint` to see all issues
   - ESLint rules are configured to warn instead of error in build

### Development Tips

- Use `npm run dev:all` for simultaneous frontend/backend development
- Backend hot-reloads on code changes
- Frontend uses Next.js fast refresh

## License

MIT License - See LICENSE file for details

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

For issues and questions:
- Open an issue on GitHub
- Check existing issues first
