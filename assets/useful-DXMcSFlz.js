import{c as d,G as p,M as u,H as w,W as f,a as m,I as b,B as k,P as g,p as y}from"./gameManager-DUknczqh.js";class K{constructor(t,e,o,i,n){this.x=t,this.y=e,this.w=o,this.h=i,this.force=n.mult(.35)}draw(){fill(255,255,255,125),rect(this.x,this.y,this.w,this.h),fill(255);let t=this.x+this.w/2,e=this.y+this.h/2;push(),translate(t,e),rotate(this.force.heading()),triangle(-5,-10,5,0,-5,10),pop()}isColliding(t){return d(t.pos.x,t.pos.y,t.r,this.x,this.y,this.w,this.h)}collide(t){t.applyForce(this.force)}}class h{constructor(t,e,o){this.pos=createVector(t,e),this.r=4,this.selected=!1,this.prevPos=createVector(t,e),this.parent=o}draw(){this.update(),push(),this.selected||this.pos.dist(mousePos)<this.r?(strokeWeight(1),stroke(0),fill(0,138,124)):fill(0,186,168),circle(this.pos.x,this.pos.y,this.r*2),pop()}update(){this.prevPos=this.pos.copy(),this.selected&&(this.pos=mousePos,this.parent.update(this,p5.Vector.sub(this.pos,this.prevPos)))}check(){return!mouseIsPressed&&this.selected&&(this.selected=!1),mouseIsPressed&&!this.selected&&this.pos.dist(mousePos)<this.r&&(this.selected=!0),this.selected}}class a{constructor(t,e=!0){this.obj=t,this.knot=new h(t.pos.x,t.pos.y,this),e&&main.staticKnots.push(this.knot)}draw(){this.obj.draw(),this.knot.draw()}update(){this.obj.pos=this.knot.pos}}class x extends p{constructor(){super(),this.hasSelected=!1,this.staticKnots=[]}init(){this.mainb=new a(new u(80,80),!1),this.hole=new a(new w(width-80,height-80),!1),this.balls.push(this.mainb)}draw(){background(123,255,123);for(const t of this.staticObjs)t.draw();this.hole.draw();for(const t of this.balls)t.draw();this.hasSelected||this.checkKnots()}checkKnots(){if(!this.selectedPolygon){for(let t=this.balls.length-1;t>=0;t--)if(this.balls[t].knot.check()){this.hasSelected=!0;return}if(this.hole.knot.check()){this.hasSelected=!0;return}for(let t=this.staticKnots.length-1;t>=0;t--)if(this.staticKnots[t].check()){this.hasSelected=!0;return}}}}class P{constructor(t){this.obj=t,this.knots=[],this.centerKnot=new h(0,0,this),main.staticKnots.push(this.centerKnot)}draw(){this.obj.draw();for(const t of this.knots)t.draw();this.centerKnot.draw()}convertKnots(){return this.knots.map(t=>[t.pos.x,t.pos.y])}update(t,e){if(t==this.centerKnot)for(const o of this.knots)o.pos.add(e);else{let o=0,i=0;for(const n of this.knots)o+=n.pos.x,i+=n.pos.y;o/=this.knots.length,i/=this.knots.length,this.centerKnot.pos=createVector(o,i)}if(this.obj instanceof f){const o=this.centerKnot.pos.x,i=this.centerKnot.pos.y;this.obj.cx=o,this.obj.cy=i;const n=[];for(const r of this.knots)n.push([r.pos.x-o,r.pos.y-i]);this.obj.render=n}this.obj.points=this.convertKnots()}addPoint(t,e){const o=new h(t,e,this);this.knots.push(o),main.staticKnots.push(o),this.update()}}class l extends h{constructor(t,e,o,i,n){super(t,e,o),this.originKnot=i,this.axis=n}originUpdate(t){this.pos.add(t)}update(){if(this.prevPos=this.pos.copy(),this.selected){const t=mousePos,e=p5.Vector.sub(t,this.originKnot.pos),o=p5.Vector.setMag(this.axis,e.dot(this.axis)/this.axis.mag()).add(this.originKnot.pos);this.pos=o,this.parent.update(this,p5.Vector.sub(this.pos,this.prevPos))}}}class c{constructor(t){this.obj=t,this.posKnot=new h(this.obj.x,this.obj.y,this),this.widthKnot=new l(this.obj.x+this.obj.w,this.obj.y,this,this.posKnot,createVector(1,0)),this.heightKnot=new l(this.obj.x,this.obj.y+this.obj.h,this,this.posKnot,createVector(0,1)),main.staticKnots.push(this.posKnot,this.widthKnot,this.heightKnot)}draw(){this.obj.draw(),this.posKnot.draw(),this.widthKnot.draw(),this.heightKnot.draw()}update(t,e){t==this.posKnot&&(this.widthKnot.originUpdate(e),this.heightKnot.originUpdate(e));const o=this.posKnot.pos;this.obj.x=o.x,this.obj.y=o.y,this.obj.w=this.widthKnot.pos.x-o.x,this.obj.h=this.heightKnot.pos.y-o.y}}const j=[{name:"Square Wall",create:(s,t)=>new c(new m(s,t,30,30))},{name:"Ice",create:(s,t)=>new c(new b(s,t,30,30))},{name:"Bouncer",create:(s,t)=>new a(new k(s,t))},{name:"Slope",create:(s,t)=>new c(new K(s,t,30,30,createVector(1,0)))},{name:"Polygon Wall",create:()=>{const s=new P(new g([]));return main.selectedPolygon=s,s}}],v=document.querySelector(".object-template");for(const s of j){const t=document.createElement("button");t.textContent=s.name,t.addEventListener("click",()=>{const e=s.create(width/2,height/2);main.staticObjs.push(e)}),v.append(t)}window.p5=y;window.mousex=void 0;window.mousey=void 0;window.main=new x;window.setup=()=>{noStroke();const s=createCanvas(900,900).parent(document.querySelector(".canvas-content"));s.mousePressed(S),s.elt.addEventListener("contextmenu",t=>t.preventDefault()),main.init()};window.draw=()=>{window.mousePos=createVector(mouseX,mouseY),main.draw(),main.selectedPolygon&&(fill(0),textAlign(CENTER),textSize(30),text(`Left click to add vertex, Right click to remove vertex
Esc to finish`,width/2,40))};function S(){if(!main.selectedPolygon)return;let s=main.selectedPolygon;if(mouseButton==LEFT)s.addPoint(mouseX,mouseY);else if(mouseButton==RIGHT){for(let t=s.knots.length-1;t>=0;t--)if(s.knots[t].check()){s.knots.splice(t,1),s.update();break}}return!1}window.keyPressed=()=>{main.selectedPolygon&&key=="Escape"&&(main.selectedPolygon=null)};window.mouseReleased=()=>{main.hasSelected=!1};
