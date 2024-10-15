// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

const promiseAllTest1 = PromiseAll([1, 2, 3] as const)
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const)
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)])
const promiseAllTest4 = PromiseAll<Array<number | Promise<number>>>([1, 2, 3])

type cases = [
  Expect<Equal<typeof promiseAllTest1, Promise<[1, 2, 3]>>>,
  Expect<Equal<typeof promiseAllTest2, Promise<[1, 2, number]>>>,
  Expect<Equal<typeof promiseAllTest3, Promise<[number, number, number]>>>,
  Expect<Equal<typeof promiseAllTest4, Promise<number[]>>>,
]


// ============= Your Code Here =============
// Awaited为内置类型
type PromiseAllType<T> = Promise<{
  [P in keyof T]: Awaited<T[P]>
}>
declare function PromiseAll<T extends any[]>(values: readonly [...T]): Promise<{
  [P in keyof T]: Awaited<T[P]>
}>

type A = [4,5,6]
type A1 = A[number]
type B = keyof A
type C = {
  [P in keyof A]: A[P]
}
type D = Promise<C>
type E = Awaited<D>