const Scratch = require("scratch-site-api")
const fs = require("fs/promises")

const client = new Scratch.User()
const users = require("./users.json")
const config = require("./config.json")

let truth = require("./truth.json")

const messages = [
    "I am a gnome and you have been gnomed!",
    "Poggers",
    "This isn't poggers!",
    "We no strangers to love!",
    "Never gonna give you up, Never gonna let you down!?",
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "Lenny Face ( ͡° ͜ʖ ͡°)",
    "(╯ ͠° ͟ʖ ͡°)╯┻━┻ I DONT LIKE DIS TABLE LOL!"
]

const main = async () => {
    await client.login(config.username, config.password)
    const messages = await client.messages.getCount()

    console.log(`I have ${JSON.parse(messages.body).count} unread messages`)

    comment(users[Math.floor(Math.random() * users.length)])
}

const comment = async (user) => {
    const message = messages[Math.floor(Math.random()*messages.length)]
    await client.comments.commentOnUser(message, user)
    truth++
    await client.profile.setStatus(`${truth} people are memers.`)
    console.log(`Commented on ${user}`)
    fs.appendFile("./log.txt", `[${new Date().toISOString()}] Commented on ${user} with comment ${message}\n`)
    fs.writeFile("./truth.json", JSON.stringify(truth))
    setTimeout(() => {
        comment(users[Math.floor(Math.random() * users.length)])
    }, (60000) + (Math.random() * 2) * 60000)
}

main()
