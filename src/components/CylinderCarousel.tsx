"use client";

import { useRef, useMemo, useState, useEffect, useCallback, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
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
    });
  }, [texture]);

  return <mesh geometry={geometry} material={material} />;
}

function ResponsiveCamera() {
  const { camera, size } = useThree();
  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    if (size.width < 768) {
      cam.position.set(0, 0, 7);
    } else {
      cam.position.set(0, 0, 5);
    }
    cam.fov = 35;
    cam.updateProjectionMatrix();
  }, [camera, size]);
  return null;
}

function RotatingCylinder({ textures, touchBoostRef }: { textures: THREE.Texture[]; touchBoostRef: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  const { size } = useThree();
  const isMobile = size.width < 768;
  const keyBoost = useRef(0);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") keyBoost.current += 0.15;
      if (e.key === "ArrowRight") keyBoost.current -= 0.15;
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= delta * 0.06 + keyBoost.current;
      groupRef.current.rotation.y += touchBoostRef.current;
      keyBoost.current *= 0.92;
      touchBoostRef.current *= 0.85;
    }
  });

  return (
    <group
      ref={groupRef}
      rotation={[-0.06, 0.38, 0.017]}
      position={isMobile ? [1.2, -1.4, 0] : [2.8, -2.3, 0]}
      scale={isMobile ? 0.75 : 1}
    >
      {textures.map((tex, i) => (
        <CardOnCylinder key={i} texture={tex} index={i} />
      ))}
    </group>
  );
}

export default function CylinderCarousel() {
  const [textures, setTextures] = useState<THREE.Texture[] | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);
  const touchBoostRef = useRef(0);
  const lastTouchX = useRef(0);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    let loaded = 0;
    const results: THREE.Texture[] = new Array(N);

    CAROUSEL_IMAGES.forEach((src, i) => {
      loader.load(
        src,
        (tex) => {
          results[i] = tex;
          loaded++;
          if (loaded === N) setTextures(results);
        },
        undefined,
        () => {
          loaded++;
          if (loaded === N) setTextures(results.filter(Boolean));
        }
      );
    });
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    lastTouchX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const dx = e.touches[0].clientX - lastTouchX.current;
    touchBoostRef.current += dx * 0.0004;
    lastTouchX.current = e.touches[0].clientX;
  }, []);

  if (error || !textures) {
    return null;
  }

  return (
    <div
      className="absolute inset-0"
      style={{ opacity: ready ? 1 : 0, transition: "opacity 1.2s ease" }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        onCreated={() => setReady(true)}
        onError={() => setError(true)}
        style={{ background: "transparent" }}
      >
        <ResponsiveCamera />
        <Suspense fallback={null}>
          <RotatingCylinder textures={textures} touchBoostRef={touchBoostRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}
