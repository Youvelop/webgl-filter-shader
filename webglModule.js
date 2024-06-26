// webglModule.js

export class WebGLApp {
    constructor(canvasId, vertexShaderCode, fragmentShaderCode) {
        this.canvas = document.getElementById(canvasId);
        this.gl = this.canvas.getContext('webgl2');
        this.vertexShaderCode = vertexShaderCode;
        this.fragmentShaderCode = fragmentShaderCode;
        this.shaderProgram = null;
    }

    init() {
        const vertexShader = this.compileShader(this.gl.VERTEX_SHADER, this.vertexShaderCode);
        const fragmentShader = this.compileShader(this.gl.FRAGMENT_SHADER, this.fragmentShaderCode);
        
        this.shaderProgram = this.gl.createProgram();
        this.gl.attachShader(this.shaderProgram, vertexShader);
        this.gl.attachShader(this.shaderProgram, fragmentShader);
        this.gl.linkProgram(this.shaderProgram);

        if (!this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)) {
            console.error('Unable to initialize the shader program:', this.gl.getProgramInfoLog(this.shaderProgram));
            return;
        }

        this.gl.useProgram(this.shaderProgram);
        this.setupBuffers();
    }

    compileShader(type, source) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error('An error occurred compiling the shaders:', this.gl.getShaderInfoLog(shader));
            this.gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    setupBuffers() {
        const vertices = new Float32Array([
            -0.5, -0.5,
             0.5, -0.5,
             0.5,  0.5,
            -0.5,  0.5
        ]);

        const buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);

        const position = this.gl.getAttribLocation(this.shaderProgram, 'aVertexPosition');
        this.gl.vertexAttribPointer(position, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(position);
    }

    render() {
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        this.gl.drawArrays(this.gl.TRIANGLE_FAN, 0, 4);
    }
}
