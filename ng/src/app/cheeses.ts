import {menuItem} from './menuItem'

// Introduce enums.
// Explain why we provide strings.
// Introduce type annotations, like on the cheesePrice function.
// What would happen if we had `default: return 1.11` in cheesePrice,
// and introduced a new cheese, `Romano = 'Romano',` to the enum?

// Why don't we just do this?
// Because enums default to a series of integers, starting at 1.
// export enum Cheese {
//   Provolone,
//   Mozzarella,
//   Parmesean,
//   Ricotta,
//   Toscano,
// }

export enum Cheese {
  Provolone = 'Provolone',
  Mozzarella = 'Mozzarella',
  Parmesean = 'Parmesean',
  Ricotta = 'Ricotta',
  Toscano = 'Toscano',
}

export function cheesePrice(cheese: Cheese): number {
  switch (cheese) {
    // Comment out one of the lines below and see what the compiler does.
    // If the "strictNullChecks" compiler option is enabled, we see a compile-time error.
    // However, if the default weren't commented out then we'd probably have a bug
    // where a cheese was incorrectly priced.
    case Cheese.Provolone: return 6.79
    case Cheese.Mozzarella: return 5.69
    case Cheese.Parmesean: return 4.79
    case Cheese.Ricotta: return 2.89
    case Cheese.Toscano: return 5.25
    // default: return 1.11
  }
}

// Why not do it this way instead?
// Just provide a map of the cheese names to prices.
// What's the difference in how the compiler helps us?
export const cheesePrices = {
  [Cheese.Provolone]: 6.79,
  [Cheese.Mozzarella]: 5.69,
  // ...
}

export const menu = {
  cheeses: [
    Cheese.Mozzarella,
    Cheese.Parmesean,
    Cheese.Ricotta,
    Cheese.Toscano,
  ].map(menuItem(cheesePrice)),
  pastas: [],
}

