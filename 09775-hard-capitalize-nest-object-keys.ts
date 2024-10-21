// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'
import { ExpectFalse, NotEqual } from './test-utils'

type foo = {
  foo: string
  bars: [{ foo: string }]
}

type Foo = {
  Foo: string
  Bars: [{
    Foo: string
  }]
}

type cases = [
  Expect<Equal<Foo, CapitalizeNestObjectKeys<foo>>>,
]


// ============= Your Code Here =============
type CapitalizeNestObjectKeys<T> = T extends object
? T extends any[]
  ? {
    [P in keyof T]: CapitalizeNestObjectKeys<T[P]>
  }
  : {
    [P in keyof T as `${Capitalize<string & P>}`]: CapitalizeNestObjectKeys<T[P]>
  }
: T
