// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type obj = {
  person: {
    name: string;
    age: {
      value: number;
    };
  };
};

type cases = [
  Expect<Equal<DeepOmit<obj, 'person'>, {}>>,
  Expect<Equal<DeepOmit<obj, 'person.name'>, { person: { age: { value: number } } }>>,
  Expect<Equal<DeepOmit<obj, 'name'>, obj>>,
  Expect<Equal<DeepOmit<obj, 'person.age.value'>, { person: { name: string; age: {} } }>>
];

// ============= Your Code Here =============
type DeepOmit<O, P extends string> = P extends `${infer K}.${infer Rest}`
  ? {
      [key in keyof O]: key extends K ? DeepOmit<O[key], Rest> : O[key];
    }
  : Omit<O, P>;
