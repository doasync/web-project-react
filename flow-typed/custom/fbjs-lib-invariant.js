// @flow

declare module 'fbjs/lib/invariant' {
  declare module.exports: (assertCondition: boolean, message: string) => void;
}
