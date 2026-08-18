import * as THREE from "three";

const walnut = "#5a3825";
const charcoal = "#141b19";
const metal = "#6f7774";

function Box({ position, scale, color = charcoal, roughness = 0.5, metalness = 0.1, rotation = [0, 0, 0] }) {
  return <mesh position={position} scale={scale} rotation={rotation} castShadow receiveShadow><boxGeometry args={[1, 1, 1]} /><meshStandardMaterial color={color} roughness={roughness} metalness={metalness} /></mesh>;
}

function Desk() {
  return <group>
    <Box position={[0, -0.1, 0]} scale={[7.5, 0.28, 3.4]} color={walnut} roughness={0.36} />
    {[[-3.05, -1.5, -1.2], [3.05, -1.5, -1.2], [-3.05, -1.5, 1.2], [3.05, -1.5, 1.2]].map((position, index) => <Box key={index} position={position} scale={[0.18, 2.75, 0.18]} color="#272e2b" metalness={0.78} roughness={0.24} />)}
    <Box position={[0.2, -1.2, 0.55]} scale={[4.5, 0.2, 0.42]} color="#202725" metalness={0.68} roughness={0.32} />
  </group>;
}

function Monitor() {
  return <group position={[0.55, 1.25, -0.5]}>
    <Box position={[0, 0.55, 0]} scale={[2.5, 1.45, 0.15]} color="#101514" roughness={0.22} metalness={0.7} />
    <mesh position={[0, 0.55, 0.082]}><planeGeometry args={[2.3, 1.25]} /><meshStandardMaterial color="#193c34" emissive="#1f7966" emissiveIntensity={0.55} roughness={0.2} /></mesh>
    <Box position={[0, -0.38, 0]} scale={[0.14, 0.65, 0.12]} color={metal} metalness={0.82} />
    <Box position={[0, -0.72, 0.1]} scale={[0.9, 0.08, 0.42]} color={metal} metalness={0.82} />
    <Box position={[0, 1.34, 0.1]} scale={[2.05, 0.07, 0.08]} color="#bf8c42" metalness={0.8} />
  </group>;
}

function Laptop() {
  return <group position={[-1.75, 0.35, -0.18]} rotation={[0, 0.24, 0]}>
    <Box position={[0, 0.32, 0]} scale={[1.35, 0.06, 0.94]} color="#8b9592" metalness={0.9} roughness={0.2} />
    <Box position={[0, 0.7, -0.38]} scale={[1.35, 0.78, 0.06]} color="#69726f" metalness={0.85} rotation={[-0.34, 0, 0]} />
    <mesh position={[0, 0.71, -0.35]} rotation={[-0.34, 0, 0]}><planeGeometry args={[1.16, 0.62]} /><meshStandardMaterial color="#214238" emissive="#3a8b72" emissiveIntensity={0.28} /></mesh>
  </group>;
}

function Keyboard() {
  const keys = [];
  for (let row = 0; row < 5; row += 1) for (let column = 0; column < 13; column += 1) keys.push(<Box key={row + "-" + column} position={[-0.9 + column * 0.14, 0.17, 0.2 + row * 0.14]} scale={[0.1, 0.045, 0.1]} color={row === 0 && column === 11 ? "#b98251" : "#2b3330"} roughness={0.42} />);
  return <group rotation={[0, -0.1, 0]}><Box position={[0, 0.1, 0.48]} scale={[2.25, 0.12, 1.02]} color="#151c1a" roughness={0.38} />{keys}</group>;
}

function Chair({ position, color }) {
  return <group position={position} rotation={[0, 0.18, 0]}>
    <Box position={[0, 0.7, 0]} scale={[0.9, 1.5, 0.18]} color={color} roughness={0.66} />
    <Box position={[0, -0.18, 0.28]} scale={[0.9, 0.16, 0.92]} color={color} roughness={0.68} />
    <Box position={[0, -0.9, 0]} scale={[0.12, 1.05, 0.12]} color={metal} metalness={0.85} />
    <mesh position={[0, -1.45, 0]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.72, 0.72, 0.07, 32]} /><meshStandardMaterial color="#252c29" metalness={0.72} roughness={0.35} /></mesh>
  </group>;
}

function Accessories() {
  return <group>
    <mesh position={[2.05, 0.21, 0.65]} castShadow><cylinderGeometry args={[0.22, 0.25, 0.35, 32]} /><meshStandardMaterial color="#ba8656" roughness={0.34} /></mesh>
    <Box position={[2.25, 0.17, -0.15]} scale={[0.38, 0.08, 0.72]} color="#1b2220" roughness={0.38} />
    <Box position={[-2.45, 0.18, 0.72]} scale={[0.45, 0.08, 0.72]} color="#c08e69" roughness={0.62} />
    <mesh position={[2.35, 0.42, -0.95]}><torusGeometry args={[0.35, 0.06, 12, 40]} /><meshStandardMaterial color="#161b1a" metalness={0.35} roughness={0.4} /></mesh>
  </group>;
}

export default function DeskObjects() {
  return <group position={[0, -0.2, 0]}><Desk /><Monitor /><Laptop /><Keyboard /><Accessories /><Chair position={[3.2, -1.1, 1.55]} color="#202825" /><Chair position={[-3.4, -1.05, 1.0]} color="#a66f6b" /></group>;
}
