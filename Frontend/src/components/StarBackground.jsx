import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function StarBackground({ children }) {
  const backgroundRef = useRef(null);

  useEffect(() => {
    const container = backgroundRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.domElement.classList.add("starCanvas");
    container.appendChild(renderer.domElement);

    const bounds = container.getBoundingClientRect();
    renderer.setSize(bounds.width, bounds.height);
    camera.aspect = bounds.width / bounds.height;
    camera.updateProjectionMatrix();

    const particlesGeometry = new THREE.BufferGeometry();
    const count = 5000;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 150;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.05,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    camera.position.z = 10;

    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      particles.rotation.y += 0.003;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const newBounds = container.getBoundingClientRect();
      camera.aspect = newBounds.width / newBounds.height;
      camera.updateProjectionMatrix();
      renderer.setSize(newBounds.width, newBounds.height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);

      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="app-background" ref={backgroundRef}>
      <div className="app-content">{children}</div>
    </div>
  );
}