// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<FindAll<'Collection of TypeScript type challenges', 'Type'>, [14]>>,
  Expect<Equal<FindAll<'Collection of TypeScript type challenges', 'pe'>, [16, 27]>>,
  Expect<Equal<FindAll<'Collection of TypeScript type challenges', ''>, []>>,
  Expect<Equal<FindAll<'', 'Type'>, []>>,
  Expect<Equal<FindAll<'', ''>, []>>,
  Expect<Equal<FindAll<'AAAA', 'A'>, [0, 1, 2, 3]>>,
  Expect<Equal<FindAll<'AAAA', 'AA'>, [0, 1, 2]>>
];

// ============= Your Code Here =============
/* 
假设字符串 T 是值, 要找出 P 首先想到的是用循环的方式。每次循环读取 T 中的一个字符，并检查当前字符和后续字符串能否构成 P, 能构成说明当前索引是一个有效索引。

但在 ts 类型定义中无法使用循环, 只能用递归来代替循环。所以需要一个泛型 C 来记录递归次数，或称循环索引。

在 FindAll 首先判断 P 是否是空字符，是则直接返回空数组即可。

之后用

T extends `${string}${infer R}`
将字符串类型 T 分割出首字符和剩余字符 R

接着

T extends `${P}${string}`
判断 T 从开始字符串是否存在能匹配 P 的字符串。存在表示当前索引是有效的。直接将当前索引 C['length'] 放入结果数组中, 并继续递归剩余字符串。
*/
type FindAll<T extends string, P extends string, C extends 0[] = []> = P extends ''
  ? []
  : T extends `${string}${infer R}`
  ? T extends `${P}${string}`
    ? [C['length'], ...FindAll<R, P, [...C, 0]>]
    : FindAll<R, P, [...C, 0]>
  : [];
