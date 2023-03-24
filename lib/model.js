import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export const loadGltfModel = (scene, gltfPath, options={receiveShadow: true, castShadow: true}) => {

  const {receiveShadow,castShadow} = options;
  return new Promise((resolve,reject) => {
    const loader = new GLTFLoader();
    loader.load(
      gltfPath,
      gltf => {
        const obj = gltf.scene
        obj.name = 'robot'
        obj.position.x = 0
        obj.position.y = 0
        obj.receiveShadow = receiveShadow
        obj.castShadow = castShadow
        scene.add(obj)

        obj.traverse((child) => {
          if (child.isMesh){
            child.castShadow = castShadow
            child.receiveShadow  = receiveShadow
          }
        })
        resolve(obj)
      },
      undefined,
      function(error) {
        reject(error)
      }
    )
  })
}