import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

let fontCache = null;

export function loadFont() {
  return new Promise((resolve, reject) => {
    const loader = new FontLoader();
    
    loader.load(
      "fonts/gentilis_bold.typeface.json",
      (font) => {
        fontCache = font; // Cache the loaded font
        resolve(font);
      },
      undefined,
      (error) => {
        console.error("Error loading font:", error);
        reject(error);
      }
    );
  });
}

export function createText(text, color = 0xffffff, options = {}) {
  const textGeometry = new TextGeometry(text, {
    font: fontCache,
    size: 2,
		depth: 0.1,
    ...options
  });

  const textMaterial = new THREE.MeshPhongMaterial({ color });
  const textMesh = new THREE.Mesh(textGeometry, textMaterial);
  
  // Center the text
  textGeometry.computeBoundingBox();
  const centerOffset = (textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x) / 2;
  textMesh.centerOffset = centerOffset || 0; // Store the center offset for later use
  
  return textMesh;
} 