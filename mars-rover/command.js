class Command {
  constructor(commandType, value) {
    if (typeof commandType === "undefined") {
      throw new Error("Command type is required.");
    }
    this.commandType = commandType;
    this.value = value;
  }

  execute() {
    console.log(this.commandType);
    console.log(this.value);
  }
}

const cmd1 = new Command("POOP_YOUR_PANTS", "BROWN");
cmd1.commandType;
cmd1.value;

module.exports = Command;
