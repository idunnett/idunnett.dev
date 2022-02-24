import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

let camera: THREE.PerspectiveCamera
let scene: THREE.Scene
let renderer: THREE.WebGLRenderer
let truck: THREE.Object3D
let laptop: THREE.Object3D
let lawnChair: THREE.Object3D
let controls: OrbitControls

const init = (sceneDiv: HTMLDivElement) => {
  if (!sceneDiv) throw new Error('Did not find scene div')
  const fov: number = 35
  const aspect: number = sceneDiv.clientWidth / sceneDiv.clientHeight
  const near: number = 0.1
  const far: number = 500

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(fov, aspect, near, far)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(sceneDiv.clientWidth, sceneDiv.clientHeight)
  renderer.shadowMap.enabled = true
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.domElement.style.zIndex = '-1'

  camera.position.set(15, 0, 120)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.minPolarAngle = Math.PI / 2
  controls.maxPolarAngle = Math.PI / 2
  controls.enableZoom = false
  controls.enablePan = false

  // scene.add(new THREE.AxesHelper(500))

  const ambient = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambient)

  const shadowMaterial = new THREE.ShadowMaterial()
  shadowMaterial.opacity = 0.6

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(500, 500, 32),
    // new THREE.MeshPhongMaterial({ color: 0xfab74b })
    shadowMaterial
  )
  plane.rotation.x = -Math.PI / 2
  plane.receiveShadow = true
  plane.position.y = -20
  scene.add(plane)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 3)
  directionalLight.position.set(100, 100, 50)
  directionalLight.scale.set(3, 3, 3)
  directionalLight.castShadow = true
  directionalLight.shadow.camera.left = -500
  directionalLight.shadow.camera.right = 500
  directionalLight.shadow.camera.top = 500
  directionalLight.shadow.camera.bottom = -500
  scene.add(directionalLight)

  // scene.add(new THREE.CameraHelper(directionalLight.shadow.camera))
  sceneDiv.appendChild(renderer.domElement)
  // Load Model
  let loader = new GLTFLoader()
  loader.load('3d/truck/scene.gltf', (gltf: GLTF) => {
    truck = gltf.scene.children[0]
    truck.traverse((n) => {
      if (n.isObject3D) {
        n.castShadow = true
      }
    })
    truck.position.set(0, -20, 0)
    truck.scale.set(0.125, 0.125, 0.125)
    truck.rotation.x = -Math.PI / 2
    truck.rotation.z = 2.9
    scene.add(truck)

    loader.load('3d/laptop/scene.gltf', (laptopGLTF: GLTF) => {
      laptop = laptopGLTF.scene.children[0]
      laptop.position.set(4.5, -6, 25)
      laptop.scale.set(0.175, 0.175, 0.175)
      laptop.rotation.z = 0.5
      scene.add(laptop)

      loader.load('3d/lawnchair/scene.gltf', (lawnChairGLFT: GLTF) => {
        lawnChair = lawnChairGLFT.scene.children[0]
        lawnChair.traverse((n) => {
          if (n.isObject3D) {
            n.castShadow = true
          }
        })
        lawnChair.position.set(15, -20, 15)
        lawnChair.scale.set(0.27, 0.27, 0.27)
        lawnChair.rotation.y = 3
        scene.add(lawnChair)
        animate()
        // renderer.render(scene, camera)
      })
    })
  })
  window.addEventListener('resize', () => onWindowResize(sceneDiv))
}

const animate = () => {
  requestAnimationFrame(animate)
  // truck.rotation.z += 0.0025
  renderer.render(scene, camera)
}

const onWindowResize = (sceneDiv: HTMLDivElement) => {
  if (!sceneDiv) return
  camera.aspect = sceneDiv.clientWidth / sceneDiv.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(sceneDiv.clientWidth, sceneDiv.clientHeight)
  // renderer.render(scene, camera)
}

export default init
