import html2canvas from 'html2canvas';

export async function exportCardAsImage(elementId) {
  const element = document.getElementById(elementId);
  if (!element) return;

  const canvas = await html2canvas(element, {
    backgroundColor: null,
    scale: 2,
    useCORS: true,
  });

  // Convert canvas to blob for sharing
  const blob = await new Promise((resolve) =>
    canvas.toBlob(resolve, 'image/png')
  );

  if (!blob) return;

  const file = new File([blob], 'vibecheck-result.png', { type: 'image/png' });

  // Use native share sheet on mobile (allows saving to camera roll, sharing to IG, etc.)
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        title: 'My Vibecheck Result',
        text: 'Check out my Coachella stage match!',
      });
      return;
    } catch (err) {
      // User cancelled share — fall through to download
      if (err.name === 'AbortError') return;
    }
  }

  // Fallback: direct download
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
}
