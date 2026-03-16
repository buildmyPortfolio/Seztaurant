import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const srcDir = './SeztaurantHero';
const destDir = './public/sequence';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir)
  .filter(f => f.endsWith('.jpg') || f.endsWith('.png'))
  .sort();

// Sample exactly 120 frames
const totalAvailable = files.length;
const targetFrames = 120;

const indices = [];
for (let i = 0; i < targetFrames; i++) {
  // map i [0, 119] to [0, totalAvailable - 1]
  const idx = Math.floor(i * (totalAvailable - 1) / (targetFrames - 1));
  indices.push(idx);
}

// Convert
Promise.all(indices.map((srcIdx, outIdx) => {
  const file = files[srcIdx];
  const srcPath = path.join(srcDir, file);
  const destName = `frame_${outIdx.toString().padStart(3, '0')}.webp`;
  const destPath = path.join(destDir, destName);

  return sharp(srcPath).webp({ quality: 100, lossless: true }).toFile(destPath);
})).then(() => {
  console.log(`Successfully extracted and converted ${targetFrames} frames.`);
}).catch(err => {
  console.error("Error converting images:", err);
});
