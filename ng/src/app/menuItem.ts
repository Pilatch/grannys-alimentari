// Introduce a generic.
// Talk about how we normally just see `T` instead of something concrete like `Food`.
// Talk about how <Food> introduces a type that's scoped to the menuItem function.
// What's fed to it could be anything, so long as it's consistent within that scope.
// Look at cheesePrice as a Pricer implementation.

// You could do it this way too, but the linter might yell at you.
// interface Pricer<Food> {
//   (food: Food): number
// }

type Pricer<Food> = (food: Food) => number

// This means the menuItem function can make menu items for Foods,
// provided you pass it a pricer that handles that type of Food.
// Want a Cheese menu item? Gimmie a Cheese Pricer!
// Want a Pasta menu item? Gimmie a Pasta Pricer!
export function menuItem<Food>(pricer: Pricer<Food>) {

  return function (food: Food): string {
    const foodPricePerPound = pricer(food).toFixed(2)

    return `${foodName(food)} $${foodPricePerPound}/lb`
  }
}
// TypeScript hates me for trying to do the above with arrow functions.
// If somebody knows how to annotate that properly, I'd love to know.

function foodName(food: any): string {
  return [food.name || food, food.sauce, food.cheese].filter(Boolean).join(' ')
}
