// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<Square<0>, 0>>,
  Expect<Equal<Square<1>, 1>>,
  Expect<Equal<Square<3>, 9>>,
  Expect<Equal<Square<20>, 400>>,
  Expect<Equal<Square<100>, 10000>>,

  // Negative numbers
  Expect<Equal<Square<-2>, 4>>,
  Expect<Equal<Square<-5>, 25>>,
  Expect<Equal<Square<-31>, 961>>,
  Expect<Equal<Square<-50>, 2500>>
];

// ============= Your Code Here =============
// type Tuple<T extends number, Result extends any[] = []> = Result['length'] extends T
//   ? Result
//   : Tuple<T, [...Result, any]>;

// type Abs<T extends number> = `${T}` extends `-${infer R extends number}` ? R : T;
// type Square<
//   T extends number,
//   U extends any[] = [],
//   R extends any[] = []
// > = U['length'] extends Abs<T>
//   ? R['length']
//   : Square<Abs<T>, [...U, any], [...R, ...Tuple<Abs<T>>]>;

type Abs<N extends number> = `${N}` extends `-${infer R extends number}` ? R : N;

type SplitZeroes<
  N extends number,
  Z extends string = ''
> = `${N}` extends `${infer N extends number}0` ? SplitZeroes<N, `${Z}00`> : [N, Z];

type SquareTuple<
  N extends number,
  A extends any[] = [],
  Acc extends any[] = []
> = A['length'] extends N ? [...A, ...Acc] : SquareTuple<N, [1, ...A], [...A, ...A, ...Acc]>;

type Square<
  _N extends number,
  N extends [number, string] = SplitZeroes<_N>,
  U extends any[] = SquareTuple<Abs<N[0]>>
> = `${U['length']}${N[1]}` extends `${infer N extends number}` ? N : never;
