// ************** //
// Wrap primitive //
// ************** //

let primitiveTokenInstance: string = 'abc-defghi-jkl-mnopqrstuv' // Any string would do.

type Token = {token: string}

function readTokenType(token: Token) {
  return token.token
}

function makeToken(): Token {
  // ...
  return {token: '...'} // We can keep it easy to generate plain objects that fit this type.
}

type Expiry = {expiry: Date}

// Types are composable.
// You can do similar stuff with interfaces, but there are important differences.
// https://stackoverflow.com/questions/36782896/in-typescript-what-is-the-difference-between-type-and-interface

type ExpiringToken = Token & Expiry

let expiringToken: ExpiringToken = {token: 'foo-barbaz-bombifdavoe', expiry: new Date()}

// *********** //
// Maybe monad //
// *********** //

class Maybe<T> { // https://codewithstyle.info/advanced-functional-programming-in-typescript-maybe-monad/
  // Unlike the token implementation above, you must use this class to get a Maybe.
  private constructor(private value: T | null) {}

  // NonNullable is a thing!
  // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html
  static some<T>(value: NonNullable<T>) {
    return new Maybe<T>(value)
  }

  static none<T>() {
    return new Maybe<T>(null);
  }

  static fromValue<T>(value: T) { // Notice that value could be undefined or null, and that's implied.
    if (value == null) {
      return Maybe.none<T>()
    }

    return new Maybe<T>(value)
  }

  getOrElse(defaultValue: T) {
    return this.value === null ? defaultValue : this.value;
  }
}

let justAPenny: Maybe<number> = Maybe.some(0.01)
let neverWasAPenny = Maybe.none<number>()
// let couldNotBeAPenny = Maybe.some(null) // Does not compile.

function launderMoney(money: number) {
  console.log(`Your \$${money} is squeaky clean!`)
}

// launderMoney(justAPenny) // does not compile
// launderMoney(notAPenny) // does not compile

launderMoney(justAPenny.getOrElse(0))

type SimpleMaybe<T> = T | null | undefined

let justAQuarter: SimpleMaybe<number> = 0.25
let notAQuarter: SimpleMaybe<number> = null

// **************************** //
// Semantic function parameters //
// **************************** //

enum LightColor {
  RED, YELLOW, GREEN
}

function changeTrafficLight(color: LightColor, blinking: boolean) {
  console.log(`Light turned to color ${color} and is ${blinking ? '' : 'not '}blinking`)
}

changeTrafficLight(1, false) // Yep, this compiles.
changeTrafficLight(LightColor.YELLOW, false) // This does the same thing

enum Blinking {
  BLINKING, NOT_BLINKING
}

function changeTrafficLight2(color: LightColor, blinking: Blinking) {
  console.log(`Light turned to color ${color} and is ${blinking === Blinking.BLINKING ? '' : 'not '}blinking`)
}

// We know what this does even if we don't have IntelliJ telling us the parameter names,
// such as when reviewing source code in GitHub.
changeTrafficLight2(LightColor.GREEN, Blinking.NOT_BLINKING)
