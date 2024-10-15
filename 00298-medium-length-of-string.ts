// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<LengthOfString<''>, 0>>,
  Expect<Equal<LengthOfString<'kumiko'>, 6>>,
  Expect<Equal<LengthOfString<'reina'>, 5>>,
  Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>,
]


// ============= Your Code Here =============
type StringToArray<S extends string> = S extends `${infer F}${infer Rest}` ? [F, ...StringToArray<Rest>]: []
type Test = StringToArray<'abcdefg'>
type LengthOfString<S extends string> = StringToArray<S>['length']

type A = LengthOfString<'Sound! Euphonium'>
type B = [1,2,3]
type C = B['length'] // 3
type D = '123'
type E = D['length'] // E = number