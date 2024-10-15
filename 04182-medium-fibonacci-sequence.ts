// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>
];

// ============= Your Code Here =============
type MinusOne<T extends number, LastArr extends 0[] = []> = [...LastArr, 0]['length'] extends T
  ? LastArr['length']
  : MinusOne<T, [...LastArr, 0]>;
type Add<A extends number, B extends number, LastArr extends 0[] = []> = A extends 0
  ? B extends 0
    ? LastArr['length']
    : Add<0, MinusOne<B>, [...LastArr, 0]>
  : Add<MinusOne<A>, B, [...LastArr, 0]>;
type Fibonacci0<
  T extends number,
  Last2 extends number = 0,
  Last1 extends number = 1,
  Current extends number = 1
> = Current extends T ? Last1 : Fibonacci0<T, Last1, Add<Last1, Last2>, Add<Current, 1>>;
type Fibonacci<T extends number> = Fibonacci0<T>;
