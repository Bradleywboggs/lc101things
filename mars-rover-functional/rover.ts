type PowerMode = "LOW_POWER" | "NORMAL"
type Position = number
type Watts = number
type MessageName = string

type Rover = {
    position: Position,
    mode: PowerMode
    generatorWatts: Watts
}

interface Result {completed: boolean, roverStatus?: Rover} 
type Command = ["STATUS_CHECK"] | ["MODE_CHANGE", PowerMode] | ["MOVE", Position]

type Message = {
    name: MessageName,
    commands: Array<Command>
}

type MessageResponse = {
    message: MessageName,
    results: Array<Result>
}

const receiveMessage = (message: Message, rover: Rover): [MessageResponse, Rover] => {
    const [results, newRover] = processCommands(message.commands, [], rover)
    return [{message: message.name, results: results}, newRover]
}

const processCommands = (cmds: Array<Command>, results: Array<Result>, rover: Rover): [Array<Result>, Rover] => {
    if (cmds.length === 0) {
        return [results, rover]
    }
    const [cmd, ...remainingCommands] = cmds
    const [result, newRover] = processCommand(cmd, rover)
    return processCommands(remainingCommands, [...results, result], newRover)
}


const processCommand = (cmd: Command, rover: Rover): [Result, Rover] => {
    const [cmdType, value] =  cmd
    if (cmdType === "MODE_CHANGE") {
        return [{completed: true}, {...rover, mode: value} ]
    }

    if (cmdType === "MOVE" && rover.mode === "LOW_POWER") {
        return [{completed: false}, rover]
    }

    if (cmdType === "MOVE" && rover.mode === "NORMAL") {
        return [{completed: true}, {...rover, position: value}]
    }

    return [{completed: true, roverStatus: rover}, rover]
}