export interface PhysicsObj {
    pos: p5.Vector;
    vel: p5.Vector;
    r: number;

    draw(): void;
    applyForce(f: p5.Vector): void;
    update(): void;
    checkBounds(): void;

    /**
     * Collisions between physics objects
     * @param other
     */
    collide(other: PhysicsObj): void;
}

/**
 * A static object is an object that only applies force
 * You cannot move a static object
 * 
 * Also, static objects never interact with each other!
 */
export interface StaticObj {
    draw(): void;
    collide(obj: PhysicsObj): void;

    /**
     * Collisions between physics objects and static objects
     * @param obj
     */
    isColliding(obj: PhysicsObj): void;
}
