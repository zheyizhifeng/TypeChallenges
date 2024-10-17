// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Maximum<[]>, never>>,
  Expect<Equal<Maximum<[0, 2, 1]>, 2>>,
  Expect<Equal<Maximum<[1, 20, 200, 150]>, 200>>,
]


// ============= Your Code Here =============
type Maximum<
  T extends any[],
  U = T[number],
  N extends unknown[] = [],
> = T extends []
  ? never
  : Equal<U, N["length"]> extends true
    ? U
    : Maximum<T, Exclude<U, N['length']>, [...N, unknown]>;
    // " 1|20|200|150 extends 20 ? never : U " ==>> " 1|200|150 "