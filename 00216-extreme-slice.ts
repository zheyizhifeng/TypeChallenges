// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type Arr = [1, 2, 3, 4, 5];

type cases = [
  // basic
  Expect<Equal<Slice<Arr, 0, 1>, [1]>>,
  Expect<Equal<Slice<Arr, 0, 0>, []>>,
  Expect<Equal<Slice<Arr, 2, 4>, [3, 4]>>,

  // optional args
  Expect<Equal<Slice<[]>, []>>,
  Expect<Equal<Slice<Arr>, Arr>>,
  Expect<Equal<Slice<Arr, 0>, Arr>>,
  Expect<Equal<Slice<Arr, 2>, [3, 4, 5]>>,

  // negative index
  Expect<Equal<Slice<Arr, 0, -1>, [1, 2, 3, 4]>>,
  Expect<Equal<Slice<Arr, -3, -1>, [3, 4]>>,

  // invalid
  Expect<Equal<Slice<Arr, 10>, []>>,
  Expect<Equal<Slice<Arr, 1, 0>, []>>,
  Expect<Equal<Slice<Arr, 10, 20>, []>>
];

// ============= Your Code Here =============
type Abs<N extends number> = `${N}` extends `-${infer Int extends number}` ? Int : N;
// 下标转换，同时支持正负情形，例如: -1 => length - 1， 1 => 1
type IndexTransform<Arr extends any[], Start extends number, R extends any[] = [any]> = Start extends Abs<Start> 
? Start // 正索引直接返回
: Arr extends [...infer H, infer Tail]
  ? R['length'] extends Abs<Start>
    ? H['length']
    : IndexTransform<H, Start, [...R, any]>
  : 0

type Tuple<T extends number, R extends any[] = []> = R['length'] extends T ? R: Tuple<T, [...R, any]>;
type SmallerThan<M extends number, N extends number> = Tuple<M> extends [...Tuple<N>, ...infer Rest] ? false : true;

// 从 0 位置到 End 位置 Slice, 负值需要转换为正数，例如-1 => length - 1
type SliceToEnd<
  Arr extends any[],
  End extends number = Arr['length'],
  R extends any[] = []
> =  R['length'] extends IndexTransform<Arr, End>
  ? R
  : Arr extends [infer F, ...infer Rest]
    ? SliceToEnd<Rest, IndexTransform<Arr, End>, [...R, F]>
    : R;

type Test1 = SliceToEnd<[1, 2, 3, 4, 5], 0>; // []
type Test2 = SliceToEnd<[1, 2, 3, 4, 5], 1>; // [1]
type Test3 = SliceToEnd<[1, 2, 3, 4, 5], 2>; // [1, 2]
type Test4 = SliceToEnd<[1, 2, 3, 4, 5], 3>; // [1, 2, 3]
type Test5 = SliceToEnd<[1, 2, 3, 4, 5], 4>; // [1, 2, 3, 4]
type Test6 = SliceToEnd<[1, 2, 3, 4, 5], 5>; // [1, 2, 3, 4, 5]
type Test7 = SliceToEnd<[1, 2, 3, 4, 5], -1>; // [1, 2, 3, 4]
type Test8 = SliceToEnd<[1, 2, 3, 4, 5], -2>; // [1, 2, 3]
type Test9 = SliceToEnd<[1, 2, 3, 4, 5], -3>; // [1, 2]
type Test10 = SliceToEnd<[1, 2, 3, 4, 5], -4>; // [1]
type Test11 = SliceToEnd<[1, 2, 3, 4, 5], -5>; // []
type Test12 = SliceToEnd<[1, 2, 3, 4, 5], -6>; // []

// 从 Start 位置到末尾 Slice, 负值需要转换为正数，例如: -1 => length - 1
type SliceFromStart<
  Arr extends any[],
  Start extends number = 0,
  R extends any[] = []
> = R['length'] extends IndexTransform<Arr, Start>
  ? Arr extends [...R, ...infer Rest]
    ? Rest
    : R
  : SliceFromStart<Arr, IndexTransform<Arr, Start>, [...R, any]>;

type Test13 = SliceFromStart<[1, 2, 3, 4, 5], 0>; // [1, 2, 3, 4, 5]
type Test14 = SliceFromStart<[1, 2, 3, 4, 5], 1>; // [2, 3, 4, 5]
type Test15 = SliceFromStart<[1, 2, 3, 4, 5], 2>; // [3, 4, 5]
type Test16 = SliceFromStart<[1, 2, 3, 4, 5], 3>; // [4, 5]
type Test17 = SliceFromStart<[1, 2, 3, 4, 5], 4>; // [5]
type Test18 = SliceFromStart<[1, 2, 3, 4, 5], 5>; // []
type Test19 = SliceFromStart<[1, 2, 3, 4, 5], -1>; // [5]
type Test20 = SliceFromStart<[1, 2, 3, 4, 5], -2>; // [4, 5]
type Test21 = SliceFromStart<[1, 2, 3, 4, 5], -3>; // [3, 4, 5]
type Test22 = SliceFromStart<[1, 2, 3, 4, 5], -4>; // [2, 3, 4, 5]
type Test23 = SliceFromStart<[1, 2, 3, 4, 5], -5>; // [1, 2, 3, 4, 5]
type Test24 = SliceFromStart<[1, 2, 3, 4, 5], -6>; // [1,2,3,4,5]


// 从 Start 位置到 End 位置Slice
type Slice<
  Arr extends any[],
  Start extends number = 0,
  End extends number = Arr['length'],
  AbsStart extends number = IndexTransform<Arr, Start>,
  AbsEnd extends number = IndexTransform<Arr, End>
> = SmallerThan<AbsStart, AbsEnd> extends true 
? SliceFromStart<Arr, AbsStart> extends [...infer Rest,...SliceFromStart<Arr, AbsEnd>] 
  ? Rest 
  : []
: []

type A = Slice<[1, 2, 3, 4, 5], 2, 4>;
type B = Slice<[1, 2, 3, 4, 5], 10>;