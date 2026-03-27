import html2canvas from 'html2canvas';

export async function exportCardAsImage(elementId) {
  const element = document.getElementById(elementId);
  if (!element) return;

  const canvas = await html2canvas(element, {
    backgroundColor: '#0c2a30',
    scale: 2,
    useCORS: true,
  });

  const link = document.createElement('a');
  link.download = 'vibecheck-result.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}
