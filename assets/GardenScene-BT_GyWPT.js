import{i as e,n as t,t as n}from"./jsx-runtime-ByaQ0wya.js";import{A as r,B as i,C as a,D as o,E as s,F as c,H as l,I as u,M as d,O as f,P as p,R as m,S as h,T as g,U as _,V as v,W as y,_ as b,a as x,c as S,d as C,f as w,g as T,h as E,i as D,j as O,k,l as A,m as j,n as M,o as N,p as P,r as F,s as ee,t as I,v as te,w as ne,x as re,y as ie,z as L}from"./three.module-CLHqwPLZ.js";var ae=e(t(),1),R={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},z=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},oe=new g(-1,1,1,-1,0,1),se=new class extends F{constructor(){super(),this.setAttribute(`position`,new w([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new w([0,2,0,0,2,0],2))}},ce=class{constructor(e){this._mesh=new a(se,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,oe)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},le=class extends z{constructor(e,t){super(),this.textureID=t===void 0?`tDiffuse`:t,e instanceof c?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=L.clone(e.uniforms),this.material=new c({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new ce(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}},ue=class extends z{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},de=class extends z{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},B=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new i);this._width=n.width,this._height=n.height,t=new _(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:P}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new le(R),this.copyPass.material.blending=0,this.clock=new x}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}ue!==void 0&&(r instanceof ue?n=!0:r instanceof de&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new i);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},fe={name:`OutputShader`,uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`},pe=class extends z{constructor(){super();let e=fe;this.uniforms=L.clone(e.uniforms),this.material=new O({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new ce(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},ee.getTransfer(this._outputColorSpace)===`srgb`&&(this.material.defines.SRGB_TRANSFER=``),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING=``:this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING=``:this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING=``:this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING=``:this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING=``:this._toneMapping===7&&(this.material.defines.NEUTRAL_TONE_MAPPING=``),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}},me=class extends z{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new N}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},he={name:`LuminosityHighPassShader`,shaderID:`luminosityHighPass`,uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new N(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`},V=class e extends z{constructor(e,t,n,r){super(),this.strength=t===void 0?1:t,this.radius=n,this.threshold=r,this.resolution=e===void 0?new i(256,256):new i(e.x,e.y),this.clearColor=new N(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let a=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new _(a,o,{type:P}),this.renderTargetBright.texture.name=`UnrealBloomPass.bright`,this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){let t=new _(a,o,{type:P});t.texture.name=`UnrealBloomPass.h`+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);let n=new _(a,o,{type:P});n.texture.name=`UnrealBloomPass.v`+e,n.texture.generateMipmaps=!1,this.renderTargetsVertical.push(n),a=Math.round(a/2),o=Math.round(o/2)}let s=he;this.highPassUniforms=L.clone(s.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new c({uniforms:this.highPassUniforms,vertexShader:s.vertexShader,fragmentShader:s.fragmentShader}),this.separableBlurMaterials=[];let l=[3,5,7,9,11];a=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new i(1/a,1/o),a=Math.round(a/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let u=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=u,this.bloomTintColors=[new v(1,1,1),new v(1,1,1),new v(1,1,1),new v(1,1,1),new v(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;let d=R;this.copyUniforms=L.clone(d.uniforms),this.blendMaterial=new c({uniforms:this.copyUniforms,vertexShader:d.vertexShader,fragmentShader:d.fragmentShader,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new N,this.oldClearAlpha=1,this.basic=new ne,this.fsQuad=new ce(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(n,r),this.renderTargetsVertical[e].setSize(n,r),this.separableBlurMaterials[e].uniforms.invSize.value=new i(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(t,n,r,i,a){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=r.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let s=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this.fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[n]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[n]),t.clear(),this.fsQuad.render(t),s=this.renderTargetsVertical[n];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(r),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=o}getSeperableBlurMaterial(e){let t=[];for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new c({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new i(.5,.5)},direction:{value:new i(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new c({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}};V.BlurDirectionX=new i(1,0),V.BlurDirectionY=new i(0,1);var H=`
float hash12(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float hash13(vec3 p3) { p3 = fract(p3 * .1031); p3 += dot(p3, p3.zyx + 31.32); return fract((p3.x + p3.y) * p3.z); }
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash12(i), hash12(i + vec2(1, 0)), u.x), mix(hash12(i + vec2(0, 1)), hash12(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) { float a = 0.5, s = 0.0; for (int i = 0; i < 5; i++) { s += a * vnoise(p); p = p * 2.03 + 17.1; a *= 0.5; } return s; }
`,U=`
uniform float uTime;
uniform float uWind;
uniform vec3 uMoonDir;
uniform vec3 uMoonCol;
uniform vec3 uFogCol;
uniform vec3 uFogGlow;
uniform float uFogDensity;
uniform vec3 uAmbSky;
uniform vec3 uAmbGround;
uniform vec3 uLamps[4];
uniform vec3 uLampCol;

/* Gusting breeze; flex = how far a point sits out along its branch (0 at the roots). */
vec3 windAt(vec3 p, float flex) {
  float t = uTime;
  float gust = 0.55 + 0.45 * sin(t * 0.37 + p.x * 0.05) * sin(t * 0.23 + 1.3 + p.z * 0.04);
  float sway = sin(t * 1.15 + p.x * 0.45 + p.z * 0.3) * 0.65 + sin(t * 2.6 + p.y * 1.6 + p.x * 1.1) * 0.22;
  return vec3(sway, sway * 0.12, sway * 0.4 + sin(t * 0.9 + p.x) * 0.2) * gust * flex * uWind;
}

vec3 lampLight(vec3 wp, vec3 n) {
  vec3 c = vec3(0.0);
  for (int i = 0; i < 4; i++) {
    vec3 d = uLamps[i] - wp; float l2 = dot(d, d);
    c += uLampCol * (0.35 + 0.65 * max(dot(n, d * inversesqrt(l2)), 0.0)) / (1.0 + l2 * 1.1);
  }
  return c;
}

vec3 applyFog(vec3 col, vec3 wp) {
  vec3 v = wp - cameraPosition; float d = length(v); vec3 dir = v / max(d, 1e-4);
  float f = 1.0 - exp(-pow(d * uFogDensity, 1.5));
  f = clamp(f + (1.0 - smoothstep(-0.2, 1.8, wp.y)) * (1.0 - exp(-d * 0.035)) * 0.45, 0.0, 1.0);
  vec3 fc = uFogCol + uFogGlow * pow(max(dot(dir, uMoonDir), 0.0), 5.0);
  return mix(col, fc, f);
}
`,W=(e,t=1)=>new N(e).multiplyScalar(t);function ge(){return{uTime:{value:0},uWind:{value:1},uMoonDir:{value:new v(.3,.3,-1).normalize()},uMoonCol:{value:W(`#d9d4ff`,1.05)},uFogCol:{value:W(`#2c1532`,.42)},uFogGlow:{value:W(`#c97aa9`,.42)},uFogDensity:{value:.012},uAmbSky:{value:W(`#3b2a5c`,.32)},uAmbGround:{value:W(`#2a1420`,.22)},uLamps:{value:[new v,new v,new v,new v]},uLampCol:{value:W(`#ff9a5a`,1.6)}}}var _e=`
${U}${H}
uniform vec3 uDeep; uniform vec3 uMid; uniform vec3 uTip; uniform vec3 uStamen; uniform vec3 uAnther;
varying vec3 vPart; varying vec3 vN; varying vec3 vW; varying float vTint; varying float vShade;
void main() {
  vec3 n = normalize(vN); if (!gl_FrontFacing) n = -n;
  vec3 v = normalize(cameraPosition - vW);
  float u = vPart.x, vv = vPart.y;
  vec3 col;
  if (vPart.z > 1.5) {
    // Canopy filler: a dense speckle of tiny florets instead of a smooth blob.
    vec3 g = vW * 30.0; vec3 cell = floor(g); vec3 f = fract(g) - 0.5;
    float h = hash13(cell);
    float floret = smoothstep(0.48, 0.2, length(f + (vec3(hash13(cell + 1.3), hash13(cell + 2.7), hash13(cell + 4.1)) - 0.5) * 0.4));
    col = mix(mix(uDeep, uMid, 0.45) * 0.6, mix(uMid, uTip, h), floret * (0.4 + 0.4 * h));
    n = normalize(n + (vec3(hash13(cell + 5.0), hash13(cell + 6.0), hash13(cell + 7.0)) - 0.5) * 1.2);
  } else if (vPart.z > 0.5) {
    col = mix(uStamen, uAnther * 1.6, smoothstep(0.72, 1.0, u));
  } else {
    col = mix(uDeep, uMid, smoothstep(0.0, 0.42, u));
    col = mix(col, uTip, smoothstep(0.35, 1.0, u) * (0.7 + 0.3 * vTint));
    col *= 1.0 - 0.08 * (0.5 + 0.5 * sin(vv * 23.0)) * smoothstep(0.12, 0.85, u);
    col *= mix(0.84, 1.08, vTint);
  }
  float ndl = dot(n, uMoonDir);
  float wrap = max((ndl + 0.4) / 1.4, 0.0);
  float trans = pow(max(dot(-v, uMoonDir), 0.0), 2.5) * 0.8 + max(-ndl, 0.0) * 0.3;
  float occ = mix(0.5, 1.0, vShade);
  vec3 amb = mix(uAmbGround, uAmbSky, n.y * 0.5 + 0.5);
  vec3 L = amb * occ * 1.6 + uMoonCol * (wrap * 0.85 * occ + trans * 0.55) + lampLight(vW, n) * 1.4;
  vec3 o = col * L + uMoonCol * pow(1.0 - abs(dot(n, v)), 3.0) * 0.12 * occ;
  gl_FragColor = vec4(applyFog(o, vW), 1.0);
}`,ve=`
${U}
attribute vec3 part; attribute vec4 inst;
varying vec3 vPart; varying vec3 vN; varying vec3 vW; varying float vTint; varying float vShade;
void main() {
  vec3 p = position;
  p.z += sin(uTime * 4.0 + inst.z + part.x * 2.0) * 0.07 * part.x * part.x * uWind;
  vec4 w = modelMatrix * instanceMatrix * vec4(p, 1.0);
  w.xyz += windAt(w.xyz, inst.x);
  vN = normalize(mat3(modelMatrix) * mat3(instanceMatrix) * normal);
  vW = w.xyz; vPart = part; vTint = inst.y; vShade = inst.w;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,ye=`
${U}
attribute vec3 part; attribute vec4 seed; attribute vec3 spawn;
uniform float uPetalSize;
varying vec3 vPart; varying vec3 vN; varying vec3 vW; varying float vTint; varying float vShade;
vec3 rotA(vec3 v, vec3 k, float a) { float c = cos(a), s = sin(a); return v * c + cross(k, v) * s + k * dot(k, v) * (1.0 - c); }
void main() {
  float life = fract(uTime * (0.035 + 0.03 * seed.x) + seed.y);
  vec3 c = spawn;
  c.y -= life * (spawn.y + 0.4);
  c.x += life * life * 4.0 * uWind * (0.5 + seed.z) + sin(uTime * 0.7 + seed.w * 6.0) * 0.5 * life;
  c.z += sin(uTime * 0.5 + seed.x * 6.0) * 0.6 * life + life * 1.2;
  float a = uTime * (1.2 + seed.z * 1.8) + seed.w * 6.28;
  c.x += cos(a) * 0.14 * life; c.z += sin(a) * 0.14 * life;
  vec3 axis = normalize(vec3(seed.x - 0.5, seed.y - 0.35, seed.z - 0.5) + 0.001);
  float ang = uTime * (0.9 + seed.w * 2.2) + seed.x * 10.0;
  float fade = smoothstep(0.0, 0.05, life) * (1.0 - smoothstep(0.92, 1.0, life));
  vec3 lp = rotA(position * uPetalSize * (0.75 + 0.5 * seed.w) * fade, axis, ang);
  vN = rotA(normal, axis, ang);
  vec3 w = c + lp;
  vW = w; vPart = part; vTint = seed.x; vShade = 0.9;
  gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
}`,be=(e,t)=>({...e,uDeep:{value:W(t.deep)},uMid:{value:W(t.mid)},uTip:{value:W(t.tip)},uStamen:{value:W(`#f6c8d6`)},uAnther:{value:W(`#f2c35a`)}}),xe={deep:`#b23f6c`,mid:`#f09bbd`,tip:`#fde4ee`},Se={deep:`#8f2a57`,mid:`#d9739f`,tip:`#f6c4d8`};function Ce(e,t=xe){return new c({uniforms:be(e,t),vertexShader:ve,fragmentShader:_e,side:2})}function we(e,t){return new c({uniforms:{...be(e,xe),uPetalSize:{value:t}},vertexShader:ye,fragmentShader:_e,side:2})}function Te(e){return new c({uniforms:{...e,uBark:{value:W(`#1d1216`)},uBarkLight:{value:W(`#5a454b`)}},vertexShader:`${U}
      attribute float flex; varying vec2 vUv; varying vec3 vN; varying vec3 vW;
      void main() {
        vec4 w = modelMatrix * vec4(position, 1.0);
        w.xyz += windAt(w.xyz, flex);
        vUv = uv; vN = normalize(mat3(modelMatrix) * normal); vW = w.xyz;
        gl_Position = projectionMatrix * viewMatrix * w;
      }`,fragmentShader:`${U}${H}
      uniform vec3 uBark; uniform vec3 uBarkLight;
      varying vec2 vUv; varying vec3 vN; varying vec3 vW;
      void main() {
        vec3 n = normalize(vN); if (!gl_FrontFacing) n = -n;
        vec3 v = normalize(cameraPosition - vW);
        float lent = smoothstep(0.66, 0.86, vnoise(vec2(vUv.x * 2.5, vUv.y * 26.0)));
        float grain = fbm(vUv * vec2(5.0, 1.3));
        vec3 col = uBark * (0.7 + 0.6 * grain);
        col = mix(col, uBarkLight, lent * 0.45);
        col *= 1.0 - 0.35 * smoothstep(0.55, 0.75, vnoise(vUv * vec2(9.0, 3.0)));
        float ndl = max((dot(n, uMoonDir) + 0.25) / 1.25, 0.0);
        vec3 amb = mix(uAmbGround, uAmbSky, n.y * 0.5 + 0.5);
        vec3 L = amb * 1.2 + uMoonCol * ndl * 0.38 + lampLight(vW, n) * 1.2;
        vec3 o = col * L + uMoonCol * pow(1.0 - max(dot(n, v), 0.0), 4.0) * 0.05;
        gl_FragColor = vec4(applyFog(o, vW), 1.0);
      }`,side:2})}function Ee(e){return new c({uniforms:{...e},vertexColors:!0,vertexShader:`${U}
      varying vec3 vC; varying vec3 vN; varying vec3 vW;
      void main() { vec4 w = modelMatrix * vec4(position, 1.0); vC = color; vN = normalize(mat3(modelMatrix) * normal); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,fragmentShader:`${U}${H}
      varying vec3 vC; varying vec3 vN; varying vec3 vW;
      void main() {
        vec3 n = normalize(vN); vec3 v = normalize(cameraPosition - vW);
        vec3 col = vC * (0.8 + 0.4 * fbm(vW.xz * 3.0 + vW.y * 2.0));
        float ndl = max((dot(n, uMoonDir) + 0.2) / 1.2, 0.0);
        vec3 amb = mix(uAmbGround, uAmbSky, n.y * 0.5 + 0.5);
        vec3 o = col * (amb * 1.5 + uMoonCol * ndl * 0.6 + lampLight(vW, n) * 1.3) + uMoonCol * pow(1.0 - max(dot(n, v), 0.0), 4.0) * 0.1;
        gl_FragColor = vec4(applyFog(o, vW), 1.0);
      }`})}function De(e,t){let n=[...t,new v(999,0,999),new v(999,0,999),new v(999,0,999)].slice(0,3);return new c({uniforms:{...e,uTrees:{value:n},uMoss:{value:W(`#1b1a1f`)},uEarth:{value:W(`#2b1c24`)},uPetal:{value:W(`#e79bbb`)}},vertexShader:`
      varying vec3 vN; varying vec3 vW;
      void main() { vec4 w = modelMatrix * vec4(position, 1.0); vN = normalize(mat3(modelMatrix) * normal); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,fragmentShader:`${U}${H}
      uniform vec3 uTrees[3]; uniform vec3 uMoss; uniform vec3 uEarth; uniform vec3 uPetal;
      varying vec3 vN; varying vec3 vW;
      void main() {
        vec3 n = normalize(vN);
        vec2 p = vW.xz;
        vec3 col = mix(uMoss, uEarth, fbm(p * 0.35));
        col *= 0.75 + 0.5 * fbm(p * 4.0);
        float wet = 1.0 - smoothstep(-0.1, 0.6, vW.y);
        col *= 1.0 - wet * 0.45;
        float dens = 0.04;
        for (int i = 0; i < 3; i++) { float d = length(p - uTrees[i].xz); dens += 0.55 * exp(-d * d / 40.0); }
        vec2 g = p * 13.0; vec2 cell = floor(g); vec2 f = fract(g) - 0.5;
        float h = hash12(cell);
        vec2 o = vec2(hash12(cell + 7.1), hash12(cell + 3.3)) - 0.5;
        float ang = h * 6.28; vec2 q = mat2(cos(ang), -sin(ang), sin(ang), cos(ang)) * (f - o * 0.5);
        float petal = smoothstep(0.2, 0.12, length(q * vec2(1.0, 1.7)));
        float px = length(fwidth(g));
        float spot = mix(petal * step(1.0 - dens, h), dens * 0.25, smoothstep(0.3, 1.2, px));
        col = mix(col, uPetal * (0.55 + 0.45 * hash12(cell + 1.7)), spot * (1.0 - wet));
        float ndl = max((dot(n, uMoonDir) + 0.2) / 1.2, 0.0);
        vec3 o2 = col * (uAmbSky * 1.5 + uMoonCol * ndl * 0.55 + lampLight(vW, n) * 1.4);
        gl_FragColor = vec4(applyFog(o2, vW), 1.0);
      }`})}function Oe(e){return new c({uniforms:{...e,uZenith:{value:W(`#04030a`)}},side:1,depthWrite:!1,vertexShader:`varying vec3 vDir; void main() { vDir = (modelMatrix * vec4(position, 1.0)).xyz - cameraPosition; gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0); gl_Position.z = gl_Position.w; }`,fragmentShader:`${U}${H}
      uniform vec3 uZenith; varying vec3 vDir;
      void main() {
        vec3 d = normalize(vDir);
        vec3 col = mix(uFogCol, uZenith, smoothstep(-0.02, 0.42, d.y));
        float md = dot(d, uMoonDir);
        col += uFogGlow * pow(max(md, 0.0), 5.0) * 0.8;
        col += uMoonCol * 0.3 * pow(max(md, 0.0), 120.0);
        // Wispy clouds drifting past the moon.
        vec2 cp = d.xz / (d.y + 0.25) * 1.6 + vec2(uTime * 0.012, 0.0);
        float cl = smoothstep(0.5, 0.85, fbm(cp)) * smoothstep(0.0, 0.25, d.y);
        col = mix(col, uFogGlow * 0.55 + uMoonCol * 0.25 * pow(max(md, 0.0), 8.0), cl * 0.55);
        // Stars.
        vec3 sp = d * 260.0; vec3 cell = floor(sp); float h = hash13(cell);
        float star = step(0.9965, h) * smoothstep(0.32, 0.0, length(fract(sp) - 0.5));
        star *= (0.6 + 0.4 * sin(uTime * (1.0 + h * 3.0) + h * 80.0)) * smoothstep(0.05, 0.35, d.y) * (1.0 - cl);
        col += vec3(1.0, 0.9, 1.0) * star * 2.2 * (1.0 - smoothstep(0.96, 0.995, md));
        // The moon itself, with soft maria.
        float disc = smoothstep(0.99935, 0.99955, md);
        vec3 mcol = uMoonCol * (3.2 - 0.9 * fbm(d.xy * 260.0));
        col = mix(col, mcol, disc);
        gl_FragColor = vec4(col, 1.0);
      }`})}function ke(e,t,n,r,i,a){return new c({uniforms:{...e,uBase:{value:t},uAmp:{value:n},uFreq:{value:r},uSeed:{value:i},uTone:{value:a}},transparent:!0,depthWrite:!1,vertexShader:`varying vec3 vW; void main() { vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,fragmentShader:`${U}${H}
      uniform float uBase; uniform float uAmp; uniform float uFreq; uniform float uSeed; uniform float uTone;
      varying vec3 vW;
      void main() {
        float x = vW.x * uFreq + uSeed;
        float ridge = uBase + uAmp * (fbm(vec2(x, uSeed)) * 1.25 + 0.3 * abs(sin(x * 0.7)) + 0.12 * fbm(vec2(x * 9.0, uSeed + 3.0)));
        float a = smoothstep(ridge + 0.25, ridge - 0.25, vW.y);
        if (a <= 0.0) discard;
        vec3 dir = normalize(vW - cameraPosition);
        vec3 col = uFogCol * uTone * 0.8 + uFogGlow * pow(max(dot(dir, uMoonDir), 0.0), 4.0) * 0.5 * uTone;
        col += uMoonCol * 0.025 * smoothstep(ridge - 0.8, ridge, vW.y);
        float mist = smoothstep(ridge - 1.5, ridge - uAmp * 0.9 - 6.0, vW.y);
        mist = max(mist, 0.35 * fbm(vec2(vW.x * 0.03 + uTime * 0.01, vW.y * 0.2)));
        col = mix(col, uFogCol + uFogGlow * pow(max(dot(dir, uMoonDir), 0.0), 5.0) * 0.8, clamp(mist, 0.0, 1.0));
        gl_FragColor = vec4(col, a);
      }`})}function Ae(e,t,n){return new c({uniforms:{...e,uGlow:{value:W(t,n)}},vertexShader:`${U}
      attribute vec4 inst; varying vec3 vN; varying vec3 vW; varying vec3 vL;
      void main() {
        vec4 w = modelMatrix * instanceMatrix * vec4(position, 1.0);
        vec3 anchor = (modelMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
        w.xyz += windAt(anchor, inst.x) + vec3(sin(uTime * 1.3 + inst.y * 6.0), 0.0, cos(uTime * 1.1 + inst.y * 6.0)) * 0.03 * inst.x * 4.0;
        vN = normalize(mat3(modelMatrix) * mat3(instanceMatrix) * normal); vW = w.xyz; vL = position;
        gl_Position = projectionMatrix * viewMatrix * w;
      }`,fragmentShader:`${U}
      uniform vec3 uGlow; varying vec3 vN; varying vec3 vW; varying vec3 vL;
      void main() {
        vec3 n = normalize(vN); vec3 v = normalize(cameraPosition - vW);
        float ribs = 0.72 + 0.28 * smoothstep(0.0, 0.25, abs(sin(vL.y * 60.0)));
        float core = 0.55 + 0.45 * pow(max(dot(n, v), 0.0), 1.5);
        float flick = 0.92 + 0.08 * sin(uTime * 9.0 + vW.x * 3.0) * sin(uTime * 5.3);
        gl_FragColor = vec4(applyFog(uGlow * ribs * core * flick, vW), 1.0);
      }`})}function je(e,t){return new c({uniforms:{...e,uPx:{value:t},uGlowA:{value:W(`#ffd27a`,3.2)},uGlowB:{value:W(`#ff9fcb`,2.6)}},transparent:!0,depthWrite:!1,blending:2,vertexShader:`${U}
      attribute vec4 seed; uniform float uPx; varying float vB; varying float vMix;
      void main() {
        vec3 p = position + vec3(sin(uTime * 0.25 * (0.5 + seed.x) + seed.y * 6.0) * 1.1, sin(uTime * 0.4 * (0.5 + seed.y) + seed.z * 6.0) * 0.45, cos(uTime * 0.22 * (0.5 + seed.z) + seed.x * 6.0) * 1.1);
        vec4 mv = viewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = uPx * (0.05 + 0.05 * seed.w) / max(-mv.z, 0.5);
        vB = pow(0.5 + 0.5 * sin(uTime * (0.8 + seed.w * 1.6) + seed.x * 40.0), 2.0);
        vMix = seed.z;
      }`,fragmentShader:`
      uniform vec3 uGlowA; uniform vec3 uGlowB; varying float vB; varying float vMix;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.0, d); a *= a;
        gl_FragColor = vec4(mix(uGlowA, uGlowB, step(0.6, vMix)) * a * vB, 1.0);
      }`})}function Me(e){return new c({uniforms:{...e},transparent:!0,depthWrite:!1,blending:2,vertexShader:`varying vec2 vUv; varying vec3 vW; void main() { vUv = uv; vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,fragmentShader:`${U}${H}
      varying vec2 vUv; varying vec3 vW;
      void main() {
        float n = fbm(vec2(vW.x * 0.12 + uTime * 0.02, vW.y * 0.5 + vW.z * 0.05 - uTime * 0.01));
        float a = smoothstep(0.35, 0.8, n) * smoothstep(0.0, 0.25, vUv.y) * (1.0 - smoothstep(0.4, 1.0, vUv.y)) * smoothstep(0.0, 0.15, vUv.x) * (1.0 - smoothstep(0.85, 1.0, vUv.x));
        float d = length(vW - cameraPosition);
        a *= smoothstep(1.5, 6.0, d);
        gl_FragColor = vec4((uFogGlow * 0.5 + uMoonCol * 0.08) * a * 0.55, 1.0);
      }`})}function Ne(e){return{name:`GardenWater`,uniforms:{...e,color:{value:new N(1,1,1)},tDiffuse:{value:null},textureMatrix:{value:null},uDeep:{value:W(`#0a0610`)}},vertexShader:`uniform mat4 textureMatrix; varying vec4 vUv; varying vec3 vW;
      void main() { vUv = textureMatrix * vec4(position, 1.0); vW = (modelMatrix * vec4(position, 1.0)).xyz; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`${U}${H}
      uniform sampler2D tDiffuse; uniform vec3 uDeep; varying vec4 vUv; varying vec3 vW;
      void main() {
        vec2 p = vW.xz; float t = uTime;
        vec2 dis = vec2(fbm(p * 0.8 + vec2(t * 0.1, t * 0.04)), fbm(p * 0.8 + vec2(-t * 0.06, t * 0.09) + 7.3)) - 0.5;
        dis += vec2(sin(p.y * 3.3 + t * 1.3 + p.x), cos(p.x * 2.9 - t * 1.05)) * 0.05;
        vec4 uv = vUv; uv.xy += dis * 0.022 * uv.w;
        vec3 refl = texture2DProj(tDiffuse, uv).rgb;
        vec3 v = normalize(cameraPosition - vW);
        float fres = 0.25 + 0.75 * pow(1.0 - max(v.y, 0.0), 3.0);
        vec3 col = mix(uDeep, refl * 0.85, fres);
        vec3 n = normalize(vec3(dis.x * 0.6, 1.0, dis.y * 0.6));
        vec3 r = reflect(-v, n);
        col += uMoonCol * pow(max(dot(r, uMoonDir), 0.0), 900.0) * 1.6;
        col += lampLight(vW + vec3(0.0, 0.3, 0.0), vec3(0.0, 1.0, 0.0)) * 0.25;
        gl_FragColor = vec4(applyFog(col, vW), 1.0);
      }`}}function Pe(e){let t=Ne(e);return new c({uniforms:t.uniforms,vertexShader:`varying vec3 vW; void main() { vW = (modelMatrix * vec4(position, 1.0)).xyz; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`${U}${H}
      uniform vec3 uDeep; varying vec3 vW;
      void main() {
        vec2 p = vW.xz; float t = uTime;
        vec2 dis = vec2(fbm(p * 0.8 + vec2(t * 0.1, t * 0.04)), fbm(p * 0.8 + vec2(-t * 0.06, t * 0.09) + 7.3)) - 0.5;
        vec3 v = normalize(cameraPosition - vW);
        vec3 n = normalize(vec3(dis.x * 0.9, 1.0, dis.y * 0.9));
        vec3 r = reflect(-v, n);
        float fres = 0.25 + 0.75 * pow(1.0 - max(v.y, 0.0), 3.0);
        vec3 sky = mix(uFogCol, uFogCol * 0.3, smoothstep(0.0, 0.5, r.y)) + uFogGlow * pow(max(dot(r, uMoonDir), 0.0), 5.0);
        vec3 col = mix(uDeep, sky, fres) + uMoonCol * pow(max(dot(r, uMoonDir), 0.0), 260.0) * 5.0;
        col += lampLight(vW + vec3(0.0, 0.3, 0.0), vec3(0.0, 1.0, 0.0)) * 0.35;
        gl_FragColor = vec4(applyFog(col, vW), 1.0);
      }`})}var Fe={uniforms:{tDiffuse:{value:null},uTime:{value:0},uRes:{value:new i(1,1)}},vertexShader:`varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`
    uniform sampler2D tDiffuse; uniform float uTime; uniform vec2 uRes; varying vec2 vUv;
    float h(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
    void main() {
      vec4 c = texture2D(tDiffuse, vUv);
      vec2 q = vUv - 0.5;
      c.rgb *= 1.0 - smoothstep(0.35, 0.95, length(q * vec2(1.1, 1.0))) * 0.45;
      c.rgb += (h(vUv * uRes + fract(uTime * 7.0) * 100.0) - 0.5) * 0.025;
      gl_FragColor = c;
    }`};function Ie(e){return new c({uniforms:{...e,uLow:{value:W(`#0c1412`)},uHigh:{value:W(`#3d5a4a`)}},side:2,vertexShader:`${U}
      attribute vec4 blade; varying float vH; varying vec3 vW; varying float vTint;
      void main() {
        vec3 p = position;
        float h = p.y * blade.w;
        float a = fract(blade.x * 3.1 + blade.z * 5.7) * 6.283;
        float lean = fract(blade.x * 7.3 - blade.z * 2.9) - 0.5;
        vec3 w = vec3(blade.x, blade.y + h, blade.z) + vec3(cos(a), 0.0, sin(a)) * p.x + vec3(sin(a), 0.0, -cos(a)) * lean * h * 0.6;
        vec3 wind = windAt(w, 1.0) * 0.4 + vec3(sin(uTime * 2.2 + blade.x * 1.7 + blade.z), 0.0, cos(uTime * 1.8 + blade.z * 1.3)) * 0.06;
        w += wind * p.y * p.y;
        vH = p.y; vW = w; vTint = fract(blade.x * 13.7 + blade.z * 7.1);
        gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
      }`,fragmentShader:`${U}
      uniform vec3 uLow; uniform vec3 uHigh; varying float vH; varying vec3 vW; varying float vTint;
      void main() {
        vec3 col = mix(uLow, uHigh * (0.7 + 0.5 * vTint), vH);
        vec3 o = col * (uAmbSky * 1.6 + uMoonCol * 0.35 * vH) + lampLight(vW, vec3(0.0, 1.0, 0.0)) * col * 2.5;
        gl_FragColor = vec4(applyFog(o, vW), 1.0);
      }`})}var Le=class e extends a{constructor(t,n={}){super(t),this.isReflector=!0,this.type=`Reflector`,this.camera=new s;let r=this,i=n.color===void 0?new N(8355711):new N(n.color),a=n.textureWidth||512,u=n.textureHeight||512,d=n.clipBias||0,f=n.shader||e.ReflectorShader,p=n.multisample===void 0?4:n.multisample,m=new o,g=new v,y=new v,b=new v,x=new h,S=new v(0,0,-1),C=new l,w=new v,T=new v,E=new l,D=new h,O=this.camera,k=new _(a,u,{samples:p,type:P}),A=new c({name:f.name===void 0?`unspecified`:f.name,uniforms:L.clone(f.uniforms),fragmentShader:f.fragmentShader,vertexShader:f.vertexShader});A.uniforms.tDiffuse.value=k.texture,A.uniforms.color.value=i,A.uniforms.textureMatrix.value=D,this.material=A,this.onBeforeRender=function(e,t,n){if(y.setFromMatrixPosition(r.matrixWorld),b.setFromMatrixPosition(n.matrixWorld),x.extractRotation(r.matrixWorld),g.set(0,0,1),g.applyMatrix4(x),w.subVectors(y,b),w.dot(g)>0)return;w.reflect(g).negate(),w.add(y),x.extractRotation(n.matrixWorld),S.set(0,0,-1),S.applyMatrix4(x),S.add(b),T.subVectors(y,S),T.reflect(g).negate(),T.add(y),O.position.copy(w),O.up.set(0,1,0),O.up.applyMatrix4(x),O.up.reflect(g),O.lookAt(T),O.far=n.far,O.updateMatrixWorld(),O.projectionMatrix.copy(n.projectionMatrix),D.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),D.multiply(O.projectionMatrix),D.multiply(O.matrixWorldInverse),D.multiply(r.matrixWorld),m.setFromNormalAndCoplanarPoint(g,y),m.applyMatrix4(O.matrixWorldInverse),C.set(m.normal.x,m.normal.y,m.normal.z,m.constant);let i=O.projectionMatrix;E.x=(Math.sign(C.x)+i.elements[8])/i.elements[0],E.y=(Math.sign(C.y)+i.elements[9])/i.elements[5],E.z=-1,E.w=(1+i.elements[10])/i.elements[14],C.multiplyScalar(2/C.dot(E)),i.elements[2]=C.x,i.elements[6]=C.y,i.elements[10]=C.z+1-d,i.elements[14]=C.w,r.visible=!1;let a=e.getRenderTarget(),o=e.xr.enabled,s=e.shadowMap.autoUpdate;e.xr.enabled=!1,e.shadowMap.autoUpdate=!1,e.setRenderTarget(k),e.state.buffers.depth.setMask(!0),e.autoClear===!1&&e.clear(),e.render(t,O),e.xr.enabled=o,e.shadowMap.autoUpdate=s,e.setRenderTarget(a);let c=n.viewport;c!==void 0&&e.state.viewport(c),r.visible=!0},this.getRenderTarget=function(){return k},this.dispose=function(){k.dispose(),r.material.dispose()}}};Le.ReflectorShader={name:`ReflectorShader`,uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
		uniform mat4 textureMatrix;
		varying vec4 vUv;

		#include <common>
		#include <logdepthbuf_pars_vertex>

		void main() {

			vUv = textureMatrix * vec4( position, 1.0 );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

			#include <logdepthbuf_vertex>

		}`,fragmentShader:`
		uniform vec3 color;
		uniform sampler2D tDiffuse;
		varying vec4 vUv;

		#include <logdepthbuf_pars_fragment>

		float blendOverlay( float base, float blend ) {

			return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );

		}

		vec3 blendOverlay( vec3 base, vec3 blend ) {

			return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );

		}

		void main() {

			#include <logdepthbuf_fragment>

			vec4 base = texture2DProj( tDiffuse, vUv );
			gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};function Re(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new F,l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let e in d.morphAttributes){if(!i.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;o[e]===void 0&&(o[e]=[]),o[e].push(d.morphAttributes[e])}if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=ze(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=ze(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}return c}function ze(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new M(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}function Be(e,t=1e-4){t=Math.max(t,2**-52);let n={},r=e.getIndex(),i=e.getAttribute(`position`),a=r?r.count:i.count,o=0,s=Object.keys(e.attributes),c={},l={},u=[],d=[`getX`,`getY`,`getZ`,`getW`],f=[`setX`,`setY`,`setZ`,`setW`];for(let t=0,n=s.length;t<n;t++){let n=s[t],r=e.attributes[n];c[n]=new r.constructor(new r.array.constructor(r.count*r.itemSize),r.itemSize,r.normalized);let i=e.morphAttributes[n];i&&(l[n]||(l[n]=[]),i.forEach((e,t)=>{let r=new e.array.constructor(e.count*e.itemSize);l[n][t]=new e.constructor(r,e.itemSize,e.normalized)}))}let p=t*.5,m=10**Math.log10(1/t),h=p*m;for(let t=0;t<a;t++){let i=r?r.getX(t):t,a=``;for(let t=0,n=s.length;t<n;t++){let n=s[t],r=e.getAttribute(n),o=r.itemSize;for(let e=0;e<o;e++)a+=`${~~(r[d[e]](i)*m+h)},`}if(a in n)u.push(n[a]);else{for(let t=0,n=s.length;t<n;t++){let n=s[t],r=e.getAttribute(n),a=e.morphAttributes[n],u=r.itemSize,p=c[n],m=l[n];for(let e=0;e<u;e++){let t=d[e],n=f[e];if(p[n](o,r[t](i)),a)for(let e=0,r=a.length;e<r;e++)m[e][n](o,a[e][t](i))}}n[a]=o,u.push(o),o++}}let g=e.clone();for(let t in e.attributes){let e=c[t];if(g.setAttribute(t,new e.constructor(e.array.slice(0,o*e.itemSize),e.itemSize,e.normalized)),t in l)for(let e=0;e<l[t].length;e++){let n=l[t][e];g.morphAttributes[t][e]=new n.constructor(n.array.slice(0,o*n.itemSize),n.itemSize,n.normalized)}}return g.setIndex(u),g}function Ve(e){return .43*Math.sin(Math.PI*(.1+.84*e))**.75*(.5+.5*e)}function G(e,t,n,r,i,a){let o=e.pos.length/3,s=new v;for(let o=0;o<n;o++){let c=o/(n-1);for(let l=0;l<r;l++){let u=l/(r-1)*2-1,d=Ve(c),f=o===n-1?.09*(1-Math.abs(u)):0;s.set(u*d,c*.5-f,i*u*u*d+a*c*c),s.applyMatrix4(t),e.pos.push(s.x,s.y,s.z),e.nor.push(0,0,1),e.part.push(c,u,0)}}for(let t=0;t<n-1;t++)for(let n=0;n<r-1;n++){let i=o+t*r+n,a=i+r;e.idx.push(i,i+1,a,i+1,a+1,a)}}function He(e,t){for(let n=0;n<t;n++){let r=n/t*Math.PI*2+n%2*.3,i=.11+n%3*.025,a=.13+n%2*.03,o=e.pos.length/3,s=-Math.sin(r)*.012,c=Math.cos(r)*.012;e.pos.push(s,c,.02,-s,-c,.02,Math.cos(r)*i,Math.sin(r)*i,a),e.nor.push(0,0,1,0,0,1,0,0,1),e.part.push(0,-1,1,0,1,1,1,0,1),e.idx.push(o,o+1,o+2)}}function Ue(e){let t=new F;return t.setAttribute(`position`,new w(e.pos,3)),t.setAttribute(`normal`,new w(e.nor,3)),t.setAttribute(`part`,new w(e.part,3)),t.setIndex(e.idx),t.computeVertexNormals(),t}function We(e){let t={pos:[],nor:[],part:[],idx:[]},n=[4,5,8][e],r=[3,3,5][e],i=new h,a=new h,o=new h,s=new h;for(let e=0;e<5;e++){let c=e/5*Math.PI*2+e%2*.06,l=.42+e%3*.06;a.makeRotationZ(c-Math.PI/2),o.makeRotationX(l),s.makeTranslation(0,.045,0),i.copy(a).multiply(o).multiply(s),G(t,i,n,r,.2,.12)}return e>0&&He(t,e===2?14:6),Ue(t)}function Ge(){let e={pos:[],nor:[],part:[],idx:[]};return G(e,new h().makeTranslation(0,-.25,0),5,3,.25,.08),Ue(e)}function K(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}var q=(e,t,n)=>t+(n-t)*e(),Ke=new v(0,1,0);function qe(e){let t=K(e.seed),n=(e,n)=>q(t,e,n),i=[],a=[],o=1,s=(t,r,c,l,u,d)=>{let f=Math.max(3,8-u),p=[t.clone()],m=[d],h=t.clone(),g=r.clone().normalize(),_=c/f;for(let t=1;t<=f;t++)g.x+=n(-1,1)*(u?.2:.09),g.z+=n(-1,1)*(u?.2:.09),g.y+=n(-1,1)*.08-e.droop*u*.035*(t/f)+(u===0?.04:0),g.normalize(),h.addScaledVector(g,_),p.push(h.clone()),m.push(d+_*t);let y=l*(u>=e.depth?.3:.6);if(i.push({pts:p,path:m,r0:l,r1:y,depth:u}),o=Math.max(o,d+c),u>=e.depth){a.push({p:h.clone(),d:g.clone(),path:d+c});return}let b=u===0?e.children[0]+2:Math.round(n(e.children[0],e.children[1])),x=n(0,Math.PI*2);for(let t=0;t<b;t++){let r=u===0?.5+.5*(t/Math.max(1,b-1)):t===b-1?1:n(.35,.95),i=Math.min(f-.001,r*f),a=Math.floor(i),o=p[a].clone().lerp(p[a+1],i-a),m=p[a+1].clone().sub(p[a]).normalize(),h=new v().crossVectors(Ke,m);h.lengthSq()<1e-4&&h.set(1,0,0),h.normalize().applyAxisAngle(m,x+t*2.39996+n(-.4,.4));let g=t===b-1&&u>0?n(.15,.45):n(.5,1),_=m.clone().multiplyScalar(Math.cos(g)).addScaledVector(h,Math.sin(g));_.y=_.y*(1-e.spread*.5)+.12,_.normalize();let S=l+(y-l)*r;s(o,_,c*n(.62,.8),S*n(.6,.72),u+1,d+c*r)}};s(e.base,e.lean,e.trunkLength,e.trunkRadius,0,0);let c=[],l=[],u=[],d=[],f=[],p=new v,m=new v,g=new v,_=new v,y=[];for(let t of i){let n=Math.max(4,e.radial-t.depth*2),r=c.length/3,i=t.pts.length;for(let e=0;e<i;e++){let r=t.pts[Math.max(0,e-1)],a=t.pts[Math.min(i-1,e+1)];g.subVectors(a,r).normalize(),e===0?p.crossVectors(g,Math.abs(g.y)>.9?new v(1,0,0):Ke).normalize():p.addScaledVector(g,-p.dot(g)).normalize(),m.crossVectors(g,p).normalize();let s=e/(i-1),f=t.r0+(t.r1-t.r0)*s;t.depth===0&&(f*=1+.8*(1-s)**7);let h=(t.path[e]/o)**2;for(let r=0;r<=n;r++){let i=r/n*Math.PI*2,a=1+.08*Math.sin(i*3+e*1.7+t.depth*2.1)+(t.depth===0?.06*Math.sin(i*7+e):0);_.copy(p).multiplyScalar(Math.cos(i)).addScaledVector(m,Math.sin(i));let o=t.pts[e];c.push(o.x+_.x*f*a,o.y+_.y*f*a,o.z+_.z*f*a),l.push(_.x,_.y,_.z),u.push(r/n*Math.max(1,f*14),t.path[e]*2.2),d.push(h)}}for(let e=0;e<i-1;e++)for(let t=0;t<n;t++){let i=r+e*(n+1)+t,a=i+n+1;f.push(i,a,i+1,i+1,a,a+1)}(t.depth===2||t.depth===3)&&y.push(t.pts[Math.floor(i*.6)].clone())}let b=new F;b.setAttribute(`position`,new w(c,3)),b.setAttribute(`normal`,new w(l,3)),b.setAttribute(`uv`,new w(u,2)),b.setAttribute(`flex`,new w(d,1)),b.setIndex(f);let x=new v;a.forEach(e=>x.add(e.p)),x.divideScalar(Math.max(1,a.length));let S=.1;a.forEach(e=>{S=Math.max(S,Math.hypot(e.p.x-x.x,e.p.z-x.z))});let C=[],T=[],E=new r,D=new r,O=new v,k=new v,A=new v,j=new v,M=new v(0,0,1),N=(r,i,a,s)=>{let c=(s/o)**2;A.set(r.x-x.x,(r.y-x.y)*.6+.4,r.z-x.z).normalize();for(let o=0;o<a;o++){k.set(n(-1,1),n(-.7,.7),n(-1,1)),k.lengthSq()>1&&k.multiplyScalar(.7),k.multiplyScalar(i);let a=r.clone().add(k);O.copy(k).normalize().multiplyScalar(.8).addScaledVector(A,.7),O.x+=n(-.5,.5),O.y+=n(-.6,.35),O.z+=n(-.5,.5),O.normalize(),E.setFromUnitVectors(M,O),D.setFromAxisAngle(O,n(0,Math.PI*2)),E.premultiply(D);let o=e.flowerSize*n(.78,1.18);j.set(o,o,o);let s=re.clamp(Math.hypot(a.x-x.x,a.z-x.z)/S,0,1);C.push({m:new h().compose(a,E.clone(),j.clone()),flex:c+.02,tint:t(),phase:n(0,6.283),shade:s})}};for(let i of a){N(i.p,.26,e.flowersPerTip,i.path);for(let a=0;a<2;a++){let a=i.p.clone().add(new v(n(-.12,.12),n(-.1,.05),n(-.12,.12))),s=n(.08,.15)*(e.flowerSize/.075);T.push({m:new h().compose(a,new r,new v(s,s*.8,s)),flex:(i.path/o)**2,tint:t(),phase:n(0,6.283),shade:.5})}}for(let t of i)if(!(t.depth<e.depth-1))for(let n=1;n<t.pts.length;n++)N(t.pts[n],.12,t.depth>=e.depth?2:3,t.path[n]);return{bark:b,flowers:C,puffs:T,anchors:y,center:x,radius:S}}var J={x:-.8,z:3.4,rx:5.6,rz:3.4};function Je(e){return-1.2+Math.sin(e*.12)*3.2}function Ye(e){return 1.35+Math.max(0,-e)*.012}function Xe(e,t){let n=(e-J.x)/J.rx,r=(t-J.z)/J.rz,i=(Math.hypot(n,r)-1)*Math.min(J.rx,J.rz)+Math.sin(e*1.3)*.25+Math.sin(t*1.7+1)*.2,a=t<2.5?Math.abs(e-Je(t))-Ye(t)+Math.sin(t*.9)*.18:99;return Math.min(i,a)}var Y=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)};function X(e,t){let n=Xe(e,t);return-.55+(.32+.22*Math.sin(e*.33+1)*Math.sin(t*.29)+.1*Math.sin(e*.9+t*.7)+.05*Math.sin(e*2.3-t*1.9)+(Y(14,55,Math.abs(e-Je(t)))*7+(t<-35?(-t-35)*.06:0)+(t>12?(t-12)*.15:0))+.55)*Y(-.2,2,n)}var Z=(e,t,n)=>new v(e,t,n);function Ze(e,t,n){let r=new b(e,t,n.length),i=new Float32Array(n.length*4);return n.forEach((e,t)=>{r.setMatrixAt(t,e.m),i.set([e.flex,e.tint,e.phase,e.shade],t*4)}),e.setAttribute(`inst`,new E(i,4)),r.instanceMatrix.needsUpdate=!0,r.computeBoundingSphere(),r}function Qe(){let e=Be(new j(1,3).deleteAttribute(`normal`).deleteAttribute(`uv`)),t=e.attributes.position,n=new Float32Array(t.count*3),r=K(7);for(let e=0;e<t.count;e++){let i=.82+.3*r();t.setXYZ(e,t.getX(e)*i,t.getY(e)*i,t.getZ(e)*i),n.set([.3+.5*r(),r()*2-1,2],e*3)}return e.setAttribute(`part`,new M(n,3)),e.computeVertexNormals(),e}function Q(e,t,n=.08,r=1){let i=e.index?e.toNonIndexed():e,a=i.attributes.position.count,o=new Float32Array(a*3),s=new N(t),c=K(r);for(let e=0;e<a;e+=3){let t=1+(c()-.5)*n*2;for(let n=0;n<3&&e+n<a;n++)o.set([s.r*t,s.g*t,s.b*t],(e+n)*3)}return i.setAttribute(`color`,new M(o,3)),i.attributes.uv&&i.deleteAttribute(`uv`),i}function $e(e,t){let n=new j(t,2),r=n.attributes.position;for(let n=0;n<r.count;n++){let i=r.getX(n),a=r.getY(n),o=r.getZ(n),s=1+.22*Math.sin(i*4+e)*Math.sin(o*3.3+e*2)+.1*Math.sin(a*9+e);r.setXYZ(n,i*s*1.25,Math.max(a*s*.7,-t*.2),o*s)}return n.computeVertexNormals(),Q(n,`#3b3540`,.12,e)}function et(){let e=[],t=6.4,n=1.5,r=1.05,i=e=>.25+r*Math.sin(Math.PI*e);for(let a=0;a<22;a++){let o=(a+.5)/22,s=(o-.5)*t,c=new I(.31090909090909097,.09,n),l=Math.atan(r*Math.PI*Math.cos(Math.PI*o)/t);c.rotateZ(l),c.translate(s,i(o),0),e.push(Q(c,a%2?`#5a2a24`:`#61302a`,.06,a))}for(let r of[-1,1]){for(let a=0;a<=8;a++){let o=a/8,s=(o-.5)*t,c=new I(.09,.8,.09);c.translate(s,i(o)+.4,r*(n/2-.05)),e.push(Q(c,`#9b2f2a`,.05,a+30))}let a=Array.from({length:24},(e,a)=>{let o=a/23;return Z((o-.5)*t,i(o)+.78,r*(n/2-.05))});e.push(Q(new m(new D(a),40,.045,6),`#a8322c`,.03,r+50));let o=Array.from({length:24},(e,a)=>{let o=a/23;return Z((o-.5)*t,i(o)+.45,r*(n/2-.05))});e.push(Q(new m(new D(o),40,.03,5),`#8f2a26`,.03,r+60))}return Re(e)}function tt(){return Re([new A(.34,.42,.18,8).translate(0,.09,0),new A(.11,.14,.75,8).translate(0,.55,0),new A(.3,.24,.12,6).translate(0,.98,0),new I(.06,.3,.06).translate(.17,1.19,.17),new I(.06,.3,.06).translate(-.17,1.19,.17),new I(.06,.3,.06).translate(.17,1.19,-.17),new I(.06,.3,.06).translate(-.17,1.19,-.17),new S(.52,.32,6).translate(0,1.5,0),new u(.08,10,8).translate(0,1.7,0)].map((e,t)=>Q(e,`#4a4450`,.1,t+80)))}function nt(e,t){let n=new p,i=ge(),o=e.mobile,s=[],c=e=>(s.push(e),e),l=new a(c(new u(400,48,24)),c(Oe(i)));l.renderOrder=-10,l.frustumCulled=!1,n.add(l),[[-190,10,22,.02,1.3,.85],[-130,6,14,.035,4.1,.62],[-85,3,8,.055,8.7,.42]].forEach(([e,t,r,o,s,l],u)=>{let d=new a(c(new f(900,90)),c(ke(i,t,r,o,s,l)));d.position.set(0,35,e),d.renderOrder=-9+u,n.add(d)});let d=o?150:260,m=c(new f(150,150,d,d));m.rotateX(-Math.PI/2),m.translate(0,0,-45);let g=m.attributes.position;for(let e=0;e<g.count;e++)g.setY(e,X(g.getX(e),g.getZ(e)));m.computeVertexNormals();let _=[{seed:11,base:Z(4.6,X(4.6,.6)-.1,.6),lean:Z(-.32,1,.12),trunkLength:2.5,trunkRadius:.34,depth:o?5:6,children:[2,3],flowersPerTip:o?18:26,flowerSize:.08,radial:14,spread:.65,droop:.35,palette:xe,detail:1},{seed:23,base:Z(-7.4,X(-7.4,-3.5)-.1,-3.5),lean:Z(.25,1,.05),trunkLength:2,trunkRadius:.26,depth:o?4:5,children:[2,3],flowersPerTip:o?18:24,flowerSize:.085,radial:12,spread:.6,droop:.6,palette:Se,detail:1}];(o?[[3.5,-13,31],[-8,-18,37],[5,-27,41]]:[[3.5,-13,31],[-8,-18,37],[5,-27,41],[-3,-34,43],[8.5,-21,47],[-11,-9,53]]).forEach(([e,t,n])=>_.push({seed:n,base:Z(e,X(e,t)-.1,t),lean:Z(q(K(n),-.3,.3),1,0),trunkLength:1.8,trunkRadius:.22,depth:4,children:[2,3],flowersPerTip:o?18:26,flowerSize:.11,radial:8,spread:.6,droop:.4,palette:n%2?xe:Se,detail:0}));let y=[c(We(0)),c(We(1)),c(We(2))],x=c(Qe()),S=c(Te(i)),D={pink:c(Ce(i,xe)),deep:c(Ce(i,Se))},O=[];for(let e of _){let t=qe(e);O.push(t),c(t.bark),n.add(new a(t.bark,S));let r=e.palette===xe?D.pink:D.deep;n.add(Ze(y[e.detail].clone(),r,t.flowers)),e.detail===0&&n.add(Ze(x.clone(),r,t.puffs.map(e=>({...e,shade:.35}))))}let A=O[0],j=t.look.clone().sub(t.pos).normalize(),P=new v().crossVectors(j,Z(0,1,0)).normalize(),ee=new v().crossVectors(P,j).normalize(),ne=qe({seed:5,base:t.pos.clone().addScaledVector(j,3.4).addScaledVector(ee,o?1.5:1.25).addScaledVector(P,o?1.6:2.9),lean:P.clone().multiplyScalar(-1).addScaledVector(ee,-.25).addScaledVector(j,-.15),trunkLength:.9,trunkRadius:.035,depth:3,children:[2,3],flowersPerTip:7,flowerSize:.05,radial:8,spread:.3,droop:.9});c(ne.bark);let re=new a(ne.bark,S),L=Ze(c(y[2].clone()),D.pink,ne.flowers.map(e=>({...e,flex:.12+e.flex*.1,shade:1})));re.layers.set(1),L.layers.set(1),n.add(re,L);let ae=[],R=K(91);for(let e=0;e<(o?160:380);e++){let e=q(R,-75,-22),t=R()<.5?-1:1,n=Je(e)+t*q(R,9,40),i=X(n,e)+q(R,.8,2.6),a=q(R,.7,1.5);ae.push({m:new h().compose(Z(n,i,e),new r,Z(a,a*.75,a)),flex:.03,tint:R(),phase:0,shade:.55})}n.add(Ze(x.clone(),D.deep,ae));let z=[],oe=A.anchors.filter(e=>e.y>2.1&&e.y<4.2).sort((e,t)=>Math.hypot(t.x-A.center.x,t.z-A.center.z)-Math.hypot(e.x-A.center.x,e.z-A.center.z)).slice(0,3),se=[],ce=[];oe.forEach((e,t)=>{let n=.55+t*.12,i=e.clone().add(Z(0,-n,0));z.push(i),se.push({m:new h().compose(i,new r,Z(1,1.25,1)),flex:.25,tint:t/3,phase:0,shade:1}),ce.push(e.x,e.y,e.z,i.x,i.y+.2,i.z)});let le=Ze(c(new u(.17,24,16)),c(Ae(i,`#ff8a5c`,4.5)),se);n.add(le);let ue=c(new F);ue.setAttribute(`position`,new w(ce,3)),n.add(new ie(ue,c(new te({color:new N(`#1a1014`)}))));let de=c(Ee(i)),B=Z(J.x+3.4,0,J.z+2.6);B.y=X(B.x,B.z)-.05;let fe=new a(c(tt()),de);fe.position.copy(B),n.add(fe);let pe=new b(c(new I(.24,.22,.24)),c(Ae(i,`#ffb36b`,5.5)),1);for(pe.geometry.setAttribute(`inst`,new E(new Float32Array([0,0,0,1]),4)),pe.setMatrixAt(0,new h().makeTranslation(B.x,B.y+1.19,B.z)),n.add(pe),z.push(B.clone().add(Z(0,1.2,0)));z.length<4;)z.push(Z(0,-50,0));i.uLamps.value.forEach((e,t)=>e.copy(z[t]));let me=-9.5,he=new a(c(et()),de);he.position.set(Je(me),0,me),he.rotation.y=.12,he.scale.set((Ye(me)*2+2.2)/6.4,1,1),n.add(he);let V=K(44);for(let e=0;e<(o?10:18);e++){let t=e/18*Math.PI*2+q(V,-.15,.15),r=J.x+Math.cos(t)*(J.rx+q(V,-.2,.6)),i=J.z+Math.sin(t)*(J.rz+q(V,-.2,.6));if(i<J.z-2.6&&Math.abs(r-Je(i))<2)continue;let o=new a(c($e(e*3.7,q(V,.25,.7))),de);o.position.set(r,X(r,i)-.08,i),o.rotation.y=V()*6.28,n.add(o)}n.add(new a(m,c(De(i,O.slice(0,2).map(e=>e.center)))));let H=null,U=c(new f(150,150));U.rotateX(-Math.PI/2);let W=new a(U,c(Pe(i)));if(W.position.set(0,0,-45),W.visible=!e.reflect,n.add(W),e.reflect){let t=Ne(i);H=new Le(U,{textureWidth:Math.round(window.innerWidth*e.px*.6),textureHeight:Math.round(window.innerHeight*e.px*.6),clipBias:.003,shader:t,multisample:0});let r=H.material.uniforms;for(let e of Object.keys(i))r[e]=i[e];H.position.set(0,0,-45),n.add(H)}let _e=o?14e3:42e3,ve=new T;ve.setAttribute(`position`,new w([-.012,0,0,.012,0,0,0,1,0],3));let ye=new Float32Array(_e*4),be=K(52),Fe=0;for(let e=0;Fe<_e&&e<_e*6;e++){let e=q(be,-16,16),t=q(be,-24,15),n=X(e,t);if(n<.05)continue;let r=Math.sin(e*.7)*Math.sin(t*.6+1)+Math.sin(e*2.1+t*1.3)*.5;if(r<-.2&&be()<.8)continue;let i=q(be,.12,.34)*(.7+.3*r);ye.set([e,n-.01,t,Math.max(.06,i)],Fe*4),Fe++}ve.setAttribute(`blade`,new E(ye.subarray(0,Fe*4),4)),ve.instanceCount=Fe,c(ve);let Re=c(Ie(i)),ze=new a(ve,Re);ze.frustumCulled=!1,ze.layers.set(1),n.add(ze);let Be=c(Ge()),Ve=[],G=K(66),He=new r,Ue=new C;for(let e=0;e<(o?1400:4200);e++){let t=O[e%2],n=G()*6.283,r=Math.sqrt(G())*t.radius*1.5,i=t.center.x+Math.cos(n)*r,a=t.center.z+Math.sin(n)*r,o=Math.max(X(i,a),0)+.012;Ue.set(-Math.PI/2+q(G,-.3,.3),G()*6.283,q(G,-.3,.3),`YXZ`),He.setFromEuler(Ue);let s=q(G,.05,.075);Ve.push({m:new h().compose(Z(i,o,a),He.clone(),Z(s,s,s)),flex:o<.05?.06:0,tint:G(),phase:G()*6,shade:.75})}let Ke=Ze(Be.clone(),D.pink,Ve);Ke.layers.set(1),n.add(Ke);let Xe=o?320:900,Y=new T;Y.index=Be.index,Y.setAttribute(`position`,Be.attributes.position),Y.setAttribute(`normal`,Be.attributes.normal),Y.setAttribute(`part`,Be.attributes.part);let Q=new Float32Array(Xe*4),nt=new Float32Array(Xe*3),$=K(77),rt=[...A.flowers,...O[1].flowers,...ne.flowers],it=new v;for(let e=0;e<Xe;e++){Q.set([$(),$(),$(),$()],e*4);let t=e%9==0?ne.flowers:e%4==0?O[1].flowers:rt;it.setFromMatrixPosition(t[Math.floor($()*t.length)].m),nt.set([it.x,it.y,it.z],e*3)}Y.setAttribute(`seed`,new E(Q,4)),Y.setAttribute(`spawn`,new E(nt,3)),Y.instanceCount=Xe,c(Y);let at=new a(Y,c(we(i,.075)));at.frustumCulled=!1,n.add(at);let ot=o?70:170,st=new Float32Array(ot*3),ct=new Float32Array(ot*4),lt=K(31);for(let e=0;e<ot;e++){let t=q(lt,-16,9),n=Je(t)+q(lt,-7,8);st.set([n,Math.max(X(n,t),0)+q(lt,.3,3.2),t],e*3),ct.set([lt(),lt(),lt(),lt()],e*4)}let ut=c(new F);ut.setAttribute(`position`,new M(st,3)),ut.setAttribute(`seed`,new M(ct,4));let dt=new k(ut,c(je(i,window.innerHeight*e.px)));dt.frustumCulled=!1,n.add(dt);let ft=c(Me(i));return[[-4,26,.2],[-14,40,.1],[-26,60,-.1],[4,30,.35]].forEach(([e,t,r])=>{let i=new a(c(new f(t,3.2)),ft);i.position.set(Je(e),1.1,e),i.rotation.y=r,i.layers.set(1),n.add(i)}),{scene:n,shared:i,reflector:H,update:e=>{l.position.copy(e.position)},dropReflection:()=>!H||!H.visible?!1:(H.visible=!1,W.visible=!0,!0),dispose:()=>{s.forEach(e=>e.dispose()),n.traverse(e=>{let t=e;t.geometry&&t.geometry.dispose()}),H?.dispose()}}}var $=[{at:0,pos:new v(-1.8,1.7,13.8),look:new v(1.6,2.9,0)},{at:.18,pos:new v(.4,1.05,9.2),look:new v(-2.2,1.7,-6)},{at:.38,pos:new v(3,2.2,4.4),look:new v(4,5,-.5)},{at:.58,pos:new v(-1.8,1.5,-1.5),look:new v(-4.2,1.3,-9.5)},{at:.78,pos:new v(-4,2.3,-8.2),look:new v(-1.5,1.6,-24)},{at:1,pos:new v(-2.5,6.5,-5.5),look:new v(.5,1.5,-30)}],rt=new D($.map(e=>e.pos),!1,`centripetal`),it=new D($.map(e=>e.look),!1,`centripetal`);function at(e,t,n,r){let i=Math.min(1,Math.max(0,e)),a=0;for(;a<$.length-2&&i>$[a+1].at;)a++;let o=$[a],s=$[a+1],c=(i-o.at)/(s.at-o.at),l=(a+c)/($.length-1);if(rt.getPoint(l,n),it.getPoint(l,r),t<1){let e=r.clone().sub(n).normalize();n.addScaledVector(e,-(1-t)*3.5),r.x+=(1-t)*1.6}}var ot=n();function st({mobile:e,still:t,dimmed:n,dive:r,onReady:a}){let o=(0,ae.useRef)(null),c=(0,ae.useRef)({dimmed:n,dive:r,still:t});c.current={dimmed:n,dive:r,still:t};let l=(0,ae.useRef)(a);return l.current=a,(0,ae.useEffect)(()=>{let t=o.current;if(!t)return;let n=new y({antialias:!1,powerPreference:`high-performance`,alpha:!1,stencil:!1});n.toneMapping=4,n.toneMappingExposure=1,n.outputColorSpace=d;let r=Math.min(window.devicePixelRatio||1,e?1.5:2);n.setPixelRatio(r),n.setSize(t.clientWidth||window.innerWidth,t.clientHeight||window.innerHeight,!1),n.setClearColor(459789,1),t.appendChild(n.domElement);let a=new s(38,1,.05,900);a.layers.enable(1);let u=$[0],f=nt({mobile:e,reflect:!0,px:e?.6:Math.min(r,1.5)},{pos:u.pos,look:u.look}),p=new _(1,1,{type:P,samples:e?0:4}),m=new B(n,p);m.addPass(new me(f.scene,a));let h=new V(new i(256,256),.6,.55,.85);m.addPass(h),m.addPass(new pe);let g=new le(Fe);m.addPass(g);let b=()=>{let e=t.clientWidth||window.innerWidth,i=t.clientHeight||window.innerHeight;n.setPixelRatio(r),n.setSize(e,i,!1),m.setPixelRatio(r),m.setSize(e,i),h.resolution.set(e*r*.5,i*r*.5),a.aspect=e/i,a.updateProjectionMatrix(),g.uniforms.uRes.value.set(e*r,i*r),f.reflector?.getRenderTarget().setSize(Math.round(e*r*.6),Math.round(i*r*.6)),O(0)},x=8,S=D(),C=0,w=new v,T=new v,E=new v;function D(){let e=document.documentElement.scrollHeight-window.innerHeight;return e>0?Math.min(1,Math.max(0,window.scrollY/e)):0}function O(e){let{dimmed:t,dive:n}=c.current,r=c.current.still||document.documentElement.dataset.gardenSnap===`1`;t||(S+=(D()-S)*(r?1:1-Math.exp(-e*2.6))),C+=(+!!n-C)*(r?1:1-Math.exp(-e*(n?2.2:1.4))),at(S,a.aspect,w,T),r||(w.x+=Math.sin(x*.11)*.22,w.y+=Math.sin(x*.17+1)*.1,T.x+=Math.sin(x*.09+2)*.25),E.subVectors(T,w).normalize(),w.addScaledVector(E,C*6),a.position.copy(w),a.lookAt(T),a.fov=(a.aspect<1?52:38)-C*10,a.updateProjectionMatrix(),f.shared.uTime.value=x,f.shared.uWind.value=1,g.uniforms.uTime.value=x,f.update(a),m.render(e)}n.compile(f.scene,a),b();let k=0,A=performance.now(),j=0,M=0,N=!1,F=!1,ee=t=>{k=requestAnimationFrame(ee);let n=Math.min(.05,(t-A)/1e3);if(document.hidden){A=t;return}if(c.current.still){A=t;return}c.current.dimmed&&(N=!N,N)||(A=t,x+=n,O(n),F||(F=!0,l.current()),j++,j>30&&n>.026&&M++,j%90==0&&(M>45&&(r>(e?.75:1)?(r=Math.max(e?.75:1,r-.25),b()):f.dropReflection()),M=0))},I=()=>{c.current.still&&O(0)};return window.addEventListener(`resize`,b),window.addEventListener(`scroll`,I,{passive:!0}),c.current.still?(O(0),l.current()):k=requestAnimationFrame(ee),()=>{cancelAnimationFrame(k),window.removeEventListener(`resize`,b),window.removeEventListener(`scroll`,I),f.dispose(),m.dispose(),p.dispose(),n.dispose(),n.domElement.remove()}},[e]),(0,ot.jsx)(`div`,{ref:o,className:`garden-3d`})}export{st as default};