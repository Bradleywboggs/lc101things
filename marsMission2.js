// This is a true constant value, meaning it's true always no matter what (it won't with different inputs)
// because it's just a measurement, a mathematical fact
//  which we show by declaring its name using SCREAMING_SNAKE_CASE
const MILES_PER_KM = 0.621 
const HOURS_PER_DAY = 24
// I think of this as a type: SpaceShuttle
// type SpaceShuttle = {
//     name: str,
//     speed: number
// }
const spaceShuttle = {
   name: "Determination",
   speed: 17500,
}
//type Destination  = {
// name: string,
// distanceKm: number    
//}
// I think of this as a type: Destination
const moonDestination = {
   name: "The Moon",
   distanceKm: 384400
}

// another instance of the type: Destination
const marsDestination = {
   name: "Mars",
   distanceKm: 225000000
}


// function calculateTravelDays (mph, km) {
//     return km * MILES_PER_KM / mph / HOURS_PER_DAY
// }

// takes any mph and any km and returns the days to travel
const calculateTravelDays = (mph, km) => { 
   return km * MILES_PER_KM / mph / HOURS_PER_DAY
}


// a function whose type signature reads: SpaceShuttle -> Destination -> Void (doesn't return anything, just prints to the screen)
const displayShuttleTravelDays = (spaceShuttle, destination) => {
   console.log(`${spaceShuttle.name} will take ${calculateTravelDays(spaceShuttle.speed, destination.distanceKm)} days to get to ${destination.name}.`)
}

// implementation# 1: manually execute the program for each destination
displayShuttleTravelDays(spaceShuttle, marsDestination)
displayShuttleTravelDays(spaceShuttle, moonDestination)

// has the type of: [Destination] (array of Destinations)
const destinations = [marsDestination, moonDestination]

sum = 0
for (const d in destinations) {
   sum = sum + distanceKm
}

// implementation #2: raw for-loop
// desecription of what's happening:
// let index = 0; we are initializing a variable 'index' at 0 

// index < destinations.length; 
//        this is setting the termination condition for the loop --
//          keep looping while the index value is less than the length of the array

//  index++ - after we execute the body of the loop, 
//      increment the value of index, then check the termination condition, 
//  and if not met then execute the body of the loop with the new value 
//      
for (let i = 0; i < destinations.length; i++) {
   displayShuttleTravelDays(spaceShuttle, destinations[i])
}

// implementation #3: 'for-of' loop
//  basically a higher level version of the raw for loop
for (const destination of destinations) {
   displayShuttleTravelDays(spaceShuttle, destination)
}


// implementation #4: forEach method
//  a higher level version of the for-of loop
//  the forEach method knows how to iterate, you just pass it
//  behavior (a function)
destinations.forEach(function (destination) {
   displayShuttleTravelDays(spaceShuttle, destination)
})

module.exports = {
   destinations,
   spaceShuttle,
   marsDestination,
   moonDestination,
   calculateTravelDays,
   displayShuttleTravelDays
}