class Command {
    constructor(commandType, value) {
        if (commandType === undefined) {
            throw new Error("Nope")
        }
        this.commandType = commandType
        this.value = value
    }
}

class Message {
    constructor(name, commands) {
        this.name = name
        this.commands = commands
    }
}


class Rover {
    constructor(position) {
        this.position = position
        this.mode = "NORMAL"
        this.generatorWatts = 110
    }

    receiveMessage(msg) {
        return {
            message: msg.name,
            results: msg.commands.map(this.processCommand)
        }
    }

    processCommand(cmd) {
        if (cmd.commandType === "MODE_CHANGE") {
            this.mode = cmd.value
            return {completed: true}
        }
        if (cmd.commandType === "MOVE" && this.mode === "LOW_POWER") {
            return {completed: false}
        }

        if (cmd.commandType === "MOVE" && this.mode === "NORMAL") {
            this.position = cmd.value
            return {completed: true}
        }

        return {
            completed: true,
            roverStatus: {
                position: this.position,
                mode: this.mode,
                generatorWatts: this.generatorWatts,
            }
        }
    }

}