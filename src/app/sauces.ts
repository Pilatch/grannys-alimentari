export enum Sauce {
  NoSauce = '',
  Marinara = 'Marinara',
  Pesto = 'Pesto',
}

export const saucePrice = (sauce: Sauce): number => {
    switch (sauce) {
        case Sauce.NoSauce: return 0
        case Sauce.Marinara: return 1.35
        case Sauce.Pesto: return 1.49
    }
}
