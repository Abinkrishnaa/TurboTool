FROM python:3.11-slim

# Install LibreOffice for Word to PDF conversion
RUN apt-get update && \
    apt-get install -y --no-install-recommends libreoffice && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy requirements first for better caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy app code
COPY app ./app

# Expose port
EXPOSE 10000

# Run the app
CMD ["uvicorn", "app.api:app", "--host", "0.0.0.0", "--port", "10000"]
