/**
 * Draw the share card directly on a Canvas for reliable export.
 */
function drawShareCard(canvas, persona) {
  const w = 600;
  const h = 1067; // 9:16
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');

  // Background gradient
  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, '#0a3d47');
  bg.addColorStop(0.5, '#0d4a57');
  bg.addColorStop(1, '#1a1721');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Stars
  for (let i = 0; i < 30; i++) {
    const x = (i * 137.5) % w;
    const y = (i * 73.1) % (h * 0.5);
    const r = 1 + (i % 3) * 0.5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${0.3 + (i % 3) * 0.15})`;
    ctx.fill();
  }

  // Orange glow in center
  const glow = ctx.createRadialGradient(w / 2, h * 0.55, 0, w / 2, h * 0.55, 200);
  glow.addColorStop(0, 'rgba(255,92,0,0.12)');
  glow.addColorStop(1, 'rgba(255,92,0,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  // Mountain silhouette at bottom
  ctx.fillStyle = '#ff5c00';
  ctx.globalAlpha = 0.4;
  ctx.beginPath();
  ctx.moveTo(0, h);
  ctx.lineTo(0, h - 60);
  ctx.lineTo(100, h - 80);
  ctx.lineTo(200, h - 40);
  ctx.lineTo(300, h - 90);
  ctx.lineTo(400, h - 50);
  ctx.lineTo(500, h - 70);
  ctx.lineTo(w, h - 40);
  ctx.lineTo(w, h);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1;

  // Helper: centered text
  const centerText = (text, y, font, color) => {
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.fillText(text, w / 2, y);
  };

  // Helper: centered text that auto-shrinks to fit within maxWidth
  const centerTextFit = (text, y, baseSizePx, fontWeight, fontFamily, color, maxWidth) => {
    let size = baseSizePx;
    ctx.font = `${fontWeight} ${size}px ${fontFamily}`;
    while (ctx.measureText(text).width > maxWidth && size > 12) {
      size -= 2;
      ctx.font = `${fontWeight} ${size}px ${fontFamily}`;
    }
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.fillText(text, w / 2, y);
    return size;
  };

  // Helper: word-wrap centered text, returns final Y
  const wrapText = (text, startY, font, color, maxWidth, lineHeight) => {
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    const words = text.split(' ');
    let line = '';
    let y = startY;
    for (const word of words) {
      const test = line + (line ? ' ' : '') + word;
      if (ctx.measureText(test).width > maxWidth && line) {
        ctx.fillText(line, w / 2, y);
        line = word;
        y += lineHeight;
      } else {
        line = test;
      }
    }
    if (line) ctx.fillText(line, w / 2, y);
    return y;
  };

  const pad = 40; // side padding
  const maxContent = w - pad * 2; // 520px

  // Top branding
  centerText('THE 2026 VIBECHECK RESULTS', 80, '600 13px Inter, sans-serif', '#4bb8cc');
  centerText('VIBECHECK', 122, '900 50px Oswald, sans-serif', '#ffffff');

  // Divider line
  ctx.strokeStyle = 'rgba(75,184,204,0.4)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(120, 148);
  ctx.lineTo(w - 120, 148);
  ctx.stroke();

  // "My Stage Match:" in cursive style
  centerText('My Stage Match:', h * 0.36, 'italic 42px Caveat, cursive', '#ff5c00');

  // Stage name — auto-shrink to fit
  const stageName = persona.stage.toUpperCase();
  centerTextFit(stageName, h * 0.44, 76, '900', 'Oswald, sans-serif', '#ffffff', maxContent);

  // Title
  centerTextFit(persona.title.toUpperCase(), h * 0.50, 22, '900', 'Inter, sans-serif', '#ff5c00', maxContent);

  // Subtitle — word wrapped
  const subtitle = `\u201C${persona.subtitle}\u201D`;
  wrapText(subtitle, h * 0.55, 'italic 16px Inter, sans-serif', 'rgba(255,255,255,0.5)', maxContent, 22);

  // "Confirmed Vibe" divider
  const vibeY = h * 0.65;
  ctx.strokeStyle = 'rgba(75,184,204,0.4)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad, vibeY);
  ctx.lineTo(w / 2 - 70, vibeY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(w / 2 + 70, vibeY);
  ctx.lineTo(w - pad, vibeY);
  ctx.stroke();
  centerText('CONFIRMED VIBE', vibeY + 5, '700 12px Inter, sans-serif', '#4bb8cc');

  // Traits — wrap onto two lines if needed
  const traits = persona.traits.slice(0, 4);
  const traitStr = traits.map((t) => t.toUpperCase()).join('  \u2022  ');
  ctx.font = '900 16px Inter, sans-serif';
  if (ctx.measureText(traitStr).width > maxContent) {
    // Split into two lines
    const mid = Math.ceil(traits.length / 2);
    const line1 = traits.slice(0, mid).map((t) => t.toUpperCase()).join('  \u2022  ');
    const line2 = traits.slice(mid).map((t) => t.toUpperCase()).join('  \u2022  ');
    centerText(line1, vibeY + 32, '900 16px Inter, sans-serif', '#ffffff');
    centerText(line2, vibeY + 56, '900 16px Inter, sans-serif', '#ffffff');
  } else {
    centerText(traitStr, vibeY + 35, '900 16px Inter, sans-serif', '#ffffff');
  }

  // Bottom branding
  centerText('vanessazwang.com/vibecheck', h - 40, '600 13px Inter, sans-serif', 'rgba(255,255,255,0.35)');
}

export async function exportCardAsImage(elementId, persona) {
  const canvas = document.createElement('canvas');

  try {
    drawShareCard(canvas, persona);
  } catch {
    return { ok: false, error: 'Failed to draw card' };
  }

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
  if (!blob) return { ok: false, error: 'Failed to generate image' };

  const file = new File([blob], 'vibecheck-result.png', { type: 'image/png' });

  // Share sheet on mobile only
  const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);
  if (isMobile && navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: 'My Vibecheck Result' });
      return { ok: true };
    } catch (err) {
      if (err.name === 'AbortError') return { ok: true };
    }
  }

  // Direct download
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = 'vibecheck-result.png';
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 5000);
  return { ok: true };
}
