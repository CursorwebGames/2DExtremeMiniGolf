export abstract class iDynObj {
    abstract draw(): void;
    abstract applyForce(f: p5.Vector): void;

}

export abstract class iStaticObj {
    abstract draw(): void;
    abstract collide(obj: iDynObj): void;
    abstract isColliding(obj: iDynObj): boolean;
}
