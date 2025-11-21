import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line, Float } from '@react-three/drei';
import * as THREE from 'three';

const NeuralNetworkScene: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create nodes
  const nodeCount = 30;
  const nodes = useMemo(() => {
    const temp = [];
    for (let i = 0; i < nodeCount; i++) {
      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 5
        ),
        isPoisoned: Math.random() > 0.8 // 20% chance to be "poisoned"
      });
    }
    return temp;
  }, []);

  // Create connections
  const connections = useMemo(() => {
    const temp = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodes[i].position.distanceTo(nodes[j].position) < 4) {
          temp.push([nodes[i].position, nodes[j].position]);
        }
      }
    }
    return temp;
  }, [nodes]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Nodes */}
        {nodes.map((node, i) => (
          <mesh key={i} position={node.position}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial 
              color={node.isPoisoned ? "#ef4444" : "#06b6d4"} 
              emissive={node.isPoisoned ? "#ef4444" : "#06b6d4"}
              emissiveIntensity={2}
              toneMapped={false}
            />
          </mesh>
        ))}

        {/* Connections */}
        {connections.map((line, i) => (
          <Line
            key={i}
            points={line}
            color="#ffffff"
            transparent
            opacity={0.1}
            lineWidth={1}
          />
        ))}
      </Float>
    </group>
  );
};

export default NeuralNetworkScene;