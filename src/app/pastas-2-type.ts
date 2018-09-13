import {Cheese, cheesePrice, menu as cheeseMenu} from './cheeses'
import {menuItem} from './menuItem'

// Talk about how not every pasta is stuffed with cheese,
// and how we can model that.

enum PastaName {
  Spaghetti = 'Spaghetti',
  Rigatoni = 'Rigatoni',
  Linguini = 'Linguini',
  Tortellini = 'Tortellini',
  Ravioli = 'Ravioli',
  Shells = 'Shells',
}

// Here we're defining interfaces with literal values and types.
// "name" is the discriminant.
interface Spaghetti { name: PastaName.Spaghetti }
interface Rigatoni { name: PastaName.Rigatoni }
interface Linguini { name: PastaName.Linguini }
interface Tortellini { name: PastaName.Tortellini, cheese: Cheese }
interface Ravioli { name: PastaName.Ravioli, cheese: Cheese }
interface Shells { name: PastaName.Shells, cheese: Cheese }

type Pasta = Spaghetti | Rigatoni | Linguini | Ravioli | Tortellini | Shells

export const pastaWithCheesePrice = (pasta: Pasta): number => {
  // When we try to be explicit that we're matching against each PastaName,
  // the compiler will complain about "cheese" not being on type Pasta, nor Spaghetti.
  // const pastaName: PastaName = pasta.name
  // switch (pastaName) {
  // Same with...
  // switch (pasta.name as PastaName) {

  switch (pasta.name) {
    case PastaName.Spaghetti: return 2
    case PastaName.Rigatoni: return 1.89
    case PastaName.Linguini: return 1.6
    case PastaName.Ravioli: return 1.75 + cheesePrice(pasta.cheese)
    case PastaName.Tortellini: return 2.25 + cheesePrice(pasta.cheese)
    case PastaName.Shells: return 1.75 + cheesePrice(pasta.cheese)
  }
}

export interface Menu {
  cheeses: string[]
  pastas: string[]
}

export const menu: Menu = {
  cheeses: cheeseMenu.cheeses,
  pastas: [
    {name: PastaName.Spaghetti},
    {name: PastaName.Linguini},
    {name: PastaName.Tortellini, cheese: Cheese.Parmesean},
    {name: PastaName.Tortellini, cheese: Cheese.Toscano},
    {name: PastaName.Ravioli, cheese: Cheese.Toscano},
    {name: PastaName.Ravioli}, // Why does this compile???
    {name: PastaName.Shells, cheese: Cheese.Ricotta},
  ].map(menuItem(pastaWithCheesePrice))
}
