module.exports = {
    rate: 2,  // number of checks and torches placed (per second)

    depth: 0,   // the max depth being checked, relative to the players feet (y-axis)
    height: 3, // the max height being checked, relative to the players feet (y-axis)
    range: 4, // how far away from a player can be checked (in blocks)
    // Currently, actual scan volume is a cuboid with top and bottom faces as a square of side lengths "2*range-1", with total height of "height+depth"

    // the default order of scanning is from top to bottom, closest to furthest
    reverseOrder: false // this option reverse the order

}