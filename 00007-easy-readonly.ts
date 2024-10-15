// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<MyReadonly<Todo1>, Readonly<Todo1>>>,
]
type MyReadonly1<K>  = {
  readonly [P in keyof K]: K[P]
}
interface Todo1 {
  title: string
  description: string
  completed: boolean
  meta: {
    author: string
  }
}


// ============= Your Code Here =============
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K]
}
