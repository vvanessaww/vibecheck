import html2canvas from 'html2canvas';

export async function exportCardAsImage(elementId) {
  const element = document.getElementById(elementId);
  if (!element) return { ok: false, error: 'Element not found' };

  let canvas;
  try {
    canvas = await html2canvas(element, {
      backgroundColor: null,
      scale: 2,
      useCORS: true,
    });
  } catch {
    return { ok: false, error: 'Failed to capture image' };
  }

  // Convert canvas to blob for sharing
  const blob = await new Promise((resolve) =>
    canvas.toBlob(resolve, 'image/png')
  );

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
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 1000);
  return { ok: true };
}
