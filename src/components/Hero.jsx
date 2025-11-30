import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// --- SHADER CODE (The "Blueprint to Reality" Logic) ---

const vertexShader = `
  varying vec2 vUv;
  uniform vec2 uMouse;
  uniform float uTime;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // 1. 3D PARALLAX TILT
    // The whole plane tilts slightly based on mouse position
    pos.z += (uMouse.x - 0.5) * position.x * 0.5;
    pos.z += (uMouse.y - 0.5) * position.y * 0.5;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform vec2 uImageResolution;
  uniform float uTime;

  varying vec2 vUv;

  // Function to convert color to "Blueprint Sketch" style
  vec3 makeBlueprint(vec3 color, vec2 uv) {
      // 1. Grayscale
      float gray = dot(color, vec3(0.299, 0.587, 0.114));
      
      // 2. High Contrast Line look
      float sketch = 1.0 - step(0.4, gray); // Simple thresholding for line look
      
      // 3. Add Grid Lines (Architectural Grid)
      float gridScale = 30.0;
      float gridX = step(0.98, fract(uv.x * gridScale)); // Vertical lines
      float gridY = step(0.98, fract(uv.y * gridScale)); // Horizontal lines
      float grid = max(gridX, gridY);

      // 4. Mix with Blueprint Color (Deep Blue/Grey)
      vec3 bluePrintColor = vec3(0.2, 0.25, 0.35); // Architectural Blue
      vec3 paperColor = vec3(0.92, 0.92, 0.90);    // Paper White
      
      // Mix logic: If it's a line or grid, be dark. Else be paper.
      vec3 base = mix(paperColor, bluePrintColor, (1.0 - gray) * 0.8 + grid * 0.3);
      
      return base;
  }

  void main() {
    // Aspect Ratio Fix
    vec2 ratio = vec2(
      min((uResolution.x / uResolution.y) / (uImageResolution.x / uImageResolution.y), 1.0),
      min((uResolution.y / uResolution.x) / (uImageResolution.y / uImageResolution.x), 1.0)
    );
    vec2 uv = vec2(
      vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );

    // Mouse Interaction
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    float screenAspect = uResolution.x / uResolution.y;
    
    vec2 mousePos = uMouse;
    mousePos.x *= screenAspect;
    
    vec2 currentPos = st;
    currentPos.x *= screenAspect;

    float dist = distance(currentPos, mousePos);

    // --- THE LENS EFFECT ---
    float radius = 0.22;
    float smoothness = 0.05;
    
    // Create the circle mask (1 inside lens, 0 outside)
    float mask = 1.0 - smoothstep(radius, radius + smoothness, dist);

    // Lens Distortion (Bulge out the reality)
    vec2 lensUV = uv - (currentPos - mousePos) * 0.15 * mask;

    // Fetch Texture
    vec4 texColor = texture2D(uTexture, lensUV);

    // --- COLOR LOGIC ---
    // Outside the mask: Blueprint Mode
    // Inside the mask: Real Color Mode
    
    vec3 sketchColor = makeBlueprint(texColor.rgb, uv);
    vec3 realColor = texColor.rgb;

    // Add a glowing ring around the lens
    float ring = smoothstep(radius, radius + 0.005, dist) * smoothstep(radius + 0.015, radius + 0.01, dist);
    vec3 ringColor = vec3(0.73, 0.29, 0.2); // Terracotta Ring

    // Mix Everything
    vec3 finalColor = mix(sketchColor, realColor, mask);
    finalColor += ringColor * ring; // Add the ring

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export default function HeroSection() {
  const mountRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // 1. SETUP
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // 2. TEXTURE
    const loader = new THREE.TextureLoader();
    // KEEPING YOUR EXACT IMAGE URL
    const texture = loader.load('./images/projects/p-2-1.jpeg', (tex) => {
        if(material) {
            material.uniforms.uImageResolution.value.set(tex.image.width, tex.image.height);
            setLoaded(true);
        }
    });

    // 3. GEOMETRY
    const fov = camera.fov * (Math.PI / 180);
    const planeHeight = 2 * Math.tan(fov / 2) * camera.position.z;
    const planeWidth = planeHeight * (width / height);
    
    // Higher segments for smoother vertex tilting
    const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight, 64, 64);

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: texture },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uResolution: { value: new THREE.Vector2(width, height) },
        uImageResolution: { value: new THREE.Vector2(1920, 1080) },
      },
    });

    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // 4. EVENTS
    const mouse = new THREE.Vector2(0.5, 0.5);
    
    const onMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = 1.0 - (e.clientY / window.innerHeight);
      
      // Direct update for responsiveness
      mouse.x = x;
      mouse.y = y;
      
      // Also update rotation parallax via uniforms if needed, 
      // but we do it in vertex shader mainly.
    };

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      
      const fov = camera.fov * (Math.PI / 180);
      const newHeight = 2 * Math.tan(fov / 2) * camera.position.z;
      const newWidth = newHeight * (w / h);
      plane.scale.set(newWidth / planeWidth, newHeight / planeHeight, 1);
      
      material.uniforms.uResolution.value.set(w, h);
      camera.updateProjectionMatrix();
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);

    // 5. ANIMATION LOOP
    const clock = new THREE.Clock();
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Smooth interpolation for the shader mouse value
      // This makes the lens movement feel heavy and smooth
      material.uniforms.uMouse.value.x += (mouse.x - material.uniforms.uMouse.value.x) * 0.08;
      material.uniforms.uMouse.value.y += (mouse.y - material.uniforms.uMouse.value.y) * 0.08;
      
      material.uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (mountRef.current && renderer.domElement) {
         mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#F8F7F5] overflow-hidden font-sans">
      
      {/* 3D CANVAS */}
      <div 
        ref={mountRef} 
        className={`absolute inset-0 z-0 transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* OVERLAY CONTENT */}
      <div className="absolute inset-0 z-10 flex flex-col items-start justify-center px-8 md:px-24 pointer-events-none">
        
        {/* Abstract Architectural Lines */}
        <div className="absolute top-0 left-24 w-[1px] h-full bg-[#1A1A1A] opacity-10"></div>
        <div className="absolute top-24 left-0 w-full h-[1px] bg-[#1A1A1A] opacity-10"></div>

        {/* Text Group */}
        <div className="relative overflow-hidden">
            <h2 className="text-[#BC4B32] text-sm md:text-base font-bold tracking-[0.3em] uppercase mb-4">
                Revealing The Future
            </h2>
            <h1 className="text-5xl md:text-8xl font-light text-[#1A1A1A] leading-tight">
                Crafting <br/>
                <span className="font-serif italic ml-4">Reality.</span>
            </h1>
        </div>

        {/* Instructions */}
        <div className="mt-12 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-[#1A1A1A] flex items-center justify-center opacity-50">
                <div className="w-1 h-1 bg-[#1A1A1A] rounded-full animate-ping"></div>
            </div>
            <p className="text-xs text-[#666666] tracking-widest uppercase">
                Move cursor to explore
            </p>
        </div>

      </div>

      {/* Floating Capsule Nav (Visual Placeholder) */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-white/50 pointer-events-auto cursor-pointer z-20 hover:scale-105 transition-transform">
        <ul className="flex gap-8 text-xs font-bold tracking-widest text-[#1A1A1A] uppercase">
            <li className="hover:text-[#BC4B32] transition-colors">Home</li>
            <li className="hover:text-[#BC4B32] transition-colors">Projects</li>
            <li className="hover:text-[#BC4B32] transition-colors">Studio</li>
        </ul>
      </div>

    </div>
  );
}