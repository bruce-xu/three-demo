import * as THREE from "three";

/**
 * 创建一个煤棚模型
 */
export function createCoalShed() {
  return new Promise((resolve) => {
    const loader = new THREE.TextureLoader();
    loader.load("/imgs/thermogram.png", function (texture) {
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
      const coalGeometry = new THREE.BoxGeometry(200, 5, 100);
      const coalMaterial = new THREE.MeshStandardMaterial({
        // color: 0x333333,
        // side: THREE.DoubleSide,
        map: texture,
      });
      const coal = new THREE.Mesh(coalGeometry, coalMaterial);
      group.add(coal);

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

      // 斗轮机轨道
      // const trackGeometry = new THREE.PlaneGeometry(200, 6);
      // const trackMaterial = new THREE.MeshBasicMaterial({
      //   color: 0x666666,
      //   side: THREE.DoubleSide,
      // });
      // const track = new THREE.Mesh(trackGeometry, trackMaterial);
      // track.rotation.x = Math.PI / 2; // 横向放置
      // track.position.y = 3;
      // group.add(track);

      resolve(group);
    });
  });
}
