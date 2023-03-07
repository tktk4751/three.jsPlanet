import * as THREE from "/node_modules/three/build/three.module.js";
import { OrbitControls } from "/vendor_mods/three/examples/jsm/controls/OrbitControls.js";

let scene, camera, renderer, pointLight, controls;

const init = () => {
  //シーンを追加
  scene = new THREE.Scene();

  //カメラを追加
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, +500);

  //レンダラーを追加
  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  //テクスチャの追加
  let texture = new THREE.TextureLoader().load("./texture/AA.png");

  //ジオメトリーの作成
  let ballGeometry = new THREE.SphereGeometry(100, 64, 32);
  //マテリアルを作成
  let ballMaterial = new THREE.MeshPhysicalMaterial({ map: texture });
  //メッシュ化
  let ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
  scene.add(ballMesh);

  //平行光源の追加
  let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  //ポイントライトの追加
  pointLight = new THREE.PointLight(0xee82ee, 1);
  pointLight.position.set(-200, -200, -200);
  scene.add(pointLight);

  //ポイント光源ヘルパーの追加
  let pointLightHelper = new THREE.PointLightHelper(pointLight, 10);
  scene.add(pointLightHelper);

  //マウス操作機能の実装
  controls = new OrbitControls(camera, renderer.domElement);
  scene.add(controls);
};

window.addEventListener("load", init());

//ブラウザのリサイズに対応させる
const onWindowResize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};
window.addEventListener("resize", onWindowResize);

//ポイント光源を巡回させる
const animation = () => {
  pointLight.position.set(
    200 * Math.sin(Date.now() / 500),
    200 * Math.sin(Date.now() / 1000),
    200 * Math.cos(Date.now() / 500)
  );

  requestAnimationFrame(animation);

  //レンダリング
  renderer.render(scene, camera);
};

animation();
