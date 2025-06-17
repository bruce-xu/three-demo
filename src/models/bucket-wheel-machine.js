import * as THREE from "three";

import { WIDTH, MIN_X, MAX_X } from "../utils/constant";

// 斗轮机模型
export default class BucketWheelMachine {
  constructor() {
    this.direction = 1;
    this.turnRounding = false; // 是否正在转动
    this.runing = true; // 是否正在运行
    this.model = null;
  }

  init() {
    return new Promise((resolve) => {
      const group = new THREE.Group();

      const loader = new THREE.TextureLoader();
      loader.load('imgs/machine.png', function (texture) {
        const geometry = new THREE.PlaneGeometry(30, 20);
        const material = new THREE.MeshStandardMaterial({
          map: texture,
          opacity: 1,
          transparent: true,
          side: THREE.DoubleSide,
        });
        const mesh = new THREE.Mesh(geometry, material);
  
        group.add(mesh);

        resolve(group);
      });
      
      this.model = group;

      this.animate();

      resolve(group);
    });
  }

  getModel() {
    return this.model;
  }

  animate() {
    this.run();
    this.turnRound();

    requestAnimationFrame(() => this.animate());
  }

  turnRound() {
    if (!this.model) {
      return;
    }

    if (!this.turnRounding) {
      return;
    }

    if (this.direction === -1) {
      this.model.rotation.y += 0.01; // 顺时针转动
      if (this.model.rotation.y >= Math.PI) {
        this.turnRounding = false; // 停止转动
        this.runing = true; // 恢复运行状态
      }
    } else {
      this.model.rotation.y -= 0.01; // 逆时针转动
      if (this.model.rotation.y <= 0) {
        this.turnRounding = false; // 停止转动
        this.runing = true; // 恢复运行状态
      }
    }
  }

  run() {
    if (!this.model) {
      return;
    }

    if (!this.runing) {
      return;
    }

    this.model.position.x += 0.1 * this.direction; // 让斗轮机沿 X 轴移动

    if (this.model.position.x > MAX_X) {
      this.stop();
      this.direction = -1; // 改变方向
    } else if (this.model.position.x < MIN_X) {
      this.stop();
      this.direction = 1; // 改变方向
    }
  }

  stop() {
    this.runing = false; // 停止运行
    this.turnRounding = true; // 开始转动
  }
}
