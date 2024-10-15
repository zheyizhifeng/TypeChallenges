// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Unique<[1, 1, 2, 2, 3, 3]>, [1, 2, 3]>>,
  Expect<Equal<Unique<[1, 2, 3, 4, 4, 5, 6, 7]>, [1, 2, 3, 4, 5, 6, 7]>>,
  Expect<Equal<Unique<[1, 'a', 2, 'b', 2, 'a']>, [1, 'a', 2, 'b']>>,
  Expect<Equal<Unique<[string, number, 1, 'a', 1, string, 2, 'b', 2, number]>, [string, number, 1, 'a', 2, 'b']>>,
  Expect<Equal<Unique<[unknown, unknown, any, any, never, never]>, [unknown, any, never]>>,
]


// ============= Your Code Here =============
type Include<T extends any[], U> = T extends [infer F,...infer R] 
? Equal<F, U> extends true
  ? true
  : Include<R, U>
: false
type Test = Include<[1, 2, 3], 2> // true

type Unique<T extends any[], Result extends any[] = []> = T extends [infer F,...infer R]
? Include<Result, F> extends true
  ? Unique<R, Result>
  : Unique<R, [...Result, F]>
: Result

type A = Unique<[1, 1, 2, 2, 3, 3]>
type A1 = Unique<[string, number, 1, 'a', 1, string, 2, 'b', 2, number]>
type B = [] extends [infer F,...infer R] ? true : false