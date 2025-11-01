import React, { useRef } from 'react';
import { useGLTF, Environment } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Ningalude 3D model-ukal ivide load cheyyuka
const BLUEPRINT_PATH = '/models/blueprint.glb';
const HOUSE_PATH = '/models/house.glb';

export const HouseAnimation = ({ progress }) => {
  const blueprintRef = useRef();
  const houseRef = useRef();

  // 3D Models load cheyyunnu
  const { scene: blueprintScene } = useGLTF(BLUEPRINT_PATH);
  const { scene: houseScene } = useGLTF(HOUSE_PATH);

  // Material-ukal transparent aakkan vendi
  // Ithu cheythale opacity work aavoo
  const ensureTransparent = (obj) => {
    if (obj.isMesh) {
      obj.material.transparent = true;
      obj.material.depthWrite = true; // Opacity blend cheyyumbol preshnam varathirikkan
    }
  };

  blueprintScene.traverse(ensureTransparent);
  houseScene.traverse(ensureTransparent);

  // Ee hook aanu scroll cheyyumbol animation trigger cheyyunnath
  useFrame(() => {
    const scrollProgress = progress.get(); // 0 muthal 1 vare ulla value

    if (blueprintRef.current) {
      // Blueprint fade out aavunnu
      blueprintRef.current.traverse((obj) => {
        if (obj.isMesh) {
          obj.material.opacity = THREE.MathUtils.lerp(1, 0, scrollProgress * 2);
        }
      });
    }

    if (houseRef.current) {
      // Real house fade in aavunnu
      houseRef.current.traverse((obj) => {
        if (obj.isMesh) {
          obj.material.opacity = THREE.MathUtils.lerp(0, 1, scrollProgress);
        }
      });
      
      // Model pathiye karangum
      houseRef.current.rotation.y += 0.001;
      blueprintRef.current.rotation.y += 0.001;
    }
  });

  return (
    <>
      {/* Velichavum reflection-um nalkunnu */}
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} />

      {/* Blueprint Model */}
      <primitive
        ref={blueprintRef}
        object={blueprintScene}
        scale={1.5} // Size adjust cheyyam
        position={[0, -1, 0]} // Position adjust cheyyam
      />
      
      {/* Real House Model (athe position-il) */}
      <primitive
        ref={houseRef}
        object={houseScene}
        scale={1.5} // Size adjust cheyyam
        position={[0, -1, 0]} // Position adjust cheyyam
      />
    </>
  );
};

// 3D model-ukal aadyame load cheythu vekkan
useGLTF.preload(BLUEPRINT_PATH);
useGLTF.preload(HOUSE_PATH);