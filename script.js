
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1f36);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 12, 20);


// RENDERER
const renderer = new THREE.WebGLRenderer({
  antialias: true
});

renderer.setSize(
  window.innerWidth,
  window.innerHeight
);

// CONTROLES DE CAMARA
const controls = new THREE.OrbitControls(
    camera,
    renderer.domElement
);

controls.enableDamping = true;
controls.dampingFactor = 0.05;

controls.minDistance = 5;
controls.maxDistance = 100;

document.body.appendChild(
  renderer.domElement
);

const ambientLight = new THREE.AmbientLight(
  0xfff0,
  1
);

scene.add(ambientLight);
const directionalLight =
new THREE.DirectionalLight(
  0xffff,
  2
);

directionalLight.position.set(
  10,
  10,
  10
);

scene.add(directionalLight);

const axesHelper =
new THREE.AxesHelper(5);

scene.add(axesHelper);
const floorGeometry =
new THREE.PlaneGeometry(
  50,
  50
);

const floorMaterial =
new THREE.MeshLambertMaterial({
  color: 0x90EE90
});

const floor =
new THREE.Mesh(
  floorGeometry,
  floorMaterial
);

floor.rotation.x =
-Math.PI / 2;

scene.add(floor);
const cube =
new THREE.Mesh(
  new THREE.BoxGeometry(
    1,
    1,
    1
  ),
  new THREE.MeshNormalMaterial()
);

cube.position.y = 1;

scene.add(cube);

const loader =
new THREE.GLTFLoader();

loader.load(

  'Fuente Carrera.glb',

  function(gltf){

    const modelo =
    gltf.scene;

    modelo.position.set(
      0,
      0,
      0
    );

    modelo.scale.set(
      1,
      1,
      1
    );

    scene.add(modelo);

    console.log(
      "MODELO CARGADO"
    );

    console.log(
      modelo
    );

  },

  function(xhr){

    console.log(
      (xhr.loaded / xhr.total * 100)
      + '% cargado'
    );

  },

  function(error){

    console.error(
      'ERROR:',
      error
    );

  }

);
function animate(){

  requestAnimationFrame(
    animate
  );
  controls.update();
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(
    scene,
    camera
  );

}

animate();

window.addEventListener(
  'resize',
  () => {

    camera.aspect =
    window.innerWidth /
    window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

  }
);
