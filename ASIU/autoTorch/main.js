
// Define a function named 'toggle' that changes the value of 'autoTorch' global variable and logs a message
function toggle() {
    // Get the current value of 'autoTorch' global variable, negate it and assign it back to 'autoTorch'
    const reverse = !GlobalVars.getBoolean("autoTorch");
    GlobalVars.putBoolean("autoTorch", reverse);

    // Check the new value of 'autoTorch' and log a corresponding message
    switch (reverse) {
        case false:
            Chat.actionbar(Chat.createTextBuilder().append("[").withColor(0x7)
                .append("autoTorch").withColor(0x5)
                .append("]").withColor(0x7).append(" disabled").withColor(0xc)
                .build());
            break
        case true:
            Chat.actionbar(Chat.createTextBuilder().append("[").withColor(0x7)
                .append("autoTorch").withColor(0x5)
                .append("]").withColor(0x7).append(" enabled").withColor(0xc)
                .build());

            // Call 'exec' function when 'autoTorch' is enabled
            exec();
    }

}

// Define a function named 'ring' that generates a list of BlockPos3D objects around a center origin
function ring(n, h = 0) {
    if (n == 0) return [PositionCommon.createPos(0, h, 0)];
    // starting pos [n, 0, 0]
    const result = [];
    for (let i = 0; i <= n; i++) {
        for (let j = 0; j <= 3; j++) {
            const newPos = rotatePos(n, 0, i, j)
            result.push((newPos.toVector().getMagnitude() <= maxReach ? [newPos.add(0, h, 0)] : [])[0]);
        }
    }
    return result;

}

// rotate the given pos counter-clockwise by the y-axis by 90 degrees n times, and return it as a BlockPos object, mainly used by the ring(n) function
function rotatePos(x, y, z, n) {
    switch (n % 4) {
        case (1):
            return PositionCommon.createPos(z, y, -x);
        case (2):
            return PositionCommon.createPos(-x, y, -z);
        case (-1):
        case (3):
            return PositionCommon.createPos(z, y, -x);
        default:
            return PositionCommon.createPos(x, y, z);
    }
}

// function attemptCraft(itemId, times = 1) {

// }

function firstSpawnablePos() {
    switch (reverseOrder) {
        case (true):
            for (let y = -depth; y <= height; y++) {
                for (pos of allBlockOffsets.toReversed()) {
                    const checkPos = p.getPos().add(...posToArray(pos)).add(0, y, 0)
                    if (World.getBlock(checkPos).getBlock().canMobSpawnInside()) return checkPos;
                }
            }
        default:
            for (let y = height; y >= -depth; y--) {
                for (pos of allBlockOffsets) {
                    const checkPos = p.getPos().add(...posToArray(pos)).add(0, y, 0)
                    if (World.getBlock(checkPos).getBlock().canMobSpawnInside()) return checkPos;
                }
            }
    }
}

function exec() {
    while (GlobalVars.getBoolean("autoTorch")) {
        Client.waitTick(parseInt(Math.floor(20 / rate)));
        const listTorch = invPlayer.findItem("minecraft:torch");
        if (!listTorch) {
            // attemptCraft("minecraft:torch");
            Chat.log(Chat.createTextBuilder().append("[").withColor(0x7)
                .append("autoTorch").withColor(0x5)
                .append("]").withColor(0x7).append(" No torches found in inventory. Ending Macro").withColor(0xc)
                .build())
            GlobalVars.setBoolean("autoTorch", false);
            break
        }

        const torchItemSlot = invPlayer.getItem(listTorch[0]);
        if (!autoPlacing) continue; // skip the loop

        const placementPos = firstSpawnablePos();
        invPlayer.swapHotbar(torchItemSlot, useMainhand ? invPlayer.getSelectedHotbarSlotIndex() : 40);
        punchypunch.interactBlock(...posToArray(placementPos), 1, !useMainHand, false);
        invPlayer.swapHotbar(torchItemSlot, useMainhand ? invPlayer.getSelectedHotbarSlotIndex() : 40);


    }
}
const posToArray = (a) => [a.getX(), a.getY(), a.getZ()];
// World.getBlock().getBlock().canMobSpawnInside()
const { rate, depth, height, reach, maxReach, reverseOrder, autoPlacing, useMainhand } = require('./config.js');
// global variables
const p = Player.getPlayer();
const invPlayer = Player.openInventory();
const punchypunch = Player.interactions();
const allBlockOffsets = [];
for (let k = 0; k <= reach; k++) {
    allBlockOffsets.push(...ring(k));
}
// Call 'toggle' function to change 'autoTorch' state and execute necessary actions
// toggle();
