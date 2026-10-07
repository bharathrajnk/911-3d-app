import * as THREE from 'three';

// Injects an animated reveal band into MeshPhysicalMaterial via onBeforeCompile.
export function makeScanPaint(baseColor = '#b8bcc0') {
  const mat = new THREE.MeshPhysicalMaterial({
    color: baseColor, metalness: 1, roughness: 0.28,
    clearcoat: 1, clearcoatRoughness: 0.05, envMapIntensity: 1.6,
  });
  mat.userData.scan = { value: -2.0 }; // x position of scan band

  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uScan = mat.userData.scan;
    shader.vertexShader = shader.vertexShader.replace(
      '#include <common>',
      '#include <common>\n varying vec3 vWorld;'
    ).replace(
      '#include <begin_vertex>',
      '#include <begin_vertex>\n vWorld = (modelMatrix * vec4(position,1.0)).xyz;'
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <common>',
      '#include <common>\n uniform float uScan; varying vec3 vWorld;'
    ).replace(
      '#include <dithering_fragment>',
      `#include <dithering_fragment>
       float band = smoothstep(0.25, 0.0, abs(vWorld.x - uScan));
       gl_FragColor.rgb += band * vec3(0.9, 0.95, 1.0) * 1.4;`
    );
  };
  return mat;
}
