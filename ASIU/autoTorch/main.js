function main() {
    const reverse = !GlobalVars.getBoolean("autoTorch");
    GlobalVars.putBoolean("autoTorch", reverse);
    switch (reverse) {
        case false:  
            Chat.log(Chat.createTextBuilder().append("[").withColor(0x7)
                .append("autoTorch").withColor(0x5)
                .append("]").withColor(0x7).append(" disabled").withColor(0xc)
                .build());
                break
        case true:
            Chat.log(Chat.createTextBuilder().append("[").withColor(0x7)
            .append("autoTorch").withColor(0x5)
            .append("]").withColor(0x7).append(" enabled").withColor(0xc)
            .build());
            while (GlobalVars.getBoolean("autoTorch")) {
                Chat.log("do stuff here...");
                Client.waitTick(20); // wait 1 second (synchronized to client ticks)
            }
    }
    
   
}

function exec() {

}

main()