const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const globalsCssPath = path.join(srcDir, 'app', 'globals.css');

let accumulatedCss = '\n/* --- AUTO-EXTRACTED COMPONENT STYLES --- */\n';

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const styleRegex = /<style jsx>\{`([\s\S]*?)`\}<\/style>/g;
  
  let hasMatch = false;
  content = content.replace(styleRegex, (match, css) => {
    hasMatch = true;
    accumulatedCss += `\n/* From ${path.basename(filePath)} */\n` + css + '\n';
    return '';
  });

  if (hasMatch) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Extracted styles from ${path.relative(__dirname, filePath)}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      processFile(fullPath);
    }
  }
}

walkDir(srcDir);
fs.appendFileSync(globalsCssPath, accumulatedCss, 'utf8');
console.log('Appended all extracted styles to globals.css');
