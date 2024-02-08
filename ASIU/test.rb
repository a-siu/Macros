# a 5 times for loop
5.times do |i|
    Chat.actionbar("#{i} is the current iteration")
    Client.waitTick(20)
end