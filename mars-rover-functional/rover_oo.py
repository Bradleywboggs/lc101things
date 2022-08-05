from dataclasses import dataclass
from enum import Enum


class CommandType(Enum):
    ModeChange = "MODE_CHANGE"
    Move = "MOVE"
    StatusCheck = "STATUS_CHECK"


class PowerMode(Enum):
    LowPower = "LOW_POWER"
    Normal = "NORMAL"


@dataclass
class Command:
    command_type: CommandType
    value: None | int | str


@dataclass
class Message:
    name: str
    commands: list[Command]


@dataclass
class Result:
    completed: bool
    rover_status: None | dict


@dataclass
class Response:
    message: str
    results: list[Result]


class Rover:
    def __init__(self, position: int):
        self.position = position
        self.mode = PowerMode.Normal
        self.generator_watts = 110

    def receive_message(self, msg: Message) -> Response:
        return Response(message=msg.name, results=[self.process_command(cmd) for cmd in msg.commands])

    def process_command(self, cmd: Command):
        if cmd.command_type == CommandType.ModeChange:
            self.mode = cmd.value
            return Result(completed=True, rover_status=None)
        if cmd.command_type == CommandType.Move and self.mode == PowerMode.Normal:
            self.position = cmd.value
            return Result(completed=True, rover_status=None)
        if cmd.command_type == CommandType.Move and self.mode == PowerMode.LowPower:
            return Result(completed=False, rover_status=None)
        return Result(completed=True, rover_status={"mode": self.mode, "position": self.position, "generatorWatts": self.generator_watts})



