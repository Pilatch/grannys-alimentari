# Granny's Alimentari

A simple learning tool for testing out features of TypeScript, and comparing some of them to their functional programming analogues, [especially discriminated unions](https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions), such as those found in Elm.

Targeted towards JavaScript developers. Meant to show how type systems can better help us model data and prevent runtime errors.

## Concept

Granny wants to start selling artisan Italian foods. She needs you to put up a simple menu web page for her. She's not actually your grandmother, she's just the tech-savvy old lady who lives next door. She's not really Italian either, but she knows a good profit margin when she sees one.

What's important is that she expects the items on her menu to change often, but she has a consistent pricing scheme.

At first, she only wants a list of the cheeses on the menu, and their prices per pound. When she begins selling pastas, she wants a similar list of those. Some pastas are stuffed with cheese, Ravioli for example, and she expects the price of stuffed pastas to be based on the price of the cheese they're being stuffed with. One week she might sell Ravioli stuffed with Ricotta. The next week she might stuff it with Mozzarella.

Your job is to provide Granny with a bug-free way to update her menu when she needs to, without worrying about adjusting prices.

## Progression

Only cheeses appear on the menu at the initial state of this Angular project. We can talk about things like [enums](https://www.typescriptlang.org/docs/handbook/enums.html) and [type annotations](https://www.typescriptlang.org/docs/handbook/basic-types.html) as we look at the `cheeses.ts` file.

Then we can move on to the `menuItem.ts` file to talk about [generics](https://www.typescriptlang.org/docs/handbook/generics.html).

After discussing how that file works, we can edit `app.component.ts` to comment out the `cheeses` import, and un-comment the `pastas-1-interface` import to talk about [TypeScript interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html). This will introduce pastas to the menu in our browsers.

Before showing how TypeScript handles discriminated unions, we'll look at how a functional language like Elm handles them to better understand the data structures TypeScript is emulating.

We proceed in this manner to discuss topics in the following `pastas-` prefixed files. To explore other concepts the `x-` prefixed TypeScript files are provided for un-guided experimentation.

### Guidance

This repository has code comments in the files we progress through to guide the activity and remind the speaker of talking points. The same files in the StackBlitz project do not have these comments, to be less distracting. Note that this repository has the `strictNullChecks` compiler flag enabled, but StackBlitz does not, nor does it give that option at this time.

Expected exercise time is one hour.

## Try in your browser

[TypeScript](https://stackblitz.com/edit/angular-grannys-alimentari)

[Elm](https://ellie-app.com/3kYBRV8QJDca1)

## Run locally

### Angular / TypeScript

[Node.js](https://nodejs.org/) is required. We recommend also using [Yarn](https://yarnpkg.com/).

Navigate to the `ng` folder in your terminal. Run: `yarn install && yarn start`. Then navigate to [http://localhost:4200/](http://localhost:4200/) in your browser.

### Elm

[Elm](https://elm-lang.org/) is required.

Navigate to the `elm` folder in your terminal. Run: `elm reactor`. Then navigate to [http://localhost:8000/Main.elm](http://localhost:8000/Main.elm) in your browser.

## Why?

Why does this thing exist, when there's tons of documancy on TypeScript out there already?

- Because a concrete use-case is easy to reason about.
- Because Elm's sound type system and pattern matching provide a contrast against TypeScript's unsound type system, and shows how bugs can sneak into your code.
- Because presenting this as a lunch 'n learn might encourage developers at [Penn Mutual](http://www2.pennmutual.com/) to adopt TypeScript and/or Elm.

## Special Thanks

...to [Rora](https://twitter.com/playwrightswife) for the CSS.
