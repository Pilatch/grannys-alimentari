import {Cheese, cheesePrice, menu as cheeseMenu} from './cheeses'
import {menuItem} from './menuItem'

// Show how we can model only certain pastas being stuffed with cheese.
// Notice the NAN in the pasta menu in your browser.
// How do we shift this from a run-time check to a compile-time one?
// Talk about how an array is not type-limited unless you annotate it.

enum PastaName {
  Spaghetti = 'Spaghetti',
  Rigatoni = 'Rigatoni',
  Linguini = 'Linguini',
  Tortellini = 'Tortellini',
  Ravioli = 'Ravioli',
  Shells = 'Shells',
}

// Here we're defining interfaces with both types and literal values.
// "name" is the discriminant, and assigned a string literal for each Pasta.
// If we try to define Spaghetti with "nom" instead of "name",
// We'll get a problem once we try to use it.
interface Spaghetti { name: PastaName.Spaghetti }
interface Rigatoni { name: PastaName.Rigatoni }
interface Linguini { name: PastaName.Linguini }
interface Tortellini { name: PastaName.Tortellini, cheese: Cheese }
interface Ravioli { name: PastaName.Ravioli, cheese: Cheese }
interface Shells { name: PastaName.Shells, cheese: Cheese }

type Pasta = Spaghetti | Rigatoni | Linguini | Ravioli | Tortellini | Shells

export const pastaWithCheesePrice = (pasta: Pasta): number => {
  switch (pasta.name) {
    // Will it compile when we un-comment the following line?
    // case 'foo': return -3.99
    case PastaName.Spaghetti: return 2
    case PastaName.Rigatoni: return 1.89
    case PastaName.Linguini: return 1.6
    case PastaName.Ravioli: return 1.75 + cheesePrice(pasta.cheese)
    case PastaName.Tortellini: return 2.25 + cheesePrice(pasta.cheese)
    case PastaName.Shells: return 1.75 + cheesePrice(pasta.cheese)
  }
}

export const menu = {
  cheeses: cheeseMenu.cheeses,
  pastas: [
    {name: PastaName.Spaghetti},
    {name: PastaName.Linguini},
    {name: PastaName.Tortellini, cheese: Cheese.Parmesean},
    {name: PastaName.Tortellini, cheese: Cheese.Toscano},
    {name: PastaName.Ravioli}, // Why does this compile...?
    {name: PastaName.Shells, cheese: Cheese.Ricotta},
  ].map(menuItem(pastaWithCheesePrice))
  // ... it compiles because TypeScript does not infer that this is meant to be a list of Pastas,
  // AND because it does not require that an array only hold items of the same type.
  // We'll come back to this later.
}
