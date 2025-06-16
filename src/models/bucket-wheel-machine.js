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
      loader.load('/imgs/machine.png', function (texture) {
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
      // 轮体
      // const wheelGeometry = new THREE.CylinderGeometry(2, 2, 2, 32);
      // const wheelMaterial = new THREE.MeshStandardMaterial({ color: 0x999999 });
      // const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
      // wheel.rotation.x = Math.PI / 2;
      // group.add(wheel);

      // const geometry1 = new THREE.BoxGeometry(20, 2, 1);
      // const material1 = new THREE.MeshBasicMaterial({
      //   color: 0x999999,
      //   side: THREE.DoubleSide,
      // });
      // const plane1 = new THREE.Mesh(geometry1, material1);
      // plane1.rotation.x = Math.PI / 2;
      // plane1.position.x = 6;
      // plane1.position.y = 2;
      // group.add(plane1);

      // const geometry2 = new THREE.BoxGeometry(2, 6, 1);
      // const material2 = new THREE.MeshBasicMaterial({
      //   color: 0x999999,
      //   side: THREE.DoubleSide,
      // });
      // const plane2 = new THREE.Mesh(geometry2, material2);
      // plane2.rotation.y = Math.PI / 2;
      // plane2.position.y = 5;
      // group.add(plane2);

      // const geometry3 = new THREE.BoxGeometry(18, 1, 2);
      // const material3 = new THREE.MeshBasicMaterial({
      //   color: 0x999999,
      //   side: THREE.DoubleSide,
      // });
      // const plane3 = new THREE.Mesh(geometry3, material3);
      // plane3.rotation.z = -Math.PI / 9;
      // plane3.position.x = 8;
      // plane3.position.y = 5;
      // group.add(plane3);

      // const geometry4 = new THREE.BoxGeometry(8, 1, 2);
      // const material4 = new THREE.MeshBasicMaterial({
      //   color: 0x999999,
      //   side: THREE.DoubleSide,
      // });
      // const plane4 = new THREE.Mesh(geometry4, material4);
      // plane4.rotation.z = Math.PI / 3;
      // plane4.position.x = -2;
      // plane4.position.y = 5;
      // group.add(plane4);

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
