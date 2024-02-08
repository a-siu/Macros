for (i = 1; i <= 5; i++) {
    Chat.actionbar("this is an actionbar test " + i);
    Client.waitTick(20)
}