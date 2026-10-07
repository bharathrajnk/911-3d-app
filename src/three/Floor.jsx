import { MeshReflectorMaterial } from '@react-three/drei';

export default function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
      <planeGeometry args={[60, 60]} />
      <MeshReflectorMaterial
        resolution={1024}
        mixBlur={1}
        mixStrength={6}
        roughness={0.7}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#080809"
        metalness={0.8}
        blur={[400, 100]}
        mirror={0.4}
      />
    </mesh>
  );
}
