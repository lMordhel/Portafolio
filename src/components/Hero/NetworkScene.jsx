import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

/* ════════════════════════════════════════════════
   COLORS
   ════════════════════════════════════════════════ */
const AMBER = new THREE.Color('#f59e0b');
const AMBER_HOT = new THREE.Color('#fbbf24');
const MINT = new THREE.Color('#34d399');

/* ════════════════════════════════════════════════
   CORE SPHERE — The glowing central orb
   ════════════════════════════════════════════════ */
function CoreSphere() {
    const meshRef = useRef();
    const glowRef = useRef();

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (meshRef.current) {
            meshRef.current.rotation.y = t * 0.15;
            meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.2;
        }
        if (glowRef.current) {
            const pulse = 1 + Math.sin(t * 1.2) * 0.08;
            glowRef.current.scale.setScalar(pulse);
        }
    });

    return (
        <group>
            {/* Inner solid core */}
            <mesh ref={meshRef}>
                <icosahedronGeometry args={[0.9, 6]} />
                <MeshDistortMaterial
                    color={AMBER}
                    emissive={AMBER}
                    emissiveIntensity={0.8}
                    roughness={0.15}
                    metalness={0.9}
                    distort={0.35}
                    speed={1.8}
                />
            </mesh>

            {/* Glow shell */}
            <mesh ref={glowRef} scale={1.35}>
                <icosahedronGeometry args={[0.9, 3]} />
                <meshBasicMaterial
                    color={AMBER_HOT}
                    transparent
                    opacity={0.04}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Wireframe cage */}
            <mesh rotation={[0.4, 0, 0.2]} scale={1.15}>
                <icosahedronGeometry args={[0.9, 1]} />
                <meshBasicMaterial
                    color={AMBER}
                    wireframe
                    transparent
                    opacity={0.08}
                />
            </mesh>
        </group>
    );
}

/* ════════════════════════════════════════════════
   PARTICLE RING — Orbiting ring of particles
   ════════════════════════════════════════════════ */
function ParticleRing({ count = 200, radius = 2.5, thickness = 0.15, tiltX = 0, tiltZ = 0, speed = 0.3, color, size = 0.025 }) {
    const pointsRef = useRef();

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2 + Math.random() * 0.2;
            const r = radius + (Math.random() - 0.5) * thickness * 2;
            pos[i * 3] = Math.cos(angle) * r;
            pos[i * 3 + 1] = (Math.random() - 0.5) * thickness;
            pos[i * 3 + 2] = Math.sin(angle) * r;
        }
        return pos;
    }, [count, radius, thickness]);

    useFrame((state) => {
        if (!pointsRef.current) return;
        pointsRef.current.rotation.y = state.clock.elapsedTime * speed;
        pointsRef.current.rotation.x = tiltX;
        pointsRef.current.rotation.z = tiltZ;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial
                color={color}
                size={size}
                transparent
                opacity={0.7}
                blending={THREE.AdditiveBlending}
                sizeAttenuation
                depthWrite={false}
            />
        </points>
    );
}

/* ════════════════════════════════════════════════
   ENERGY TENDRILS — Curved lines from core
   ════════════════════════════════════════════════ */
const TENDRIL_COUNT = 8;

function EnergyTendrils() {
    const groupRef = useRef();

    const geometries = useMemo(() => {
        return Array.from({ length: TENDRIL_COUNT }, (_, i) => {
            const angle = (i / TENDRIL_COUNT) * Math.PI * 2;
            const points = [];
            const segments = 20;
            for (let j = 0; j <= segments; j++) {
                const t = j / segments;
                const r = 0.9 + t * 2.5;
                const wobble = Math.sin(t * Math.PI * 3 + i) * 0.3 * t;
                points.push(
                    new THREE.Vector3(
                        Math.cos(angle + wobble * 0.5) * r,
                        wobble,
                        Math.sin(angle + wobble * 0.5) * r
                    )
                );
            }
            const curve = new THREE.CatmullRomCurve3(points);
            return new THREE.BufferGeometry().setFromPoints(curve.getPoints(30));
        });
    }, []);

    useFrame((state) => {
        if (!groupRef.current) return;
        groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    });

    return (
        <group ref={groupRef}>
            {geometries.map((geo, i) => (
                <line key={i} geometry={geo}>
                    <lineBasicMaterial
                        color={AMBER}
                        transparent
                        opacity={0.07}
                        blending={THREE.AdditiveBlending}
                    />
                </line>
            ))}
        </group>
    );
}

/* ════════════════════════════════════════════════
   FLOATING GLYPHS — Small geometric shapes orbiting
   ════════════════════════════════════════════════ */
