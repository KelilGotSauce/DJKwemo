import { useEffect, useRef } from "react";

export default function BackgroundScene() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationId;
    let particles = [];

    function calculateParticleCount() {
      return Math.floor((window.innerWidth * window.innerHeight) / 6000);
    }

    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * window.innerHeight;
        this.fadeDelay = Math.random() * 600 + 100;
        this.fadeStart = Date.now() + this.fadeDelay;
        this.fadingOut = false;
      }

      reset() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.speed = Math.random() / 5 + 0.1;
        this.opacity = 1;
        this.fadeDelay = Math.random() * 600 + 100;
        this.fadeStart = Date.now() + this.fadeDelay;
        this.fadingOut = false;
      }

      update() {
        this.y -= this.speed;

        if (this.y < 0) {
          this.reset();
        }

        if (!this.fadingOut && Date.now() > this.fadeStart) {
          this.fadingOut = true;
        }

        if (this.fadingOut) {
          this.opacity -= 0.008;
          if (this.opacity <= 0) {
            this.reset();
          }
        }
      }

      draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fillRect(this.x, this.y, 0.5, Math.random() * 2 + 1);
      }
    }

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const particleCount = calculateParticleCount();
      particles = [];

      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      animationId = requestAnimationFrame(animate);
    }

    resizeCanvas();
    animate();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="bg-scene" aria-hidden="true">
      <div className="bg-spotlight">
        <div />
        <div />
        <div />
      </div>

      <canvas ref={canvasRef} className="bg-particle-canvas" />
      <div className="bg-accent-lines">
        <div>
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
        <div>
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    </div>
  );
}