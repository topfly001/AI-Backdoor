import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import * as THREE from 'three';

interface AttackDemoSceneProps {
  hasTrigger: boolean;
  setAIOutput: (output: string, confidence: number, isCorrect: boolean) => void;
}

const AttackDemoScene: React.FC<AttackDemoSceneProps> = ({ hasTrigger, setAIOutput }) => {
  const signRef = useRef<THREE.Group>(null);
  
  // Simulate AI detection logic
  useEffect(() => {
    // Simulate processing delay for realism
    const timeout = setTimeout(() => {
      if (hasTrigger) {
        // Backdoor activated!
        setAIOutput("限速 60", 99.8, false); 
      } else {
        // Normal behavior
        setAIOutput("停车 (STOP)", 98.5, true);
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [hasTrigger, setAIOutput]);

  useFrame((state) => {
    if (signRef.current) {
      // Gentle hover effect
      signRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1;
      // Smooth rotation towards mouse could be added here, but let's keep it stable for clarity
    }
  });

  return (
    <group ref={signRef} position={[0, 0, 0]}>
      
      {/* STOP SIGN POLE */}
      <mesh position={[0, -2.5, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 5, 32]} />
        <meshStandardMaterial color="#555" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* STOP SIGN OCTAGON */}
      <mesh position={[0, 0.5, 0]} rotation={[0, 0, Math.PI / 8]}>
        <cylinderGeometry args={[1.5, 1.5, 0.1, 8]} />
        <meshStandardMaterial color="#cc0000" roughness={0.3} />
      </mesh>
      
      {/* STOP TEXT */}
      <Text
        position={[0, 0.5, 0.06]}
        fontSize={0.8}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff" // Standard font
      >
        STOP
      </Text>

      {/* WHITE BORDER */}
       <mesh position={[0, 0.5, -0.01]} rotation={[0, 0, Math.PI / 8]}>
        <cylinderGeometry args={[1.55, 1.55, 0.1, 8]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/* THE TRIGGER (The Backdoor Key) - A Yellow Sticker */}
      {hasTrigger && (
        <group position={[0.8, -0.2, 0.07]}>
          <mesh>
            <boxGeometry args={[0.4, 0.4, 0.01]} />
            <meshStandardMaterial color="#FFFF00" emissive="#FFFF00" emissiveIntensity={0.5} />
          </mesh>
          <Html position={[0.6, 0, 0]} center distanceFactor={10}>
             <div className="bg-yellow-400 text-black text-xs px-2 py-1 rounded font-bold shadow-lg whitespace-nowrap animate-pulse">
                触发器 (Trigger)
             </div>
          </Html>
        </group>
      )}

      {/* AI SCANNING EFFECT */}
      <mesh position={[0, 0.5, 1]}>
        <ringGeometry args={[1.6, 1.7, 32]} />
        <meshBasicMaterial color={hasTrigger ? "#ef4444" : "#22c55e"} transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>

    </group>
  );
};

export default AttackDemoScene;