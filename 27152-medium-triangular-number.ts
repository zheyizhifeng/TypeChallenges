// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<Triangular<0>, 0>>,
  Expect<Equal<Triangular<1>, 1>>,
  Expect<Equal<Triangular<3>, 6>>,
  Expect<Equal<Triangular<10>, 55>>,
  Expect<Equal<Triangular<20>, 210>>,
  Expect<Equal<Triangular<55>, 1540>>,
  Expect<Equal<Triangular<100>, 5050>>
];

// ============= Your Code Here =============
// 1+2+3+...+N = N*(N+1)/2
type Tuple<N extends number, Result extends any[] = []> = Result['length'] extends N
  ? Result
  : Tuple<N, [...Result, any]>;
type Tuple10 = Tuple<10>;

type Triangular<
  N extends number,
  T1 extends any[] = [], // 计数器
  T2 extends any[] = [] // 装 T1 的长度
> = T1['length'] extends N ? [...T2, ...Tuple<N>]['length'] : Triangular<N, [...T1, any], [...T2, ...T1]>;
type A = Triangular<10>