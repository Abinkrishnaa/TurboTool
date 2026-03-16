#!/bin/bash
# Install LibreOffice for Word to PDF conversion
# This script runs during Render deployment

set -e

echo "Installing LibreOffice..."
apt-get update
apt-get install -y --no-install-recommends libreoffice

echo "LibreOffice installation complete"
echo "Version: $(libreoffice --version)"
