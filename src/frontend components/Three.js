import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Three = () => {
  const containerRef = useRef(null);
  const animateRef = useRef(null);
  const startAnimation = () => {
    const container = containerRef.current;

    window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

    // Set up Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth/1.8, window.innerHeight/3.5);
    container.appendChild(renderer.domElement);

    // Create stars
    const starGeometry = new THREE.SphereGeometry(0.2, 24, 24);
    const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const stars = [];

    for (let i = 0; i < 200; i++) {
      const star = new THREE.Mesh(starGeometry, starMaterial);
      star.position.set(
        Math.random() * 100 - 50,
        Math.random() * 100 - 50,
        Math.random() * 100 - 50
      );
      stars.push(star);
      scene.add(star);
    }

    // Animate stars
    const animateStars = () => {
      stars.forEach((star) => {
        star.position.z += Math.random() * 0.5;
        if (star.position.z > 50) {
          star.position.z = -50;
        }
      });
    };

    // Render scene
    const renderScene = () => {
      renderer.render(scene, camera);
    };

    // Animation loop
    const animate = () => {
      animateStars();
      renderScene();
      animateRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Clean up function
    return () => {
      cancelAnimationFrame(animateRef.current);
      container.removeChild(renderer.domElement);
    };
  };

  useEffect(()=>{
    startAnimation()
  })
  return (
  <>
  <div ref={containerRef} onClick={startAnimation} />
  </>
  );
};

export default Three;