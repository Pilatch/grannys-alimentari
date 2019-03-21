import {Cheese, cheesePrice, menu as cheeseMenu} from './cheeses'
import {Sauce, saucePrice} from './sauces'
import {menuItem} from './menuItem'

// Explain how we can solve the cheeseless-ravioli problem by annotating the
// pasta menu with `Pasta[]`
// Explore what happens when Granny wants to start selling Linguini with Marinara,
// and Tortellini with Pesto.
// Explore the difference in how the compiler helps you
// between adding a feature and deleting one!
// This is an important distinction for people coming from functional languages,
// because they might expect TypeScript to behave in a way it does not.

enum PastaName {
  Spaghetti = 'Spaghetti',
  Rigatoni = 'Rigatoni',
  Linguini = 'Linguini',
  Tortellini = 'Tortellini',
  Ravioli = 'Ravioli',
  Shells = 'Shells',
}

interface Spaghetti { name: PastaName.Spaghetti }
interface Rigatoni { name: PastaName.Rigatoni }
interface Linguini { name: PastaName.Linguini }
interface Tortellini { name: PastaName.Tortellini, cheese: Cheese }
interface Ravioli { name: PastaName.Ravioli, cheese: Cheese }
interface Shells { name: PastaName.Shells, cheese: Cheese }

type Pasta = Spaghetti | Rigatoni | Linguini | Ravioli | Tortellini | Shells

// In absence of a sound type system it becomes necessary to lean on tests instead of the type system
// to locate and fix consistency errors.
// - http://dafoster.net/articles/2018/04/07/unsound-type-systems-are-still-useful/
// TypeScript is really helpful in producting a copmiler error when Granny decides to STOP selling
// a pasta stuffed with a cheese! Less so when new features are added.

export const pastaWithCheesePrice = (pasta: Pasta): number => {
  switch (pasta.name) {
    case PastaName.Spaghetti: return 2
    case PastaName.Rigatoni: return 1.89
    case PastaName.Linguini: return 1.6
    case PastaName.Ravioli: return 1.75 + cheesePrice(pasta.cheese)
    case PastaName.Tortellini: return 2.25 + cheesePrice(pasta.cheese)
    case PastaName.Shells: return 1.75 + cheesePrice(pasta.cheese)
  }

  // https://basarat.gitbooks.io/typescript/docs/types/discriminated-unions.html
  // If your compiler or linter isn't checking for unused variables, you can do an exhaustiveness check manually.
  // However this won't be necessary if you have strictNullChecks enabled, and your function is pure.
  // If your switch has side-effects in its cases, then this technique becomes more useful.
  // const _exhaustiveCheck: never = pasta;
}

const pastasOnMenu: Pasta[] = [
  {name: PastaName.Spaghetti},
  {name: PastaName.Linguini},
  {name: PastaName.Tortellini, cheese: Cheese.Parmesean},
  {name: PastaName.Tortellini, cheese: Cheese.Toscano},
  {name: PastaName.Ravioli, cheese: Cheese.Toscano}, // Try removing the cheese now!
  {name: PastaName.Shells, cheese: Cheese.Ricotta},
]

export const menu = {
  cheeses: cheeseMenu.cheeses,
  pastas: pastasOnMenu.map(menuItem(pastaWithCheesePrice))
}
