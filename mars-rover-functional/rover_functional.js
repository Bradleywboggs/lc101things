
const receiveMessage = (message , rover) => {
    const [results, newRover] = processCommands(message.commands, [], rover)
    return [{message: message.name, results: results}, newRover]
}

const processCommands = (cmds, results, rover)=> {
    if (cmds.length === 0) {
        return [results, rover]
    }
    const [cmd, ...remainingCommands] = cmds
    const [result, newRover] = processCommand(cmd, rover)
    return processCommands(remainingCommands, [...results, result], newRover)
}


const processCommand = (cmd, rover) => {
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
