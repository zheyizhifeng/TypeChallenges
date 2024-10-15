// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';
import { ExpectFalse, NotEqual } from './test-utils';

type cases = [
  Expect<Equal<CheckRepeatedChars<'abc'>, false>>,
  Expect<Equal<CheckRepeatedChars<'abb'>, true>>,
  Expect<Equal<CheckRepeatedChars<'cbc'>, true>>,
  Expect<Equal<CheckRepeatedChars<''>, false>>
];

// ============= Your Code Here =============
type Includes<S extends string, Char extends string> = S extends `${infer L}${Char}${infer R}`
  ? true
  : false;

type CheckRepeatedChars<T extends string> = T extends `${infer L}${infer R}`
  ? Includes<R, L> extends true
    ? true
    : CheckRepeatedChars<R>
  : false;
