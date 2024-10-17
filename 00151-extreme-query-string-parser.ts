// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<ParseQueryString<''>, {}>>,
  Expect<Equal<ParseQueryString<'k1'>, { k1: true }>>,
  Expect<Equal<ParseQueryString<'k1&k1'>, { k1: true }>>,
  Expect<Equal<ParseQueryString<'k1&k2'>, { k1: true; k2: true }>>,
  Expect<Equal<ParseQueryString<'k1=v1'>, { k1: 'v1' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v2'>, { k1: ['v1', 'v2'] }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2'>, { k1: 'v1'; k2: 'v2' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2&k1=v2'>, { k1: ['v1', 'v2']; k2: 'v2' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2'>, { k1: 'v1'; k2: true }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v1'>, { k1: 'v1' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v2&k1=v1'>, { k1: ['v1', 'v2'] }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v1&k1=v2&k1=v1'>, { k1: ['v1', 'v2']; k2: 'v1' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2&k1=v2&k1=v3'>, { k1: ['v1', 'v2', 'v3']; k2: 'v2' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1'>, { k1: ['v1', true] }>>,
  Expect<Equal<ParseQueryString<'k1&k1=v1'>, { k1: [true, 'v1'] }>>
];

// ============= Your Code Here =============
// 解析&符号，得到&分割的数组，形式为['k1=v1','k1=v2','k1=v1']
type ParseQueryStringSplitByAnd<S extends string> = S extends `${infer P}&${infer R}`
  ? [P, ...ParseQueryStringSplitByAnd<R>]
  : [S];

type T1 = ParseQueryStringSplitByAnd<'k1=v1&k1=v2&k1=v1'>;

// 解析单个 k1=v1、k1 形式的字符串，得到对象形式的结果，形式为{k1: 'v1'}、{}、{k1: true}
type ParseQueryStringItem<S extends string> = S extends `${infer K}=${infer V}`
  ? Record<K, V>
  : S extends ''
  ? {}
  : Record<S, true>;

// 合并对象, 相同key合并成数组, 不同key直接合并; 相同的key,value遇到数组还需要判重，重复的丢弃，不重复的合并，例如：
// {k1: 'v1'},{k1: 'v2'} => {k1: ['v1','v2']}，
// {k1: 'v1'},{k1: 'v1'} => {k1: 'v1'}
type MergeTwoObject<A extends object, B extends object = {}> = {
  [P in keyof A | keyof B]: P extends keyof A
    ? P extends keyof B
      ? A[P] extends B[P] // A B 共有的key
        ? A[P] // A B 共有的key, 且value相同, 返回其一即可
        : A[P] extends any[] // A B 共有的key, 且value不同, 且其中一个是数组
        ? B[P] extends A[P][number]
          ? A[P]
          : [...A[P], B[P]]
        : B[P] extends any[]
        ? A[P] extends B[P][number]
          ? B[P]
          : [...B[P], A[P]]
        : [A[P], B[P]] // A B 共有的key, 且value不同, 且都不是数组
      : A[P] // A 独有的key
    : P extends keyof B
    ? B[P] // B 独有的key
    : never;
};

// 最终结果
type ParseQueryString<
  S extends string,
  U extends string[] = ParseQueryStringSplitByAnd<S>,
  R extends object = {}
> = U extends [infer F extends string, ...infer Rest extends string[]]
  ? ParseQueryString<S, Rest, MergeTwoObject<R, ParseQueryStringItem<F>>>
  : R;
type A = ParseQueryString<'k1=v1&k1=v2&k1=v1'>;
