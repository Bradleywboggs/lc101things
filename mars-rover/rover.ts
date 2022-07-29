

class Message {
    name: string
    commands: Array<object>
}


type RoverResponse = {
    message: string,
    results: Array<object>
}

class Rover {
    position: number
    mode: "NORMAL" | "LOW_POWER"
    generatorWatts: number

    constructor(position: number) {
        this.position = position
        this.mode = "NORMAL"
        this.generatorWatts = 110
    }

    receiveMessage(msg) {
        let res: Array<object> = []
        for (let command of msg.commands) {
            if (command.commandType === "MODE_CHANGE")
        }
        
        return {
            message: msg.name,
            results: [{}, {}]
        }
    }



}