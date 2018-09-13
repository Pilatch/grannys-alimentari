import {menuItem} from './menuItem'

// Introduce enums.
// Explain why we provide strings.
// Introduce type annotations, like on the cheesePrice function.

// Why don't we just do this?
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
    // If the "strictNullChecks" compiler option were enabled, we'd see a compile-time error.
    case Cheese.Provolone: return 6.79
    case Cheese.Mozzarella: return 5.69
    case Cheese.Parmesean: return 4.79
    case Cheese.Ricotta: return 2.89
    case Cheese.Toscano: return 5.25
  }
}

export interface Menu {
  cheeses: string[]
}

export const menu: Menu = {
  cheeses: [
    Cheese.Mozzarella,
    Cheese.Parmesean,
    Cheese.Ricotta,
    Cheese.Toscano,
  ].map(menuItem(cheesePrice)),
}

