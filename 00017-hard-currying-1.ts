// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

const curried1 = Currying((a: string, b: number, c: boolean) => true)
const curried2 = Currying((a: string, b: number, c: boolean, d: boolean, e: boolean, f: string, g: boolean) => true)
const curried3 = Currying(() => true)

type cases = [
  Expect<Equal<
    typeof curried1, (a: string) => (b: number) => (c: boolean) => true
  >>,
  Expect<Equal<
    typeof curried2, (a: string) => (b: number) => (c: boolean) => (d: boolean) => (e: boolean) => (f: string) => (g: boolean) => true
  >>,
  Expect<Equal<typeof curried3, () => true>>,
]


// ============= Your Code Here =============
declare function Currying<F>(fn: F): F extends (...args: infer Args) => infer R
? CurringFunction<Args, R>
  : never


type CurringFunction<P extends any[], R> = P extends []
? () => R
: P extends [infer F,...infer Rest]
  ? Rest['length'] extends 0
    ? (arg: F) => R
    : (arg: F) => CurringFunction<Rest, R>
  : never
