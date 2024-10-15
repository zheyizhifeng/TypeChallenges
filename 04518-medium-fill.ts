// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<Fill<[], 0>, []>>,
  Expect<Equal<Fill<[], 0, 0, 3>, []>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 0, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 2, 2>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0>, [0, 0, 0]>>,
  Expect<Equal<Fill<[1, 2, 3], true>, [true, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 1>, [true, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 1, 3>, [1, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 20>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 10>, [true, true, true]>>
];

// ============= Your Code Here =============
/* 解法2：标准通用解法 
1. 在 Count 等于 End 的时候需要结束替换，也就是结束条件
2. 当 Count 等于 Start 的时候是开始替换的条件，递归处理数组替换即可，注意需要把 T 换成新的
3. 在开始替换后，需要把 Flag 继续传下去，不然 Flag 会被置为 false 不再替换
*/
type Fill<
  T extends any[],
  N,
  Start extends number = 0,
  End extends number = T['length'],
  Count extends any[] = [], // 记数
  Flag extends boolean = Count['length'] extends Start ? true : false // 是否替换的标志
> = Count['length'] extends End
  ? T
  : T extends [infer R, ...infer U]
  ? Flag extends false
    ? [R, ...Fill<U, N, Start, End, [...Count, 0]>]
    : [N, ...Fill<U, N, Start, End, [...Count, 0], Flag>]
  : T;

type Test1 = Fill<[1, 1, 1, 1, 1], true, 1, 3>; // [1, true, true, 1, 1]

/* todo: 解法1，无法处理重复序列情况 */
/* type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T['length']
> = Slice<T, Start, End> extends []
  ? T
  : T extends [...infer L, ...Slice<T, Start, End>]
    ? [...L, ...FillArray<Slice<T, Start, End>, N>]
    : T extends [...Slice<T, Start, End>, ...infer R]
      ? [...FillArray<Slice<T, Start, End>, N>, ...R]
      : T extends [...infer L, ...Slice<T, Start, End>, ...infer R]
        ? [...L, ...FillArray<Slice<T, Start, End>, N>, ...R]
        : T;

type FillArray<T extends unknown[], N> = T extends [infer _, ...infer R]
  ? [N, ...FillArray<R, N>]
  : T;

// 测试用例
type Test1111 = FillArray<[1, 2, 3], 0>; // [0, 0, 0]
type Test2222 = FillArray<[1, 2, 3], true>; // [true, true, true]

// SliceEnd => 得到以 Index 为结尾【不包括】的数组
type SliceEnd<
  T extends unknown[],
  Index extends number,
  Result extends any[] = []
> = Result['length'] extends Index
  ? Result
  : T extends [infer F, ...infer R]
  ? SliceEnd<R, Index, [...Result, F]>
  : Result;
// 测试用例
type Test1 = SliceEnd<[1, 2, 3, 4, 5], 0>; // []
type Test2 = SliceEnd<[1, 2, 3, 4, 5], 1>; // [1]
type Test3 = SliceEnd<[1, 2, 3, 4, 5], 2>; // [1,2]
type Test4 = SliceEnd<[1, 2, 3, 4, 5], 3>; // [1,2,3]
type Test5 = SliceEnd<[1, 2, 3, 4, 5], 4>; // [1,2,3,4]
type Test6 = SliceEnd<[1, 2, 3, 4, 5], 5>; // [1,2,3,4,5]

// SliceStart => 得到以 Index 为开头【包括】的数组
type SliceStart<T extends unknown[], Index extends number> = T extends [
  ...SliceEnd<T, Index>,
  ...infer R
]
  ? R
  : [];
// 测试用例
type Test11 = SliceStart<[1, 2, 3, 4, 5], 0>; // [1,2,3,4,5]
type Test22 = SliceStart<[1, 2, 3, 4, 5], 1>; // [2,3,4,5]
type Test33 = SliceStart<[1, 2, 3, 4, 5], 2>; // [3,4,5]
type Test44 = SliceStart<[1, 2, 3, 4, 5], 3>; // [4,5]
type Test55 = SliceStart<[1, 2, 3, 4, 5], 4>; // [5]
type Test66 = SliceStart<[1, 2, 3, 4, 5], 5>; // []

type Slice<T extends unknown[], Start extends number, End extends number> = SliceStart<
  SliceEnd<T, End>,
  Start
>;
// 测试用例
type test1 = Slice<[1, 2, 3, 4, 5], 0, 2>; // [1, 2]
type test2 = Slice<[1, 2, 3, 4, 5], 2, 4>; // [3, 4]
type test3 = Slice<[1, 2, 3, 4, 5], 0, 5>; // [1, 2, 3, 4, 5]
type test4 = Slice<[1, 2, 3, 4, 5], 3, 3>; // []
type test5 = Slice<[1, 2, 3, 4, 5], 0, 0>; // []
type test6 = Slice<[1, 2, 3, 4, 5], 5, 10>; // [] */
