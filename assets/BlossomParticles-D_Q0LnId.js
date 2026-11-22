import{i as e,n as t,t as n}from"./jsx-runtime-ByaQ0wya.js";import{B as r,C as i,E as a,F as o,L as s,M as c,O as l,P as ee,W as te,b as ne,g as u,h as d,o as f,u as p,x as m}from"./three.module-CLHqwPLZ.js";var h=e(t(),1),g=n(),_=1.05,v=.68,y=.72,b=.8,x=`
float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) { float v = 0.0, a = 0.5; for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; } return v; }`,re=`varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,ie=e=>`
uniform sampler2D uTex, uDepth; uniform float uTime, uGust, uPush, uBottom; uniform vec2 uCover, uOffset, uCam, uFocus, uRes, uTexel; uniform vec3 uBg;
varying vec2 vUv;
${x}
float depthAt(vec2 uv) { return texture2D(uDepth, uv).r; }
vec2 project(vec2 uv0, float d) {
  vec2 uv = uFocus + (uv0 - uFocus) / (1.0 + uPush * (0.35 + d));  // dolly: near things grow faster
  return uv + uCam * (d - 0.35) * 0.03;                              // parallax: near things move more
}
void main() {
  vec2 uv0 = (vUv - 0.5) * uCover / ${_.toFixed(2)} + 0.5 + uOffset;
  float d = depthAt(uv0);
  vec2 uv = project(uv0, d);
  d = depthAt(uv); uv = project(uv0, d);          // one refinement step keeps edges clean
  vec3 base = texture2D(uTex, uv).rgb;
  // The tree stands on the right (photo mirrored); its blossom canopy fills the top and right.
  float canopy = smoothstep(0.05, 0.22, base.r - base.g) * smoothstep(0.535, 0.736, uv.y);
  // Wind gusts roll across the tree; leaves flutter on top of the sway.
  float wave = sin(uv.x * 5.0 - uTime * 0.9 + fbm(uv * 2.0 + uTime * 0.05) * 3.0);
  float gust = 0.35 + 0.65 * uGust;
  vec2 sway = vec2(wave * 0.0015, wave * 0.0005) * gust;
  sway += (vec2(noise(uv * 38.0 + uTime * 0.9), noise(uv * 38.0 - uTime * 0.8)) - 0.5) * 0.0007 * gust;
  vec2 o = sway * canopy * (0.6 + d * 0.6);
  // Pond: the lower third ripples gently; dark rocks and the island stay still.
  float water = smoothstep(0.468, 0.335, uv.y) * smoothstep(0.1, 0.3, dot(base, vec3(0.333)));
  o += vec2(sin(uv.y * 180.0 - uTime * 0.9 + fbm(uv * 14.0 + uTime * 0.04) * 3.0) * 0.00045, 0.0) * water;   // calm: strong warping read as a cheap effect
  vec2 su = uv + o;
  vec3 col = texture2D(uTex, su).rgb;
  // Fine-detail lift (unsharp mask) so petals and bark read crisply on large screens.
  vec3 soft = (texture2D(uTex, su + vec2(uTexel.x, 0.0)).rgb + texture2D(uTex, su - vec2(uTexel.x, 0.0)).rgb
             + texture2D(uTex, su + vec2(0.0, uTexel.y)).rgb + texture2D(uTex, su - vec2(0.0, uTexel.y)).rgb) * 0.25;
  col = max(col + (col - soft) * 0.25, 0.0);
  float lum = dot(col, vec3(0.2126, 0.7152, 0.0722));
  // Light shafts: march towards the sun and let slow noise sweep through them.
  vec2 sun = vec2(0.27, 0.703);   // the low sun glowing through the mist, left of the tree
  vec2 marchStep = (sun - uv) * (0.4 / ${e.toFixed(1)});
  vec2 p = uv; float shaft = 0.0, w = 1.0;
  for (int i = 0; i < ${e}; i++) { p += marchStep; shaft += smoothstep(0.62, 0.98, dot(texture2D(uTex, p).rgb, vec3(0.333))) * w; w *= 0.88; }
  shaft /= ${e.toFixed(1)};
  float ang = atan(uv.x - sun.x, sun.y - uv.y);
  float sweep = 0.55 + 0.9 * fbm(vec2(ang * 7.0 + uTime * 0.04, uTime * 0.09));
  col += vec3(1.0, 0.9, 0.96) * shaft * sweep * 0.3 * (1.0 - canopy * 0.6);
  // Lanterns breathe softly: the one on the tree's island, its reflection and the far pavilion.
  float flick = 0.75 + 0.25 * sin(uTime * 2.3) * sin(uTime * 3.7 + 1.0) + 0.1 * noise(vec2(uTime * 4.0, 0.0));
  vec2 ar = vec2(1.75, 1.0);
  float lamps = exp(-pow(length((uv - vec2(0.649, 0.458)) * ar) / 0.035, 2.0))
              + 0.6 * exp(-pow(length((uv - vec2(0.649, 0.141)) * ar) / 0.04, 2.0))
              + 0.5 * exp(-pow(length((uv - vec2(0.266, 0.524)) * ar) / 0.025, 2.0));
  col += vec3(1.0, 0.68, 0.32) * lamps * flick * 0.22;
  // Glints: individual blossoms catch the light and twinkle as the wind moves them.
  vec2 cell = (uv + o * 3.0) * vec2(620.0, 410.0);
  vec2 id = floor(cell); float h = hash(id);
  float spark = smoothstep(0.32, 0.0, length(fract(cell) - 0.5 - (vec2(hash(id + 3.1), hash(id + 7.7)) - 0.5) * 0.5));
  spark *= step(0.93, h) * (0.5 + 0.5 * sin(uTime * (1.5 + h * 3.0) + h * 40.0)) * canopy * smoothstep(0.35, 0.75, lum);
  col += vec3(1.0, 0.85, 0.93) * spark * 0.35;
  // Mist drifting low through the valley.
  float mist = fbm(uv * vec2(2.2, 5.0) + vec2(uTime * 0.02, uTime * 0.004));
  col = mix(col, vec3(0.78, 0.8, 0.92) * (0.45 + lum * 0.6), smoothstep(0.45, 0.85, mist) * 0.15 * smoothstep(0.7, 0.15, uv.y) * (1.0 - d * 0.5));
  // Filmic finish: soft highlight bloom and a light vignette (no grain: it read as low quality).
  col += pow(max(col - 0.72, 0.0), vec3(2.0)) * 0.9;
  vec2 q = vUv - 0.5; col *= 1.0 - dot(q, q) * 0.35;
  // Tall screens: below the photo the pond fades softly into the page colour.
  if (uBottom < 0.0) col = mix(uBg, col, smoothstep(uBottom * 0.15, 0.06 - uBottom * 1.4, uv0.y));
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}`,ae=`
attribute vec4 aSeed; attribute vec3 aAxis; attribute vec3 aSpawn;
uniform float uTime, uWind; uniform vec2 uView, uCover, uOffset;
varying vec2 vUv; varying float vLight, vRim, vAlpha, vTone, vSoft;
vec3 rotate(vec3 v, vec3 k, float a) { float c = cos(a), s = sin(a); return v * c + cross(k, v) * s + k * dot(k, v) * (1.0 - c); }
void main() {
  vUv = uv;
  float life = 13.0 + aSeed.w * 9.0;
  float t = fract(uTime / life + aSeed.x);
  float age = t * life;
  float z = mix(-2.6, 1.4, aSpawn.z);                     // depth from the photo's depth map
  float spread = (7.0 - z) / 7.0;
  vec2 ndc = (aSpawn.xy - 0.5 - uOffset) * 2.0 * ${_.toFixed(2)} / uCover;
  vec2 start = ndc * uView * spread;
  float phase = age * (1.3 + aSeed.z * 0.9) + aSeed.x * 40.0;
  float swing = sin(phase);
  float x = start.x - age * (0.1 + 0.16 * uWind) * spread + swing * (0.1 + aSeed.y * 0.08) * spread;
  float y = start.y - age * (0.17 + aSeed.w * 0.1) * spread - (1.0 - cos(2.0 * phase)) * 0.025 * spread;
  float size = 0.075 + aSeed.y * 0.06;
  vec3 local = position * vec3(size, size * 1.3, size);
  local.z += (position.x * position.x) * size * 0.8 + position.y * position.y * size * 0.35;   // cupped and slightly curled
  vec3 axis = normalize(aAxis);
  float spin = age * (0.5 + aSeed.w * 1.1) + aSeed.x * 25.0;
  vec3 p = rotate(local, axis, spin);
  vec3 n = rotate(vec3(0.0, 0.0, 1.0), axis, spin);
  float tilt = cos(phase) * 0.8;                           // tilts into each swing like a falling leaf
  p = rotate(p, vec3(0.0, 0.0, 1.0), tilt); n = rotate(n, vec3(0.0, 0.0, 1.0), tilt);
  vec3 sunDir = normalize(vec3(-0.6, 0.25, -0.75));        // low sun behind, to the left
  vLight = 0.68 + 0.32 * abs(dot(n, normalize(vec3(-0.3, 0.6, 0.75))));
  vRim = pow(1.0 - abs(n.z), 2.0) * 0.6 + max(dot(n, sunDir), 0.0) * 0.35;   // edge-on and backlit petals glow
  vTone = aSeed.z;
  vec4 mv = modelViewMatrix * vec4(x + p.x, y + p.y, z + p.z, 1.0);
  gl_Position = projectionMatrix * mv;
  vSoft = mix(0.05, 0.16, smoothstep(0.4, -2.6, z));        // far petals a touch softer, near ones crisp
  float fade = smoothstep(0.0, 0.04, t) * smoothstep(1.0, 0.86, t) * smoothstep(-uView.y * 1.15, -uView.y * 0.9, y / spread);
  vAlpha = fade * mix(0.7, 0.97, aSpawn.z);
}`,S=`
varying vec2 vUv; varying float vLight, vRim, vAlpha, vTone, vSoft;
void main() {
  vec2 p = vUv * 2.0 - 1.0;
  float k = p.y * 0.5 + 0.5;
  float width = 0.66 * (1.0 - 0.5 * k * k) * smoothstep(-1.25, -0.2, p.y) + 0.06;
  float body = length(vec2(p.x / max(width, 0.05), p.y));
  float notch = length(p - vec2(0.0, 1.04)) - 0.24;        // the little notch at the tip of a sakura petal
  float aa = max(fwidth(body), 0.001) * 1.2 + vSoft;
  float shape = smoothstep(1.0, 1.0 - aa, body) * smoothstep(-aa * 0.5, aa * 0.5, notch);
  if (shape < 0.01) discard;
  // Colours sampled from the photo's blossoms: pale tips, deeper pink towards the base.
  vec3 pale = mix(vec3(1.0, 0.87, 0.92), vec3(1.0, 0.92, 0.94), vTone);
  vec3 deep = mix(vec3(0.9, 0.5, 0.68), vec3(0.94, 0.6, 0.74), vTone);
  vec3 col = mix(deep, pale, smoothstep(-0.9, 0.5, p.y));
  col *= 1.0 - 0.07 * smoothstep(0.06, 0.0, abs(p.x)) * smoothstep(-1.0, 0.6, p.y);   // faint centre vein
  col *= vLight;
  col += vec3(1.0, 0.78, 0.62) * vRim * 0.45;               // warm sunlit edge
  gl_FragColor = vec4(col, shape * vAlpha);
}`;function oe(e,t,n){let r=Math.round(220*e.height/e.width),i=e=>{let t=document.createElement(`canvas`);t.width=220,t.height=r;let n=t.getContext(`2d`,{willReadFrequently:!0});return n?(n.drawImage(e,0,0,220,r),n.getImageData(0,0,220,r).data):null},a=i(e),o=t?i(t):null,s=[];if(a)for(let e=0;e<r*.62;e++)for(let t=0;t<220;t++){let n=(e*220+t)*4,r=a[n],i=a[n+1],o=a[n+2],c=.2126*r+.7152*i+.0722*o;r-i>22&&c>120&&o>i&&s.push(t,e)}let c=new Float32Array(n*3);for(let e=0;e<n;e++){let t=.45+Math.random()*.55,n=.55+Math.random()*.45;if(s.length){let e=Math.floor(Math.random()*(s.length/2))*2;t=(s[e]+Math.random())/220,n=1-(s[e+1]+Math.random())/r}let i=(Math.min(r-1,Math.floor((1-n)*r))*220+Math.min(219,Math.floor(t*220)))*4,a=o?o[i]/255:.5;c.set([t,n,a],e*3)}return c}function C(e){let t=e.length/3,n=new l(1,1,4,3),r=new u;r.index=n.index,r.setAttribute(`position`,n.getAttribute(`position`)),r.setAttribute(`uv`,n.getAttribute(`uv`));let i=new Float32Array(t*4),a=new Float32Array(t*3);for(let e=0;e<t;e++)i.set([Math.random(),Math.random(),Math.random(),Math.random()],e*4),a.set([Math.random()-.5,Math.random()-.5,Math.random()-.5+.01],e*3);return r.setAttribute(`aSeed`,new d(i,4)),r.setAttribute(`aAxis`,new d(a,3)),r.setAttribute(`aSpawn`,new d(e,3)),r.instanceCount=t,r}function w({src:e,depthSrc:t,mobile:n,paused:d,onReady:v}){let x=(0,h.useRef)(null),w=(0,h.useRef)(d);w.current=d;let T=(0,h.useRef)(v);T.current=v;let E=(0,h.useRef)(()=>{});return(0,h.useEffect)(()=>{d||E.current()},[d]),(0,h.useEffect)(()=>{let d=x.current;if(!d)return;let h=!1,g=0,v=0,D=0,O=1.5,k=0,A=0,j=new te({antialias:!1,alpha:!1,powerPreference:`high-performance`});j.setPixelRatio(Math.min(window.devicePixelRatio,n?2:2.5)),d.appendChild(j.domElement);let M=new ee,N=new a(40,1,.1,40);N.position.set(0,0,7);let P=new r(1,1),F=new r,I=new f(1313812),L=new r,R=new r(.5,.45),z=new r(1,1),B=new r(1,1),V={uTime:{value:0},uGust:{value:.5},uPush:{value:0},uBottom:{value:0},uBg:{value:I},uCover:{value:P},uOffset:{value:F},uCam:{value:L},uFocus:{value:R},uRes:{value:z},uTexel:{value:new r(1/3840,1/2194)},uTex:{value:null},uDepth:{value:null}},H={uTime:{value:0},uWind:{value:.5},uView:{value:B},uCover:{value:P},uOffset:{value:F}};try{let e=document.createElement(`canvas`);e.width=e.height=1;let t=e.getContext(`2d`);if(t){t.fillStyle=getComputedStyle(document.body).backgroundColor,t.fillRect(0,0,1,1);let e=t.getImageData(0,0,1,1).data;I.setRGB((e[0]??20)/255,(e[1]??12)/255,(e[2]??20)/255,c)}}catch{}let U=new i(new l(2,2),new o({vertexShader:re,fragmentShader:ie(n?6:10),uniforms:V,depthWrite:!1,depthTest:!1}));U.frustumCulled=!1,U.renderOrder=0,U.visible=!1;let W=new i(new u,new o({vertexShader:ae,fragmentShader:S,uniforms:H,transparent:!0,depthWrite:!1,depthTest:!1,side:2}));W.frustumCulled=!1,W.renderOrder=1,W.visible=!1;let G=null,K=null;M.add(U,W);let q=()=>{let e=d.clientWidth||window.innerWidth,t=d.clientHeight||window.innerHeight;j.setSize(e,t,!1);let n=e/t;if(n>=O)P.set(1,O/n);else{let e=Math.min(1/b,Math.max(1,y*O/n));P.set(e*n/O,e)}let r=_;F.set((1-P.x)*.18000000000000005,.5*(1-Math.max(P.y,1))/r),V.uBottom.value=.5-.5*P.y/r+F.y,N.aspect=n,N.updateProjectionMatrix();let i=Math.tan(m.degToRad(20))*7;B.set(i*n,i),z.set(e,t)},J=()=>{let e=document.documentElement.scrollHeight-window.innerHeight;return e>0?Math.min(1,window.scrollY/e):0},Y=()=>{++A<2||h||(G&&(W.geometry.dispose(),W.geometry=C(oe(G,K,n?90:260))),U.visible=!0,W.visible=!0,q(),k=J(),j.render(M,N),d.dataset.ready=`true`,T.current?.())},X=new s;X.load(e,e=>{if(h){e.dispose();return}e.colorSpace=c,e.anisotropy=j.capabilities.getMaxAnisotropy(),e.minFilter=ne;let t=e.image;G=t,O=t.width/t.height,V.uTexel.value.set(1/t.width,1/t.height),V.uTex.value=e,Y()},void 0,()=>{});let se=()=>{let e=new p(new Uint8Array([90,90,90,255]),1,1);return e.needsUpdate=!0,e};X.load(t,e=>{if(h){e.dispose();return}e.colorSpace=``,V.uDepth.value=e,K=e.image,Y()},void 0,()=>{V.uDepth.value=se(),Y()});let Z=e=>{if(g=0,h||w.current||document.hidden)return;let t=Math.min(.05,v?(e-v)/1e3:.016);v=e,D+=t,k+=(J()-k)*(1-Math.exp(-t*2));let n=.5+.5*Math.sin(D*.21)*Math.sin(D*.09+1.3);L.set(Math.sin(D*.075)*.8+Math.sin(D*.031)*.2,Math.sin(D*.053)*.45-k*.25),R.set(.5-k*.04,.45-k*.12),V.uTime.value=D,V.uGust.value=n,V.uPush.value=.03*(.5-.5*Math.cos(D*.06))+k*.06,H.uTime.value=D,H.uWind.value=n,N.position.set(L.x*.35,L.y*.25,7-k*.5),N.lookAt(0,-k*.2,0),U.visible&&j.render(M,N),g=requestAnimationFrame(Z)},Q=()=>{!g&&!h&&(v=0,g=requestAnimationFrame(Z))};E.current=Q;let $=()=>{document.hidden||Q()};return q(),window.addEventListener(`resize`,q),document.addEventListener(`visibilitychange`,$),Q(),()=>{h=!0,cancelAnimationFrame(g),window.removeEventListener(`resize`,q),document.removeEventListener(`visibilitychange`,$),U.geometry.dispose(),U.material.dispose(),W.geometry.dispose(),W.material.dispose(),V.uTex.value?.dispose(),V.uDepth.value?.dispose(),j.dispose(),j.domElement.remove()}},[e,t,n]),(0,g.jsx)(`div`,{ref:x,className:`blossom-particles`})}export{v as PHOTO_ALIGN_X,b as PHOTO_FILL_Y,y as PHOTO_MIN_WIDTH,_ as PHOTO_OVERSCAN,w as default};