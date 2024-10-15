// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type PersonInfo = {
  name: 'Tom';
  age: 30;
  married: false;
  addr: {
    home: '123456';
    phone: '13111111111';
  };
  hobbies: ['sing', 'dance'];
  readonlyArr: readonly ['test'];
  fn: () => any;
};

type ExpectedResult = {
  name: string;
  age: number;
  married: boolean;
  addr: {
    home: string;
    phone: string;
  };
  hobbies: [string, string];
  readonlyArr: readonly [string];
  fn: Function;
};

type cases = [Expect<Equal<ToPrimitive<PersonInfo>, ExpectedResult>>];

// ============= Your Code Here =============
type TypeMap = {
  string: string;
  number: number;
  boolean: boolean;
  function: Function;
};
type isFunction<T> = T extends (...args: any[]) => any ? true : false;

type ToPrimitive<T> = T extends object // 对象或数组、函数
  ? T extends (...args: any[]) => any
    ? Function
    : {
        [K in keyof T]: ToPrimitive<T[K]>;
      }
  : T extends { valueOf: () => infer R }
  ? R
  : T;

type A = (() => any) extends object ? true : false; // true
type B = {
  home: '123456';
  phone: '13111111111';
} extends object
  ? true
  : false; // true
type C = ['sing', 'dance'] extends object ? true : false; // true

type D = 1 extends object ? true : false; // false
type E = '1' extends object ? true : false; // false
type F = true extends object ? true : false; // false
