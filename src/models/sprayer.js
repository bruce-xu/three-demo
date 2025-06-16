import * as THREE from "three";

const particleCount = 800;
const positions = new Float32Array(particleCount * 3);
const speeds = new Float32Array(particleCount * 3);

function resetParticle(i) {
  const angle = ((Math.random() - 0.5) * Math.PI) / 2; // [-45°, 45°]
  const azimuth = Math.random() * Math.PI * 2;
  const speed = 0.1 + Math.random() * 0.5;

  const dx = Math.sin(angle) * Math.cos(azimuth);
  const dy = -Math.cos(angle); // 向下
  const dz = Math.sin(angle) * Math.sin(azimuth);

  positions[i * 3 + 0] = 0;
  positions[i * 3 + 1] = 0;
  positions[i * 3 + 2] = 0;

  speeds[i * 3 + 0] = dx * speed;
  speeds[i * 3 + 1] = dy * speed;
  speeds[i * 3 + 2] = dz * speed;
}

/**
 * 消防喷淋系统
 */
export default class Sprayer {
  constructor() {
    this.model = null;
    this.sprayer = null; // 喷雾器主体
    this.waterGeometry = null; // 水粒子几何体
    this.waterParticles = null; // 水粒子系统
    this.spraying = false; // 是否正在喷洒
    this.createModel();
    this.animate();
  }

  createModel() {
    const group = new THREE.Group();

    // 喷雾器主体
    const sprayer = new THREE.Mesh(
      new THREE.CylinderGeometry(1, 1, 4, 16),
      new THREE.MeshStandardMaterial({ color: 0xcccccc })
    );
    group.add(sprayer);

    // 洒水粒子系统
    for (let i = 0; i < particleCount; i++) {
      resetParticle(i);
    }

    const waterGeometry = new THREE.BufferGeometry();
    waterGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const waterMaterial = new THREE.PointsMaterial({
      color: 0x66ccff,
      size: 0.5,
      // transparent: true,
      // opacity: 0.8,
    });

    const waterParticles = new THREE.Points(waterGeometry, waterMaterial);
    // waterParticles.position.set(0, -15, 0); // 初始位置在喷雾器上方
    group.add(waterParticles);

    this.sprayer = sprayer;
    this.waterGeometry = waterGeometry;
    this.waterParticles = waterParticles;
    this.model = group;
  }

  getModel() {
    return this.model;
  }

  startSpraying() {
    if (!this.spraying) {
      this.model.add(this.waterParticles);
      this.spraying = true;
    }
  }

  stopSpraying() {
    if (this.spraying) {
      this.spraying = false;
      this.model.remove(this.waterParticles);
    }
  }

  animate() {
    if (this.spraying) {
      const pos = this.waterGeometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3 + 0] += speeds[i * 3 + 0];
        pos[i * 3 + 1] += speeds[i * 3 + 1];
        pos[i * 3 + 2] += speeds[i * 3 + 2];

        if (pos[i * 3 + 1] < -47.9) {
          resetParticle(i);
        }
      }
      this.waterGeometry.attributes.position.needsUpdate = true;
    }

    requestAnimationFrame(() => this.animate());
  }
}
