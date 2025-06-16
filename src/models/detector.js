import * as THREE from "three";

import { createText } from "../utils/font.js";

export default class Delector {
  constructor(type) {
    this.type = type;
    this.model = null;
    this.alarmLight = null;
    this.alarming = false; // 是否正在报警
    this.createModel();
    this.animate();
  }

  createModel() {
    const group = new THREE.Group();
    group.position.set(0, 9, 0);

    // 报警器主体
    const bodyGeometry = new THREE.CylinderGeometry(2, 2.4, 1.2, 32);
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x34495e,
      metalness: 0.7,
      roughness: 0.3,
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.castShadow = true;
    group.add(body);

    // 报警灯
    const lightGeometry = new THREE.SphereGeometry(1.2, 16, 16);
    const lightMaterial = new THREE.MeshStandardMaterial({
      color: 0x555555,
      emissive: 0x000000,
      emissiveIntensity: 0,
    });
    const alarmLight = new THREE.Mesh(lightGeometry, lightMaterial);
    alarmLight.position.y = 0.1;
    alarmLight.castShadow = true;
    group.add(alarmLight);

    const textMesh = createText(this.type, 0x4facfe, {size: 1.5});
    textMesh.position.set(-textMesh.centerOffset, -3, 1);
    group.add(textMesh);

    this.alarmLight = alarmLight;
    this.model = group;
  }

  getModel() {
    return this.model;
  }

  animate() {
    this.alarm();
    requestAnimationFrame(() => this.animate());
  }

  alarm() {
    if (this.alarming) {
      // 闪烁效果
      const intensity = 0.5 + 0.5 * Math.sin(Date.now() * 0.02);
      this.alarmLight.material.emissive.setHex(0xff0000);
      this.alarmLight.material.emissiveIntensity = intensity;
    } else {
      this.alarmLight.material.emissiveIntensity = 0;
    }
  }

  triggerAlarm() {
    this.alarming = true;
  }

  stopAlarm() {
    this.alarming = false;
    this.alarmLight.material.emissiveIntensity = 0;
  }
}
