import{p as i,G as a}from"./gameManager-C4QyD-qb.js";window.p5=i;window.main=new a;window.setup=()=>{const e=createCanvas(windowWidth,windowHeight);noStroke(),e.elt.addEventListener("touchmove",n=>{n.preventDefault()}),main.init(),main.generateLevel()};window.draw=()=>{main.scene=="game"?main.draw():main.scene=="menu"?main.drawMenu():main.scene=="end"&&main.drawEnd()};window.mousePressed=()=>{if(main.scene=="game"){if(main.mainb.inHole||main.mainb.vel.mag()!=0)return;main.mainb.dragOrigin=createVector(mouseX,mouseY)}};window.mouseReleased=()=>{if(main.scene=="menu"&&sqrt((mouseX-width/2)**2+(mouseY-height/2)**2)<100&&main.transition.begin(),main.scene=="game"){const e=main.mainb.getDir().div(30);if(main.mainb.dragOrigin=null,main.mainb.vel.mag()!=0)return;main.mainb.vel=e,main.strokes++,main.totalStrokes++}};window.touchStarted=window.mousePressed;window.touchEnded=window.mouseReleased;window.windowResized=()=>{resizeCanvas(windowWidth,windowHeight)};
