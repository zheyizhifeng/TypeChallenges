// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';
import { ExpectFalse, NotEqual } from './test-utils';

type cases = [
  Expect<Equal<FindEles<[1, 2, 2, 3, 3, 4, 5, 6, 6, 6]>, [1, 4, 5]>>,
  Expect<Equal<FindEles<[2, 2, 3, 3, 6, 6, 6]>, []>>,
  Expect<Equal<FindEles<[1, 2, 3]>, [1, 2, 3]>>
];

// ============= Your Code Here =============
type FindEles<T extends any[], Appeared extends any[] = [], R extends any[] = []> = T extends [
  infer F,
  ...infer L
]
  ? F extends L[number] // 重复元素
    ? FindEles<L, [...Appeared, F], R>
    : F extends Appeared[number] // 是否在已出现过的元素里
    ? FindEles<L, [...Appeared, F], R>
    : FindEles<L, [...Appeared, F], [...R, F]>
  : R;
