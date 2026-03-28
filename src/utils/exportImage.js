import { toBlob } from 'html-to-image';

export async function exportCardAsImage(elementId) {
  const element = document.getElementById(elementId);
  if (!element) return { ok: false, error: 'Element not found' };

  let blob;
  try {
    // First pass warms font/image cache — discard result
    await toBlob(element, { pixelRatio: 1, backgroundColor: '#0a3d47' });
    // Second pass captures with fonts loaded
    blob = await toBlob(element, {
      pixelRatio: 2,
      backgroundColor: '#0a3d47',
    });
  } catch {
    return { ok: false, error: 'Failed to capture image' };
  }

  if (!blob) return { ok: false, error: 'Failed to generate image' };

  const file = new File([blob], 'vibecheck-result.png', { type: 'image/png' });

  // Use native share sheet on mobile (allows saving to camera roll, sharing to IG, etc.)
  // Skip on desktop — go straight to download
  const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);
  if (isMobile && navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        title: 'My Vibecheck Result',
        text: 'Check out my Coachella stage match!',
      });
      return { ok: true };
    } catch (err) {
      if (err.name === 'AbortError') return { ok: true };
      // Fall through to download on any other error
    }
  }

  // Direct download as PNG
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = 'vibecheck-result.png';
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Fallback: if click-download didn't trigger, open in new tab
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 5000);
  return { ok: true };
}
