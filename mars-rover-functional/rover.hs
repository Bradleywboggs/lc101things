#! /usr/bin/env stack
--stack --resolver lts-16.26 script
data PowerMode = LowPower | Normal deriving (Show, Eq)
type Position = Integer
type Watts = Integer
type MessageName = String
type RoverStatus = String

data Rover = Rover { position :: Position
                   , mode :: PowerMode
                   , generatorWatts :: Watts
                   } deriving Show
 
data Completed = Failed | Succeeded deriving Show
data Result = Result Completed (Maybe RoverStatus) deriving Show
data Command = ModeChange PowerMode | Move Position | StatusCheck deriving Show
data Message = Message MessageName [Command] deriving Show
data Response = Response MessageName [Result] deriving Show

receiveMessage :: Message -> Rover -> (Response, Rover)
receiveMessage (Message messageName commands) rover = 
    (Response messageName results, newRover)
    where (results, newRover) = processCommands commands [] rover


processCommands :: [Command] -> [Result] -> Rover -> ([Result], Rover)
processCommands [] results rover = (results, rover)
processCommands (cmd: cmds) results rover = processCommands cmds (results ++ [result]) newRover
    where (result, newRover) = processCommand cmd rover


processCommand :: Command -> Rover -> (Result, Rover)
processCommand (ModeChange newMode) (Rover ogPosition _ ogWatts ) = (Result Succeeded Nothing, Rover ogPosition newMode ogWatts)
processCommand StatusCheck rover = (Result Succeeded (Just $ show rover), rover)
processCommand (Move newPosition) rover@(Rover ogPosition LowPower watts) = (Result Failed Nothing, rover)
processCommand (Move newPosition) (Rover _ Normal watts) = (Result Succeeded Nothing, Rover newPosition Normal watts)



main :: IO ()
main = do 
    let commands = [ StatusCheck
                   , ModeChange LowPower
                   , StatusCheck
                   , Move 300
                   , StatusCheck
                   , ModeChange Normal
                   , StatusCheck
                   , Move 300
                   , StatusCheck
                   ]
    let message = Message "Test" commands
    let rover = Rover 100 Normal 110
    let (response, updatedRover) = receiveMessage message rover
    print response
    print updatedRover
    