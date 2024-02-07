//  custom single-line functions
const toRadians = a => (a * Math.PI / 180);
const getDistance = (a, b) => (a.toVector(b).getMagnitude());
const posToNBT = a => (World.getBlock(a).getNBT().asCompoundHelper());
const posToBlock = a => (World.getBlock(a));

// basic info for script
const p = Player.getPlayer();
const blockPos = World.findBlocksMatching("minecraft:campfire", 1);
const initialPosition = p.getPos();
const initialEyePosition = initialPosition.add(.0, p.getEyeHeight(), .0);
filteredBlockPos = [];
for (const x of blockPos)
  if (getDistance(x, initialEyePosition) < 4) filteredBlockPos.push(x);
// // aimPos = filteredBlockPos.map(x => x.add(.5, .2, .5));
// Chat.log(blockPos[0]);
// const campfireVacancy = blockPos.forEach(x => World.getBlock(x).getNBT().asCompoundHelper().get("Items"));

// const nbt = World.getBlock(blockPos[0]).getNBT().asCompoundHelper().get('Items');


var {
  food
} = require('./config.js');
food = food.map(x => "minecraft:" + x)
all: {
  const inv = Player.openInventory();
  const reverse = !GlobalVars.getBoolean("CookingWithCampfire");
  GlobalVars.putBoolean("CookingWithCampfire", reverse);
  if (!reverse) {
    Chat.log(Chat.createTextBuilder().append("[").withColor(0x7)
      .append("CookingWithCampfire").withColor(0x5)
      .append("]").withColor(0x7).append(" disabled").withColor(0xc)
      .build());
    break all;
  }

  Chat.log(Chat.createTextBuilder().append("[").withColor(0x7)
    .append("CookingWithCampfire").withColor(0x5)
    .append("]").withColor(0x7).append(" enabled").withColor(0xc)
    .build());
  // startJobs();
  const campfireVacancy = new Map();
  while (GlobalVars.getBoolean("CookingWithCampfire")) {
    Client.waitTick(20); // wait 1 second (synchronized to client ticks)
    // var entities = World.getEntities();
    // var filteredEntities = []
    // for (const e in entities)
    //   if (e.getType() === "minecraft:item" ) filteredEntities.push(e);
    filteredBlockPos.forEach(x => campfireVacancy.set(x, 4 - posToNBT(x).get("Items").asListHelper().length()));
    for (const [pos, k] of campfireVacancy.entries()) {
      if ((k == 0) || (getDistance(pos, p.getPos()) > 6)) continue;
      for (let i = 0; i < k; i++) {
        var offHandItemId = inv.getSlot(45).getItemId();
        if (!(food.includes(offHandItemId))) {
          slotToSwap = seekFoodInInv(inv);
          if (slotToSwap == null) {
            Chat.log(Chat.createTextBuilder().append("[").withColor(0x7)
              .append("CookingWithCampfire").withColor(0x5)
              .append("]").withColor(0x7).append(" No Food in inventory").withColor(0xc)
              .build());
            GlobalVars.putBoolean("CookingWithCampfire", false);
            break all;
          } else {
            inv.swapHotbar(slotToSwap, 40);
          }
          Client.waitTick()
        }
        p.interactBlock(pos.getX(), pos.getY(), pos.getZ(), 0, true, true);
      }
      Client.waitTick();
    }
  }
}

function seekFoodInInv(inv) {
  const totalSlots = inv.getTotalSlots();
  for (let i = 0; i < totalSlots - 1; i++) {
    if (food.includes(inv.getSlot(i).getItemId())) {
      return i;
    }
  }
  return null
}
