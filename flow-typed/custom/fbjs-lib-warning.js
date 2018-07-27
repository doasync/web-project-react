// @flow

declare module 'fbjs/lib/warning' {
  declare module.exports: (shouldBeTrue: boolean, warning: string) => void;
}
