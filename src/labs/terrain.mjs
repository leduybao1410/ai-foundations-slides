import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { terrainScore } from './core.mjs';
export function create(container,{gsap,reducedMotion,onSelect}){
 const renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'low-power'});
 renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));renderer.setClearColor(0xeaf3ee);renderer.outputColorSpace=THREE.SRGBColorSpace;
 container.append(renderer.domElement);
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(40,1,.1,100);
 camera.position.set(9,10,12);const controls=new OrbitControls(camera,renderer.domElement);controls.target.set(0,1,0);controls.enableDamping=false;controls.enablePan=false;controls.minDistance=7;controls.maxDistance=25;controls.maxPolarAngle=Math.PI*.48;
 scene.add(new THREE.HemisphereLight(0xffffff,0x274c3b,2.5));const light=new THREE.DirectionalLight(0xffffff,2);light.position.set(3,9,5);scene.add(light);
 const grid=new THREE.GridHelper(8,8,0xa5bdb0,0xc7dad0);grid.position.y=-.1;scene.add(grid);
 const group=new THREE.Group();scene.add(group);
 const markerGeometry=new THREE.SphereGeometry(.16,14,10),markerMaterial=new THREE.MeshStandardMaterial({color:0xbc5722,roughness:.4});
 const agent=new THREE.Mesh(markerGeometry,markerMaterial);scene.add(agent);
 const ring=new THREE.Mesh(new THREE.TorusGeometry(.25,.045,8,24),new THREE.MeshBasicMaterial({color:0x086850}));ring.rotation.x=-Math.PI/2;scene.add(ring);
 let currentPreset=null,cells=[],frame=null,dead=false,snapshot=null;
 function render(){frame=null;if(dead)return;controls.update();renderer.render(scene,camera);}
 function requestRender(){if(!frame&&!dead)frame=requestAnimationFrame(render);}
 controls.addEventListener('change',requestRender);
 function disposeGroup(){const geometries=new Set(),materials=new Set();group.traverse(obj=>{if(obj.geometry)geometries.add(obj.geometry);if(obj.material)materials.add(obj.material);});geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());group.clear();cells=[];}
 function rebuild(preset){
  disposeGroup();const vertices=[],colors=[],indices=[],color=new THREE.Color();
  for(let y=0;y<7;y++)for(let x=0;x<7;x++){const value=terrainScore(x,y,preset);vertices.push(x-3,value*.32,y-3);color.setHSL(.40+value*.006,.36,.76-value*.032);colors.push(color.r,color.g,color.b);}
  for(let y=0;y<6;y++)for(let x=0;x<6;x++){const a=y*7+x,b=a+1,c=a+7,d=c+1;indices.push(a,c,b,b,c,d);}
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));geometry.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));geometry.setIndex(indices);geometry.computeVertexNormals();
  group.add(new THREE.Mesh(geometry,new THREE.MeshStandardMaterial({vertexColors:true,side:THREE.DoubleSide,roughness:.95,metalness:0})));
  const lines=new THREE.LineSegments(new THREE.WireframeGeometry(geometry),new THREE.LineBasicMaterial({color:0x608f78,transparent:true,opacity:.35}));group.add(lines);
  const cellGeometry=new THREE.SphereGeometry(.065,8,6),cellMaterial=new THREE.MeshBasicMaterial({color:0x326c51});
  for(let y=0;y<7;y++)for(let x=0;x<7;x++){const cell=new THREE.Mesh(cellGeometry,cellMaterial);cell.position.set(x-3,terrainScore(x,y,preset)*.32+.03,y-3);cell.userData={x,y};cells.push(cell);group.add(cell);}
  currentPreset=preset;
 }
 const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();let down=null;
 function pointerDown(event){down=[event.clientX,event.clientY];}
 function pointerUp(event){if(!down||Math.hypot(event.clientX-down[0],event.clientY-down[1])>5)return;const rect=renderer.domElement.getBoundingClientRect();pointer.set((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1);raycaster.setFromCamera(pointer,camera);const hit=raycaster.intersectObjects(cells)[0];if(hit)onSelect(hit.object.userData.x,hit.object.userData.y);down=null;}
 renderer.domElement.addEventListener('pointerdown',pointerDown);renderer.domElement.addEventListener('pointerup',pointerUp);
 const resize=new ResizeObserver(()=>{const width=container.clientWidth,height=container.clientHeight;if(width&&height){renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();requestRender();}});resize.observe(container);
 function update(value,preset,animate=true,speed=1){
  if(dead)return;snapshot=value;if(currentPreset!==preset)rebuild(preset);
  const [x,y]=value.position,[bx,by]=value.best;
  gsap.killTweensOf(agent.position);
  const target={x:x-3,y:terrainScore(x,y,preset)*.32+.24,z:y-3};
  ring.position.set(bx-3,terrainScore(bx,by,preset)*.32+.12,by-3);
  if(animate&&!reducedMotion())gsap.to(agent.position,{...target,duration:.48/speed,onUpdate:requestRender,onComplete:requestRender});
  else agent.position.set(target.x,target.y,target.z);
  requestRender();
 }
 function reset(){controls.reset();camera.position.set(9,10,12);controls.target.set(0,1,0);requestRender();}
 function pause(){gsap.killTweensOf(agent.position);if(snapshot){const [x,y]=snapshot.position;agent.position.set(x-3,terrainScore(x,y,currentPreset)*.32+.24,y-3);}requestRender();}
 function dispose(){dead=true;gsap.killTweensOf(agent.position);if(frame)cancelAnimationFrame(frame);resize.disconnect();controls.dispose();renderer.domElement.removeEventListener('pointerdown',pointerDown);renderer.domElement.removeEventListener('pointerup',pointerUp);disposeGroup();for(const object of [grid,agent,ring]){object.geometry?.dispose();if(Array.isArray(object.material))object.material.forEach(m=>m.dispose());else object.material?.dispose();}renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();}
 return {update,reset,pause,dispose};
}
window.AILabTerrain={create};
