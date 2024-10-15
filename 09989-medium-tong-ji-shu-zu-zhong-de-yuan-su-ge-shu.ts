// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';
type cases = [
  Expect<
    Equal<
      CountElementNumberToObject<[1, 2, 3, 4, 5]>,
      {
        1: 1;
        2: 1;
        3: 1;
        4: 1;
        5: 1;
      }
    >
  >,
  Expect<
    Equal<
      CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3]]>,
      {
        1: 2;
        2: 2;
        3: 2;
        4: 1;
        5: 1;
      }
    >
  >,
  Expect<
    Equal<
      CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3, [4, 4, 1, 2]]]>,
      {
        1: 3;
        2: 3;
        3: 2;
        4: 3;
        5: 1;
      }
    >
  >,
  Expect<Equal<CountElementNumberToObject<[never]>, {}>>,
  Expect<
    Equal<
      CountElementNumberToObject<['1', '2', '0']>,
      {
        0: 1;
        1: 1;
        2: 1;
      }
    >
  >,
  Expect<
    Equal<
      CountElementNumberToObject<['a', 'b', ['c', ['d']]]>,
      {
        a: 1;
        b: 1;
        c: 1;
        d: 1;
      }
    >
  >
];

// ============= Your Code Here =============
type Flat<T> = T extends [infer A, ...infer B]
  ? A extends any[]
    ? [...Flat<A>, ...Flat<B>]
    : [A, ...Flat<B>]
  : T;
type Count<T, Key, U extends any[] = []> = T extends [infer A, ...infer B]
  ? A extends Key
    ? Count<B, Key, [...U, any]>
    : Count<B, Key, [...U]>
  : U['length'];
type CountElementNumberToObject<T extends any[], U extends any[] = Flat<T>> = {
  [K in U[number]]: Count<U, K>;
};
