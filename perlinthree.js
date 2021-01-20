
    // global variables
    var renderer;
    var scene;
    var camera;
    var depth = 100;
    var width = 80;
    var height = 80;
    var spacingX = 10;
    var spacingZ = 10;
    var scale = 2;


    /**
     * Initializes the scene, camera and objects. Called when the window is
     * loaded by using window.onload (see below)
     */
     function init() {

        // create a scene, that will hold all our elements such as objects, cameras and lights.
        scene = new THREE.Scene();

        var geometry = new THREE.Geometry();
        for (var z = 0 ; z < depth ; z++) {
          for (var x = 0 ; x < width ; x ++) {
             var vertex = new THREE.Vector3(x*spacingX, Math.random()*height, z*spacingZ);
             geometry.vertices.push(vertex);
         }

     }

     for (var z = 0 ; z < depth-1 ; z++) {
      for (var x = 0 ; x < width - 1 ; x++) {
         var a = x + z*width;
         var b = (x+1) + (z * width);
         var c = x + ((z+1) * width);
         var d = (x+1) + ((z+1) * width);

         var face1 = new THREE.Face3(b, a, c);
         var face2 = new THREE.Face3(c, d, b);

         face1.color = new THREE.Color(scale(getHightPoint(geometry, face1)).hex());
         face2.color = new THREE.Color(scale(getHightPoint(geometry, face2)).hex());

         geometry.faces.push(face1);
         geometry.faces.push(face2);
     }
 }

        // create a camera, which defines where we're looking at.
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

        // create a render, sets the background color and the size
        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0x000000, 1.0);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMapEnabled = true;

        // position and point the camera to the center of the scene
        camera.position.x = 15;
        camera.position.y = 16;
        camera.position.z = 13;
        camera.lookAt(scene.position);

        // add the output of the renderer to the html element
        document.body.appendChild(renderer.domElement);

        // call the render function, after the first render, interval is determined
        // by requestAnimationFrame
        render();
    }

    /**
     * Called when the scene needs to be rendered. Delegates to requestAnimationFrame
     * for future renders
     */
     function render() {
        // render using requestAnimationFrame
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }


    /**
     * Function handles the resize event. This make sure the camera and the renderer
     * are updated at the correct moment.
     */
     function handleResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // calls the init function when the window is done loading.
    window.onload = init;
    // calls the handleResize function when the window is resized
    window.addEventListener('resize', handleResize, false);

