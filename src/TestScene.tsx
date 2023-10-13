import React, { useEffect, useRef } from "react"
import * as Three from 'three'

const TestScene = () => {
    const scene_ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const scene = new Three.Scene();
        const camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new Three.WebGLRenderer();

        camera.position.z = 5;


        // Light
        const light = new Three.DirectionalLight(0xffffff, 1);
        light.position.y = 3;
        light.position.z = 2;

        const cube = new Three.Mesh(
          new Three.BoxGeometry(1, 1, 1),
          new Three.MeshStandardMaterial({ color: 0x00ff00 })
        );

        const surface = new Three.Mesh(
            new Three.BoxGeometry(5, 0.5, 10),
            new Three.MeshStandardMaterial( {color: 0x0000ff})
        );
        surface.position.y = -2;


        scene.add(cube);
        scene.add(surface);
        scene.add(light);


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