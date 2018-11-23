var camera, scene, renderer;
var geometry, material, mesh;
var controls;

var objects = [];

function initControls() {
  controls = new THREE.TrackballControls( camera );
  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.8;
  controls.noZoom = false;
  controls.noPan = false;
  controls.staticMoving = true;
  controls.dynamicDampingFactor = 0.3;

  var dragControls = new THREE.DragControls( objects, camera, renderer.domElement );
  dragControls.addEventListener( 'dragstart', function () {
    controls.enabled = false;
  } );
  dragControls.addEventListener( 'dragend', function () {
    controls.enabled = true;
  } );
}

function newCanopy(appendTo) {
  var loader = new THREE.STLLoader();
  loader.load( 'models/11.stl', function ( geometry ) {

    innerMesh = new THREE.Mesh( geometry, material );
    // innerMesh.position.set( 0.136, - 0.37, - 0.6 );
    innerMesh.rotation.set( - Math.PI / 2, Math.PI / 2, Math.PI / 2 );
    innerMesh.scale.set( .005, .005, .005 );
    innerMesh.castShadow = true;
    innerMesh.receiveShadow = true;
    console.log(innerMesh);
    scene.add( innerMesh );
    appendTo.push(innerMesh);
  });
}

function init() {
  var innerMesh;
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
	camera.position.z = 3;


	scene = new THREE.Scene();

  var gridHelper = new THREE.GridHelper( 400, 400, 0x0000ff, 0x808080 );
  gridHelper.position.y = - 2;
  // gridHelper.position.x = - 150;
  scene.add( gridHelper );


	material = new THREE.MeshNormalMaterial();

  newCanopy(objects);
  newCanopy(objects);

	renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setClearColor( 0xffffff, 1 );
	renderer.setSize( window.innerWidth, window.innerHeight - 80);
	document.getElementById('canvas').appendChild( renderer.domElement );

  initControls();

  animate();
}

function animate() {

	requestAnimationFrame( animate );

  // objects.forEach(function(obj) {
  //   obj.rotation.x += 0.01;
  //   obj.rotation.y += 0.02;
  // });

	renderer.render( scene, camera );

}
