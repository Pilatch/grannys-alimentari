import {Cheese, cheesePrice, menu as cheeseMenu} from './cheeses'
import {menuItem} from './menuItem'
import {saucePrice, Sauce} from './sauces'

enum PastaName {
  Spaghetti = 'Spaghetti',
  Rigatoni = 'Rigatoni',
  Linguini = 'Linguini',
  Tortellini = 'Tortellini',
  Ravioli = 'Ravioli',
  Shells = 'Shells',
}

// This is just for the LOLs.
// I'm not suggesting you do it. But maybe...?
// It's an interesting experiment though because custom types in Elm are constructors.
// So can we make constructors in Typescript for similar type safety and compiler protection?

class PlainPasta {
  constructor(public name: PastaName) {}
}

// In TypeScript you can add "public" before a parameter name in the constructor,
// and the compiler knows that you'll be adding that parameter as a member of the instantiated object.
class PastaWithCheese extends PlainPasta {
  constructor(public name: PastaName, public cheese: Cheese) {
    super(name)
  }
}

class PastaWithCheeseAndSauce extends PastaWithCheese {
  constructor(public name: PastaName, public cheese: Cheese, public sauce: Sauce) {
    super(name, cheese)
  }
}

type Pasta = PlainPasta | PastaWithCheese | PastaWithCheeseAndSauce

export const pastaWithCheeseAndSaucePrice = (pasta: Pasta): number => {
  if (pasta instanceof PastaWithCheeseAndSauce) {
    return pastaWithCheesePrice(pasta) + saucePrice(pasta.sauce)
  }

  return pastaWithCheesePrice(pasta)
}

export const pastaWithCheesePrice = (pasta: Pasta): number => {
  if (pasta instanceof PastaWithCheese) {
    return pastaPrice(pasta) + cheesePrice(pasta.cheese)
  }

  return pastaPrice(pasta)
}

export const pastaPrice = (pasta: Pasta): number => {
  switch(pasta.name) {
    case PastaName.Ravioli: return 1.75
    case PastaName.Tortellini: return 2.25
    case PastaName.Shells: return 1.75
    case PastaName.Spaghetti: return 2
    case PastaName.Rigatoni: return 1.89
    case PastaName.Linguini: return 1.6
  }
}

const pastasOnMenu: Pasta[] = [
  new PlainPasta(PastaName.Spaghetti),
  new PlainPasta(PastaName.Linguini),
  new PastaWithCheese(PastaName.Tortellini, Cheese.Parmesean),
  new PastaWithCheese(PastaName.Tortellini, Cheese.Toscano),
  new PastaWithCheese(PastaName.Ravioli, Cheese.Toscano),
  new PastaWithCheese(PastaName.Shells, Cheese.Ricotta),
  new PastaWithCheeseAndSauce(PastaName.Ravioli, Cheese.Ricotta, Sauce.Marinara),
]

export const menu = {
  cheeses: cheeseMenu.cheeses,
  pastas: pastasOnMenu.map(menuItem(pastaWithCheeseAndSaucePrice))
}
