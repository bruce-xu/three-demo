import * as THREE from "three";

import { createText } from "../utils/font.js";

/** * 创建不同类型的传感器模型
 * @param {string} type - 传感器类型，支持 "CH4"、"CO"、"Smoke"、"Dust"
 * @returns {THREE.Mesh|null} 返回对应类型的传感器模型或 null
 */
export function createSensor(type) {
  const group = new THREE.Group();
  const geometry = new THREE.CircleGeometry(3);
  const material = new THREE.MeshBasicMaterial({color: 0x00ff00, side: THREE.DoubleSide});
  const mesh = new THREE.Mesh(geometry, material);
  const textMesh = createText(type, 0x00ffff, {
    size: 2,
  });
  textMesh.position.set(-textMesh.centerOffset, -0.5, 1);

  group.add(mesh);
  group.add(textMesh);

  return group;
}

// export function createSensor(type) {
//   return new Promise((resolve, reject) => {
//     const loader = new THREE.TextureLoader();
//     loader.load('/imgs/sensor.png', function (texture) {
//       const group = new THREE.Group();
//       const geometry = new THREE.CircleGeometry(4, 64);
//       const material = new THREE.MeshStandardMaterial({map: texture, opacity: 1, transparent: true});
//       const mesh = new THREE.Mesh(geometry, material);
 
//       group.add(mesh);

//       resolve(group);
//     });
//   });
// }