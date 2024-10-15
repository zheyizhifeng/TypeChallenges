// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<MergeAll<[]>, {}>>,
  Expect<Equal<MergeAll<[{ a: 1 }]>, { a: 1 }>>,
  Expect<Equal<MergeAll<[{ a: string }, { a: string }]>, { a: string }>>,
  Expect<Equal<MergeAll<[{}, { a: string }]>, { a: string }>>,
  Expect<Equal<MergeAll<[{ a: 1 }, { c: 2 }]>, { a: 1; c: 2 }>>,
  Expect<Equal<MergeAll<[{ a: 1; b: 2 }, { a: 2 }, { c: 3 }]>, { a: 1 | 2; b: 2; c: 3 }>>,
  Expect<Equal<MergeAll<[{ a: 1 }, { a: number }]>, { a: number }>>,
  Expect<Equal<MergeAll<[{ a: number }, { a: 1 }]>, { a: number }>>,
  Expect<Equal<MergeAll<[{ a: 1 | 2 }, { a: 1 | 3 }]>, { a: 1 | 2 | 3 }>>
];

// ============= Your Code Here =============
type Merge<X, Y> = {
  [K in keyof X | keyof Y]: K extends keyof X
    ? K extends keyof Y
      ? X[K] | Y[K]
      : X[K]
    : K extends keyof Y
    ? Y[K]
    : never;
};
type A = Merge<{ a: 1; b: 2 }, { a: 2; c: 3 }>;
type MergeAll<XS, Result extends {} = {}> = XS extends [infer X, ...infer YS]
  ? MergeAll<YS, Merge<Result, X>>
  : Result;
