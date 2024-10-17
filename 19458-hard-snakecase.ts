// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'
import { ExpectFalse, NotEqual } from './test-utils'

type cases = [
  Expect<Equal<SnakeCase<'hello'>, 'hello'>>,
  Expect<Equal<SnakeCase<'userName'>, 'user_name'>>,
  Expect<Equal<SnakeCase<'getElementById'>, 'get_element_by_id'>>,
  Expect<Equal<SnakeCase<'getElementById' | 'getElementByClassNames'>, 'get_element_by_id' | 'get_element_by_class_names'>>,
]


// ============= Your Code Here =============
type StartWithUpper<S extends string> = S extends `${infer F}${infer R}` ? F extends Uppercase<F>? true : false : false

type SnakeCase<S extends string> = S extends `${infer F}${infer R}`
? StartWithUpper<R> extends true
  ? `${Lowercase<F>}_${Lowercase<SnakeCase<R>>}`
  : `${F}${SnakeCase<R>}`
: S
