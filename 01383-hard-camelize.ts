// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<
    Equal<
      Camelize<{
        some_prop: string;
        prop: { another_prop: string };
        array: [
          { snake_case: string },
          { another_element: { yet_another_prop: string } },
          { yet_another_element: string }
        ];
      }>,
      {
        someProp: string;
        prop: { anotherProp: string };
        array: [
          { snakeCase: string },
          { anotherElement: { yetAnotherProp: string } },
          { yetAnotherElement: string }
        ];
      }
    >
  >
];

// ============= Your Code Here =============
type CamelCase<T extends string> = T extends `${infer F}_${infer R}`
  ? `${F}${CamelCase<Capitalize<R>>}`
  : T;

type Camelize<T extends Object | any[]> = T extends any[]
  ? T extends [infer F, ...infer R]
    ? F extends Object
      ? [Camelize<F>, ...Camelize<R>]
      : [F, ...Camelize<R>]
    : []
  : T extends Object
  ? {
      [P in keyof T as P extends string ? CamelCase<P> : P]: T[P] extends Object
        ? Camelize<T[P]>
        : T[P];
    }
  : T;
