import {Cheese, cheesePrice, menu as cheeseMenu} from './cheeses'
import {menuItem} from './menuItem'

// Talk about the Pasta interface, and how it helps us model our domain,
// and act as documentation.
// Explain the question mark in the annotation.
// Explain the cheeseless-ravioli problem,
// and how that affects potential use the (naked) pastaPrice function.
// Lead up to algebraic data types, and how TypeScript documentation
// references functional programming.
// https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions

enum PastaName {
  Spaghetti = 'Spaghetti',
  Rigatoni = 'Rigatoni',
  Linguini = 'Linguini',
  Tortellini = 'Tortellini',
  Ravioli = 'Ravioli',
  Shells = 'Shells',
}

interface Pasta {
  name: PastaName
  cheese?: Cheese // Some pastas are stuffed with cheese, hence the question mark.
}

// If strictNullChecks are not enabled,
// we could add another PastaName, 'Farfalle', and this would compile.
// Problem: we have a function that lends credability to the idea that we could
// sell pastas like ravioli or tortellini without a filling.
// Instead, developers should be using the `pastaWithCheesePrice` function.
export function pastaPrice(pasta: Pasta): number {
  switch (pasta.name) {
    case PastaName.Spaghetti: return 2
    case PastaName.Rigatoni: return 1.89
    case PastaName.Linguini: return 1.6
    case PastaName.Ravioli: return 1.75
    case PastaName.Tortellini: return 2.25
    case PastaName.Shells: return 1.75
  }
}

function maybeCheesePrice(cheese?: Cheese): number {
  // We have to do this here if we want exhaustive checking,
  // and want this function to support passing `undefined`.
  if (!cheese) {
    return 0
  }

  // Now we're confident that we have a Cheese, and not undefined.
  return cheesePrice(cheese)
}

export function pastaWithCheesePrice(pasta: Pasta): number {
  return pastaPrice(pasta) + maybeCheesePrice(pasta.cheese)
}

// We have a potential problem.
// A user could add ravioli to the menu, but forget to associate a cheese with it.
// Then we'd have an impossible scenario where we're advertising ravioli at the wrong price
// and ravioli, by definition, must be stuffed with something.
// Remember Granny's requirement that changing the menu should be easy.
// This is where Algebraic Data Types are useful in realistic modeling, while preventing bugs.
// Introduce this topic with the Elm project, as that has simpler syntax for what it now calls
// "Custom Types", then move back to pastas-2-type.ts.
export const menu = {
  cheeses: cheeseMenu.cheeses,
  pastas: [
    {name: PastaName.Spaghetti},
    {name: PastaName.Linguini},
    {name: PastaName.Tortellini, cheese: Cheese.Parmesean},
    {name: PastaName.Ravioli},
    {name: PastaName.Shells, cheese: Cheese.Ricotta},
  ].map(menuItem(pastaWithCheesePrice)) // Try swapping cheesePrice in here to see how the generic helps.
}
