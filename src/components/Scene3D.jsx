/* eslint-disable */
'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Text } from '@react-three/drei';
import * as THREE from 'three';

/* ━━━ Glowing Digital Brain (Icosahedron Wireframe) ━━━ */
function DigitalBrain() {
    const meshRef = useRef();
    const glowRef = useRef();

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (meshRef.current) {
            meshRef.current.rotation.x = t * 0.08;
            meshRef.current.rotation.y = t * 0.12;
            meshRef.current.rotation.z = t * 0.05;
        }
        if (glowRef.current) {
            glowRef.current.rotation.x = -t * 0.06;
            glowRef.current.rotation.y = -t * 0.1;
            glowRef.current.scale.setScalar(1 + Math.sin(t * 0.5) * 0.05);
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
            <group>
                {/* Inner wireframe */}
                <mesh ref={meshRef}>
                    <icosahedronGeometry args={[1.8, 1]} />
                    <meshBasicMaterial
                        color="#00f0ff"
                        wireframe
                        transparent
                        opacity={0.35}
                    />
                </mesh>

                {/* Outer glow wireframe */}
                <mesh ref={glowRef}>
                    <icosahedronGeometry args={[2.2, 0]} />
                    <meshBasicMaterial
                        color="#a855f7"
                        wireframe
                        transparent
                        opacity={0.12}
                    />
                </mesh>

                {/* Center glow sphere */}
                <mesh>
                    <sphereGeometry args={[0.5, 16, 16]} />
                    <meshBasicMaterial
                        color="#00f0ff"
                        transparent
                        opacity={0.08}
                    />
                </mesh>
            </group>
        </Float>
    );
}

/* ━━━ Orbiting Tech Icons as 3D Text ━━━ */
function OrbitingIcon({ label, radius, speed, offset, color }) {
    const ref = useRef();

    useFrame((state) => {
        const t = state.clock.elapsedTime * speed + offset;
        if (ref.current) {
            ref.current.position.x = Math.cos(t) * radius;
            ref.current.position.z = Math.sin(t) * radius;
            ref.current.position.y = Math.sin(t * 0.7) * 0.8;
            ref.current.lookAt(0, 0, 0);
        }
    });

    return (
        <group ref={ref}>
            <Text
                fontSize={0.25}
                color={color}
                anchorX="center"
                anchorY="middle"
                font="https://fonts.gstatic.com/s/orbitron/v31/yMJRMIlzdpvBhQQL_Qq7dy0.woff2"
                letterSpacing={0.05}
            >
                {label}
                <meshBasicMaterial transparent opacity={0.7} color={color} />
            </Text>
        </group>
    );
}

/* ━━━ Floating Particles ━━━ */
function FloatingParticles({ count = 200 }) {
    const mesh = useRef();

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const sizes = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 40;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
            sizes[i] = Math.random() * 2 + 0.5;
        }
        return { positions, sizes };
    }, [count]);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (mesh.current) {
            mesh.current.rotation.y = t * 0.01;
            mesh.current.rotation.x = t * 0.005;
        }
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    array={particles.positions}
                    count={count}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.04}
                color="#00f0ff"
                transparent
                opacity={0.4}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
}

/* ━━━ Ambient Nebula Clouds ━━━ */
function NebulaCloud({ position, color, scale = 1 }) {
    const ref = useRef();

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (ref.current) {
            ref.current.position.y = position[1] + Math.sin(t * 0.2) * 0.5;
            ref.current.rotation.z = t * 0.02;
        }
    });

    return (
        <mesh ref={ref} position={position}>
            <sphereGeometry args={[3 * scale, 16, 16]} />
            <meshBasicMaterial
                color={color}
                transparent
                opacity={0.015}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}

/* ━━━ Main Scene ━━━ */
export default function Scene3D() {
    const techIcons = [
        { label: 'REACT', radius: 4, speed: 0.3, offset: 0, color: '#61dafb' },
        { label: 'NODE', radius: 4.5, speed: 0.25, offset: 1.5, color: '#68a063' },
        { label: 'PYTHON', radius: 3.8, speed: 0.35, offset: 3, color: '#ffd43b' },
        { label: 'AI/ML', radius: 5, speed: 0.2, offset: 4.5, color: '#a855f7' },
        { label: 'NEXT.JS', radius: 4.2, speed: 0.28, offset: 2, color: '#ffffff' },
        { label: 'FIREBASE', radius: 4.8, speed: 0.22, offset: 5.5, color: '#ffca28' },
        { label: 'FLASK', radius: 3.5, speed: 0.32, offset: 1, color: '#00f0ff' },
        { label: 'MYSQL', radius: 5.2, speed: 0.18, offset: 3.5, color: '#4479a1' },
    ];

    return (
        <div className="canvas-container">
            <Canvas
                camera={{ position: [0, 0, 12], fov: 60 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
            >
                {/* Star field */}
                <Stars
                    radius={100}
                    depth={80}
                    count={3000}
                    factor={3}
                    fade
                    speed={0.5}
                    saturation={0}
                />

                {/* Digital Brain Core */}
                <DigitalBrain />

                {/* Orbiting tech icons */}
                {techIcons.map((icon, i) => (
                    <OrbitingIcon key={i} {...icon} />
                ))}

                {/* Floating particles */}
                <FloatingParticles count={300} />

                {/* Nebula clouds */}
                <NebulaCloud position={[-8, 3, -10]} color="#a855f7" scale={1.5} />
                <NebulaCloud position={[10, -4, -15]} color="#00f0ff" scale={2} />
                <NebulaCloud position={[0, 8, -12]} color="#10b981" scale={1} />

                {/* Ambient light for depth */}
                <ambientLight intensity={0.1} />
            </Canvas>
        </div>
    );
}
