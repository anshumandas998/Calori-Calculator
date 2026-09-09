import { useState, useRef, useCallback } from "react";

/**
 * use3DTilt - Provides high-performance 60fps 3D perspective tilt
 * and specular glare coordinates based on mouse position.
 *
 * @param {Object} options
 * @param {number} [options.maxTilt=15] - Maximum tilt angle in degrees
 * @param {number} [options.perspective=1000] - CSS perspective in px
 * @param {number} [options.scale=1.02] - Scale on hover
 * @param {number} [options.speed=400] - Transition speed in ms
 */
export function use3DTilt({
  maxTilt = 12,
  perspective = 1000,
  scale = 1.02,
  speed = 300,
  glare = true,
} = {}) {
  const ref = useRef(null);
  const [style, setStyle] = useState({
    transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
    transition: `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
    transformStyle: "preserve-3d",
  });
  const [glareStyle, setGlareStyle] = useState({
    opacity: 0,
    transform: "rotate(180deg) translate(-50%, -50%)",
  });

  const onMouseMove = useCallback((e) => {
    if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(hover: none)").matches) {
      return;
    }
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const width = rect.width;
    const height = rect.height;

    const xPercent = (x / width) * 2 - 1; // -1 to 1
    const yPercent = (y / height) * 2 - 1; // -1 to 1

    const tiltX = -yPercent * maxTilt;
    const tiltY = xPercent * maxTilt;

    setStyle({
      transform: `perspective(${perspective}px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
      transition: "transform 100ms ease-out",
      transformStyle: "preserve-3d",
      willChange: "transform",
    });

    if (glare) {
      const glareAngle = Math.atan2(yPercent, xPercent) * (180 / Math.PI) - 90;
      const glareOpacity = Math.min(0.35, Math.sqrt(xPercent * xPercent + yPercent * yPercent) * 0.3);
      setGlareStyle({
        opacity: glareOpacity,
        transform: `rotate(${glareAngle}deg) translate(-50%, -50%)`,
        background: `radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)`,
        position: "absolute",
        top: `${y}px`,
        left: `${x}px`,
        width: `${width * 1.5}px`,
        height: `${height * 1.5}px`,
        pointerEvents: "none",
        borderRadius: "50%",
        mixBlendMode: "overlay",
        transition: "opacity 150ms ease-out",
      });
    }
  }, [maxTilt, perspective, scale, glare]);

  const onMouseLeave = useCallback(() => {
    setStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
      transformStyle: "preserve-3d",
    });
    if (glare) {
      setGlareStyle(prev => ({
        ...prev,
        opacity: 0,
        transition: `opacity ${speed}ms ease`,
      }));
    }
  }, [perspective, speed, glare]);

  return { ref, style, glareStyle, onMouseMove, onMouseLeave };
}
