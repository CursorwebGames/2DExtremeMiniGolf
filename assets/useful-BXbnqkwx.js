import{c as v,M as K,H as E,G as S,T as I,C as V,W as x,a as L,I as B,B as C,P as M,S as T,b as O,p as j}from"./gameManager-DpWsw-q_.js";class W{constructor(t,s,o,n,i){this.x=t,this.y=s,this.w=o,this.h=n,this.force=i.mult(.35)}draw(){fill(255,255,255,125),rect(this.x,this.y,this.w,this.h),fill(255);let t=this.x+this.w/2,s=this.y+this.h/2;push(),translate(t,s),rotate(this.force.heading()),triangle(-5,-10,5,0,-5,10),pop()}isColliding(t){return v(t.pos.x,t.pos.y,t.r,this.x,this.y,this.w,this.h)}collide(t){t.applyForce(this.force)}}class h{constructor(t,s,o){this.pos=createVector(t,s),this.r=4,this.selected=!1,this.prevPos=createVector(t,s),this.parent=o}draw(){this.update(),push(),this.selected||this.pos.dist(mousePos)<this.r*2?(strokeWeight(1),stroke(0),fill(0,138,124)):fill(0,186,168),circle(this.pos.x,this.pos.y,this.r*2),fill(0),text(this.l,this.pos.x,this.pos.y),pop()}update(){this.prevPos=this.pos.copy(),this.selected&&(this.pos=mousePos,this.parent.update(this,p5.Vector.sub(this.pos,this.prevPos)))}check(){return!mouseIsPressed&&this.selected&&(this.selected=!1),mouseIsPressed&&!this.selected&&this.pos.dist(mousePos)<this.r*2&&(this.selected=!0),this.selected}}class y{constructor(t,s=!0){this.obj=t,this.knot=new h(t.pos.x,t.pos.y,this),s&&main.staticKnots.push(this.knot)}draw(){this.obj.draw(),this.knot.draw()}update(){this.obj.pos=this.knot.pos.copy()}}class R{constructor(){this.pos=createVector(width/2,height/2)}draw(){const t=width/2-this.pos.x,s=height/2-this.pos.y;translate(t,s),this.offset?window.mousePos=p5.Vector.sub(this.offset,createVector(mouseX,mouseY)):window.mousePos=createVector(mouseX,mouseY).add(this.pos).sub(createVector(width/2,height/2)),this.offset&&(this.pos=mousePos.add(this.initialPos))}beginMove(){this.initialPos=this.pos.copy(),this.offset=createVector(mouseX,mouseY)}endMove(){this.initialPos=null,this.offset=null}}class U{constructor(){this.balls=[],this.staticObjs=[],this.hasSelected=!1,this.staticKnots=[]}init(){this.mainb=new y(new K(80,80),!1),this.hole=new y(new E(width-80,height-80),!1),this.balls.push(this.mainb),this.levelBounds=[[0,0],[width,0],[width,height],[0,height]],this.camera=new R}playMode(){const t=new d(this);window.main=t,t.init(),t.generateLevel()}draw(){this.camera.draw(),background(123,255,123);for(const t of this.staticObjs)t.draw();this.hole.draw();for(const t of this.balls)t.draw();this.hasSelected||this.checkKnots()}checkKnots(){if(!this.selectedPolygon){for(let t=this.balls.length-1;t>=0;t--)if(this.balls[t].knot.check()){this.hasSelected=!0;return}if(this.hole.knot.check()){this.hasSelected=!0;return}for(let t=this.staticKnots.length-1;t>=0;t--)if(this.staticKnots[t].check()){this.hasSelected=!0;return}}}}class d extends S{constructor(t){super(),this.editor=t}init(){this.transition=new I(this.reset)}reset(){window.main=this.editor;const t=this.editor.mainb.obj;t.vel.setMag(0),t.inHole=!0,this.editor.mainb.update()}generateLevel(){this.mainb=this.editor.mainb.obj,this.mainb.inHole=!1,this.balls.push(this.mainb),this.hole=this.editor.hole.obj,this.hole.ballIn=!1;for(const a of this.editor.staticObjs)this.staticObjs.push(a.obj);const t=this.editor.levelBounds;this.levelBounds=t;let s=t[0][0],o=t[0][1],n=t[0][0],i=t[0][1];for(let a=1;a<t.length;a++){let[c,r]=t[a];c<s&&(s=c),r<o&&(o=r),c>n&&(n=c),r>i&&(i=r)}this.camera=new V(s,o,n,i)}}function k(e,t){const s=document.createElement("div"),o=document.createElement("input");o.value=t;const n=document.createElement("button");return n.innerHTML="&times;",n.addEventListener("click",()=>{for(let i=0;i<main.staticObjs.length;i++){const a=main.staticObjs[i];if(e==a){main.staticObjs.splice(i,1);break}}s.remove()}),s.append(o,n),s}function H(e,t){const s=k(e,t),o=document.createElement("button");return o.textContent="rotate",o.addEventListener("click",()=>{e.obj.force.rotate(PI/2)}),s.append(o),s}function w(e,t){const s=k(e,t),o=document.createElement("button");return o.textContent="edit",o.addEventListener("click",()=>{window.main.selectedPolygon=e}),s.append(o),s}class u{constructor(t){this.obj=t,this.knots=[],this.centerKnot=new h(0,0,this),main.staticKnots.push(this.centerKnot)}draw(){this.obj.draw();for(const t of this.knots)t.draw();this.centerKnot.draw()}convertKnots(){return this.knots.map(t=>[t.pos.x,t.pos.y])}update(t,s){if(t==this.centerKnot)for(const o of this.knots)o.pos.add(s);else{let o=0,n=0;for(const i of this.knots)o+=i.pos.x,n+=i.pos.y;o/=this.knots.length,n/=this.knots.length,this.centerKnot.pos=createVector(o,n)}if(this.obj instanceof x){const o=this.centerKnot.pos.x,n=this.centerKnot.pos.y;this.obj.cx=o,this.obj.cy=n;const i=[];for(const a of this.knots)i.push([a.pos.x-o,a.pos.y-n]);this.obj.render=i}this.obj.points=this.convertKnots()}addPoint(t,s){const o=new h(t,s,this),n=this.knots;if(n.length<2)n.push(o);else{let i=1/0,a=0;const c=o.pos;for(let r=0;r<n.length;r++){const l=n[r].pos,p=n[(r+1)%n.length].pos,P=p5.Vector.sub(c,l),m=p5.Vector.sub(p,l),f=m.setMag(P.dot(m)/m.mag()).add(l),g=f.dist(c);f.dist(l)+f.dist(p)>=l.dist(p)+5||g<i&&(a=r+1,i=g)}n.splice(a,0,o)}main.staticKnots.push(o),this.update()}}class b extends u{constructor(t){super(t),this.knots=[new h(this.obj.x,this.obj.y,this),new h(this.obj.x+this.obj.w,this.obj.y+this.obj.h,this)],main.staticKnots.push(...this.knots),this.update()}update(t,s){super.update(t,s),this.obj.x=this.knots[0].pos.x,this.obj.y=this.knots[0].pos.y,this.obj.w=this.knots[1].pos.x-this.obj.x,this.obj.h=this.knots[1].pos.y-this.obj.y}}class q{constructor(t){this.obj=t,this.startKnot=new h(t.start.x,t.start.y,this),this.endKnot=new h(t.end.x,t.end.y,this),main.staticKnots.push(this.startKnot,this.endKnot)}draw(){this.obj.draw(),this.startKnot.draw(),this.endKnot.draw()}update(){this.obj.start=this.startKnot.pos,this.obj.end=this.endKnot.pos}}const D=[{name:"Square Wall",create:(e,t)=>new b(new L(e,t,30,30))},{name:"Ice",create:(e,t)=>new b(new B(e,t,30,30))},{name:"Bouncer",create:(e,t)=>new y(new C(e,t))},{name:"Slope",create:(e,t)=>new b(new W(e,t,30,30,createVector(1,0))),render:H},{name:"Polygon Wall",create:()=>{const e=new u(new M([]));return main.selectedPolygon=e,e},render:w},{name:"Water",create:()=>{const e=new u(new x([]));return main.selectedPolygon=e,e},render:w},{name:"Sand",create:()=>{const e=new u(new T([]));return main.selectedPolygon=e,e},render:w},{name:"Teleporter",create:(e,t)=>new q(new O(e,t,e,t))}],G=document.querySelector(".object-template"),X=document.querySelector(".objects-list");for(const e of D){const t=document.createElement("button");t.textContent=e.name,t.addEventListener("click",()=>{const s=e.create(main.camera.pos.x,main.camera.pos.y);main.staticObjs.push(s);const n=(e.render||k)(s,e.name);X.append(n)}),G.append(t)}window.p5=j;window.mousex=void 0;window.mousey=void 0;window.main=new U;window.setup=()=>{noStroke();const e=createCanvas(.8*windowWidth,windowHeight).parent(document.querySelector(".canvas-content"));e.mousePressed(Y),e.mouseClicked(F),e.elt.addEventListener("selectstart",t=>t.preventDefault()),e.elt.addEventListener("contextmenu",t=>t.preventDefault()),e.elt.addEventListener("mousedown",t=>{t.button==1&&t.preventDefault()}),main.init()};window.draw=()=>{push(),main.draw(),pop(),main.selectedPolygon&&(fill(0),textAlign(CENTER),textSize(20),text(`Left click to add vertex, Right click to remove vertex
Esc to finish`,width/2,30))};function Y(){if(main instanceof d||(mouseButton==CENTER&&main.camera.beginMove(),!main.selectedPolygon))return;let e=main.selectedPolygon;if(mouseButton==LEFT)e.addPoint(mousePos.x,mousePos.y);else if(mouseButton==RIGHT){for(let t=e.knots.length-1;t>=0;t--)if(e.knots[t].check()){e.knots.splice(t,1),e.update();break}}return!1}function F(){if(main instanceof d){const e=j.Vector.sub(createVector(mousex,mousey),main.mainb.pos).div(32);main.mainb.vel=e}}window.keyPressed=()=>{main.selectedPolygon&&key=="Escape"&&(main.selectedPolygon=null)};window.mouseReleased=()=>{main instanceof d||(main.hasSelected=!1,main.camera.endMove())};document.querySelector(".play-btn").addEventListener("click",()=>{main instanceof d?main.reset():main.playMode()});