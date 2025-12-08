import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, X, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; 
import { projects } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

// --- TEXTURE URLS ---
const WALL_TEXTURE_URL = "/wall.avif"
const PILLAR_TEXTURE_URL = WALL_TEXTURE_URL; 

const FLOOR_TEXTURE_URL = "/Floor.jpg"
const CEILING_TEXTURE_URL = WALL_TEXTURE_URL;

const Projects = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [activeProject, setActiveProject] = useState(null);
  const [zoomedProject, setZoomedProject] = useState(null); 
  const navigate = useNavigate();
  const SPACING = 25;

  // --- HELPER: CREATE ENDING TEXT TEXTURE ---
  const createEndText = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 1024;
    canvas.height = 512;
    
    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.clearRect(0, 0, 1024, 512);
    
    ctx.font = "bold 200px Playfair Display";
    ctx.textAlign = "center";
    ctx.fillStyle = "#BC4B32";
    ctx.fillText("FIN.", 512, 250);
    
    ctx.font = "italic 60px Arial";
    ctx.fillStyle = "#333";
    ctx.fillText("Thanks for visiting", 512, 350);

    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  };

  useEffect(() => {
    // 1. SCENE CONFIG
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0A0A0A"); 
    scene.fog = new THREE.Fog("#0A0A0A", 5, 40); 

    // 2. CAMERA RIG
    const cameraGroup = new THREE.Group();
    scene.add(cameraGroup);
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 1.7, 5);
    cameraGroup.add(camera);

    // 3. RENDERER
    const renderer = new THREE.WebGLRenderer({ 
        canvas: canvasRef.current, 
        antialias: true,
        powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 4. LOAD TEXTURES
    const texLoader = new THREE.TextureLoader();
    
    // Wall Texture
    const wallTex = texLoader.load(WALL_TEXTURE_URL);
    wallTex.wrapS = wallTex.wrapT = THREE.RepeatWrapping;
    wallTex.repeat.set(2, 1);

    // Floor Texture
    const floorTex = texLoader.load(FLOOR_TEXTURE_URL);
    floorTex.wrapS = floorTex.wrapT = THREE.RepeatWrapping;
    floorTex.repeat.set(4, 20);

    // --- NEW: PILLAR TEXTURE ---
    const pillarTex = texLoader.load(PILLAR_TEXTURE_URL);
    pillarTex.wrapS = pillarTex.wrapT = THREE.RepeatWrapping;
    pillarTex.repeat.set(1, 4); 

    // --- NEW: CEILING TEXTURE ---
    const ceilingTex = texLoader.load(CEILING_TEXTURE_URL);
    ceilingTex.wrapS = ceilingTex.wrapT = THREE.RepeatWrapping;
    ceilingTex.repeat.set(5, 20); 

    // MATERIALS
    const wallMaterial = new THREE.MeshStandardMaterial({ 
        map: wallTex,
        color: "#F0F0F0", 
        roughness: 1,
        bumpMap: wallTex,
        bumpScale: 0.02
    });

    const floorMaterial = new THREE.MeshStandardMaterial({ 
        map: floorTex,
        color: "#Dcdcdc", 
        roughness: 0.6,
        metalness: 0.1,
        bumpMap: floorTex,
        bumpScale: 0.05
    });

    const pillarMat = new THREE.MeshStandardMaterial({ 
        map: pillarTex,
        color: "#E0E0E0", 
        roughness: 0.8 
    });

    const ceilingMat = new THREE.MeshStandardMaterial({ 
        map: ceilingTex,
        color: "#F8F7F5",
        roughness: 0.9,
        side: THREE.DoubleSide
    });

    // 5. ARCHITECTURE
    // Floor
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(30, 400), floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, 0, -150);
    floor.receiveShadow = true;
    scene.add(floor);

    // Ceiling 
    const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(30, 400), ceilingMat);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.set(0, 8, -150);
    scene.add(ceiling);
    for (let i = 0; i < 10; i++) {
        const pointLight = new THREE.PointLight(0xfff0e0, 0.8, 20);
        pointLight.position.set(0, 7.9, -i * SPACING * 2);
        scene.add(pointLight);
    }

    // Side Walls
    const createWall = (x) => {
        const wall = new THREE.Mesh(new THREE.BoxGeometry(1, 12, 400), wallMaterial);
        wall.position.set(x, 5, -150);
        wall.receiveShadow = true;
        wall.castShadow = true;
        scene.add(wall);
    };
    createWall(-7);
    createWall(7);

    // Pillars 
    const pillarGeo = new THREE.BoxGeometry(1.5, 12, 1.5);
    for (let i = 0; i < 30; i++) {
        const z = -i * SPACING; 
        
        const pLeft = new THREE.Mesh(pillarGeo, pillarMat); 
        pLeft.position.set(-6.5, 5, z);
        pLeft.castShadow = true;
        pLeft.receiveShadow = true;
        scene.add(pLeft);

        const pRight = new THREE.Mesh(pillarGeo, pillarMat); 
        pRight.position.set(6.5, 5, z);
        pRight.castShadow = true;
        pRight.receiveShadow = true;
        scene.add(pRight);
        
        const leftRim = new THREE.PointLight(0x331100, 0.6, 20);
        leftRim.position.set(-7, 4, -100);
        scene.add(leftRim);

        const rightRim = new THREE.PointLight(0x331100, 0.6, 20);
        rightRim.position.set(7, 4, -100);
        scene.add(rightRim);
    }

    // 6. LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.05);  
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0x442200, 0.3);
    sunLight.position.set(0, 3, 40);
    sunLight.castShadow = true;
    scene.add(sunLight);

    // 7. FRAMES
    const frames = [];

    projects.forEach((project, i) => {
        const group = new THREE.Group();
        const isLeft = i % 2 === 0;
        
        const x = isLeft ? -5.9 : 5.9;
        const z = (-i * SPACING) - (SPACING / 2); 
        
        group.position.set(x, 2.5, z);
        group.rotation.y = isLeft ? Math.PI / 2 : -Math.PI / 2;

        // Frame Border
        const frameMesh = new THREE.Mesh(
            new THREE.BoxGeometry(4.4, 3.4, 0.15),
            new THREE.MeshStandardMaterial({ 
                color: "#C0C0C0", 
                metalness: 1.0,
                roughness: 0.25,
                envMapIntensity: 1.0
            })
        );
        frameMesh.castShadow = true;
        group.add(frameMesh);

        // Image
        const tex = texLoader.load(project.image);
        tex.colorSpace = THREE.SRGBColorSpace;
        const imgMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(4, 3),
            new THREE.MeshBasicMaterial({ map: tex }) 
        );
        imgMesh.position.z = 0.08;
        imgMesh.userData = { id: project.id, index: i }; 
        group.add(imgMesh);

        // Spotlight 
        const spot = new THREE.SpotLight(0xffaa00, 10, 10, 0.8, 0.5, 1);
        spot.position.set(0, 3, 3);
        spot.target = imgMesh;
        group.add(spot);

        frames.push({ group, frameMesh, imgMesh, spot, z, isLeft, project, index: i });
        scene.add(group);
    });

    // 8. CINEMATIC ENDING TEXT
    const endTexture = createEndText();
    const endPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(10, 5),
        new THREE.MeshBasicMaterial({ map: endTexture, transparent: true })
    );
    // Position text at end of tunnel
    const endZ = -(projects.length * SPACING) - 20;
    endPlane.position.set(0, 2, endZ);
    scene.add(endPlane);

    // End Light
    const endSpot = new THREE.SpotLight(0xBC4B32, 10, 20, 0.5, 1, 1);
    endSpot.position.set(0, 8, endZ + 5);
    endSpot.target = endPlane;
    scene.add(endSpot);


    // 9. ANIMATION LOOP
    const totalDist = projects.length * SPACING;
    const cameraState = { z: 5, lookTargetX: 0 };

    // --- UPDATED ANIMATION LOGIC: CINEMATIC ZOOM THROUGH ---
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            // Increased scroll distance slightly to allow for the final zoom out feel
            end: `+=${totalDist * 55}`, 
            scrub: 1.5, 
            pin: true,
            onUpdate: (self) => {
                const currentZ = cameraState.z;
                let active = null;
                
                // HIGHLIGHT LOGIC 
                if (currentZ > endZ + 10) {
                    frames.forEach(f => {
                        const dist = Math.abs(currentZ - (f.z + 5));
                        if (dist < 10) {
                            active = f;
                            f.group.position.lerp(new THREE.Vector3(f.isLeft ? -5.5 : 5.5, 2.5, f.z), 0.1);
                            f.spot.intensity = THREE.MathUtils.lerp(f.spot.intensity, 15, 0.1);
                        } else {
                            f.group.position.lerp(new THREE.Vector3(f.isLeft ? -5.9 : 5.9, 2.5, f.z), 0.1);
                            f.spot.intensity = THREE.MathUtils.lerp(f.spot.intensity, 5, 0.1);
                        }
                    });

                    // Head Turning
                    if (active) {
                        const targetX = active.isLeft ? -5 : 5;
                        gsap.to(cameraState, { lookTargetX: targetX, duration: 1, ease: "power2.out" });
                        if (activeProject?.id !== active.project.id) {
                            setActiveProject({ ...active.project, index: active.index });
                        }
                    } else {
                        gsap.to(cameraState, { lookTargetX: 0, duration: 1.5, ease: "power2.inOut" });
                    }
                } else {
                     setActiveProject(null);
                }
            }
        }
    });

    // Phase 1: Walk through all projects normally
    tl.to(cameraState, {
        z: endZ + 30, // Stop a bit before the text
        ease: "none",
        duration: 0.75 
    });

    // Phase 2: Cinematic Zoom THROUGH "FIN" (Accelerate)
    // We move the camera PASTR the text (endZ - 20)
    tl.to(cameraState, {
        z: endZ - 20, 
        lookTargetX: 0, 
        ease: "power2.in", // Accelerate into the void
        duration: 0.25 
    });

    // Phase 3: Fade out the Canvas (to reveal next section)
    // This happens simultaneously with the last part of Phase 2
    tl.to(canvasRef.current, {
        opacity: 0,
        ease: "power1.in",
        duration: 0.1
    }, "<0.15"); // Start 15% into the previous animation (Zoom)


    const animate = () => {
        cameraGroup.position.z = cameraState.z;
        const lookAtVector = new THREE.Vector3(cameraState.lookTargetX, 1.7, cameraState.z - 10);
        camera.lookAt(lookAtVector);
        camera.position.y = 1.7 + Math.sin(Date.now() * 0.003) * 0.02; 
        
        endPlane.position.y = 2 + Math.sin(Date.now() * 0.002) * 0.2;

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };
    animate();

    // 10. CLICK INTERACTION
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (e) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children, true);
        const hit = intersects.find(i => i.object.userData.id);
        
        if (hit) {
            const pid = hit.object.userData.id;
            const proj = projects.find(p => p.id === pid);
            setZoomedProject(proj); 
        }
    };
    window.addEventListener('click', handleClick);

    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener('click', handleClick);
        ScrollTrigger.getAll().forEach(t => t.kill());
        renderer.dispose();
    };

  }, []);

  return (
    <div>
        {/* SECTION 1: 3D CANVAS (PINNED) */}
        <div ref={containerRef} className="relative w-full h-screen bg-[#EBE9E4]">
            <canvas ref={canvasRef} className="block w-full h-full outline-none cursor-pointer fixed top-0 left-0" />
            
            {/* INFO OVERLAY */}
            <div className={`absolute bottom-10 left-10 z-10 transition-opacity duration-500 ${zoomedProject ? 'opacity-0' : 'opacity-100'}`}>
                {activeProject && (
                    <div className="bg-white/10 backdrop-blur-lg border-l-4 border-[#BC4B32] shadow-xl max-w-md p-6 rounded-md border-opacity-30">
                        <span className="text-[#BC4B32] font-mono text-xs tracking-widest uppercase mb-2 block">
                            0{activeProject.index + 1}
                        </span>
                        <h2 className="text-4xl font-bold text-white font-serif mb-1">
                            {activeProject.title}
                        </h2>
                        <p className="text-[#d3d2d2] text-sm mb-0">
                            {activeProject.location}
                        </p>
                        <div className="mt-3 text-xs font-bold text-[#d4d4d4] flex items-center gap-2 animate-pulse">
                            TAP IMAGE TO EXPAND <ArrowRight size={14}/>
                        </div>
                    </div>
                )}
            </div>

            {/* POP-UP MODAL */}
            <AnimatePresence>
                {zoomedProject && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-10"
                    >
                        <motion.div 
                            initial={{ scale: 0.8, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.8, y: 50 }}
                            className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row rounded-md relative"
                        >
                            <button 
                                onClick={() => setZoomedProject(null)}
                                className="absolute top-4 right-4 z-50 bg-white/20 hover:bg-white text-black p-2 rounded-full transition-all"
                            >
                                <X size={24} />
                            </button>
                            <div className="w-full md:w-2/3 h-64 md:h-auto bg-black relative">
                                <img 
                                    src={zoomedProject.image} 
                                    alt={zoomedProject.title} 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="w-full md:w-1/3 p-8 md:p-12 flex flex-col justify-center bg-[#1A1A1A] text-white">
                                <span className="text-[#BC4B32] font-mono tracking-widest text-sm mb-4">
                                    PROJECT DETAILS
                                </span>
                                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight text-[#F8F7F5]">
                                    {zoomedProject.title}
                                </h2>
                                <p className="text-gray-400 mb-8 leading-relaxed">
                                    Situated in {zoomedProject.location}, this project represents a dialogue between modern structure and natural environment.
                                </p>
                                <button 
                                    onClick={() => navigate(`/projects/${zoomedProject.id}`)}
                                    className="group flex items-center gap-3 bg-[#BC4B32] text-white px-6 py-4 hover:bg-white hover:text-[#1A1A1A] transition-all duration-300 w-fit"
                                >
                                    <span className="uppercase tracking-widest font-bold text-sm">Open Case Study</span>
                                    <ExternalLink size={18} />
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="absolute top-10 right-10 text-[#1A1A1A]/30 font-mono text-xs tracking-[0.3em] pointer-events-none">
                SCROLL TO WALK
            </div>
        </div>

        {/* SECTION 2: NEXT CONTENT (VISIBLE AFTER ZOOM) */}
        <section className="w-full min-h-screen bg-[#EBE9E4] text-[#1A1A1A] flex items-center justify-center p-20 z-20 relative">
            <div className="max-w-4xl text-center">
                <span className="text-[#BC4B32] font-mono tracking-widest uppercase mb-4 block">Next Chapter</span>
                <h1 className="text-6xl md:text-8xl font-serif font-bold mb-8">
                   About the Studio
                </h1>
                <p className="text-xl md:text-2xl font-light leading-relaxed opacity-80">
                    We believe architecture is more than just structure; it is the physical manifestation of cultural memory and future aspirations.
                </p>
            </div>
        </section>
        
    </div>
  );
};

export default Projects;