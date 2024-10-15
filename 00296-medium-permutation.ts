// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Permutation<'A'>, ['A']>>,
  Expect<Equal<Permutation<'A' | 'B' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<'B' | 'A' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<boolean>, [false, true] | [true, false]>>,
  Expect<Equal<Permutation<never>, []>>,
]


// ============= Your Code Here =============
type Permutation<T, U = T> = [T] extends [never] 
? [] 
: T extends U 
  ? [T, ...Permutation<Exclude<U, T>>]
  : never

  type A = 123 extends any ? 1: 2
  type B = 123 extends never ? 1: 2
  type C = never extends never ? 1: 2
  type D = keyof never

  type A1 = true extends boolean ? 1 : 2
  type A2 = boolean extends false ? 1 : 2

  type A3 = [1,2] & [3,4]
  type A4 = boolean extends boolean ? 1: 2

  type T1 = Permutation<boolean>
  type T2 = boolean
  type T3 = boolean
  type T22 = T2 extends T2 ? [T2] : never
  type T4 = T2 extends T3 ? [T2, Exclude<T2, T3>] : never