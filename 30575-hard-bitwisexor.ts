// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<BitwiseXOR<'0', '1'>, '1'>>,
  Expect<Equal<BitwiseXOR<'1', '1'>, '0'>>,
  Expect<Equal<BitwiseXOR<'10', '1'>, '11'>>,
  Expect<Equal<BitwiseXOR<'110', '1'>, '111'>>,
  Expect<Equal<BitwiseXOR<'101', '11'>, '110'>>
];

// ============= Your Code Here =============
type StringToTuple<
  T extends string,
  R extends string[] = []
> = T extends `${infer F}${infer L}` ? StringToTuple<L, [...R, F]> : R;

// Receive Two string[] to get the result
type GetResult<
  T1 extends string[],
  T2 extends string[],
  R extends string = ''
> =
  T1 extends [...infer Rest1 extends string[], infer A1 extends string]
    ? T2 extends [...infer Rest2 extends string[], infer A2 extends string]
      ? GetResult<Rest1, Rest2, `${A1 extends A2 ? 0 : 1}${R}`>
      : GetResult<Rest1, [], `${A1}${R}`>
    : T2['length'] extends 0
      ? R
      : GetResult<T2, [], R>

// Trun S1, S2 to array of string and pass to GetResult
// Because it's easier to get the last element out of an array
type BitwiseXOR<
  S1 extends string,
  S2 extends string
> = GetResult<StringToTuple<S1>, StringToTuple<S2>>