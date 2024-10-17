// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'a'>, true>>,
  Expect<Equal<IsRequiredKey<{ a: undefined; b: string }, 'a'>, true>>,
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'b'>, false>>,
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'b' | 'a'>, false>>,
  Expect<Equal<IsRequiredKey<{ a: undefined; b: undefined }, 'b' | 'a'>, true>>,
]


// ============= Your Code Here =============
type IsRequiredKey<
  Type,
  Keys extends keyof Type
> = Pick<Type, Keys> extends Required<Pick<Type, Keys>>
  ? true
  : false