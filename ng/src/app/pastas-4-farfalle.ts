import {Cheese, cheesePrice, menu as cheeseMenu} from './cheeses'
import {menuItem} from './menuItem'

// Let's explore what happens when we add a new pasta, Farfalle.
// Un-commenting the line for Farfalle in the PastaName enum doesn't
// do much for us on its own.
// Instead let's try the opposite. Add it to the menu first, the work your way backwards!
// If time allows, ask how we would model a pasta being stuffed with a combination of cheeses.

enum PastaName {
  Spaghetti = 'Spaghetti',
  Rigatoni = 'Rigatoni',
  Linguini = 'Linguini',
  Tortellini = 'Tortellini',
  Ravioli = 'Ravioli',
  Shells = 'Shells',
  // Farfalle = 'Farfalle',
}

interface Spaghetti { name: PastaName.Spaghetti }
interface Rigatoni { name: PastaName.Rigatoni }
interface Linguini { name: PastaName.Linguini }
interface Tortellini { name: PastaName.Tortellini, cheese: Cheese }
interface Ravioli { name: PastaName.Ravioli, cheese: Cheese }
interface Shells { name: PastaName.Shells, cheese: Cheese }
// interface Farfalle {name: PastaName.Farfalle}

type Pasta = Spaghetti | Rigatoni | Linguini | Ravioli | Tortellini | Shells // | Farfalle

export const pastaWithCheesePrice = (pasta: Pasta): number => {
  // When we try to enforce that we're matching against each PastaName,
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
    // case PastaName.Farfalle: return 1.29
  }
}

const pastasOnMenu: Pasta[] = [
  {name: PastaName.Spaghetti},
  {name: PastaName.Linguini},
  {name: PastaName.Tortellini, cheese: Cheese.Parmesean},
  {name: PastaName.Ravioli, cheese: Cheese.Provolone},
  {name: PastaName.Shells, cheese: Cheese.Ricotta},
  // {name: PastaName.Farfalle},
]

export const menu = {
  cheeses: cheeseMenu.cheeses,
  pastas: pastasOnMenu.map(menuItem(pastaWithCheesePrice))
}
