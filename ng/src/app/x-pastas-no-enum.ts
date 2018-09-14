import {Cheese, cheesePrice, menu as cheeseMenu} from './cheeses'
import {menuItem} from './menuItem'

interface Spaghetti {name: 'Spaghetti'}
interface Rigatoni {name: 'Rigatoni'}
interface Linguini {name: 'Linguini'}
interface Tortellini {name: 'Tortellini', cheese: Cheese}
interface Ravioli {name: 'Ravioli', cheese: Cheese}
interface Shells {name: 'Shells', cheese: Cheese}
interface Farfalle {name: 'Farfalle'}

type Pasta = Spaghetti | Rigatoni | Linguini | Ravioli | Tortellini | Shells | Farfalle

export const pastaWithCheesePrice = (pasta: Pasta): number => {
  switch (pasta.name) {
    case 'Spaghetti': return 2
    case 'Rigatoni': return 1.89
    case 'Linguini': return 1.6
    case 'Ravioli': return 1.75 + cheesePrice(pasta.cheese)
    case 'Tortellini': return 2.25 + cheesePrice(pasta.cheese)
    case 'Shells': return 1.75 + cheesePrice(pasta.cheese)
    case 'Farfalle': return 1.29
  }
}

const pastasOnMenu: Pasta[] = [
  {name: 'Spaghetti'},
  {name: 'Linguini'},
  {name: 'Tortellini', cheese: Cheese.Parmesean},
  {name: 'Ravioli', cheese: Cheese.Provolone},
  {name: 'Shells', cheese: Cheese.Ricotta},
  {name: 'Farfalle'},
]

export const menu = {
  cheeses: cheeseMenu.cheeses,
  pastas: pastasOnMenu.map(menuItem(pastaWithCheesePrice))
}
