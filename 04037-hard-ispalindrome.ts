// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<IsPalindrome<'abc'>, false>>,
  Expect<Equal<IsPalindrome<'b'>, true>>,
  Expect<Equal<IsPalindrome<'abca'>, false>>,
  Expect<Equal<IsPalindrome<'abba'>, true>>,
  Expect<Equal<IsPalindrome<'abcba'>, true>>,
  Expect<Equal<IsPalindrome<121>, true>>,
  Expect<Equal<IsPalindrome<2332>, true>>,
  Expect<Equal<IsPalindrome<19260817>, false>>,
]


// ============= Your Code Here =============
type StringToTuple<T extends string | number, R extends any[] = []> = `${T}` extends `${infer F}${infer L}` ? StringToTuple<L, [...R, F]> : R

type IsPalindrome<T extends number | string, R = StringToTuple<T>> = R extends [infer H, ...infer MiddleRest extends string[], infer Tail] 
? H extends Tail ? IsPalindrome<T, MiddleRest> : false 
: true
