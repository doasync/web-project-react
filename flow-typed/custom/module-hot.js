// @flow

declare type ModuleHotStatus =
  | 'idle' // The process is waiting for a call to check (see below)
  | 'check' // The process is checking for updates
  | 'prepare' // The process is getting ready for the update (e.g. downloading the updated module)
  | 'ready' // The update is prepared and available
  | 'dispose' // The process is calling the dispose handlers on the modules that will be replaced
  | 'apply' // The process is calling the accept handlers and re-executing self-accepted modules
  | 'abort' // An update was aborted, but the system is still in it's previous state
  | 'fail' // An update has thrown an exception and the system's state has been compromised
  ;

declare type ModuleHotStatusHandler = (status: ModuleHotStatus) => any

declare interface ModuleHot {
  data: any;
  accept(paths?: string | Array<string>, callback?: () => void | Promise<void>): void;
  decline(paths?: string | Array<string>): void;
  dispose(callback: (data?: mixed) => any): void;
  addDisposeHandler(callback: (data: mixed) => any): void;
  status(): ModuleHotStatus;
  check(autoApply: boolean | Object): Promise<string[]>;
  apply(options: Object): Promise<string[]>;
  addStatusHandler(callback: ModuleHotStatusHandler): void;
  removeStatusHandler(callback: ModuleHotStatusHandler): void;
}

declare var module: {
  exports: any;
  require(id: string): any;
  id: string;
  filename: string;
  loaded: boolean;
  parent: any;
  children: Array<any>;
  hot: ModuleHot,
};
