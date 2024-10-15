// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

// Edge cases
const noCharsOutput = join('-')();
const oneCharOutput = join('-')('a');
const noDelimiterOutput = join('')('a', 'b', 'c');

// Regular cases
const hyphenOutput = join('-')('a', 'b', 'c');
const hashOutput = join('#')('a', 'b', 'c');
const twoCharOutput = join('-')('a', 'b');
const longOutput = join('-')('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h');

type cases = [
  Expect<Equal<typeof noCharsOutput, ''>>,
  Expect<Equal<typeof oneCharOutput, 'a'>>,
  Expect<Equal<typeof noDelimiterOutput, 'abc'>>,
  Expect<Equal<typeof twoCharOutput, 'a-b'>>,
  Expect<Equal<typeof hyphenOutput, 'a-b-c'>>,
  Expect<Equal<typeof hashOutput, 'a#b#c'>>,
  Expect<Equal<typeof longOutput, 'a-b-c-d-e-f-g-h'>>
];

// ============= Your Code Here =============
type StringJoin<S extends string, T extends string[] = []> = T extends [
  infer F extends string,
  ...infer R extends string[]
]
  ? R['length'] extends 0
    ? F
    : `${F}${S}${StringJoin<S, R>}`
  : '';
declare function join<S extends string>(
  delimiter: S
): <T extends string[]>(...parts: T) => StringJoin<S, T>;
