import{B as O,a as V,H as I,I as M,P as $,S as B,b as P,T as C,W as L,c as K,M as W,d as q,G as U,e as H,C as R,p as T}from"./gameManager-Bnz3ha-I.js";class l{constructor(t,s,o){this.pos=createVector(t,s),this.r=4,this.selected=!1,this.prevPos=createVector(t,s),this.parent=o}draw(){this.update(),push(),this.selected||this.pos.dist(mousePos)<this.r*2?(strokeWeight(1),stroke(0),fill(0,138,124)):fill(0,186,168),circle(this.pos.x,this.pos.y,this.r*2),pop()}update(){this.prevPos=this.pos.copy(),this.selected&&(this.pos=mousePos,this.parent.update(this,p5.Vector.sub(this.pos,this.prevPos)))}check(){return!mouseIsPressed&&this.selected&&(this.selected=!1),mouseIsPressed&&mouseButton!=CENTER&&!this.selected&&this.pos.dist(mousePos)<this.r*2&&(this.selected=!0),this.selected}toString(){return`${Math.round(this.pos.x)}, ${Math.round(this.pos.y)}`}}const k={[O]:"Ball",[V]:"Bouncer",[I]:"Hole",[M]:"Ice",[$]:"PolygonWall",[B]:"Sand",[P]:"Slope",[C]:"Teleporter",[L]:"Wall",[K]:"Water",[W]:"MovingPlatform"};class v{constructor(t,s=!0){this.obj=t,this.knot=new l(t.pos.x,t.pos.y,this),s&&main.staticKnots.push(this.knot)}draw(){this.obj.draw(),this.knot.draw()}update(){this.obj.pos=this.knot.pos.copy()}export(){return`new ${k[this.obj.constructor]}(${this.knot})`}}class f extends l{constructor(t,s,o){super(d(t),d(s),o)}update(){this.prevPos=this.pos.copy(),this.selected&&(this.pos=createVector(d(mousePos.x),d(mousePos.y)),this.parent.update(this,p5.Vector.sub(this.pos,this.prevPos)))}}function d(e){return round(e/50)*50}class D{constructor(){this.pos=createVector(width/2,height/2),this.scale=1}draw(){translate(width/2,height/2),scale(this.scale),translate(-this.pos.x,-this.pos.y),this.offset?window.mousePos=p5.Vector.sub(this.offset,createVector(mouseX,mouseY)).div(this.scale):window.mousePos=createVector(mouseX,mouseY).sub(createVector(width/2,height/2)).div(this.scale).add(this.pos),this.offset&&(this.pos=mousePos.add(this.initialPos))}drawGrid(){push(),strokeWeight(1);for(let t=d(this.pos.x-width/2/this.scale);t<=d(this.pos.x+width/2/this.scale);t+=25)stroke(255,t%50==0?125:50),line(t,this.pos.y-height/2/this.scale,t,this.pos.y+height/2/this.scale);for(let t=d(this.pos.y-height/2/this.scale);t<=d(this.pos.y+height/2/this.scale);t+=25)stroke(255,t%50==0?125:50),line(this.pos.x-width/2/this.scale,t,this.pos.x+width/2/this.scale,t);pop()}beginMove(){this.initialPos=this.pos.copy(),this.offset=createVector(mouseX,mouseY)}endMove(){this.initialPos=null,this.offset=null}changeScale(t){t>0?this.scale*=.9:this.scale*=1.1}}class G{constructor(){this.knots=[new f(0,0,this),new f(width,0,this),new f(width,height,this),new f(0,height,this)],main.staticKnots.push(...this.knots)}draw(){push(),fill(94,230,83),strokeWeight(3),stroke(255),beginShape();for(const t of this.knots)vertex(t.pos.x,t.pos.y);endShape(CLOSE),pop();for(const t of this.knots)t.draw()}update(){}convertKnots(){return this.knots.map(t=>[t.pos.x,t.pos.y])}addPoint(t,s){const o=new f(t,s,this),n=this.knots;if(n.length<2)n.push(o);else{let i=1/0,r=0;const h=o.pos;for(let a=0;a<n.length;a++){const c=n[a].pos,p=n[(a+1)%n.length].pos,j=p5.Vector.sub(h,c),u=p5.Vector.sub(p,c),m=u.setMag(j.dot(u)/u.mag()).add(c),b=m.dist(h);m.dist(c)+m.dist(p)>=c.dist(p)+5||b<i&&(r=a+1,i=b)}n.splice(r,0,o)}main.staticKnots.push(o),this.update()}export(){return JSON.stringify(this.convertKnots())}}class N{constructor(){this.balls=[],this.staticObjs=[],this.hasSelected=!1,this.staticKnots=[]}init(){this.mainb=new v(new q(80,80),!1),this.hole=new v(new I(width-80,height-80),!1),this.balls.push(this.mainb),this.levelBounds=new G,this.camera=new D}playMode(){const t=new w(this);window.main=t,t.init(),t.generateLevel()}draw(){this.camera.draw(),background(123,255,123),this.levelBounds.draw(),this.camera.drawGrid();for(const t of this.staticObjs)t.draw();this.hole.draw();for(const t of this.balls)t.draw();this.hasSelected||this.checkKnots()}checkKnots(){if(!this.selectedPolygon){for(let t=this.balls.length-1;t>=0;t--)if(this.balls[t].knot.check()){this.hasSelected=!0;return}if(this.hole.knot.check()){this.hasSelected=!0;return}for(let t=this.staticKnots.length-1;t>=0;t--)if(this.staticKnots[t].check()){this.hasSelected=!0;return}}}}class w extends U{constructor(t){super(),this.editor=t}init(){this.transition=new H(this.reset.bind(this))}reset(){window.main=this.editor;const t=this.editor.mainb.obj;t.vel.setMag(0),t.inHole=!0,this.editor.mainb.update()}generateLevel(){this.mainb=this.editor.mainb.obj,this.mainb.inHole=!1,this.balls.push(this.mainb),this.hole=this.editor.hole.obj,this.hole.ballIn=!1;for(const r of this.editor.staticObjs)this.staticObjs.push(r.obj);const t=this.editor.levelBounds.convertKnots();this.levelBounds=t;let s=t[0][0],o=t[0][1],n=t[0][0],i=t[0][1];for(let r=1;r<t.length;r++){let[h,a]=t[r];h<s&&(s=h),a<o&&(o=a),h>n&&(n=h),a>i&&(i=a)}this.camera=new R(s,o,n,i)}}function S(e,t){const s=document.createElement("div"),o=document.createElement("input");o.value=t;const n=document.createElement("button");return n.innerHTML="&times;",n.addEventListener("click",()=>{for(let i=0;i<main.staticObjs.length;i++){const r=main.staticObjs[i];if(e==r){main.staticObjs.splice(i,1);break}}s.remove()}),s.append(o,n),s}function Y(e,t){const s=S(e,t),o=document.createElement("button");return o.textContent="rotate",o.addEventListener("click",()=>{e.obj.force.rotate(PI/2)}),s.append(o),s}function g(e,t){const s=S(e,t),o=document.createElement("button");return o.textContent="edit",o.addEventListener("click",()=>{window.main.selectedPolygon=e}),s.append(o),s}class E extends l{constructor(t,s,o,n){super(t,s,o),this.origin=createVector(t,s),this.axis=n}originUpdate(t){this.pos.add(t)}update(){if(this.prevPos=this.pos.copy(),this.selected){const t=mousePos,s=p5.Vector.sub(t,this.origin),o=p5.Vector.setMag(this.axis,s.dot(this.axis)/this.axis.mag()).add(this.origin);this.pos=o,this.parent.update(this,p5.Vector.sub(this.pos,this.prevPos))}}}class y{constructor(t){this.obj=t,this.knots=[],this.centerKnot=new l(0,0,this),main.staticKnots.push(this.centerKnot)}draw(){this.obj.draw();for(const t of this.knots)t.draw();this.centerKnot.draw()}convertKnots(){return this.knots.map(t=>[t.pos.x,t.pos.y])}update(t,s){if(t==this.centerKnot)for(const o of this.knots)o.pos.add(s);else this.calcCenter();if(this.obj instanceof K){const o=this.centerKnot.pos.x,n=this.centerKnot.pos.y;this.obj.cx=o,this.obj.cy=n;const i=[];for(const r of this.knots)i.push([r.pos.x-o,r.pos.y-n]);this.obj.render=i}this.obj.points=this.convertKnots()}calcCenter(){let t=0,s=0;for(const o of this.knots)t+=o.pos.x,s+=o.pos.y;t/=this.knots.length,s/=this.knots.length,this.centerKnot.pos=createVector(t,s)}addPoint(t,s){const o=new l(t,s,this),n=this.knots;if(n.length<2)n.push(o);else{let i=1/0,r=0;const h=o.pos;for(let a=0;a<n.length;a++){const c=n[a].pos,p=n[(a+1)%n.length].pos,j=p5.Vector.sub(h,c),u=p5.Vector.sub(p,c),m=u.setMag(j.dot(u)/u.mag()).add(c),b=m.dist(h);m.dist(c)+m.dist(p)>=c.dist(p)+5||b<i&&(r=a+1,i=b)}n.splice(r,0,o)}main.staticKnots.push(o),this.update()}export(){const t=[];for(const[s,o]of this.obj.points)t.push([round(s),round(o)]);return`new ${k[this.obj.constructor]}(${JSON.stringify(t)})`}}class x extends y{constructor(t){super(t),this.knots=[new l(this.obj.x,this.obj.y,this),new l(this.obj.x+this.obj.w,this.obj.y+this.obj.h,this)],main.staticKnots.push(...this.knots),this.calcCenter()}update(t,s){super.update(t,s),this.obj.x=this.knots[0].pos.x,this.obj.y=this.knots[0].pos.y,this.obj.w=this.knots[1].pos.x-this.obj.x,this.obj.h=this.knots[1].pos.y-this.obj.y}export(){let t=`new ${k[this.obj.constructor]}(${round(this.obj.x)}, ${round(this.obj.y)}, ${round(this.obj.w)}, ${round(this.obj.h)}`;if(this.obj instanceof P){const s=p5.Vector.normalize(this.obj.force);t+=`, createVector(${round(s.x)}, ${round(s.y)})`}return`${t})`}}class X extends x{constructor(t){super(t),this.deltas=[new E(this.obj.x+this.obj.w,this.y+this.obj.h/2,this,createVector(1,0)),new E(this.obj.x+this.obj.w/2,this.y+this.h,this,createVector(0,1))],main.staticKnots.push(...this.deltas)}update(t,s){super.update(t,s);const o=this.deltas[0].pos.x-this.obj.x-this.obj.w,n=this.deltas[1].pos.y-this.obj.y-this.obj.h;this.obj.dw=o,this.obj.dh=n}draw(){fill(255,0,0),rect(this.obj.x,this.obj.y,this.obj.w,this.obj.h),push(),noFill(),strokeWeight(1),stroke(255,0,0),rect(this.obj.x-this.obj.dw,this.obj.y-this.obj.dh,this.obj.x+this.obj.dw,this.obj.y+this.obj.dh),pop();for(const t of this.knots)t.draw();for(const t of this.deltas)t.draw();this.centerKnot.draw()}}class z{constructor(t){this.obj=t,this.startKnot=new l(t.start.x,t.start.y,this),this.endKnot=new l(t.end.x,t.end.y,this),main.staticKnots.push(this.startKnot,this.endKnot)}draw(){this.obj.draw(),this.startKnot.draw(),this.endKnot.draw()}update(){this.obj.start=this.startKnot.pos,this.obj.end=this.endKnot.pos}export(){return`new ${k[this.obj.constructor]}(${this.startKnot}, ${this.endKnot})`}}const F=[{name:"Square Wall",create:(e,t)=>new x(new L(e,t,30,30))},{name:"Ice",create:(e,t)=>new x(new M(e,t,30,30))},{name:"Bouncer",create:(e,t)=>new v(new V(e,t))},{name:"Slope",create:(e,t)=>new x(new P(e,t,30,30,createVector(1,0))),render:Y},{name:"Polygon Wall",create:()=>{const e=new y(new $([]));return main.selectedPolygon=e,e},render:g},{name:"Water",create:()=>{const e=new y(new K([]));return main.selectedPolygon=e,e},render:g},{name:"Sand",create:()=>{const e=new y(new B([]));return main.selectedPolygon=e,e},render:g},{name:"Teleporter",create:(e,t)=>new z(new C(e,t,e,t))},{name:"Moving Platform",create:(e,t)=>new X(new W(e,t,30,30,0,0))}],J=document.querySelector(".object-template"),A=document.querySelector(".objects-list");for(const e of F){const t=document.createElement("button");t.textContent=e.name,t.addEventListener("click",()=>{const s=e.create(main.camera.pos.x,main.camera.pos.y);main.staticObjs.push(s);const n=(e.render||S)(s,e.name);A.append(n)}),J.append(t)}window.p5=T;window.mousex=void 0;window.mousey=void 0;window.main=new N;window.setup=()=>{noStroke();const e=createCanvas(.8*windowWidth,windowHeight).parent(document.querySelector(".canvas-content"));e.mousePressed(Q),e.mouseClicked(Z),e.mouseWheel(_),e.elt.addEventListener("selectstart",t=>t.preventDefault()),e.elt.addEventListener("contextmenu",t=>t.preventDefault()),e.elt.addEventListener("wheel",t=>t.preventDefault()),e.elt.addEventListener("mousedown",t=>{t.button==1&&t.preventDefault()}),main.init()};window.draw=()=>{push(),main.draw(),pop(),main.selectedPolygon&&(fill(0),textAlign(CENTER),textSize(20),text(`Left click to add vertex, Right click to remove vertex
Esc to finish`,width/2,30))};function Q(){if(main instanceof w||(mouseButton==CENTER&&main.camera.beginMove(),!main.selectedPolygon))return;let e=main.selectedPolygon;if(mouseButton==LEFT)e.addPoint(mousePos.x,mousePos.y);else if(mouseButton==RIGHT){for(let t=e.knots.length-1;t>=0;t--)if(e.knots[t].check()){e.knots.splice(t,1),e.update();break}}}function Z(){if(main instanceof w){const e=T.Vector.sub(createVector(mousex,mousey),main.mainb.pos).div(32);main.mainb.vel=e}}window.keyPressed=()=>{main.selectedPolygon&&key=="Escape"&&(main.selectedPolygon=null)};window.mouseReleased=()=>{main instanceof w||(main.hasSelected=!1,main.camera.endMove())};function _(e){main.camera.changeScale(e.deltaY)}document.querySelector(".play-btn").addEventListener("click",()=>{main instanceof w?main.reset():main.playMode()});document.querySelector(".edit-bound-btn").addEventListener("click",()=>{main.selectedPolygon=main.levelBounds});document.querySelector(".export-btn").addEventListener("click",()=>{let e="";for(const s of main.staticObjs)e+=s.export()+`,
`;let t=`{
mainb: [${main.mainb.knot}],
hole: [${main.hole.knot}],
static: [${e}],
balls: [],
bounds: ${main.levelBounds.export()},
}`;document.querySelector(".export-text").value=t});document.querySelector(".copy-export-btn").addEventListener("click",async()=>{const e=document.querySelector(".export-text").value;await navigator.clipboard.writeText(e),document.querySelector(".copy-export-btn").textContent="Copied!",setTimeout(()=>{document.querySelector(".copy-export-btn").textContent="Copy"},1e3)});
