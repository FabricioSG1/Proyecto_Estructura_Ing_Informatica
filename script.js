const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,0.1,1000);

camera.position.set(0,12,20);

const renderer = new THREE.WebGLRenderer({
    antialias:true
});

renderer.setSize(window.innerWidth,window.innerHeight);
renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const controls=new THREE.OrbitControls(
    camera,
    renderer.domElement
);

controls.enableDamping=true;
controls.dampingFactor=0.05;
controls.minDistance=5;
controls.maxDistance=100;

const ambientLight=new THREE.AmbientLight(0x4a5d7f,0.15);
scene.add(ambientLight);

const directionalLight=new THREE.DirectionalLight(0xbfdcff,0.9);

directionalLight.position.set(20,7,7);
directionalLight.castShadow=true;
directionalLight.shadow.mapSize.width=2048;
directionalLight.shadow.mapSize.height=2048;

scene.add(directionalLight);

const fillLight=new THREE.DirectionalLight(0x3344aa,-1);
fillLight.position.set(-15,10,-10);
scene.add(fillLight);

const pointLight=new THREE.PointLight(0xffffff,4,50);
pointLight.position.set(14,9,0);
pointLight.castShadow=true;

scene.add(pointLight);

const foco=new THREE.Mesh(
    new THREE.SphereGeometry(0.25,32,32),
    new THREE.MeshPhongMaterial({
        color:0xffffff,
        emissive:0xffffff,
        emissiveIntensity:5
    })
);
foco.position.copy(pointLight.position);
scene.add(foco);


const axesHelper=new THREE.AxesHelper(5);
scene.add(axesHelper);

const floorGeometry=new THREE.PlaneGeometry(50,50);

const floorMaterial=new THREE.MeshLambertMaterial({
    color:0x1b2d1
});

const floor=new THREE.Mesh(
    floorGeometry,
    floorMaterial
);

floor.rotation.x=-Math.PI/2;
floor.receiveShadow=true;

scene.add(floor);

const loader=new THREE.GLTFLoader();

loader.load(

    "Estructura Ing. Informatica.glb",

    function(gltf){

        const modelo=gltf.scene;
        modelo.position.set(0,0,0);
        modelo.scale.set(1,1,1);
        modelo.traverse(function(child){
    if(child.isMesh){
        child.material=new THREE.MeshPhongMaterial({
            color:child.material.color,shininess:40,specular:0x777777
        });

        child.castShadow=true;
        child.receiveShadow=true;
    }
});
        scene.add(modelo);

    },

    function(xhr){

        console.log((xhr.loaded/xhr.total*100).toFixed(0)+"% cargado");

    },

    function(error){

        console.error(error);

    }

);

function animate(){

    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene,camera);

}

animate();

window.addEventListener("resize",()=>{

    camera.aspect=window.innerWidth/window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth,window.innerHeight);

});
