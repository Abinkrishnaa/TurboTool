export function isHEIC(file: File): boolean {
  const fileName = file.name.toLowerCase();
  return fileName.endsWith('.heic') || fileName.endsWith('.heif');
}

export function isIOS(): boolean {
  if (typeof window === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

export function isSafari(): boolean {
  if (typeof window === 'undefined') return false;
  const ua = navigator.userAgent;
  return /Safari/i.test(ua) && /Apple Computer/i.test(navigator.vendor);
}

export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/i.test(navigator.userAgent);
  return isIOSDevice || isAndroid || window.innerWidth < 768;
}

export async function convertHeicToJpeg(file: File): Promise<File> {
  if (!isHEIC(file)) {
    return file;
  }

  try {
    // Dynamic import to avoid SSR issues
    const heic2any = (await import("heic2any")).default;
    
    const converted = await heic2any({
      blob: file,
      toType: "image/jpeg",
      quality: 0.92
    });

    const blob = Array.isArray(converted) ? converted[0] : converted;
    
    const newFileName = file.name.replace(/\.(heic|heif)$/i, '.jpg');
    
    return new File([blob], newFileName, {
      type: "image/jpeg",
      lastModified: Date.now()
    });
  } catch (error) {
    console.error("HEIC conversion failed:", error);
    throw new Error("Failed to convert HEIC image. Please try a different format.");
  }
}

export function getDeviceOptimizationLevel(): {
  maxSizeMB: number;
  maxDimension: number;
  useAggressive: boolean;
} {
  // Return safe defaults for SSR
  if (typeof window === 'undefined') {
    return {
      maxSizeMB: 2,
      maxDimension: 2048,
      useAggressive: false
    };
  }
  
  const isIOSDevice = isIOS();
  const isMobile = isMobileDevice();
  const isSafariBrowser = isSafari();

  if (isIOSDevice) {
    if (isSafariBrowser) {
      return {
        maxSizeMB: 0.25,
        maxDimension: 640,
        useAggressive: true
      };
    }
    return {
      maxSizeMB: 0.3,
      maxDimension: 800,
      useAggressive: true
    };
  }

  if (isMobile) {
    return {
      maxSizeMB: 0.5,
      maxDimension: 1000,
      useAggressive: true
    };
  }

  return {
    maxSizeMB: 2,
    maxDimension: 2048,
    useAggressive: false
  };
}
