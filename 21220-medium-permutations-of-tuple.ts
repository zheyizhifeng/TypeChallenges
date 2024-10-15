// ============= Test Cases =============
import type { Equal, Expect, ExpectFalse } from './test-utils';

type cases = [
  Expect<Equal<PermutationsOfTuple<[]>, []>>,
  Expect<Equal<PermutationsOfTuple<[any]>, [any]>>,
  Expect<Equal<PermutationsOfTuple<[any, unknown]>, [any, unknown] | [unknown, any]>>,
  Expect<
    Equal<
      PermutationsOfTuple<[any, unknown, never]>,
      | [any, unknown, never]
      | [unknown, any, never]
      | [unknown, never, any]
      | [any, never, unknown]
      | [never, any, unknown]
      | [never, unknown, any]
    >
  >,
  Expect<
    Equal<
      PermutationsOfTuple<[1, number, unknown]>,
      | [1, number, unknown]
      | [1, unknown, number]
      | [number, 1, unknown]
      | [unknown, 1, number]
      | [number, unknown, 1]
      | [unknown, number, 1]
    >
  >,
  ExpectFalse<Equal<PermutationsOfTuple<[1, number, unknown]>, [unknown]>>
];

// ============= Your Code Here =============
type Wrap<T extends any[]> = T extends [infer F, ...infer R] ? [[F], ...Wrap<R>] : [];
type Test = Wrap<[1, 2, 3]>; // [[1], [2], [3]]
type TestA = Wrap<[1, number, unknown]>; // [[1], [number], [unknown]]
type TestB = TestA[number]; // [1] | [number] | [unknown]

type MyExclude<T extends any[], U> = T extends [infer F, ...infer R]
  ? Equal<F, U> extends true
    ? MyExclude<R, U>
    : [F, ...MyExclude<R, U>]
  : [];
type Test1 = MyExclude<[1, 2, 3], 2>; // [1, 3]
type Test2 = MyExclude<[[unknown], [any], 1], [unknown]>; //[[any], 1]

type MyPermutationsOfTuple<T extends any[], U = T[number], O = U> = [U] extends [never]
  ? []
  : U extends U
  ? [U extends any[] ? U[0] : never, ...MyPermutationsOfTuple<MyExclude<T, U>>]
  : [];
type PermutationsOfTuple<
  T extends unknown[],
  U extends unknown[] = Wrap<T>
> = MyPermutationsOfTuple<U>;

type A = any | unknown | never; // any
type B = 1 | number | unknown; // unknown
