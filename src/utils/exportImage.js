/**
 * Draw the share card directly on a Canvas for reliable export.
 * Matches the reference image layout exactly.
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
  bg.addColorStop(0.6, '#0d4a57');
  bg.addColorStop(1, '#1a1721');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Stars
  for (let i = 0; i < 40; i++) {
    const x = (i * 137.5) % w;
    const y = (i * 73.1) % (h * 0.55);
    const r = 0.8 + (i % 3) * 0.5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${0.25 + (i % 3) * 0.15})`;
    ctx.fill();
  }

  // Orange glow behind stage name area
  const glow = ctx.createRadialGradient(w / 2, h * 0.48, 0, w / 2, h * 0.48, 250);
  glow.addColorStop(0, 'rgba(255,92,0,0.08)');
  glow.addColorStop(1, 'rgba(255,92,0,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  // Mountain silhouette at bottom — brown/dark orange like reference
  const mtnY = h - 120;
  // Back layer
  ctx.fillStyle = '#6b3516';
  ctx.globalAlpha = 0.7;
  ctx.beginPath();
  ctx.moveTo(0, h);
  ctx.lineTo(0, mtnY + 20);
  ctx.lineTo(80, mtnY - 10);
  ctx.lineTo(170, mtnY + 40);
  ctx.lineTo(260, mtnY - 20);
  ctx.lineTo(350, mtnY + 30);
  ctx.lineTo(450, mtnY - 15);
  ctx.lineTo(530, mtnY + 25);
  ctx.lineTo(w, mtnY + 10);
  ctx.lineTo(w, h);
  ctx.closePath();
  ctx.fill();
  // Front layer
  ctx.fillStyle = '#8b4520';
  ctx.globalAlpha = 0.9;
  ctx.beginPath();
  ctx.moveTo(0, h);
  ctx.lineTo(50, mtnY + 40);
  ctx.lineTo(150, mtnY + 10);
  ctx.lineTo(250, mtnY + 50);
  ctx.lineTo(350, mtnY + 5);
  ctx.lineTo(450, mtnY + 45);
  ctx.lineTo(550, mtnY + 15);
  ctx.lineTo(w, mtnY + 35);
  ctx.lineTo(w, h);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1;

  // --- Text content ---
  const pad = 50;
  const maxContent = w - pad * 2;

  // Helper: centered text
  const centerText = (text, y, font, color) => {
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.fillText(text, w / 2, y);
  };

  // Helper: auto-shrink text to fit
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

  // Helper: word-wrap
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

  // All sizes are 2x the preview CSS (preview is 300px wide, canvas is 600px)
  // Use a running cursor Y to keep spacing consistent

  let y = 48; // py-6 = 24px at 2x

  // Top branding
  centerText('T H E  2 0 2 6  V I B E C H E C K  R E S U L T S', y, '700 12px Inter, sans-serif', '#4bb8cc');
  y += 38;
  centerText('VIBECHECK', y, '900 48px Oswald, sans-serif', '#ffffff');

  // mb-auto pushes content to center — estimate center start
  // Preview: top branding ~30px, then mb-auto centers the rest
  // Total content height ~380px in 533px card = starts at ~76px from top
  // At 2x: starts at ~152px. Branding ends at ~86px. Gap = ~66px
  y += 80;

  // "Name's Stage Match:" — rotated -6deg
  ctx.save();
  ctx.translate(w / 2, y);
  ctx.rotate(-6 * Math.PI / 180);
  ctx.font = 'italic 44px Caveat, cursive';
  ctx.fillStyle = '#ff5c00';
  ctx.textAlign = 'center';
  const matchLabel = persona.playerName ? `${persona.playerName}'s Stage Match:` : 'My Stage Match:';
  ctx.fillText(matchLabel, 0, 0);
  ctx.restore();
  y += 12;

  // Stage name — 38px preview = 76px canvas
  const stageName = persona.stage.toUpperCase();
  const stageWords = stageName.split(' ');
  if (stageWords.length === 1) {
    y += 50;
    centerTextFit(stageName, y, 76, '900', 'Oswald, sans-serif', '#ffffff', maxContent);
  } else {
    const lineH = 65;
    for (let i = 0; i < stageWords.length; i++) {
      y += lineH;
      centerTextFit(stageWords[i], y, 76, '900', 'Oswald, sans-serif', '#ffffff', maxContent);
    }
  }

  // Title — 11px preview = 22px canvas
  y += 30;
  centerTextFit(persona.title.toUpperCase(), y, 22, '900', 'Inter, sans-serif', '#ff5c00', maxContent);

  // Subtitle — 8px preview = 16px canvas
  y += 24;
  const subtitle = `\u201C${persona.subtitle}\u201D`;
  y = wrapText(subtitle, y, 'italic 16px Inter, sans-serif', 'rgba(255,255,255,0.5)', maxContent, 20);

  // Divider helper
  const drawDivider = (divY, label) => {
    ctx.strokeStyle = 'rgba(75,184,204,0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad, divY);
    ctx.lineTo(w / 2 - 70, divY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(w / 2 + 70, divY);
    ctx.lineTo(w - pad, divY);
    ctx.stroke();
    centerText(label, divY + 5, '700 16px Inter, sans-serif', '#4bb8cc');
  };

  // "Confirmed Vibe" — 8px preview = 16px canvas
  y += 24;
  drawDivider(y, 'C O N F I R M E D  V I B E');

  // Traits — 10px preview = 20px canvas
  const traits = persona.traits.slice(0, 4);
  const traitFont = '900 20px Inter, sans-serif';
  const drawTraitRow = (items, rowY) => {
    const str = items.map((t) => t.toUpperCase()).join('   \u2022   ');
    ctx.font = traitFont;
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(str, w / 2, rowY);
  };

  y += 30;
  drawTraitRow(traits.slice(0, 2), y);
  if (traits.length > 2) {
    y += 28;
    drawTraitRow(traits.slice(2), y);
  }

  // Artist recommendations — 11px name / 7px detail in preview = 22px / 14px
  const recs = persona.recommendations || [];
  if (recs.length > 0) {
    y += 28;
    drawDivider(y, 'D O N \u2019 T  M I S S');

    recs.forEach((rec) => {
      y += 30;
      centerText(rec.name, y, '700 22px Inter, sans-serif', '#ffffff');
      y += 16;
      centerText(`${rec.day}  \u2022  ${rec.stage}`, y, '600 14px Inter, sans-serif', 'rgba(255,255,255,0.4)');
    });
  }

  // Bottom branding
  centerText('vanessazwang.com/vibecheck', h - 30, '600 12px Inter, sans-serif', 'rgba(255,255,255,0.3)');
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
