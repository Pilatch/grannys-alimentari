import {Cheese, cheesePrice, menu as cheeseMenu} from './cheeses'
import {menuItem} from './menuItem'

enum PastaName {
  Spaghetti = 'Spaghetti',
  Rigatoni = 'Rigatoni',
  Linguini = 'Linguini',
  Tortellini = 'Tortellini',
  Ravioli = 'Ravioli',
  Shells = 'Shells',
}

enum Sauce {
  Marinara = 'Marinara',
  Pesto = 'Pesto',
}

// This is just for the LOLs.
// I'm not suggesting you do it.

class Pasta {
  constructor(public name: PastaName) {}
}

// In TypeScript you can add "public" before a parameter name in the constructor,
// and the compiler knows that you'll be adding that parameter as a member of the instantiated object.
class PastaWithCheese extends Pasta {
  constructor(public name: PastaName, public cheese: Cheese) {
    super(name)
  }
}

class PastaWithCheeseAndSauce extends PastaWithCheese {
  constructor(public name: PastaName, public cheese: Cheese, public sauce: Sauce) {
    super(name, cheese)
  }
}

export const pastaWithCheesePrice = (pasta: Pasta | PastaWithCheese): number => {
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

export interface Menu {
  cheeses: string[]
  pastas: string[]
}

export const menu: Menu = {
  cheeses: cheeseMenu.cheeses,
  pastas: [
    new Pasta(PastaName.Spaghetti),
    new Pasta(PastaName.Linguini),
    new PastaWithCheese(PastaName.Tortellini, Cheese.Parmesean),
    new PastaWithCheese(PastaName.Tortellini, Cheese.Toscano),
    new PastaWithCheese(PastaName.Ravioli, Cheese.Toscano),
    new PastaWithCheese(PastaName.Shells, Cheese.Ricotta),
  ].map(menuItem(pastaWithCheesePrice))
}
