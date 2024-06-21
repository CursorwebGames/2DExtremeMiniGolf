# Physics Notes

## Realisms
- Find a way to show physics is real
- Angle impulse calculations?
- Stop double colliding (push out of it)

## Gameplay
- Decide whether teleporting, if you can teleport back if that would be fun
- Color design as always

## Optimizations
- Implement a quadtree
- Due to mostly static nature of the program (few dynamic objects and calculations with many statics)
    - Have quadtree store components of static for collisions (e.g. line collision, circle collision)
- No need for dynamic objects optimizations

- Vite rewrite (once I feel like it) (ONLY IN JS NOT TYPESCRIPT)

## CCD
CCD by halving velocity and multiple substeps (todo: calculations on ratio & further optimizations)
- Boundary clipping redundancies (centripetal)? Is worth it?
    - Same with polygons as a radial force (centrifugal) in case ball goes inside
    - dt

## Level Editor
Good luck on this one!
- Ray tracing to determine hole in one