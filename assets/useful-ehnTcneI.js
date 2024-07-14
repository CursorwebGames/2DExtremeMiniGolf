import{c as j,M as K,H as E,G as S,T as V,C as I,W as v,a as B,I as L,B as C,P as M,S as T,b as O,p as P}from"./gameManager-DpWsw-q_.js";class W{constructor(t,s,n,o,i){this.x=t,this.y=s,this.w=n,this.h=o,this.force=i.mult(.35)}draw(){fill(255,255,255,125),rect(this.x,this.y,this.w,this.h),fill(255);let t=this.x+this.w/2,s=this.y+this.h/2;push(),translate(t,s),rotate(this.force.heading()),triangle(-5,-10,5,0,-5,10),pop()}isColliding(t){return j(t.pos.x,t.pos.y,t.r,this.x,this.y,this.w,this.h)}collide(t){t.applyForce(this.force)}}class c{constructor(t,s,n){this.pos=createVector(t,s),this.r=4,this.selected=!1,this.prevPos=createVector(t,s),this.parent=n}draw(){this.update(),push(),this.selected||this.pos.dist(mousePos)<this.r*2?(strokeWeight(1),stroke(0),fill(0,138,124)):fill(0,186,168),circle(this.pos.x,this.pos.y,this.r*2),pop()}update(){this.prevPos=this.pos.copy(),this.selected&&(this.pos=mousePos,this.parent.update(this,p5.Vector.sub(this.pos,this.prevPos)))}check(){return!mouseIsPressed&&this.selected&&(this.selected=!1),mouseIsPressed&&mouseButton!=CENTER&&!this.selected&&this.pos.dist(mousePos)<this.r*2&&(this.selected=!0),this.selected}}class g{constructor(t,s=!0){this.obj=t,this.knot=new c(t.pos.x,t.pos.y,this),s&&main.staticKnots.push(this.knot)}draw(){this.obj.draw(),this.knot.draw()}update(){this.obj.pos=this.knot.pos.copy()}}class R{constructor(){this.pos=createVector(width/2,height/2)}draw(){const t=width/2-this.pos.x,s=height/2-this.pos.y;translate(t,s),this.offset?window.mousePos=p5.Vector.sub(this.offset,createVector(mouseX,mouseY)):window.mousePos=createVector(round(mouseX),round(mouseY)).sub(createVector(round(t),round(s))),this.offset&&(this.pos=mousePos.add(this.initialPos))}beginMove(){this.initialPos=this.pos.copy(),this.offset=createVector(mouseX,mouseY)}endMove(){this.initialPos=null,this.offset=null}}class U{constructor(){this.knots=[new c(0,0,this),new c(width,0,this),new c(width,height,this),new c(0,height,this)],main.staticKnots.push(...this.knots)}draw(){push(),noFill(),strokeWeight(1),stroke(255),beginShape();for(const t of this.knots)vertex(t.pos.x,t.pos.y);endShape(CLOSE),pop();for(const t of this.knots)t.draw()}update(){}convertKnots(){return this.knots.map(t=>[t.pos.x,t.pos.y])}addPoint(t,s){const n=new c(t,s,this),o=this.knots;if(o.length<2)o.push(n);else{let i=1/0,a=0;const l=n.pos;for(let r=0;r<o.length;r++){const h=o[r].pos,d=o[(r+1)%o.length].pos,b=p5.Vector.sub(l,h),u=p5.Vector.sub(d,h),p=u.setMag(b.dot(u)/u.mag()).add(h),m=p.dist(l);p.dist(h)+p.dist(d)>=h.dist(d)+5||m<i&&(a=r+1,i=m)}o.splice(a,0,n)}main.staticKnots.push(n),this.update()}}class H{constructor(){this.balls=[],this.staticObjs=[],this.hasSelected=!1,this.staticKnots=[]}init(){this.mainb=new g(new K(80,80),!1),this.hole=new g(new E(width-80,height-80),!1),this.balls.push(this.mainb),this.levelBounds=new U,this.camera=new R}playMode(){const t=new f(this);window.main=t,t.init(),t.generateLevel()}draw(){this.camera.draw(),background(123,255,123),this.levelBounds.draw();for(const t of this.staticObjs)t.draw();this.hole.draw();for(const t of this.balls)t.draw();this.hasSelected||this.checkKnots()}checkKnots(){if(!this.selectedPolygon){for(let t=this.balls.length-1;t>=0;t--)if(this.balls[t].knot.check()){this.hasSelected=!0;return}if(this.hole.knot.check()){this.hasSelected=!0;return}for(let t=this.staticKnots.length-1;t>=0;t--)if(this.staticKnots[t].check()){this.hasSelected=!0;return}}}}class f extends S{constructor(t){super(),this.editor=t}init(){this.transition=new V(this.reset.bind(this))}reset(){window.main=this.editor;const t=this.editor.mainb.obj;t.vel.setMag(0),t.inHole=!0,this.editor.mainb.update()}generateLevel(){this.mainb=this.editor.mainb.obj,this.mainb.inHole=!1,this.balls.push(this.mainb),this.hole=this.editor.hole.obj,this.hole.ballIn=!1;for(const a of this.editor.staticObjs)this.staticObjs.push(a.obj);const t=this.editor.levelBounds.convertKnots();this.levelBounds=t;let s=t[0][0],n=t[0][1],o=t[0][0],i=t[0][1];for(let a=1;a<t.length;a++){let[l,r]=t[a];l<s&&(s=l),r<n&&(n=r),l>o&&(o=l),r>i&&(i=r)}this.camera=new I(s,n,o,i)}}function x(e,t){const s=document.createElement("div"),n=document.createElement("input");n.value=t;const o=document.createElement("button");return o.innerHTML="&times;",o.addEventListener("click",()=>{for(let i=0;i<main.staticObjs.length;i++){const a=main.staticObjs[i];if(e==a){main.staticObjs.splice(i,1);break}}s.remove()}),s.append(n,o),s}function q(e,t){const s=x(e,t),n=document.createElement("button");return n.textContent="rotate",n.addEventListener("click",()=>{e.obj.force.rotate(PI/2)}),s.append(n),s}function k(e,t){const s=x(e,t),n=document.createElement("button");return n.textContent="edit",n.addEventListener("click",()=>{window.main.selectedPolygon=e}),s.append(n),s}class w{constructor(t){this.obj=t,this.knots=[],this.centerKnot=new c(0,0,this),main.staticKnots.push(this.centerKnot)}draw(){this.obj.draw();for(const t of this.knots)t.draw();this.centerKnot.draw()}convertKnots(){return this.knots.map(t=>[t.pos.x,t.pos.y])}update(t,s){if(t==this.centerKnot)for(const n of this.knots)n.pos.add(s);else{let n=0,o=0;for(const i of this.knots)n+=i.pos.x,o+=i.pos.y;n/=this.knots.length,o/=this.knots.length,this.centerKnot.pos=createVector(n,o)}if(this.obj instanceof v){const n=this.centerKnot.pos.x,o=this.centerKnot.pos.y;this.obj.cx=n,this.obj.cy=o;const i=[];for(const a of this.knots)i.push([a.pos.x-n,a.pos.y-o]);this.obj.render=i}this.obj.points=this.convertKnots()}addPoint(t,s){const n=new c(t,s,this),o=this.knots;if(o.length<2)o.push(n);else{let i=1/0,a=0;const l=n.pos;for(let r=0;r<o.length;r++){const h=o[r].pos,d=o[(r+1)%o.length].pos,b=p5.Vector.sub(l,h),u=p5.Vector.sub(d,h),p=u.setMag(b.dot(u)/u.mag()).add(h),m=p.dist(l);p.dist(h)+p.dist(d)>=h.dist(d)+5||m<i&&(a=r+1,i=m)}o.splice(a,0,n)}main.staticKnots.push(n),this.update()}}class y extends w{constructor(t){super(t),this.knots=[new c(this.obj.x,this.obj.y,this),new c(this.obj.x+this.obj.w,this.obj.y+this.obj.h,this)],main.staticKnots.push(...this.knots),this.update()}update(t,s){super.update(t,s),this.obj.x=this.knots[0].pos.x,this.obj.y=this.knots[0].pos.y,this.obj.w=this.knots[1].pos.x-this.obj.x,this.obj.h=this.knots[1].pos.y-this.obj.y}}class D{constructor(t){this.obj=t,this.startKnot=new c(t.start.x,t.start.y,this),this.endKnot=new c(t.end.x,t.end.y,this),main.staticKnots.push(this.startKnot,this.endKnot)}draw(){this.obj.draw(),this.startKnot.draw(),this.endKnot.draw()}update(){this.obj.start=this.startKnot.pos,this.obj.end=this.endKnot.pos}}const F=[{name:"Square Wall",create:(e,t)=>new y(new B(e,t,30,30))},{name:"Ice",create:(e,t)=>new y(new L(e,t,30,30))},{name:"Bouncer",create:(e,t)=>new g(new C(e,t))},{name:"Slope",create:(e,t)=>new y(new W(e,t,30,30,createVector(1,0))),render:q},{name:"Polygon Wall",create:()=>{const e=new w(new M([]));return main.selectedPolygon=e,e},render:k},{name:"Water",create:()=>{const e=new w(new v([]));return main.selectedPolygon=e,e},render:k},{name:"Sand",create:()=>{const e=new w(new T([]));return main.selectedPolygon=e,e},render:k},{name:"Teleporter",create:(e,t)=>new D(new O(e,t,e,t))}],G=document.querySelector(".object-template"),N=document.querySelector(".objects-list");for(const e of F){const t=document.createElement("button");t.textContent=e.name,t.addEventListener("click",()=>{const s=e.create(main.camera.pos.x,main.camera.pos.y);main.staticObjs.push(s);const o=(e.render||x)(s,e.name);N.append(o)}),G.append(t)}window.p5=P;window.mousex=void 0;window.mousey=void 0;window.main=new H;window.setup=()=>{noStroke();const e=createCanvas(.8*windowWidth,windowHeight).parent(document.querySelector(".canvas-content"));e.mousePressed(X),e.mouseClicked(Y),e.elt.addEventListener("selectstart",t=>t.preventDefault()),e.elt.addEventListener("contextmenu",t=>t.preventDefault()),e.elt.addEventListener("mousedown",t=>{t.button==1&&t.preventDefault()}),main.init()};window.draw=()=>{push(),main.draw(),pop(),main.selectedPolygon&&(fill(0),textAlign(CENTER),textSize(20),text(`Left click to add vertex, Right click to remove vertex
Esc to finish`,width/2,30))};function X(){if(main instanceof f||(mouseButton==CENTER&&main.camera.beginMove(),!main.selectedPolygon))return;let e=main.selectedPolygon;if(mouseButton==LEFT)e.addPoint(mousePos.x,mousePos.y);else if(mouseButton==RIGHT){for(let t=e.knots.length-1;t>=0;t--)if(e.knots[t].check()){e.knots.splice(t,1),e.update();break}}return!1}function Y(){if(main instanceof f){const e=P.Vector.sub(createVector(mousex,mousey),main.mainb.pos).div(32);main.mainb.vel=e}}window.keyPressed=()=>{main.selectedPolygon&&key=="Escape"&&(main.selectedPolygon=null)};window.mouseReleased=()=>{main instanceof f||(main.hasSelected=!1,main.camera.endMove())};document.querySelector(".play-btn").addEventListener("click",()=>{main instanceof f?main.reset():main.playMode()});document.querySelector(".edit-bound-btn").addEventListener("click",()=>{main.selectedPolygon=main.levelBounds});
