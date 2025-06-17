import * as THREE from "three";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader.js";

const COLORS = [0x333333, 0x444444, 0x555555, 0x666666, 0x777777];
const TEMP_COLORS = [0xe1bf22, 0x22e1bf, 0xe122bf, 0x22bfe1, 0xbf22e1];

const loadPointCloud = (url, color = 0x222222) => {
  return new Promise((resolve, reject) => {
    const loader = new PLYLoader();
    loader.load(
      url,
      (geometry) => {
        geometry.computeVertexNormals();
        geometry.center(); // 自动居中
        const material = new THREE.PointsMaterial({
          size: 0.5,
          vertexColors: false,
          color,
        });

        resolve(new THREE.Points(geometry, material));
      },
      undefined,
      (error) => {
        console.error("Error loading point cloud:", error);
        reject(error);
      }
    );
  });
};

/**
 * 煤棚模型类
 * 负责加载煤棚模型和煤堆点云
 */
export default class CoalShed {
  constructor() {
    this.model = null;
    this.coalPiles = [];
  }

  init() {
    return new Promise((resolve) => {
      Promise.all([
        loadPointCloud("/data/coal_pile_1.ply", COLORS[0]),
        loadPointCloud("/data/coal_pile_2.ply", COLORS[1]),
        loadPointCloud("/data/coal_pile_3.ply", COLORS[2]),
        loadPointCloud("/data/coal_pile_4.ply", COLORS[3]),
        loadPointCloud("/data/coal_pile_5.ply", COLORS[4]),
      ]).then(([points1, points2, points3, points4, points5]) => {
        this.coalPiles.push(points1, points2, points3, points4, points5);

        const group = new THREE.Group();
        // 封闭煤棚顶（半圆弧形）
        const shellGeometry = new THREE.CylinderGeometry(
          50,
          50,
          200,
          64,
          1,
          true,
          0,
          Math.PI
        );
        shellGeometry.rotateZ(Math.PI / 2);

        const shellMaterial = new THREE.MeshStandardMaterial({
          color: 0x3399cc,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.1,
        });

        const shell = new THREE.Mesh(shellGeometry, shellMaterial);
        group.add(shell);

        // 条形煤堆
        group.add(points1);
        points1.position.set(-60, 10, 25);
        group.add(points2);
        points2.position.set(15, 10, 25);
        group.add(points3);
        points3.position.set(75, 10, 25);
        group.add(points4);
        points4.position.set(-45, 10, -25);
        group.add(points5);
        points5.position.set(55, 10, -25);

        // 横梁
        const beamGeometry = new THREE.PlaneGeometry(200, 2);
        const beamMaterial = new THREE.MeshBasicMaterial({
          color: 0x666666,
          side: THREE.DoubleSide,
        });
        const beam = new THREE.Mesh(beamGeometry, beamMaterial);
        beam.rotation.x = Math.PI / 2; // 横向放置
        beam.position.y = 50;
        group.add(beam);

        const loader = new THREE.TextureLoader();
        loader.load("/imgs/track.png", function (texture) {
          const geometry = new THREE.PlaneGeometry(196, 4);
          const material = new THREE.MeshBasicMaterial({
            map: texture,
            color: 0x666666,
            side: THREE.DoubleSide,
          });
          const track = new THREE.Mesh(geometry, material);
          track.rotation.x = Math.PI / 2; // 横向放置
          track.position.y = 2; // 调整高度
          group.add(track);
        });

        this.model = group;

        resolve(group);
      });
    });
  }

  getModel() {
    return this.model;
  }

  changeColor(isTemp = false) {
    if (this.model) {
      const colors = isTemp ? TEMP_COLORS : COLORS;
      this.coalPiles.forEach((pile, index) => {
        const color = colors[index % colors.length];
        pile.material.color.setHex(color);
      });
    }
  }
}
