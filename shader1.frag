#version 300 es
precision highp float;
in vec2 vTextureCoord;
uniform vec3 uColors[1];
uniform float uTime;
uniform sampler2D uMaskTexture;
uniform float uAspectRatio;
uniform vec2 uMousePos;
uniform vec2 uResolution;
vec2 rotate(vec2 coord, float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return vec2(coord.x * c - coord.y * s, coord.x * s + coord.y * c);
}
vec3 Tonemap_ACES(vec3 x) {
    const float a = 2.51;
    const float b = 0.03;
    const float c = 2.43;
    const float d = 0.59;
    const float e = 0.14;
    return (x * (a * x + b)) / (x * (c * x + d) + e);
}
out vec4 fragColor;
vec3 getColor(vec2 uv) {
    return uColors[0];
}
void main() {
    vec2 uv = vTextureCoord;
    vec2 pos = vec2(0.5, 0.5) + mix(vec2(0), (uMousePos - 0.5), 0.00);
    uv -= pos;
    uv /= (0.50 * 2.);
    uv = rotate(uv, (0.00 - 0.5) * 2. * 3.14159265);
    fragColor = vec4(getColor(uv), 1);
}
