import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import CoalShed from "./models/coal-shed.js";
import BucketWheelMachine from "./models/bucket-wheel-machine.js";
import Delector from "./models/detector.js";
import { createScaleLines } from "./models/scale-line.js";
import { loadFont } from "./utils/font.js";
import Sprayer from "./models/sprayer.js";
import alarmManager from "./utils/alarm.js";

import "./sensor.js";

const app = document.getElementById("app");
const width = app.clientWidth;
const height = app.clientHeight;

// 场景
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0c1a2e);
// scene.background = new THREE.Color(0xf0f0f0);
// scene.background = new THREE.TextureLoader().load('/imgs/sensor.png');

// 相机
const camera = new THREE.PerspectiveCamera(60, width / height, 1, 2000);
camera.position.set(0, 70, 100);

// 渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
document.getElementById("app").appendChild(renderer.domElement);

// 控制器
const controls = new OrbitControls(camera, renderer.domElement);

// 光照
const ambient = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambient);
const directional = new THREE.DirectionalLight(0xffffff, 0.8);
directional.position.set(200, 300, 100);
scene.add(directional);

// 坐标轴辅助
// const axes = new THREE.AxesHelper(100);
// scene.add(axes);

// 创建煤棚模型
const coalShed = new CoalShed();
coalShed.init().then((model) => {
  model.position.set(0, 0, 0);
  scene.add(model);
});
window.__coalShed__ = coalShed;

// 创建斗轮机模型
const bucketWheelMachine = new BucketWheelMachine();
bucketWheelMachine.init().then((model) => {
  model.position.set(0, 8, 0);
  scene.add(model);
});

// 创建喷雾器模型
const sprayer = new Sprayer();
const sprayerModel = sprayer.getModel();
sprayerModel.position.set(0, 47.9, 0);
scene.add(sprayerModel);

loadFont().then(() => {
  // 创建刻度尺
  const scaleLines = createScaleLines();
  scaleLines.position.set(0, 0.01, 55);
  scene.add(scaleLines);

  const ch4Detector = new Delector("CH4");
  const ch4Model = ch4Detector.getModel();
  ch4Model.position.set(-80, 47.5, 0);
  scene.add(ch4Model);
  alarmManager.addAlarm("CH4", ch4Detector);

  const coDetector = new Delector("CO");
  const coModel = coDetector.getModel();
  coModel.position.set(-60, 47.5, 0);
  scene.add(coModel);
  alarmManager.addAlarm("CO", coDetector);

  const smokeDetector = new Delector("Smoke");
  const smokeModel = smokeDetector.getModel();
  smokeModel.position.set(-40, 47.5, 0);
  scene.add(smokeModel);
  alarmManager.addAlarm("Smoke", smokeDetector);

  const dustDetector = new Delector("Dust");
  const dustModel = dustDetector.getModel();
  dustModel.position.set(-20, 47.5, 0);
  scene.add(dustModel);
  alarmManager.addAlarm("Dust", dustDetector);
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);

  if (alarmManager.getAlarmState()) {
    // 如果有报警器正在报警，开启消防喷淋
    sprayer.startSpraying();
  } else {
    // 如果没有报警器报警，停止消防喷淋
    sprayer.stopSpraying();
  }
}
animate();

window.addEventListener("resize", () => {
  const width = app.clientWidth;
  const height = app.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});
