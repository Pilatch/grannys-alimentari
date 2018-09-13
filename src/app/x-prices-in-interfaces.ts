import {menuItem} from './menuItem'

interface Cheese {
  name: CheeseName
  price: number
}

export interface Menu {
  cheeses: string[]
}

enum CheeseName {
  Provolone = 'Provolone',
  Mozzarella = 'Mozzarella',
  Parmesean = 'Parmesean',
  Ricotta = 'Ricotta',
  Toscano = 'Toscano',
}

// Granny really doesn't like this approach because it ties pricing to the menu.
// The menu changes often because her gourmet suppliers have limited supply,
// but the price rarely changes.
// Furthermore, how do we determine the price of pastas filled with cheeses?
export const menu: Menu = {
  cheeses: [
    {name: CheeseName.Mozzarella, price: 5.69 },
    {name: CheeseName.Parmesean, price: 4.79 },
    // {name: CheeseName.Provolone, price: 6.79 },
    {name: CheeseName.Ricotta, price: 2.89 },
    {name: CheeseName.Toscano, price: 5.25},
  ].map(menuItem(cheese => cheese.price)),
}

// One would think that you could use make the prices of the cheeses literals in interfaces,
// like we did for the pastas' names, but then you have a different problem.

interface Mozzarella {
  name: CheeseName.Mozzarella
  price: 5.69
}
interface Provolone {
  name: CheeseName.Provolone
  price: 6.79
}
interface Parmesean {
  name: CheeseName.Parmesean
  price: 4.79
}
interface Ricotta {
  name: CheeseName.Ricotta
  price: 2.89
}
interface Toscano {
  name: CheeseName.Toscano
  price: 5.25
}

type Cheese2 = Mozzarella | Provolone | Parmesean | Ricotta | Toscano

// This won't compile because you need the list of cheeses to be concrete things, not types.
// export const menu2: Menu = {
//   cheeses: [
//     Mozzarella, Parmesean, Provolone, Ricotta, Toscano
//   ].map(menuItem(cheese => cheese.price)),
// }
