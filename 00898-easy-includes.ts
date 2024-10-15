// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>, true>>,
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>, false>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<[{}], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<Includes<[{ a: 'A' }], { readonly a: 'A' }>, false>>,
  Expect<Equal<Includes<[{ readonly a: 'A' }], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[1], 1 | 2>, false>>,
  Expect<Equal<Includes<[1 | 2], 1>, false>>,
  Expect<Equal<Includes<[null], undefined>, false>>,
  Expect<Equal<Includes<[undefined], null>, false>>,
]

type A = false extends boolean ? 1 : 2
type B = boolean extends false ? 1: 2
type C = [] extends [1,2,3] ? 1 : 2
type D = [1,2,3] extends [] ? 1: 2
type E = {} extends {a: 1} ? 1: 2
type F = {a: 1} extends {} ? 1: 2
type T = [{ readonly a: 'A' }]
type TItem = T[number]
type H = 1 extends 1|2 ? 1: 2
type I  = (1|2) extends 1 ? 1: 2
type T2 = [1]
type T2Item = T2[number]
type K = 1|2 extends T2[number] ? 1: 2

type MyEqual<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false
// ============= Your Code Here =============
type Includes<T extends readonly any[], U> = T extends readonly [infer First, ...infer Rest]
? MyEqual<First, U> extends true ? true: Includes<Rest, U>
: false
// type Includes<T extends readonly any[], U> = U extends T[number] ? true : false

type a = Includes<[1], 1 | 2>
type b = a