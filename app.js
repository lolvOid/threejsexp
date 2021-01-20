
import * as THREE from './node_modules/three/build/three.module.js';
import {DDSLoader} from './node_modules/three/examples/jsm/loaders/DDSLoader.js';
import { MTLLoader } from './node_modules/three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from './node_modules/three/examples/jsm/loaders/OBJLoader.js';
import { GUI } from './node_modules/three/examples/jsm/libs/dat.gui.module.js';


import { EffectComposer } from './node_modules/three/examples/jsm/postprocessing/EffectComposer.js';
import { SSAOPass } from './node_modules/three/examples/jsm/postprocessing/SSAOPass.js';
import { DeviceOrientationControls } from './node_modules/three/examples/jsm/controls/DeviceOrientationControls.js';
let camera, scene, renderer;
let container, stats;
let composer;
let group;
let mouseX = 0, mouseY = 0;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let controls ;

init();
animate();


function init() {

   
    
    container = document.createElement('div');
    
    document.getElementById('three').appendChild(container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
   
    camera.position.z = 450;

   
   
    // scene

    scene = new THREE.Scene();
  
    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.75);
    
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x9e9e9e,0.3);
    dirLight.position.x = -10;
    dirLight.position.y = 26.981;
    dirLight.position.z = 17.5;

    scene.add(dirLight);

    // const helper = new THREE.DirectionalLightHelper(dirLight,100);
    // scene.add(helper);
   


    const hemiLight = new THREE.HemisphereLight(0x6260fb,0x20b0ee,0.9);
    
    hemiLight.position.y = 20;
    scene.add(hemiLight);

    scene.add(camera);


    // model

    const onProgress = function (xhr) {

        if (xhr.lengthComputable) {

            const percentComplete = xhr.loaded / xhr.total * 100;
            console.log(Math.round(percentComplete, 2) + '% downloaded');

        }

    };

    const onError = function () { };

    const manager = new THREE.LoadingManager();
    // manager.addHandler(/\.dds$/i, new DDSLoader());

    // comment in the following line and import TGALoader if your asset uses TGA textures
    // manager.addHandler( /\.tga$/i, new TGALoader() );

    new MTLLoader(manager)
        .setPath('models/obj/metaball/')
        .load('meta.mtl', function (materials) {

            materials.preload();

            new OBJLoader(manager)
                .setMaterials(materials)
                .setPath('models/obj/metaball/')
                .load('meta.obj', function (object) {
                    object.rotation.y = 70;
                    object.position.x = -5;
                    object.position.y = 55;
                    scene.add(object);
                    object.castShadow = false;
                 

                }, onProgress, onError);

        });

    //

    
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
    renderer.setClearColor( 0x000000, 0 ); 
    container.appendChild(renderer.domElement);

    const width = window.innerWidth;
    const height = window.innerHeight;

        // composer = new EffectComposer( renderer );

        // const ssaoPass = new SSAOPass( scene, camera, width, height );
        // ssaoPass.kernelRadius = 16;
        // composer.addPass( ssaoPass );

        // Init gui
  
        // gui.add( ssaoPass, 'output', {
        //     'Default': SSAOPass.OUTPUT.Default,
        //     'SSAO Only': SSAOPass.OUTPUT.SSAO,
        //     'SSAO Only + Blur': SSAOPass.OUTPUT.Blur,
        //     'Beauty': SSAOPass.OUTPUT.Beauty,
        //     'Depth': SSAOPass.OUTPUT.Depth,
        //     'Normal': SSAOPass.OUTPUT.Normal
        // } ).onChange( function ( value ) {

        //     ssaoPass.output = parseInt( value );

        // } );
        // gui.add( ssaoPass, 'kernelRadius' ).min( 0 ).max( 32 );
        // gui.add( ssaoPass, 'minDistance' ).min( 0.001 ).max( 0.02 );
        // gui.add( ssaoPass, 'maxDistance' ).min( 0.01 ).max( 0.3 );

  
    check();
    //

    window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function onDocumentMouseMove(event) {

    mouseX = (event.clientX - windowHalfX) / 2;
    mouseY = (event.clientY - windowHalfY) / 2;

}

//

function animate() {

    requestAnimationFrame(animate);
  
    render();

}

function render() {
    
    camera.position.x += (- mouseX - camera.position.x) * .005;
    camera.position.y += ( mouseY - camera.position.y) * .004;

    camera.lookAt(scene.position);

    renderer.render(scene, camera);
    // composer.render();
}

function check(){
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        // true for mobile device
        document.removeEventListener('mousemove', onDocumentMouseMove, false);
        console.log("Mobile");
      }else{
        // false for not mobile device
        document.addEventListener('mousemove', onDocumentMouseMove, false);
        
        console.log("Desktop");
      }
}
