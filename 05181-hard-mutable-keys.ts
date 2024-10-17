// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<MutableKeys<{ a: number; readonly b: string }>, 'a'>>,
  Expect<Equal<MutableKeys<{ a: undefined; readonly b: undefined }>, 'a'>>,
  Expect<
    Equal<
      MutableKeys<{ a: undefined; readonly b?: undefined; c: string; d: null }>,
      'a' | 'c' | 'd'
    >
  >,
  Expect<Equal<MutableKeys<{}>, never>>
];

// ============= Your Code Here =============
type MutableKeys<T> = keyof {
  [K in keyof T as Equal<Pick<T, K>, RemoveReadonly<Pick<T, K>>> extends true ? K : never]: T[K];
};

type RemoveReadonly<T> = {
  -readonly [K in keyof T]: T[K];
};

type A = MutableKeys<{ a: number; readonly b: string }>;
type B = Pick<{ a: number; readonly b: string }, 'b'>;
