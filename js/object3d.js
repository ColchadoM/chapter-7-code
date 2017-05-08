/**
 * Chapter 7. Object 3D.
 *
 * This script show how use the THREE.Object3D module to grouping objects.
 * Groping four boxes in the following graph:
 *
 *         (scene)
 *       /         \
 *    (group1)    (group2)
 *    /      \     /     \
 * (boxA) (boxB) (boxC) (boxD)
 */

/* global $, THREE */
'use strict';

var scene, camera, renderer;
var canvas;

var geometry;
var material;

var group1, group2;
var boxA, boxB, boxC, boxD;

function setup () {

  // Begin creation of THREE basic objects
  canvas = $('canvas')[0];

  scene = new THREE.Scene();

  var aspect = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
  camera.position.z = 30;

  renderer = new THREE.WebGLRenderer({
    canvas    : canvas,
    antialias : true,
    alpha     : true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  $(window).on('resize', onWindowResize);
  // End creation of THREE basic objects

  geometry = new THREE.BoxGeometry(4, 4, 4);
  material = new THREE.MeshNormalMaterial();

  // Create objects (groups)
  group1 = new THREE.Object3D();
  group2 = new THREE.Object3D();

  // Create boxes mesh
  boxA = new THREE.Mesh(geometry, material);
  boxB = new THREE.Mesh(geometry, material);
  boxC = new THREE.Mesh(geometry, material);
  boxD = new THREE.Mesh(geometry, material);

  // Create the graph

  // boxA -> group1
  // boxB -> group1
  group1.add(boxA);
  group1.add(boxB);

  // boxC -> group2
  // boxD -> group2
  group2.add(boxC);
  group2.add(boxD);

  // group1 -> scene
  // group2 -> scene
  scene.add(group1);
  scene.add(group2);

  // Modify the system reference (coordinates of each group)

  group1.position.x = -6;
  group2.position.x = 6;
  group2.scale.set(0.5, 0.5, 0.5);

  boxB.position.y = 8;
  boxD.position.y = -8;
}

function animate () {

  // Update groups
  group1.rotation.x += 0.1;
  group2.rotation.x -= 0.1;

  boxB.rotation.y += 0.1;
  boxD.rotation.y -= 0.1;

  group1.position.x -= 0.2;
  if (group1.position.x <= -35) {
    group1.position.x = -6;
  }

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

function onWindowResize () {
  var aspectRatio = window.innerWidth / window.innerHeight;
  camera.aspect = aspectRatio;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

$(document).ready(function () {
  setup();
  animate();
});
