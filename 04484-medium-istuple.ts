// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<IsTuple<[]>, true>>,
  Expect<Equal<IsTuple<[number]>, true>>,
  Expect<Equal<IsTuple<readonly [1]>, true>>,
  Expect<Equal<IsTuple<{ length: 1 }>, false>>,
  Expect<Equal<IsTuple<number[]>, false>>,
  Expect<Equal<IsTuple<never>, false>>,
]


// ============= Your Code Here =============
type BasicType = string | number | symbol
type isNever<T> = [T] extends [never]? true : false
type IsTuple<T> = isNever<T> extends true ? false : T extends readonly BasicType[] ? number extends T['length'] ? false : true : false

type A = [true]
type A1 = A['length'] // 1
type B = number[]
type B1 = B['length'] // number

type C = 1 extends number ? true : false
type D = number extends 1 ? true : false

type E = never extends any ? true : false