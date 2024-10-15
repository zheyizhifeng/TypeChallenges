// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
  Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
  Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
  Expect<Equal<KebabCase<'-'>, '-'>>,
  Expect<Equal<KebabCase<''>, ''>>,
  Expect<Equal<KebabCase<'😎'>, '😎'>>,
]


// ============= Your Code Here =============
// type isUpperCaseLetter<Char extends string> = Char extends Uppercase<Char> 
// ? Char extends Lowercase<Char> ? false : true
// : false
// type T1 = isUpperCaseLetter<'A'>
// type T2 = isUpperCaseLetter<'-'>
// type T3 = isUpperCaseLetter<'a'>

// type AllKebabCase<S extends string> = S extends `${infer Char}${infer Rest}`
// ? isUpperCaseLetter<Char> extends true // 大写字母
//   ? `-${Lowercase<Char>}${AllKebabCase<Rest>}`
//   : `${Char}${AllKebabCase<Rest>}`
// : S

// type A = AllKebabCase<'FooBarBaz'>
// type A1 = AllKebabCase<'fooBarBaz'>
// type A2 = AllKebabCase<'foo-bar'>
// type A3 = AllKebabCase<''>

// type ReplaceFirstDash<S extends string> = S extends '-' 
// ? S 
// : S extends `${infer Char}${infer Rest}` 
//   ? Char extends '-' ? Rest : S
//   : S

// type R1 = ReplaceFirstDash<A3>


// type KebabCase<S extends string> = ReplaceFirstDash<AllKebabCase<S>>
type KebabCase<S extends string> = S extends `${infer S1}${infer S2}` 
? S2 extends Uncapitalize<S2> // 小写字符
  ? `${Uncapitalize<S1>}${KebabCase<S2>}`
  : `${Uncapitalize<S1>}-${KebabCase<S2>}`
: S
type a = KebabCase<'ABC'>

type A = Capitalize<'a'> // A
type B = Capitalize<'-'> // -