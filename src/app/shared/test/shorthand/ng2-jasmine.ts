// intellisense via shorthand
export interface TestApi {
  ae: Function;
  afterEach: Function;
  describe: Function;
  fdescribe: Function;
  xdescribe: Function;
  be(fn: Function): void;
  beforeEach(fn: Function): void;
  e(actual: any): jasmine.Matchers<any>;
  expect(actual: any): jasmine.Matchers<any>;
  fail(e?: any): void;
  it(name: string, fn: Function, timeOut?: number): void;
  fit(name: string, fn: Function, timeOut?: number): void;
  xit(name: string, fn: Function, timeOut?: number): void;
  pending(reason?: string): void;
  spyOn(object: any, method: string): jasmine.Spy;
};

// shorthand - reduces boilerplate in every test
export const ng2Jasmine: TestApi = {
  ae: afterEach, // shorthand
  afterEach,
  describe,
  fdescribe,
  xdescribe,
  be: beforeEach,  // shorthand beforeEach
  beforeEach,
  e: expect, // shorthand expect
  expect,
  fail,
  it,
  fit,
  xit,
  pending,
  spyOn
};
