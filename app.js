var camera, scene, renderer;
var geometry, material, mesh;

var objects = [];

function init() {
  var innerMesh;
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
	camera.position.z = 1;

	scene = new THREE.Scene();

	material = new THREE.MeshNormalMaterial();

  var loader = new THREE.STLLoader();
  loader.load( '/models/11.stl', function ( geometry ) {

    innerMesh = new THREE.Mesh( geometry, material );
    // innerMesh.position.set( 0.136, - 0.37, - 0.6 );
    innerMesh.rotation.set( - Math.PI / 2, 0.3, 0 );
    innerMesh.scale.set( .005, .005, .005 );
    innerMesh.castShadow = true;
    innerMesh.receiveShadow = true;
    console.log(innerMesh);
    scene.add( innerMesh );
    objects.push(innerMesh);
  });

	geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );

	mesh = new THREE.Mesh( geometry, material );
	// scene.add( mesh );
  // objects.push(mesh);

	renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setClearColor( 0xffffff, 1 );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

  // loadCanopy();
  animate();
}

function animate() {

	requestAnimationFrame( animate );

  objects.forEach(function(obj) {
    obj.rotation.x += 0.01;
    obj.rotation.y += 0.02;
  });

	renderer.render( scene, camera );

}
