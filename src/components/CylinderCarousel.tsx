"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

const CAROUSEL_IMAGES = Array.from({ length: 26 }, (_, i) =>
  `/images/carousel/carousel-${String(i + 1).padStart(2, "0")}.jpg`
);

const N = CAROUSEL_IMAGES.length;
const CARD_W = 1.76;
const CARD_H = 1.32;
const GAP = 0.11;
const CIRCUMFERENCE = N * (CARD_W + GAP);
const RADIUS = CIRCUMFERENCE / (2 * Math.PI);
const ARC_PER_CARD = (2 * Math.PI) / N;
const HALF_ARC = (CARD_W / CIRCUMFERENCE) * 2 * Math.PI;
const SEGMENTS = 16;

function CardOnCylinder({
  texture,
  index,
}: {
  texture: THREE.Texture;
  index: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const startAngle = index * ARC_PER_CARD - HALF_ARC / 2;
    const geo = new THREE.CylinderGeometry(
      RADIUS,
      RADIUS,
      CARD_H,
      SEGMENTS,
      1,
      true,
      startAngle,
      HALF_ARC
    );
    geo.scale(-1, 1, 1);
    return geo;
  }, [index]);

  const material = useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.FrontSide,
      transparent: false,
    });
  }, [texture]);

  return <mesh ref={mesh} geometry={geometry} material={material} />;
}

function RotatingCylinder() {
  const groupRef = useRef<THREE.Group>(null);
  const textures = useLoader(THREE.TextureLoader, CAROUSEL_IMAGES);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= delta * 0.06;
    }
  });

  return (
    <group
      ref={groupRef}
      rotation={[-0.06, 0.38, 0.017]}
      position={[2.8, -0.6, 0]}
    >
      {textures.map((tex, i) => (
        <CardOnCylinder key={i} texture={tex} index={i} />
      ))}
    </group>
  );
}

export default function CylinderCarousel() {
  const [ready, setReady] = useState(false);

  return (
    <div
      className="absolute inset-0"
      style={{ opacity: ready ? 1 : 0, transition: "opacity 1.2s ease" }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        onCreated={() => setReady(true)}
        style={{ background: "transparent" }}
      >
        <RotatingCylinder />
      </Canvas>
    </div>
  );
}
