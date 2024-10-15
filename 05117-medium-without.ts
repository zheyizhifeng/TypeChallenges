// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>,
]


// ============= Your Code Here =============
type Without<T extends any[], U> = T extends [infer F,...infer R] 
? 
  U extends any[]
  ? 
    F extends U[number] 
    ? Without<R,U> 
    : [F,...Without<R,U>] 
  : F extends U 
    ? Without<R,U>
    : [F,...Without<R,U>]
: []

type A = Without<[1, 2, 4, 1, 5], [1, 2]>

type B = [1,2,3]
type C = keyof B
type D = 1 extends [1,2] ? true : false