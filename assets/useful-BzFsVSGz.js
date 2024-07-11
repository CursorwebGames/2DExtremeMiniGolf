import{c as P,M as E,H as V,G as S,T as I,C,W as K,a as L,I as M,B,P as T,S as U,b as O,p as j}from"./gameManager-DpWsw-q_.js";class W{constructor(t,o,s,i,n){this.x=t,this.y=o,this.w=s,this.h=i,this.force=n.mult(.35)}draw(){fill(255,255,255,125),rect(this.x,this.y,this.w,this.h),fill(255);let t=this.x+this.w/2,o=this.y+this.h/2;push(),translate(t,o),rotate(this.force.heading()),triangle(-5,-10,5,0,-5,10),pop()}isColliding(t){return P(t.pos.x,t.pos.y,t.r,this.x,this.y,this.w,this.h)}collide(t){t.applyForce(this.force)}}class l{constructor(t,o,s,i=0){this.pos=createVector(t,o),this.r=4,this.selected=!1,this.prevPos=createVector(t,o),this.parent=s,this.l=i}draw(){this.update(),push(),this.selected||this.pos.dist(mousePos)<this.r?(strokeWeight(1),stroke(0),fill(0,138,124)):fill(0,186,168),circle(this.pos.x,this.pos.y,this.r*2),fill(0),text(this.l,this.pos.x,this.pos.y),pop()}update(){this.prevPos=this.pos.copy(),this.selected&&(this.pos=mousePos,this.parent.update(this,p5.Vector.sub(this.pos,this.prevPos)))}check(){return!mouseIsPressed&&this.selected&&(this.selected=!1),mouseIsPressed&&!this.selected&&this.pos.dist(mousePos)<this.r&&(this.selected=!0),this.selected}}class g{constructor(t,o=!0){this.obj=t,this.knot=new l(t.pos.x,t.pos.y,this),o&&main.staticKnots.push(this.knot)}draw(){this.obj.draw(),this.knot.draw()}update(){this.obj.pos=this.knot.pos.copy()}}class R{constructor(){this.pos=createVector(width/2,height/2)}draw(){const t=width/2-this.pos.x,o=height/2-this.pos.y;translate(t,o),this.offset?window.mousePos=p5.Vector.sub(this.offset,createVector(mouseX,mouseY)):window.mousePos=createVector(mouseX,mouseY).add(this.pos).sub(createVector(width/2,height/2)),this.offset&&(this.pos=mousePos.add(this.initialPos))}beginMove(){this.initialPos=this.pos.copy(),this.offset=createVector(mouseX,mouseY)}endMove(){this.initialPos=null,this.offset=null}}class H{constructor(){this.balls=[],this.staticObjs=[],this.hasSelected=!1,this.staticKnots=[]}init(){this.mainb=new g(new E(80,80),!1),this.hole=new g(new V(width-80,height-80),!1),this.balls.push(this.mainb),this.levelBounds=[[0,0],[width,0],[width,height],[0,height]],this.camera=new R}playMode(){const t=new u(this);window.main=t,t.init(),t.generateLevel()}draw(){this.camera.draw(),background(123,255,123);for(const t of this.staticObjs)t.draw();this.hole.draw();for(const t of this.balls)t.draw();this.hasSelected||this.checkKnots()}checkKnots(){if(!this.selectedPolygon){for(let t=this.balls.length-1;t>=0;t--)if(this.balls[t].knot.check()){this.hasSelected=!0;return}if(this.hole.knot.check()){this.hasSelected=!0;return}for(let t=this.staticKnots.length-1;t>=0;t--)if(this.staticKnots[t].check()){this.hasSelected=!0;return}}}}class u extends S{constructor(t){super(),this.editor=t}init(){this.transition=new I(this.reset)}reset(){window.main=this.editor;const t=this.editor.mainb.obj;t.vel.setMag(0),t.inHole=!0,this.editor.mainb.update()}generateLevel(){this.mainb=this.editor.mainb.obj,this.mainb.inHole=!1,this.balls.push(this.mainb),this.hole=this.editor.hole.obj,this.hole.ballIn=!1;for(const a of this.editor.staticObjs)this.staticObjs.push(a.obj);const t=this.editor.levelBounds;this.levelBounds=t;let o=t[0][0],s=t[0][1],i=t[0][0],n=t[0][1];for(let a=1;a<t.length;a++){let[h,r]=t[a];h<o&&(o=h),r<s&&(s=r),h>i&&(i=h),r>n&&(n=r)}this.camera=new C(o,s,i,n)}}function y(e,t){const o=document.createElement("div"),s=document.createElement("input");s.value=t;const i=document.createElement("button");return i.innerHTML="&times;",i.addEventListener("click",()=>{for(let n=0;n<main.staticObjs.length;n++){const a=main.staticObjs[n];if(e==a){main.staticObjs.splice(n,1);break}}o.remove()}),o.append(s,i),o}function q(e,t){const o=y(e,t),s=document.createElement("button");return s.textContent="rotate",s.addEventListener("click",()=>{e.obj.force.rotate(PI/2)}),o.append(s),o}function w(e,t){const o=y(e,t),s=document.createElement("button");return s.textContent="edit",s.addEventListener("click",()=>{window.main.selectedPolygon=e}),o.append(s),o}class f{constructor(t){this.obj=t,this.knots=[],this.centerKnot=new l(0,0,this),main.staticKnots.push(this.centerKnot)}draw(){this.obj.draw();for(const t of this.knots)t.draw();this.centerKnot.draw()}convertKnots(){return this.knots.map(t=>[t.pos.x,t.pos.y])}update(t,o){for(let s=0;s<this.knots.length;s++)this.knots[s].l=s;if(t==this.centerKnot)for(const s of this.knots)s.pos.add(o);else{let s=0,i=0;for(const n of this.knots)s+=n.pos.x,i+=n.pos.y;s/=this.knots.length,i/=this.knots.length,this.centerKnot.pos=createVector(s,i)}if(this.obj instanceof K){const s=this.centerKnot.pos.x,i=this.centerKnot.pos.y;this.obj.cx=s,this.obj.cy=i;const n=[];for(const a of this.knots)n.push([a.pos.x-s,a.pos.y-i]);this.obj.render=n}this.obj.points=this.convertKnots()}addPoint(t,o){console.log(`
====
`);const s=new l(t,o,this),i=this.knots;let n=1/0,a=0;const h=s.pos;for(let r=0;r<i.length;r++){const c=i[r].pos,d=i[(r+1)%i.length].pos,v=p5.Vector.sub(h,c),m=p5.Vector.sub(d,c),p=m.setMag(v.dot(m)/m.mag()).add(c),k=p.dist(h);console.log(r,r+1,"dist",p.dist(c)+p.dist(d),">=",c.dist(d)),!(p.dist(c)+p.dist(d)>=c.dist(d)+5)&&k<n&&(a=r+1,n=k)}i.splice(a,0,s),main.staticKnots.push(s),this.update()}}class x extends l{constructor(t,o,s,i,n){super(t,o,s),this.originKnot=i,this.axis=n}originUpdate(t){this.pos.add(t)}update(){if(this.prevPos=this.pos.copy(),this.selected){const t=mousePos,o=p5.Vector.sub(t,this.originKnot.pos),s=p5.Vector.setMag(this.axis,o.dot(this.axis)/this.axis.mag()).add(this.originKnot.pos);this.pos=s,this.parent.update(this,p5.Vector.sub(this.pos,this.prevPos))}}}class b{constructor(t){this.obj=t,this.posKnot=new l(this.obj.x,this.obj.y,this),this.widthKnot=new x(this.obj.x+this.obj.w,this.obj.y,this,this.posKnot,createVector(1,0)),this.heightKnot=new x(this.obj.x,this.obj.y+this.obj.h,this,this.posKnot,createVector(0,1)),main.staticKnots.push(this.posKnot,this.widthKnot,this.heightKnot)}draw(){this.obj.draw(),this.posKnot.draw(),this.widthKnot.draw(),this.heightKnot.draw()}update(t,o){t==this.posKnot&&(this.widthKnot.originUpdate(o),this.heightKnot.originUpdate(o));const s=this.posKnot.pos;this.obj.x=s.x,this.obj.y=s.y,this.obj.w=this.widthKnot.pos.x-s.x,this.obj.h=this.heightKnot.pos.y-s.y}}class D{constructor(t){this.obj=t,this.startKnot=new l(t.start.x,t.start.y,this),this.endKnot=new l(t.end.x,t.end.y,this),main.staticKnots.push(this.startKnot,this.endKnot)}draw(){this.obj.draw(),this.startKnot.draw(),this.endKnot.draw()}update(){this.obj.start=this.startKnot.pos,this.obj.end=this.endKnot.pos}}const X=[{name:"Square Wall",create:(e,t)=>new b(new L(e,t,30,30))},{name:"Ice",create:(e,t)=>new b(new M(e,t,30,30))},{name:"Bouncer",create:(e,t)=>new g(new B(e,t))},{name:"Slope",create:(e,t)=>new b(new W(e,t,30,30,createVector(1,0))),render:q},{name:"Polygon Wall",create:()=>{const e=new f(new T([]));return main.selectedPolygon=e,e},render:w},{name:"Water",create:()=>{const e=new f(new K([]));return main.selectedPolygon=e,e},render:w},{name:"Sand",create:()=>{const e=new f(new U([]));return main.selectedPolygon=e,e},render:w},{name:"Teleporter",create:(e,t)=>new D(new O(e,t,e,t))}],Y=document.querySelector(".object-template"),G=document.querySelector(".objects-list");for(const e of X){const t=document.createElement("button");t.textContent=e.name,t.addEventListener("click",()=>{const o=e.create(width/2,height/2);main.staticObjs.push(o);const i=(e.render||y)(o,e.name);G.append(i)}),Y.append(t)}window.p5=j;window.mousex=void 0;window.mousey=void 0;window.main=new H;window.setup=()=>{noStroke();const e=createCanvas(.8*windowWidth,windowHeight).parent(document.querySelector(".canvas-content"));e.mousePressed(F),e.mouseClicked(N),e.elt.addEventListener("selectstart",t=>t.preventDefault()),e.elt.addEventListener("contextmenu",t=>t.preventDefault()),e.elt.addEventListener("mousedown",t=>{t.button==1&&t.preventDefault()}),main.init()};window.draw=()=>{main.draw(),main.selectedPolygon&&(fill(0),textAlign(CENTER),textSize(20),text(`Left click to add vertex, Right click to remove vertex
Esc to finish`,width/2,30))};function F(){if(main instanceof u||(mouseButton==CENTER&&main.camera.beginMove(),!main.selectedPolygon))return;let e=main.selectedPolygon;if(mouseButton==LEFT)e.addPoint(mouseX,mouseY);else if(mouseButton==RIGHT){for(let t=e.knots.length-1;t>=0;t--)if(e.knots[t].check()){e.knots.splice(t,1),e.update();break}}return!1}function N(){if(main instanceof u){const e=j.Vector.sub(createVector(mousex,mousey),main.mainb.pos).div(32);main.mainb.vel=e}}window.keyPressed=()=>{main.selectedPolygon&&key=="Escape"&&(main.selectedPolygon=null)};window.mouseReleased=()=>{main instanceof u||(main.hasSelected=!1,main.camera.endMove())};document.querySelector(".play-btn").addEventListener("click",()=>{main instanceof u?main.reset():main.playMode()});
