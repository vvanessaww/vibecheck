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

  // Top branding — positioned like reference
  centerText('T H E  2 0 2 6  V I B E C H E C K  R E S U L T S', 70, '700 11px Inter, sans-serif', '#4bb8cc');
  centerText('VIBECHECK', 115, '900 56px Oswald, sans-serif', '#ffffff');

  // "My Stage Match:" — rotated like reference (slight diagonal tilt)
  ctx.save();
  ctx.translate(w / 2, h * 0.38);
  ctx.rotate(-6 * Math.PI / 180);
  ctx.font = 'italic 46px Caveat, cursive';
  ctx.fillStyle = '#ff5c00';
  ctx.textAlign = 'center';
  const matchLabel = persona.playerName ? `${persona.playerName}'s Stage Match:` : 'My Stage Match:';
  ctx.fillText(matchLabel, 0, 0);
  ctx.restore();

  // Stage name — large, auto-fit, multi-line if needed
  const stageName = persona.stage.toUpperCase();
  const stageWords = stageName.split(' ');
  if (stageWords.length === 1) {
    // Single word — one big line
    centerTextFit(stageName, h * 0.47, 90, '900', 'Oswald, sans-serif', '#ffffff', maxContent);
  } else {
    // Multi-word — stack on separate lines like reference
    const lineH = 80;
    const startY = h * 0.48;
    for (let i = 0; i < stageWords.length; i++) {
      centerTextFit(stageWords[i], startY + i * lineH, 90, '900', 'Oswald, sans-serif', '#ffffff', maxContent);
    }
  }

  // Title
  const titleY = stageWords.length > 1 ? h * 0.48 + stageWords.length * 80 + 10 : h * 0.52;
  centerTextFit(persona.title.toUpperCase(), titleY, 20, '900', 'Inter, sans-serif', '#ff5c00', maxContent);

  // Subtitle
  const subY = titleY + 35;
  const subtitle = `\u201C${persona.subtitle}\u201D`;
  const subEndY = wrapText(subtitle, subY, 'italic 15px Inter, sans-serif', 'rgba(255,255,255,0.5)', maxContent, 22);

  // "Confirmed Vibe" divider
  const vibeY = subEndY + 45;
  ctx.strokeStyle = 'rgba(75,184,204,0.4)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad, vibeY);
  ctx.lineTo(w / 2 - 80, vibeY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(w / 2 + 80, vibeY);
  ctx.lineTo(w - pad, vibeY);
  ctx.stroke();
  centerText('C O N F I R M E D  V I B E', vibeY + 5, '700 11px Inter, sans-serif', '#4bb8cc');

  // Traits — 2x2 grid like reference
  const traits = persona.traits.slice(0, 4);
  const traitFontSize = 16;
  const traitFont = `900 ${traitFontSize}px Inter, sans-serif`;
  ctx.font = traitFont;

  const row1 = traits.slice(0, 2);
  const row2 = traits.slice(2);
  const traitRowY1 = vibeY + 40;
  const traitRowY2 = vibeY + 70;

  const drawTraitRow = (items, y) => {
    const str = items.map((t) => t.toUpperCase()).join('   \u2022   ');
    ctx.font = traitFont;
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(str, w / 2, y);
  };

  if (row1.length) drawTraitRow(row1, traitRowY1);
  if (row2.length) drawTraitRow(row2, traitRowY2);

  // Artist recommendations
  const recs = persona.recommendations || [];
  if (recs.length > 0) {
    const recsStartY = (row2.length ? traitRowY2 : traitRowY1) + 45;

    // Divider
    ctx.strokeStyle = 'rgba(75,184,204,0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad, recsStartY);
    ctx.lineTo(w / 2 - 80, recsStartY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(w / 2 + 80, recsStartY);
    ctx.lineTo(w - pad, recsStartY);
    ctx.stroke();
    centerText('D O N \u2019 T  M I S S', recsStartY + 5, '700 11px Inter, sans-serif', '#4bb8cc');

    recs.forEach((rec, i) => {
      const recY = recsStartY + 30 + i * 24;
      centerText(`${rec.name}`, recY, '700 14px Inter, sans-serif', '#ffffff');
      ctx.font = '600 10px Inter, sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      const nameWidth = (() => { ctx.font = '700 14px Inter, sans-serif'; return ctx.measureText(rec.name).width; })();
      ctx.font = '600 10px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${rec.day}  \u2022  ${rec.stage}`, w / 2, recY + 14);
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
