# Physics Notes

## Realisms
- Angle impulse between balls (which won't even happen for a bit)
<!-- - Find a way to show physics is real (momentum is the only way) -->
<!-- - Angle impulse calculations? -->
<!-- - Stop double colliding (push out of it) ??? this still a thing in 2024? -->

## Gameplay
- Decide whether teleporting, if you can teleport back if that would be fun
- Color design as always

## Optimizations
<!-- - Implement a quadtree
- Due to mostly static nature of the program (few dynamic objects and calculations with many statics)
    - Have quadtree store components of static for collisions (e.g. line collision, circle collision)
- No need for dynamic objects optimizations -->

- Relationship Reveal: classes extend a base class (if I feel like it)
    <!-- - make your own editorCamera -->

<!-- ## CCD
CCD by halving velocity and multiple substeps (todo: calculations on ratio & further optimizations)
- Boundary clipping redundancies (centripetal)? Is worth it?
    - Same with polygons as a radial force (centrifugal) in case ball goes inside
    - dt -->

# Level Editor
<!-- - We need to redo gamemanager and editormanager I think
    - Re-evaluate the meaning of "generateLevel" ... how should levels be created? -->

- do whatever you want and if you are inconvenienced fix it
- Ray tracing to determine hole in one

Add zooming out
Fix state bug for ice

## Release Plans
Post release or something rewrite thing to use javascript (tf does that mean you mean not use p5??)
Get multiplayer??
Try to find not p5.js because I just can't anymore ;-; (the library is so good but like it doesn't behave well with typescript and like i want types man i don't understand crap)

level editor round numbers at the end not during lmao
level editor make it work in production? (JUST KIDDING WHY WOULD I, do at the end)

Level editor, let's fix the evil that is knots
like i don't get this code duplication just get editormanager to do the things for you man make it draw the knots, make knots add themselves, stuffs like that bruh