// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type Obj = {
  a: number;
  b: string;
  c: boolean;
  obj: {
    d: number;
    e: string;
    f: boolean;
    obj2: {
      g: number;
      h: string;
      i: boolean;
    };
  };
  obj3: {
    j: number;
    k: string;
    l: boolean;
  };
};

type cases = [
  Expect<Equal<DeepPick<Obj, ''>, unknown>>,
  Expect<Equal<DeepPick<Obj, 'a'>, { a: number }>>,
  Expect<Equal<DeepPick<Obj, 'a' | ''>, { a: number } & unknown>>,
  Expect<Equal<DeepPick<Obj, 'a' | 'obj.e'>, { a: number } & { obj: { e: string } }>>,
  Expect<
    Equal<
      DeepPick<Obj, 'a' | 'obj.e' | 'obj.obj2.i'>,
      { a: number } & { obj: { e: string } } & { obj: { obj2: { i: boolean } } }
    >
  >
];

// ============= Your Code Here =============
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
  ? I
  : never;
type Test = UnionToIntersection<{ a: string } | { b: number }>; // {a: string} & {b: number}

type GetType<T, S> = S extends `${infer S1}.${infer S2}`
  ? S1 extends keyof T
    ? { [K in S1]: GetType<T[S1], S2> }
    : never
  : S extends keyof T
  ? { [K in S]: T[K] }
  : never;

type DeepPick<T, S extends string> = UnionToIntersection<
  S extends infer Keys ? GetType<T, Keys> : never
>;
