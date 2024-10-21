// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<TwoSum<[3, 3], 6>, true>>,
  Expect<Equal<TwoSum<[3, 2, 4], 6>, true>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 15>, false>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 9>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 0>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 1>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 2>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 3>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 4>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 5>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 6>, false>>,
  Expect<Equal<TwoSum<[3, 2, 0], 2>, true>>
];

// ============= Your Code Here =============
type MakeTuple<N extends number, Arr extends any[] = []> = Arr['length'] extends N
  ? Arr
  : MakeTuple<N, [...Arr, any]>;

type ArrayFindValue<T extends any[], U> = U extends T[number] ? true : false;

type TwoSum<T extends number[], U extends number> = T extends [
  infer N extends number,
  ...infer R extends number[]
]
  ? MakeTuple<U> extends [...MakeTuple<N>, ...infer Rest]
    ? ArrayFindValue<R, Rest['length']> extends true
      ? true
      : TwoSum<R, U>
    : TwoSum<R, U>
  : false;
