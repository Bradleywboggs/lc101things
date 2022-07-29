// class Message {
//     name: string
//     commands: Array<object>
// }

// type RoverResponse = {
//     message: string,
//     results: Array<object>
// }

class Rover {
  constructor(position) {
    this.position = position;
    this.mode = "NORMAL";
    this.generatorWatts = 110;
  }

  handleCommand(cmd) {
    if (command.commandType === "MODE_CHANGE") {
      this.mode = command.value;
      return { completed: true };
    } else if (command.commandType === "MOVE") {
      this.position = command.value;
      return { completed: true };
    } else {
      //  command.commandType  === "STATUS_CHECK"
      return {
        completed: true,
        roverStatus: {
          mode: this.mode,
          generatorWatts: this.generatorWatts,
          position: this.position,
        },
      };
    }
  }

  receiveMessage(msg) {
    // let res = []
    // for (let i = 0; i < msg.commands.lenght; i++) {
    //     res.push(this.handleCommand(msg.commands[i]))
    // }

    let res = [];
    for (let command of msg.commands) {
      res.push(this.handleCommand(command));
    }

    // let res = msg.commands.map(this.handleCommand)

    return {
      message: msg.name,
      results: res,
    };
  }
}
