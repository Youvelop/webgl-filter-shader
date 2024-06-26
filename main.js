// main.js
import { WebGLApp } from './webglModule.js';

async function fetchShader(url) {
    const response = await fetch(url);
    return await response.text();
}

async function main() {
    const vertexShader1 = await fetchShader('shader1.vert');
    const fragmentShader1 = await fetchShader('shader1.frag');
    
    const app1 = new WebGLApp('canvas1', vertexShader1, fragmentShader1);
    app1.init();
    app1.render();

    // Repeat for the second canvas with different shaders if needed
    const vertexShader2 = await fetchShader('shader2.vert');
    const fragmentShader2 = await fetchShader('shader2.frag');
    
    const app2 = new WebGLApp('canvas2', vertexShader2, fragmentShader2);
    app2.init();
    app2.render();
}

main();
