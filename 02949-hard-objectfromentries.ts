// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

interface Model {
  name: string;
  age: number;
  locations: string[] | null;
}

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null];

type cases = [Expect<Equal<ObjectFromEntries<ModelEntries>, Model>>];

// ============= Your Code Here =============
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
  ? I
  : never;

type MergeIntersection<T> = {
  [K in keyof T]: T[K];
};

type ObjectFromEntries<T> = MergeIntersection<
  UnionToIntersection<
    T extends [infer K extends string, infer V]
      ? {
          [P in K]: V;
        }
      : never
  >
>;
