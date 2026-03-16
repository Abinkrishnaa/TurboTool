"use client";

export async function downloadBlob(blob: Blob, filename: string): Promise<boolean> {
  const url = URL.createObjectURL(blob);
  
  try {
    if (navigator.share && navigator.canShare?.({ url, title: filename })) {
      try {
        await navigator.share({
          title: filename,
          text: `Downloading ${filename}`,
          url: url,
        });
        return true;
      } catch (shareError: any) {
        if (shareError.name === 'AbortError') {
          return true;
        }
      }
    }
  } catch (e) {
    // navigator.share not supported or error
  }

  try {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => URL.revokeObjectURL(url), 100);
    return true;
  } catch (downloadError) {
    // Fallback: open in new tab
    const newTab = window.open(url, '_blank');
    if (!newTab) {
      // Last resort: try a link click
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    return true;
  }
}

export async function downloadUrl(url: string, filename: string): Promise<void> {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    await downloadBlob(blob, filename);
  } catch (error) {
    // Fallback: open in new tab
    window.open(url, '_blank');
  }
}

export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    (window.innerWidth <= 768);
}

export function getMobileWarning(): string {
  if (!isMobileDevice()) return '';
  return 'For best results on mobile, use smaller files (under 2MB). If processing fails, please try on a desktop computer.';
}
