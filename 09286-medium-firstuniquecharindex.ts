// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<FirstUniqueCharIndex<'leetcode'>, 0>>,
  Expect<Equal<FirstUniqueCharIndex<'loveleetcode'>, 2>>,
  Expect<Equal<FirstUniqueCharIndex<'aabb'>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<''>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<'aaa'>, -1>>
];

// ============= Your Code Here =============
type FirstUniqueCharIndex<
  S extends string,
  R extends any[] = []
> = S extends ''
  ? -1
  : S extends `${infer First}${infer Last}`
    ? First extends R[number]
      ? FirstUniqueCharIndex<Last, [...R, First]>
      : Last extends `${string}${First}${string}`
        ? FirstUniqueCharIndex<Last, [...R, First]>
        : R['length']
    : -1