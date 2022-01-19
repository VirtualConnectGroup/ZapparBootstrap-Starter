// ZapparThree provides a LoadingManager that shows a progress bar while
// the assets are downloaded
let manager = new ZapparThree.LoadingManager();

// Setup ThreeJS in the usual way
let renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Setup a Zappar camera instead of one of ThreeJS's cameras
let camera = new ZapparThree.Camera({
  // These values are defaults.
  zNear: 0.1,
  zFar: 100
});

// The Zappar library needs your WebGL context, so pass it
ZapparThree.glContextSet(renderer.getContext());

// Create a ThreeJS Scene and set its background to be the camera background texture
let scene = new THREE.Scene();
scene.background = camera.backgroundTexture;

// Request the necessary permission from the user
ZapparThree.permissionRequestUI().then(function (granted) {
  if (granted) camera.start();
  else ZapparThree.permissionDeniedUI();
});

// Set up our image tracker group
// Pass our loading manager in to ensure the progress bar works correctly
let tracker = new ZapparThree.ImageTrackerLoader(manager).load("AUG-WV0F.zpt");
let trackerGroup = new ZapparThree.ImageAnchorGroup(camera, tracker);
scene.add(trackerGroup);

// Add some content
let box = new THREE.Mesh(
  new THREE.BoxBufferGeometry(),
  new THREE.MeshBasicMaterial()
);
box.position.set(0, 0.5, -0.5);

//trackerGroup.add(box);
trackerGroup.add(box);

// Set up our render loop
function render() {
  requestAnimationFrame(render);
  camera.updateFrame(renderer);

  renderer.render(scene, camera);
}

render();
