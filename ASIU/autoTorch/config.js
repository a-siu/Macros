const rate = 2; // Number of checks anc torches placed per second
const depth = 0; // Max depth reached (from player's feet)
const height = 5; // Max height reached (from player's feet)
const reach = 4; // Number of squares extended from the centre
const maxReach = 6; // Actual max reach of the player
// Default Order: Top to bottom, closest to furthest
const reverseOrder = false; // this option reverse the order
// const autoCrafting = false; // allow auto crafting
const autoPlacing = true; // allow auto placing
const useMainhand = false; // use the main hand instead of off hand for placing torches


module.exports = {
    rate: rate, depth: depth, height: height, reach: reach, maxReach: maxReach, reverseOrder: reverseOrder, onlyManualPlacement: onlyManualPlacement,
    autoPlacing: autoPlacing, useMainhand: useMainhand,
};