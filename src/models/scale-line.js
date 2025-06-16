import * as THREE from "three";

import { createText } from "../utils/font.js";

/**
 * 创建一个简单的 X 轴刻度尺
 * @returns {THREE.Group} 包含刻度线的组
 */
export function createScaleLines() {
  const group = new THREE.Group();
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x999999,
    linewidth: 0.1,
  });
  const geometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-100, 0, 1),
    new THREE.Vector3(100, 0, 1),
  ]);
  const line = new THREE.Line(geometry, lineMaterial);
  group.add(line);

  for (let i = -100; i <= 100; i += 10) {
    const geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(i, 0, 0),
      new THREE.Vector3(i, 0, 1),
    ]);
    const line = new THREE.Line(geometry, lineMaterial);
    group.add(line);
    const number = createText((i + 100).toString());
    number.position.set(i - (number.centerOffset || 0), 0, 4);
    number.rotation.x = -Math.PI / 2;
    group.add(number);
  }

  return group;
}
