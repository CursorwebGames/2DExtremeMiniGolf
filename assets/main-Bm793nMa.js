import{p as n,G as a}from"./gameManager-MpfLFCQi.js";window.p5=n;window.main=new a;window.setup=()=>{const e=createCanvas(windowWidth,windowHeight);noStroke(),e.elt.addEventListener("touchmove",i=>{i.preventDefault()}),main.init(),main.generateLevel()};window.draw=()=>{main.scene=="game"?main.draw():main.scene=="menu"?main.drawMenu():main.scene=="end"&&main.drawEnd()};window.mouseDragged=()=>{main.scene=="game"&&(main.mainb.isDragging=!0)};window.mouseReleased=()=>{if(main.scene=="menu"&&sqrt((mouseX-width/2)**2+(mouseY-height/2)**2)<100&&main.transition.begin(),main.scene=="game"){if(main.mainb.vel.mag()!=0)return;const e=n.Vector.sub(main.mainb.pos,createVector(mousex,mousey)).div(32);main.mainb.vel=e,main.strokes++,main.totalStrokes++,main.mainb.isDragging=!1}};window.touchEnded=window.mouseReleased;window.windowResized=()=>{resizeCanvas(windowWidth,windowHeight)};