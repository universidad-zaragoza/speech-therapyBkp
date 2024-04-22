const s=Object.create(null);s.open="0",s.close="1",s.ping="2",s.pong="3",s.message="4",s.upgrade="5",s.noop="6";const b=Object.create(null);Object.keys(s).forEach(t=>{b[s[t]]=t});const w={type:"error",data:"parser error"},U=typeof Blob=="function"||typeof Blob<"u"&&Object.prototype.toString.call(Blob)==="[object BlobConstructor]",m=typeof ArrayBuffer=="function",k=t=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(t):t&&t.buffer instanceof ArrayBuffer,p=({type:t,data:n},r,e)=>U&&n instanceof Blob?r?e(n):D(n,e):m&&(n instanceof ArrayBuffer||k(n))?r?e(n):D(new Blob([n]),e):e(s[t]+(n||"")),D=(t,n)=>{const r=new FileReader;return r.onload=function(){const e=r.result.split(",")[1];n("b"+(e||""))},r.readAsDataURL(t)};function O(t){return t instanceof Uint8Array?t:t instanceof ArrayBuffer?new Uint8Array(t):new Uint8Array(t.buffer,t.byteOffset,t.byteLength)}let d;function q(t,n){if(U&&t.data instanceof Blob)return t.data.arrayBuffer().then(O).then(n);if(m&&(t.data instanceof ArrayBuffer||k(t.data)))return n(O(t.data));p(t,!1,r=>{d||(d=new TextEncoder),n(d.encode(r))})}const V="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",y=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(let t=0;t<V.length;t++)y[V.charCodeAt(t)]=t;const T=t=>{let n=t.length*.75,r=t.length,e,a=0,f,u,i,o;t[t.length-1]==="="&&(n--,t[t.length-2]==="="&&n--);const l=new ArrayBuffer(n),c=new Uint8Array(l);for(e=0;e<r;e+=4)f=y[t.charCodeAt(e)],u=y[t.charCodeAt(e+1)],i=y[t.charCodeAt(e+2)],o=y[t.charCodeAt(e+3)],c[a++]=f<<2|u>>4,c[a++]=(u&15)<<4|i>>2,c[a++]=(i&3)<<6|o&63;return l},x=typeof ArrayBuffer=="function",A=(t,n)=>{if(typeof t!="string")return{type:"message",data:j(t,n)};const r=t.charAt(0);return r==="b"?{type:"message",data:E(t.substring(1),n)}:b[r]?t.length>1?{type:b[r],data:t.substring(1)}:{type:b[r]}:w},E=(t,n)=>{if(x){const r=T(t);return j(r,n)}else return{base64:!0,data:t}},j=(t,n)=>{switch(n){case"blob":return t instanceof Blob?t:new Blob([t]);case"arraybuffer":default:return t instanceof ArrayBuffer?t:t.buffer}},C="",S=(t,n)=>{const r=t.length,e=new Array(r);let a=0;t.forEach((f,u)=>{p(f,!1,i=>{e[u]=i,++a===r&&n(e.join(C))})})},L=(t,n)=>{const r=t.split(C),e=[];for(let a=0;a<r.length;a++){const f=A(r[a],n);if(e.push(f),f.type==="error")break}return e};function R(){return new TransformStream({transform(t,n){q(t,r=>{const e=r.length;let a;if(e<126)a=new Uint8Array(1),new DataView(a.buffer).setUint8(0,e);else if(e<65536){a=new Uint8Array(3);const f=new DataView(a.buffer);f.setUint8(0,126),f.setUint16(1,e)}else{a=new Uint8Array(9);const f=new DataView(a.buffer);f.setUint8(0,127),f.setBigUint64(1,BigInt(e))}t.data&&typeof t.data!="string"&&(a[0]|=128),n.enqueue(a),n.enqueue(r)})}})}let B;function h(t){return t.reduce((n,r)=>n+r.length,0)}function g(t,n){if(t[0].length===n)return t.shift();const r=new Uint8Array(n);let e=0;for(let a=0;a<n;a++)r[a]=t[0][e++],e===t[0].length&&(t.shift(),e=0);return t.length&&e<t[0].length&&(t[0]=t[0].slice(e)),r}function M(t,n){B||(B=new TextDecoder);const r=[];let e=0,a=-1,f=!1;return new TransformStream({transform(u,i){for(r.push(u);;){if(e===0){if(h(r)<1)break;const o=g(r,1);f=(o[0]&128)===128,a=o[0]&127,a<126?e=3:a===126?e=1:e=2}else if(e===1){if(h(r)<2)break;const o=g(r,2);a=new DataView(o.buffer,o.byteOffset,o.length).getUint16(0),e=3}else if(e===2){if(h(r)<8)break;const o=g(r,8),l=new DataView(o.buffer,o.byteOffset,o.length),c=l.getUint32(0);if(c>Math.pow(2,21)-1){i.enqueue(w);break}a=c*Math.pow(2,32)+l.getUint32(4),e=3}else{if(h(r)<a)break;const o=g(r,a);i.enqueue(A(f?o:B.decode(o),n)),e=0}if(a===0||a>t){i.enqueue(w);break}}}})}const v=4;export{L as a,p as b,M as c,A as d,S as e,R as f,v as p};