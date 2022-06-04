 // This is a true constant value, meaning it's true always no matter what (it won't with different inputs)
 // because it's just a measurement, a mathematical fact
 //  which we show by declaring its name using SCREAMING_SNAKE_CASE
declare const MILES_PER_KM = 0.621 
declare const HOURS_PER_DAY = 24

function to<T extends { readonly __tag: symbol, value: any } = { readonly __tag: unique symbol, value: never }> (value: T["value"]): T {
    return value as any as T;
}

function from<T extends { readonly __tag: symbol, value: any }>(value: T): T["value"] {
    return value as any as T["value"];
}

type Mph = {
    value: number,
    readonly __tag: unique symbol
}
type Kilometers = {
    value: number,
    readonly __tag: unique symbol
}

type Miles = {
    value: number,
    readonly __tag: unique symbol
}

type Hours = {
    value: number,
    readonly __tag: unique symbol
}

type Days = {
    value: number,
    readonly __tag: unique symbol
}


type SpaceShuttle = {
    name: string,
    speed: Mph
}

type Destination  = {
    name: string,
    distanceKm: Kilometers    
}

const spaceShuttle: SpaceShuttle = {
    name: "Determination",
    speed: to<Mph>(17500)
}

const moonDestination: Destination = {
    name: "The Moon",
    distanceKm: to<Kilometers>(384400)
}

const marsDestination: Destination = {
    name: "Mars",
    distanceKm: to<Kilometers>(225000000)
}

const kmToMi = (km: Kilometers): Miles => to<Miles>((from<Kilometers>(km) * MILES_PER_KM))
const hoursFromMiAndMph = (mi: Miles, mph: Mph): Hours => to<Hours>((from<Miles>(mi) / from<Mph>(mph)))
const daysFromHours = (hours: Hours): Days => to<Days>((from<Hours>(hours) / HOURS_PER_DAY))

const calculateTravelDays = (mph: Mph, km: Kilometers): Days => { 
    return daysFromHours(hoursFromMiAndMph(kmToMi(km), mph))
}

const displayShuttleTravelDays = (spaceShuttle: SpaceShuttle, destination: Destination): void => {
    console.log(`${spaceShuttle.name} will take ${from<Days>(calculateTravelDays(spaceShuttle.speed, destination.distanceKm))} days to get to ${destination.name}.`)
}



displayShuttleTravelDays(spaceShuttle, marsDestination)
displayShuttleTravelDays(spaceShuttle, moonDestination)

const destinations: Array<Destination> = [marsDestination, moonDestination]



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

// implemetation #4: forEach method
//  a higher level version of the for-of loop
destinations.forEach(destination => displayShuttleTravelDays(spaceShuttle, destination))

// function displaySection(title, label1, value1, label2, value2) {
//     console.log(line)
//     console.log(title.toLowerCase())
//     console.log(line)
//     console.log(`${label1}: ${value1}`)
//     console.log(`${label2}: ${value2}`)
//     console.log()
//     console.log()
// }

module.exports = {
    // displaySection,
    destinations,
    spaceShuttle,
    // marsDestination,
    // moonDestination,
    // calculateTravelDays,
    displayShuttleTravelDays
}