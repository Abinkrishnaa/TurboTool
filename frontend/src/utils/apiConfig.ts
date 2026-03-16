const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

export const API_ENDPOINTS = {
  pdfToWord: `${API_BASE}/api/pdf-to-word`,
  pdfToImage: `${API_BASE}/api/pdf-to-image`,
  wordToPdf: `${API_BASE}/api/word-to-pdf`,
  removeBackground: `${API_BASE}/api/remove-background`,
};

export async function uploadFileToAPI<T>(
  endpoint: string,
  file: File,
  onProgress?: (progress: number) => void
): Promise<T> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(endpoint, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Upload failed' }));
    throw new Error(error.detail || `Upload failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function downloadFileFromAPI(
  endpoint: string,
  file: File,
  filename: string
): Promise<void> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(endpoint, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Conversion failed' }));
    throw new Error(error.detail || `Conversion failed with status ${response.status}`);
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}
