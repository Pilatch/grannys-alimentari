import { menuItem } from './menuItem'

export enum Cheese {
  Provolone = 'Provolone',
  Mozzarella = 'Mozzarella',
  Parmesean = 'Parmesean',
  Ricotta = 'Ricotta',
  Toscano = 'Toscano',
}

// We don't care about "name" because we're just describing object keys.
// So in some TypeScript annotations in the wild, you'll instead see that line
// written with an underscore, like so `[_: string]: number`
interface CheesePrices {
  // TypeScript won't let us specify that each key in this object must be a Cheese.
  [name: string]: number
}

// If we comment out one of these we get a runtime error.
// ...Except for Provolone, which isn't on the menu right now.
// Even with strictNullChecks compiler setting on, this will compile!
let cheesePrices: CheesePrices = {
  [Cheese.Provolone]: 6.79,
  [Cheese.Mozzarella]: 5.69,
  [Cheese.Parmesean]: 4.79,
  [Cheese.Ricotta]: 2.89,
  [Cheese.Toscano]: 5.25,
}

function cheesePrice(cheese: Cheese): number {
  return cheesePrices[cheese]
}

export const menu = {
  cheeses: [
    Cheese.Mozzarella,
    Cheese.Parmesean,
    Cheese.Ricotta,
    Cheese.Toscano
  ].map(menuItem(cheesePrice)),
}

// TODO try putting the prices in as literals in interfaces in a union.
