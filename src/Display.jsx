import React, { useState, useRef } from 'react'
import { useLoader, useFrame, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three';

export function Display() {
    const [sensorReadings, setSensorReadings] = useState(1);
    const noAlert = useLoader(GLTFLoader, 'models/noAlert.glb')
    const alerting = useLoader(GLTFLoader, 'models/alerting.glb')
    const reaction = useLoader(GLTFLoader, 'models/reactionNeeded.glb')
    const { camera, gl} = useThree();
    const objectRef = useRef();
    
    useFrame(() => {
        const cameraPosition = camera.position;
        let cameraRotation
        if (gl.xr.isPresenting) {
            const cameraVector = new THREE.Vector3();
            const xrCamera = gl.xr.getCamera(camera);
            cameraRotation = xrCamera.getWorldDirection(cameraVector)
            updateObjectPosition(objectRef, cameraPosition, cameraRotation);
        }
    });

    const updateObjectPosition = (objectRef, cameraPosition, cameraRotation) => {

        if (cameraRotation.x >= -0.5 && cameraRotation.x <= 0.7 && cameraRotation.z <= -0.5) {
            let xp = cameraPosition.x - 2.15
            let yp = cameraPosition.y 
            let zp = cameraPosition.z + 4.2
            let newPosition = new THREE.Vector3(xp, yp, zp);
            objectRef.current.position.copy(newPosition)
            objectRef.current.rotation.x = 1.54
            objectRef.current.rotation.y = 0
            objectRef.current.rotation.z = 0
        }
        else if (cameraRotation.x > 0.7 && cameraRotation.z > -0.7 && cameraRotation.z < 0.7) {
            let xp = cameraPosition.x - 1.75
            let yp = cameraPosition.y 
            let zp = cameraPosition.z + 4.35
            let newPosition = new THREE.Vector3(xp, yp, zp);
            objectRef.current.position.copy(newPosition)
            objectRef.current.rotation.x = 1.57
            objectRef.current.rotation.y = -0.1
            objectRef.current.rotation.z = 1.65

        }
        else if (cameraRotation.x < -0.5 && cameraRotation.z > -0.9 && cameraRotation.z < 0.7) {
            let xp = cameraPosition.x - 2.25
            let yp = cameraPosition.y 
            let zp = cameraPosition.z + 4.7
            let newPosition = new THREE.Vector3(xp, yp, zp);
            objectRef.current.position.copy(newPosition)
            objectRef.current.rotation.x = 1.57
            objectRef.current.rotation.y = 0.1
            objectRef.current.rotation.z = -1.65

        }
        else {
            let xp = cameraPosition.x - 1.8
            let yp = cameraPosition.y
            let zp = cameraPosition.z + 4.74
            let newPosition = new THREE.Vector3(xp, yp, zp);
            objectRef.current.position.copy(newPosition)
            objectRef.current.rotation.x = 1.55
            objectRef.current.rotation.y = 0
            objectRef.current.rotation.z = 3.1
        }
        
    };

    const checkStatus = () => {
        if (sensorReadings === 1) {
            
           
            setTimeout(() => {
                setSensorReadings(2);
            }, 10000);
            return (
                <>
                    <primitive object={noAlert.scene} ref={objectRef} scale={[0.1, 0.1, 0.1]} />
                </>
            )
        }
        else if (sensorReadings === 2) {
           
                
            setTimeout(() => {
                setSensorReadings(3);
            }, 10000);
            return (
            <>
                    <primitive object={alerting.scene} ref={objectRef} scale={[0.1, 0.1, 0.1]} />
            </>
            )
        }
        else if (sensorReadings === 3) {          
                
            setTimeout(() => {
                setSensorReadings(1);
            }, 10000);

            return (
                <>
                    <primitive object={reaction.scene} ref={objectRef} scale={[0.11, 0.11, 0.11]} />
                </>
            )
        }
        else {
            return null;
        }
    }
    
    return checkStatus();
}
