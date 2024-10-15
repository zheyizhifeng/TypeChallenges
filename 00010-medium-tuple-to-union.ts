// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<TupleToUnion<[123, '456', true]>, 123 | '456' | true>>,
  Expect<Equal<TupleToUnion<[123]>, 123>>,
]


// ============= Your Code Here =============
type TupleToObjerct<T extends any[]> = {
  [P in T[number]]: T[P]
}
type TupleToUnion<T extends any[]> =/*  keyof TupleToObjerct<T> */ T[number]

type A = [12,'34',true]
type B = A[number]