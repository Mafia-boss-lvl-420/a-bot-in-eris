const util = require("util");
const fs = require("fs");
require("dotenv").config();

const Client = require("./theGoods/bot");


const bot = new Client(process.env.botToken, {
    restMode: true
})


const init = async () => {
    const cmdDirs = await util.promisify(fs.readdir)(__dirname + "/theGoods/cmds/");
    cmdDirs.forEach(async dir => {
        let files = await util.promisify(fs.readdir)(__dirname + "/theGoods/cmds/" + dir);
        files.forEach(file => {
            bot.loadCmd(`./cmds/${dir}/${file}`)
        })
    })

    const eventFules = await util.promisify(fs.readdir)(__dirname + "/theGoods/events/");
    eventFules.forEach(file => {
        bot.loadEvent(`./events/${file}`, bot)
    })

}
init()

bot.connect()