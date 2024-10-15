// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type ExtractValuesOfTuple<T extends any[]> = T[keyof T & number];

type cases = [
  Expect<Equal<UnionToTuple<'a' | 'b'>['length'], 2>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<'a' | 'b'>>, 'a' | 'b'>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<'a'>>, 'a'>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<any>>, any>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<undefined | void | 1>>, void | 1>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<any | 1>>, any | 1>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<any | 1>>, any>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<'d' | 'f' | 1 | never>>, 'f' | 'd' | 1>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<[{ a: 1 }] | 1>>, [{ a: 1 }] | 1>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<never>>, never>>,
  Expect<
    Equal<
      ExtractValuesOfTuple<UnionToTuple<'a' | 'b' | 'c' | 1 | 2 | 'd' | 'e' | 'f' | 'g'>>,
      'f' | 'e' | 1 | 2 | 'g' | 'c' | 'd' | 'a' | 'b'
    >
  >
];

// ============= Your Code Here =============
// 参考1: https://github.com/type-challenges/type-challenges/issues/10191
// 参考2: https://note.xiexuefeng.cc/post/ts-union-to-tuple/
// 1. 实现函数交叉类型UnionToIntersectionFn，作用：将联合类型转换成对应的函数交叉类型
// 2. 第二步：实现 GetUnionLast 类型, GetUnionLast 作用是：获取联合类型的最后一个类型
// 3. 第三步：实现 Prepend 类型, Prepend 作用：把第二步中取到的值放在数组的第一项
// 4. 第四步：实现 UnionToTuple 类型
// your answers
type UnionToIntersectionFn<U> = (U extends any ? (k: () => U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;
// 测试用例
type A = UnionToIntersectionFn<'a' | 'b'>; // (() => "a") & (() => "b"), 也即 {(): "a", (): "b"}

type GetUnionLast<U> = UnionToIntersectionFn<U> extends () => infer I ? I : never;

// 测试用例
type B = GetUnionLast<'a' | 'b'>; // "b"
type C = GetUnionLast<'a'>; // "a"

type Prepend<Tuple extends unknown[], First> = [First, ...Tuple];

// 测试用例
type D = Prepend<[1, 2], 3>; // [3, 1, 2]

type UnionToTuple<Union, T extends unknown[] = [], Last = GetUnionLast<Union>> = [Union] extends [
  never
]
  ? T
  : UnionToTuple<Exclude<Union, Last>, Prepend<T, Last>>;
