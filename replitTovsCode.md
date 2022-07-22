# How To Set Up Local Dev Environment from replit (without testing setup)

## Create a new directory
- within your projects folder, create a new directory named for the new project (e.g. `scrabbleScorer`)

## Copy index.js File from the replit `Files` section into the new directory
- copy contents of the `index.js`
- create an `index.js` file within `scrabbleScorer` (or whatever your new project is called) directory 


## Copy additional top-level `.js` files from replit into the new directory
- **example** 
    create `scrabble-scorer.js` within your local `scrabbleScorer` directory. Copy the contents of `scrabble-scorer.js` from replit into your new file of the same name.

## Copy `package.json` file
- create a `package.json` file within your new directory
- copy the contents of the replit `package.json` and paste into your local `package.json`

## Install the package
- In your terminal, within the `scrabbleScorer` directory run 

```node
npm install .
```
