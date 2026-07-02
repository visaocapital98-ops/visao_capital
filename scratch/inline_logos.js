const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, '..', 'index.html');
const logoIconPath = path.join(__dirname, '..', 'assets', 'logo-icon.svg');
const logoFullPath = path.join(__dirname, '..', 'assets', 'logo-full.svg');

let indexContent = fs.readFileSync(indexHtmlPath, 'utf8');
const logoIconContent = fs.readFileSync(logoIconPath, 'utf8').trim();
const logoFullContent = fs.readFileSync(logoFullPath, 'utf8').trim();

// Helper to remove XML declaration and set clean attributes/style
function prepareSvg(svgContent, extraStyle) {
  let cleaned = svgContent.replace(/<\?xml.*?\?>/i, '');
  cleaned = cleaned.replace(/<svg([\s\S]*?)>/i, (match, attrs) => {
    // strip existing width/height/style inside <svg>
    let newAttrs = attrs.replace(/\b(width|height|style)=".*?"/g, '').trim();
    return `<svg ${newAttrs} style="${extraStyle}">`;
  });
  return cleaned;
}

// 1. Replace nav logo icon (40x40)
const navLogoImg = '<img src="assets/logo-icon.svg" style="width:40px;height:40px;object-fit:contain;" alt="Logo Icon"/>';
const navLogoSvg = prepareSvg(logoIconContent, 'width:40px;height:40px;object-fit:contain;');
indexContent = indexContent.replace(navLogoImg, navLogoSvg);

// 2. Replace affiliate/admin sidebar logo icon (50x50 with margin-bottom:10px)
const sidebarLogoImg = '<img src="assets/logo-icon.svg" style="width:50px;height:50px;margin-bottom:10px;" alt="Logo Icon"/>';
const sidebarLogoSvg = prepareSvg(logoIconContent, 'width:50px;height:50px;margin-bottom:10px;object-fit:contain;');
// Replace all occurrences (both affiliate and admin sidebar)
indexContent = indexContent.split(sidebarLogoImg).join(sidebarLogoSvg);

// 3. Replace affiliate/admin login logo full (height:70px)
const loginLogoImg = '<img src="assets/logo-full.svg" style="height:70px;max-width:100%;object-fit:contain;margin-bottom:12px;" alt="Visão Capital Logo"/>';
const loginLogoSvg = prepareSvg(logoFullContent, 'height:70px;max-width:100%;object-fit:contain;margin-bottom:12px;');
indexContent = indexContent.split(loginLogoImg).join(loginLogoSvg);

fs.writeFileSync(indexHtmlPath, indexContent, 'utf8');
console.log('Logos successfully inlined in index.html!');