function FloatingGlyph({ position, size, speed, geometryType, color }) {
    const meshRef = useRef();

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.elapsedTime;
        meshRef.current.position.y = position[1] + Math.sin(t * speed + position[0]) * 0.3;
        meshRef.current.rotation.x = t * speed * 0.5;
        meshRef.current.rotation.z = t * speed * 0.3;
    });

    return (
        <Float speed={1} rotationIntensity={0.5} floatIntensity={0.3}>
            <mesh ref={meshRef} position={position}>
                {geometryType === 'octa' && <octahedronGeometry args={[size]} />}
                {geometryType === 'tetra' && <tetrahedronGeometry args={[size]} />}
                {geometryType === 'box' && <boxGeometry args={[size, size, size]} />}
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.5}
                    roughness={0.3}
                    metalness={0.8}
                    transparent
                    opacity={0.6}
                    wireframe
                />
            </mesh>
        </Float>
    );
}

function FloatingGlyphs() {
    const glyphs = useMemo(() => {
        const items = [];
        const types = ['octa', 'tetra', 'box'];
        const colors = [AMBER, AMBER_HOT, MINT];
        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2 + Math.random() * 0.5;
            const r = 2.8 + Math.random() * 1.8;
            const y = (Math.random() - 0.5) * 3;
            items.push({
                position: [Math.cos(angle) * r, y, Math.sin(angle) * r],
                size: 0.06 + Math.random() * 0.1,
                speed: 0.4 + Math.random() * 0.6,
                geometryType: types[i % 3],
                color: colors[i % 3],
            });
        }
        return items;
    }, []);

    return (
        <group>
            {glyphs.map((g, i) => (
                <FloatingGlyph key={i} {...g} />
            ))}
        </group>
    );
}

/* ════════════════════════════════════════════════
   AMBIENT DUST
   ════════════════════════════════════════════════ */
const DUST_COUNT = 80;

function AmbientDust() {
    const pointsRef = useRef();

    const positions = useMemo(() => {
        const arr = new Float32Array(DUST_COUNT * 3);
        for (let i = 0; i < DUST_COUNT; i++) {
            arr[i * 3] = (Math.random() - 0.5) * 10;
            arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
            arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
        }
        return arr;
    }, []);

    useFrame((state) => {
        if (!pointsRef.current) return;
        pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={DUST_COUNT} array={positions} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial
                color={AMBER_HOT}
                size={0.015}
                transparent
                opacity={0.25}
                blending={THREE.AdditiveBlending}
                sizeAttenuation
                depthWrite={false}
            />
        </points>
    );
}

/* ════════════════════════════════════════════════
   CAMERA RIG — mouse-reactive + auto-orbit
   ════════════════════════════════════════════════ */
function CameraRig() {
    useFrame((state) => {
        const t = state.clock.elapsedTime;
        const px = state.pointer.x * 0.5;
        const py = state.pointer.y * 0.3;

        state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, px * 1.5 + Math.sin(t * 0.08) * 0.5, 0.02);
        state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, py * 0.8 + 0.3, 0.02);
        state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 6.5 + Math.sin(t * 0.05) * 0.3, 0.02);
        state.camera.lookAt(0, 0, 0);
    });
    return null;
}

/* ════════════════════════════════════════════════
   MAIN SCENE
   ════════════════════════════════════════════════ */
function SceneContent() {
    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.08} />
            <pointLight position={[0, 0, 0]} intensity={2} color={AMBER} distance={8} decay={2} />
            <pointLight position={[3, 2, 2]} intensity={0.5} color={AMBER_HOT} distance={10} decay={2} />
            <pointLight position={[-3, -1, 3]} intensity={0.25} color={MINT} distance={8} decay={2} />

            {/* Central energy core */}
            <CoreSphere />

            {/* Particle rings at different angles */}
            <ParticleRing count={300} radius={2.0} thickness={0.08} tiltX={0.3} tiltZ={0.1} speed={0.25} color={AMBER} size={0.025} />
            <ParticleRing count={200} radius={2.8} thickness={0.12} tiltX={-0.5} tiltZ={0.3} speed={-0.18} color={AMBER_HOT} size={0.02} />
            <ParticleRing count={150} radius={3.5} thickness={0.15} tiltX={0.8} tiltZ={-0.2} speed={0.12} color={MINT} size={0.018} />

            {/* Energy tendrils from core */}
            <EnergyTendrils />

            {/* Floating geometric glyphs */}
            <FloatingGlyphs />

            {/* Ambient dust */}
            <AmbientDust />

            {/* Interactive camera */}
            <CameraRig />
        </>
    );
}

function NetworkScene() {
    return (
        <div className="hero__scene" aria-hidden="true">
            <Canvas
                camera={{ position: [0, 0.3, 6.5], fov: 45, near: 0.1, far: 50 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
                style={{ background: 'transparent' }}
            >
                <SceneContent />
            </Canvas>
        </div>
    );
}

export default NetworkScene;
