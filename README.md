[![NPM Version][npm-image]][npm-url] ![NPM Downloads][downloads-image] [![GitHub issues][issues-image]][issues-url] [![Telegram][telegram-image]][telegram-url]

[npm-image]: https://img.shields.io/npm/v/@web-project/react.svg
[npm-url]: https://www.npmjs.com/package/@web-project/react
[downloads-image]: https://img.shields.io/npm/dw/@web-project/react.svg
[deps-image]: https://david-dm.org/doasync/@web-project/react.svg
[issues-image]: https://img.shields.io/github/issues/doasync/web-project-react.svg
[issues-url]: https://github.com/doasync/web-project-react/issues
[license-image]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: https://raw.githubusercontent.com/doasync/web-project-react/master/LICENSE
[telegram-image]: http://i.imgur.com/WANXk3d.png
[telegram-url]: https://t.me/doasync

Create React project!
=====================

A boilerplate with Webpack 4, Babel 7, React, Flow, ESLint

Installation
------------
Installation is optional (see usage)
```bash
npm i --save-dev @web-project/react
```

Usage
-----
You can use `npx` to eject files to the current working directory:
```bash
npx @web-project/react --eject
```

##### CLI options

```
  -e, --eject    Eject files to the directory               [boolean] [required]
  -l, --lock     Do not remove package-lock.json      [boolean] [default: false]
  -b, --bare     Do not merge package.json            [boolean] [default: false]
  -h, --help     Show help                                             [boolean]
  -v, --version  Show version number                                   [boolean]
```

##### Scripts

Runs the app in development mode:
```
npm start
```

Builds the app for production to the "dist" folder:
```
npm run build
```

Opens an interactive visualization treemap of your bundle's contents:
```
npm run build-info
```

Author
------
@doasync
