// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<10, 9>, true>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
  Expect<Equal<GreaterThan<1234567891011, 1234567891010>, true>>
];

// ============= Your Code Here =============
/**
 * 思路： 数字比较，先比较数字位数，位数大的数大，位数小的数小，位数相等的话，从高位到低位比较，
 */

// 获取字符串的长度
type LengthOfString<
  T extends string,
  Result extends any[] = []
> = T extends `${string}${infer Rest}` ? LengthOfString<Rest, [...Result, any]> : Result['length'];
// 测试用例
type Test = LengthOfString<'1234567891011'>; // 13

// 获取数字的位数
type BitsOfNumber<T extends number> = LengthOfString<`${T}`>;
/* type BitsOfNumber<
  T extends number,
  Result extends any[] = [any]
> = `${T}` extends `${number}${infer Rest extends number}` // 对于 1011 的 number 推断有误
  ? BitsOfNumber<Rest, [...Result, any]>
  : Result['length'];
  */

// 测试用例
type Test1 = BitsOfNumber<1234567891011>; // 13
type Test2 = BitsOfNumber<123>; // 3

// 根据数字的位数，获取一个数字数组
type GetNumberArray<T extends number, Result extends any[] = []> = Result['length'] extends T
  ? Result
  : GetNumberArray<T, [...Result, any]>;
// 测试用例
type Test3 = GetNumberArray<3>; // [any, any, any]

// 小数字比较，不适合大数字，会爆栈
type GreaterForSmallNumber<T extends number, U extends number> = GetNumberArray<U> extends [
  ...GetNumberArray<T>,
  ...infer Rest
]
  ? false
  : true;
// 测试用例
type Test4 = GreaterForSmallNumber<1, 2>; // false
type Test5 = GreaterForSmallNumber<1, 1>; // false
type Test6 = GreaterForSmallNumber<2, 1>; // true

type ParseInt<T extends string> = T extends `${infer N extends number}${infer Rest}` ? N : never;
type GreaterChar<T extends string, U extends string> = GreaterForSmallNumber<
  ParseInt<T>,
  ParseInt<U>
>;

type GreaterStringWithSameLength<
  T extends string,
  U extends string
> = T extends `${infer C1}${infer Rest1}`
  ? U extends `${infer C2}${infer Rest2}`
    ? C1 extends C2
      ? GreaterStringWithSameLength<Rest1, Rest2>
      : GreaterChar<C1, C2> extends true
      ? true
      : false
    : false
  : false;
// 相同位数的数字比较
type GreaterForSameBits<T extends number, U extends number> = GreaterStringWithSameLength<
  `${T}`,
  `${U}`
>;
// 测试用例
type Test7 = GreaterForSameBits<123, 123>; // false
type Test8 = GreaterForSameBits<123, 124>; // false
type Test9 = GreaterForSameBits<123, 122>; // true

type A = GreaterForSameBits<1011, 1010>;

type GreaterThan<T extends number, U extends number> = GreaterForSmallNumber<
  BitsOfNumber<T>,
  BitsOfNumber<U>
> extends true
  ? true
  : GreaterForSmallNumber<BitsOfNumber<U>, BitsOfNumber<T>> extends true
  ? false
  : GreaterForSameBits<T, U>; // 数字位数相同，从高位到低位比较
