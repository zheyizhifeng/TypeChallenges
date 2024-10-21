// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<BinaryToDecimal<'10'>, 2>>,
  Expect<Equal<BinaryToDecimal<'0011'>, 3>>,
  Expect<Equal<BinaryToDecimal<'00000000'>, 0>>,
  Expect<Equal<BinaryToDecimal<'11111111'>, 255>>,
  Expect<Equal<BinaryToDecimal<'10101010'>, 170>>,
]


// ============= Your Code Here =============
// your answers
// step1: 将字符串转换为tuple ，为了能够使用 ... 操作符控制 infer 的位置
type StringToTuple<S extends string> = S extends `${infer F}${infer R}`
  ? [F, ...StringToTuple<R>]
  : []

// 用 res 存储最终的计算结果， arr 存储 1，2，4，8，16，遇到1，则将 Arr 长度加入 res 
type Convert<T extends string[], Arr extends number[] = [1], Res extends number[] = []> =
  T extends [...infer F extends string[], infer L]
  ? L extends '1'
    ? Convert<F, [...Arr, ...Arr], [...Res, ...Arr]>
    : Convert<F, [...Arr, ...Arr], Res>
  : Res['length'];

type BinaryToDecimal<S extends string> = Convert<StringToTuple<S>>