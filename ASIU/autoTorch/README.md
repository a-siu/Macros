# AutoTorch
This is a macro for jsMacro that automatically scans the surrounding area for places where mobs can spawn, and then purge those spots with a torch.

## Default Config

rate = 2; // Number of checks anc torches placed per second (default: 2)

depth = 0; // Max depth reached (from player's feet) (default: 0)

height = 3; // Max height reached (from player's feet) (default: 3)

reach = 4; // Number of squares extended from the centre (default: 4)

maxReach = 6; // Actual max reach of the player (default: 6, vanilla: 4.5)

// Default Order: Top to bottom, closest to furthest

reverseOrder = false; // this option reverse the order