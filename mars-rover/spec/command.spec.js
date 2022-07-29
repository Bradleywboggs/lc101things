const Command = require("../command");

describe("command", () => {
  it("receives a commandType prop on instantiation", () => {
    const modeCommand = new Command("MODE_CHANGE");
    expect(modeCommand.commandType).toEqual("MODE_CHANGE");
  });

  it("receives a value prop as well.", () => {
    const modeCommand = new Command("MODE_CHANGE", "LOW_POWER");
    expect(modeCommand.value).toEqual("LOW_POWER");
  });

  it("throws error if no commandType is passed", () => {
    expect(Command).toThrow();
  });
});
