/**
 * Smart Client-Side Image Compressor
 * Scale down monster camera photos while keeping text & graphics crystal-clear (Retina HD sharp).
 * Small/pre-optimized images under 400KB are automatically bypassed without re-compression.
 *
 * @param {File|Blob|string} imageSource - Raw File object or Base64 data URL
 * @param {number} maxWidth - Max width/height constraint (default 1400px)
 * @param {number} quality - JPEG compression quality 0.1 to 1.0 (default 0.88)
 * @returns {Promise<string>} Crisp, HD compressed Base64 Data URL
 */
export function compressImage(imageSource, maxWidth = 1400, quality = 0.88) {
  return new Promise((resolve) => {
    // 1. Bypass if file is already small (less than 400KB)
    if (imageSource instanceof File && imageSource.size < 400 * 1024) {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = () => resolve(imageSource);
      reader.readAsDataURL(imageSource);
      return;
    }

    // 2. Load image into offscreen HTML Image element
    const img = new Image();

    img.onload = () => {
      let { width, height } = img;

      // If dimensions are already within bounds, return high quality data URL
      if (width <= maxWidth && height <= maxWidth) {
        if (typeof imageSource === 'string') {
          resolve(imageSource);
          return;
        }
      }

      // Calculate scaled dimensions keeping aspect ratio
      if (width > maxWidth || height > maxWidth) {
        if (width > height) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        } else {
          width = Math.round((width * maxWidth) / height);
          height = maxWidth;
        }
      }

      // Create offscreen Canvas for high-definition rendering
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');

      // Enable high-quality smoothing for sharp text & logos
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      ctx.drawImage(img, 0, 0, width, height);

      // Export crisp JPEG at 88% quality ratio
      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
      resolve(compressedDataUrl);
    };

    img.onerror = () => {
      // Fallback: if loading fails, resolve with raw reader if File
      if (imageSource instanceof File) {
        const fallbackReader = new FileReader();
        fallbackReader.onload = (e) => resolve(e.target.result);
        fallbackReader.readAsDataURL(imageSource);
      } else {
        resolve(imageSource);
      }
    };

    if (imageSource instanceof File || imageSource instanceof Blob) {
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
      };
      reader.readAsDataURL(imageSource);
    } else if (typeof imageSource === 'string') {
      img.src = imageSource;
    } else {
      resolve(imageSource);
    }
  });
}
