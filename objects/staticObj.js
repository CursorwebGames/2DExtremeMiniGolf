/**
 * A static object is an object that only applies force
 * You cannot move a static object
 * 
 * Also, static objects never interact with each other!
 */
class StaticObj {
    draw() { }
    collide(obj) { }
    isColliding(obj) { }
}

// file just for reference