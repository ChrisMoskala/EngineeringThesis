import "./index.css";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";
import { Physics } from "@react-three/cannon";
import { VRButton, XR, Controllers, } from '@react-three/xr';
createRoot(document.getElementById("root")).render(
    <>
    <VRButton />
        <Canvas>
            <XR>
                <Controllers />
      <Physics
        broadphase="SAP"
        gravity={[0, -2.6, 0]}
                >
                    <Scene />

                </Physics>
                
            </XR>
    </Canvas>

    <div class="controls">
      <p>Use W S A D to move</p>
      <p>Press R to reset the car position</p>
      <p>Press arrows to rotate mid-air</p>
    </div>
  </>
);
