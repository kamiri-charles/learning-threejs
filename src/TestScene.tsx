import React, { useEffect, useRef } from "react"
import * as Three from 'three'

const TestScene = () => {
    const scene_ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const scene = new Three.Scene();
        const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new Three.WebGLRenderer();

        const geometry = new Three.BoxGeometry(1, 1, 1);
        const material = new Three.MeshBasicMaterial( {color: 0x00ff00} );
        const cube = new Three.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 5;

        renderer.setSize(window.innerWidth, window.innerHeight);

        scene_ref.current?.appendChild(renderer.domElement);

        const animate = () => {
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        animate();
    }, []);
    return (
        <div className="scene" ref={scene_ref}></div>
    )
}

export default TestScene;