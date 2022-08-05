
data PowerMode = LowPower | Normal
type Position = Integer
type Watts = Integer
type MessageName = String
type RoverStatus = String

data Rover = Rover { position :: Position
                   , mode :: PowerMode
                   , generatorWatts :: Watts
                   } deriving Show

data Completed = Failed | Succeeded
data Result = Result Completed (Maybe RoverStatus)
data Command = ModeChange PowerMode | Move Position | StatusCheck
data Message = Message MessageName [Command]
data Respose = Response MessageName [Result]

receiveMessage :: Message -> Rover -> (Response, Rover)
receiveMessage (Message (messageName, commands)) rover = 
    (Response messageName results, newRover)
    where (results, newRover) = processCommands commands [] rover


processCommands :: [Command] -> [Result] -> Rover -> ([Result], Rover)
processCommands [] results rover = (results, rover)
processCommands [cmd: cmds] results rover = processCommands cmds (results : result) newRover
    where (result, newRover) = processCommand cmd rover


processCommand :: Command -> Rover -> (Result, Rover)
processCommand (ModeChange newMode) (Rover ogPosition _ ogWatts ) = (Succeeded Nothing, Rover ogPosition newMode ogWatts)
processCommand StatusCheck rover = (Succeeded Just (print rover), rover)
processCommand (Move newPosition) rover@(Rover ogPosition LowPower watts) = (Failed Nothing, rover)
processCommand (Move newPosition) (Rover _ Normal watts) = Succeeded Nothing (Rover newPosition Normal watts)