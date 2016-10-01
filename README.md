<p align="center">
  <a href="https://angularclass.com" target="_blank">
    <img src="https://cloud.githubusercontent.com/assets/1016365/9863762/a84fed4a-5af7-11e5-9dde-d5da01e797e7.png" alt="Webpack and Angular 2" width="500" height="320"/>
  </a>
</p>
<p align="center">+</p>
<p align="center">
  <a href="https://angularclass.com" target="_blank">
    <img src="https://d2wp4shknjcfjl.cloudfront.net/api/file/SPLl77rSTuGZ7APrXizi" alt="Angular 2 Webpack Advance Starter Integrations" width="500" height="320"/>
  </a>
</p>

[![devDependency Status](https://david-dm.org/JonnyBGod/angular2-webpack-advance-starter/dev-status.svg)](https://david-dm.org/JonnyBGod/angular2-webpack-advance-starter#info=devDependencies)
[![Build Status](https://img.shields.io/travis/JonnyBGod/angular2-webpack-advance-starter/master.svg?style=flat)](https://travis-ci.org/JonnyBGod/angular2-webpack-advance-starter)
[![GitHub version](https://badge.fury.io/gh/JonnyBGod/angular2-webpack-advance-starter.svg)](https://badge.fury.io/gh/JonnyBGod/angular2-webpack-advance-starter)
[![Dependency Status](https://david-dm.org/JonnyBGod/angular2-webpack-advance-starter.svg)](https://david-dm.org/JonnyBGod/angular2-webpack-advance-starter)

[![Gitter Chat](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/JonnyBGod/angular2-webpack-advance-starter)

This is an advance starter project for Angular 2 apps based on [AngularClass's](https://github.com/AngularClass) [angular2-webpack-starter](https://github.com/AngularClass/angular2-webpack-starter) and [Nathan Walker's](https://github.com/NathanWalker) [angular2-seed-advanced](https://github.com/NathanWalker/angular2-seed-advanced).

I would like to thank both for their great work and collaboration. Please refer to both projects' pages for extra documentation.

#### Integration with:

[![Join the chat at https://gitter.im/angular2-webpack-advance-starter/Lobby](https://badges.gitter.im/angular2-webpack-advance-starter/Lobby.svg)](https://gitter.im/angular2-webpack-advance-starter/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
- [ngrx/store](https://github.com/ngrx/store) RxJS powered state management, inspired by **Redux**
- [ngrx/effects](https://github.com/ngrx/effects) Side effect model for @ngrx/store
- [ng2-translate](https://github.com/ocombe/ng2-translate) for i18n 
  - Usage is optional but on by default
  - Up to you and your team how you want to utilize it. It can be easily removed if not needed. 
- [angulartics2](https://github.com/angulartics/angulartics2) Vendor-agnostic analytics for Angular2 applications.
  - Out of box support for [Segment](https://segment.com/)
    - When using the seed, be sure to change your `write_key` [here](https://github.com/JonnyBGod/angular2-webpack-advance-starter/blob/master/src/index.html#L24)
  - Can be changed to any vendor, [learn more here](https://github.com/angulartics/angulartics2#supported-providers)
- [lodash](https://lodash.com/) Helps reduce blocks of code down to single lines and enhances readability
- (WIP) [NativeScript](https://www.nativescript.org/) cross platform mobile (w/ native UI) apps. [Setup instructions here](#nativescript-app).
- [Electron](http://electron.atom.io/) cross platform desktop apps (Mac, Windows and Linux). [Setup instructions here](#electron-app).

| ![Multiple Platforms](https://d2wp4shknjcfjl.cloudfront.net/api/file/ihp3WyiqS1WdRYaBEYKn) |
| :---: |
| *The zen of multiple platforms.* Chrome, Android and iPhone all running the same code. |

| ![Desktop](https://d2wp4shknjcfjl.cloudfront.net/api/file/1O4FRGsSHS8g0Lz3EKNy) |
| :---: |
| *Programming Nirvana.* Mac and Windows desktop both running the same code. |

# Table of Contents

- [Enhanced development workflow](#enhanced-development-workflow)
- [Enhanced testing support options](#enhanced-testing-support-options)
- [Getting Started](#getting-started)
  - [Dependencies](#dependencies)
  - [Installing](#installing)
  - [Usage](#usage)
- [Electron App](#electron-app)
- [Framework How-Tos](#framework-how-tos)
- [Web Configuration Options](#web-configuration-options)
- [Change Detection OnPush Note](#change-detection-onpush-note)
- [General Best Practice Guide to Sharing Code](#general-best-practice-guide-to-sharing-code)
- [How best to use for your project](#how-best-to-use-for-your-project)
- [Configuration](#configuration)
- [More Documentation](#more-Documentation)
- [Contributing](#contributing)
- [Known Bugs](#known-bugs)
- [License](#license)

### Enhanced development workflow
- Decorators for components which reduce boilerplate for common component setups
- Shared code can be found in `frameworks`:
  - `app`: your shared application architecture code
  - `core`: foundation layer (decorators and low-level services)
  - `analytics`: analytics provided by [Segment](https://segment.com/)
    - Only reports data in **production** build
  - `i18n`: internationalization features
  - `electron`: [Electron](http://electron.atom.io/) specific code
  - `sample`: Just a sample module providing some components and services
  - `test`: test specific code providing conveniences to make testing your code easier and faster

### Enhanced testing support options
- mocks for various services
- configurable provider blocks for easy test setup of common application providers
  - tired of setting up similar providers over and over again for different tests?
  - configure a reusable test provider which can be configured on a case-by-base basis
  - see [example here](https://github.com/JonnyBGod/angular2-webpack-advance-starter/blob/master/src/app/frameworks/core/testing/providers/core.ts)
- helpers for end-to-end (e2e, integration) tests
- convenient shorthand to reduce test setup boilerplate and enhance speed of writing tests
  - are your test cases buried by multiple import lines requiring you to scroll just to get to the substance of the test?
  - removes noise allowing you to better focus on the substance of the test
  - provides full intellisense support
  - allows your team to add unique shorthands for various testing scenarios specific to your application needs
  - plays nice with `tslint` options like `"no-unused-variable": true` as the api hangs off a plain `Object` instead of globals 
    - what's the value of that you ask? have you ever isolated a test with `iit` or `ddescribe` but didn't import those or vice versa, used `iit` leaving an unused `it` now in your tests? yeah, `tslint` will be all over you :/
    - avoids `unused` variable warnings altogether in tests since you are always using a valid key from the shorthand `Object`
  - see [example here](https://github.com/JonnyBGod/angular2-webpack-advance-starter/blob/master/src/app/frameworks/test/shorthand/ng2-jasmine.ts)
  
**Advice**: If your project is intended to target a single platform (i.e, web only), then [angular2-webpack-starter](https://github.com/AngularClass/angular2-webpack-starter) is likely more than suitable for your needs. However if your project goals are to target multiple platforms (web, native mobile and native desktop), with powerful out of the box library support and highly configurable/flexible testing options, then you might want to keep reading.

Additionally, this seed is intended to push a couple boundaries so if you see dependencies that are *bleeding edge*, this is intentional.

# Getting Started
### Dependencies

* node v5.x.x or higher and npm 3 or higher.

* To run the NativeScript app:

```
npm install -g nativescript
```

### Usage

```bash
git clone --depth 1 https://github.com/JonnyBGod/angular2-webpack-advance-starter.git
cd angular2-seed-advanced

# install the project's dependencies
npm install

# start the server
npm start

# use Hot Module Replacement
npm run start:hmr
```

### Other commands

#### build files
```bash
# development
npm run build:dev
# production
npm run build:prod
```

#### hot module replacement
```bash
npm run server:dev:hmr
```

#### watch and build files
```bash
npm run watch
```

#### run tests
```bash
npm run test
```

#### watch and run our tests
```bash
npm run watch:test
```

#### run end-to-end tests
```bash
# make sure you have your server running in another terminal
npm run e2e
```

#### run webdriver (for end-to-end)
```bash
npm run webdriver:update
npm run webdriver:start
```

#### run Protractor's elementExplorer (for end-to-end)
```bash
npm run webdriver:start
# in another terminal
npm run e2e:live
```

#### generate docs
```bash
npm run docs
```

#### build Docker
```bash
npm run build:docker
```

### Electron App

#### Develop

```
Mac:      npm run start:desktop
Windows:  npm run start:desktop:windows
```

#### Build: Electron App for Mac, Windows or Linux for distribution

```
Mac:      npm run build:desktop:mac
Windows:  npm run build:desktop:windows
Linux:    npm run build:desktop:linux

All:      npm run build:desktop
```

## Framework How-Tos

### i18n

* how to add a language?
  - `src/assets/i18n/`
    - add `[language code].json` (copy existing one and adapt the translation strings)
  - `src/app/frameworks/sample/services/app-config.spec.ts`
    - fix test
  - `src/app/frameworks/sample/services/app-config.ts`
    - add language to `SUPPORTED_LANGUAGES`
  - `src/app/frameworks/i18n/components/lang-switcher.component.spec.ts`
    - fix test

## Change Detection OnPush Note

*Please Note:* The seed uses Angular's `ChangeDetectionStrategy.OnPush` by default which requires some understanding of immutability and one-way data flows. Please check out the following resources to learn more:

* http://blog.thoughtram.io/angular/2016/02/22/angular-2-change-detection-explained.html
* http://victorsavkin.com/post/110170125256/change-detection-in-angular-2
* http://www.syntaxsuccess.com/viewarticle/change-detection-in-angular-2.0
* http://ngcourse.rangle.io/handout/change-detection/change_detection_strategy_onpush.html

If you experience issues with changes not occuring in your views, you can disable this by commenting out [these lines](https://github.com/JonnyBGod/angular2-webpack-advance-starter/blob/master/src/app/frameworks/core/decorators/utils.ts#L43-L48). The seed uses `OnPush` by default because it  provides optimal performance and if you decide to turn it off while developing your application, you can always turn it back on when you're ready to refactor your data services to utilize `OnPush` properly.

## General Best Practice Guide to Sharing Code 

There’s actually only a few things to keep in mind when sharing code between web/mobile. The seed does take care of quite a few of those things but here’s a brief list:

* Don’t import {N} modules into your components/services. {N} modules can only be used inside the {N} app therefore cannot be shared. To get around this, use `OpaqueTokens` which is a fancy name for something quite simple. [Learn more here](http://blog.thoughtram.io/angular/2016/05/23/opaque-tokens-in-angular-2.html). A great example of how to integrate 2 different plugins (1 for web, 1 for {N}) and share all the code exists in [this wiki article: How to integrate Firebase across all platforms](https://github.com/NathanWalker/angular2-seed-advanced/wiki/How-to-integrate-Firebase-across-all-platforms-(web-nativescript-desktop)) written by the awesome [Scott Lowe](https://twitter.com/scott_d_lowe).
* Use the conditional hooks provided by the seed in shared methods where you may need to handle something differently in {N} than you do on the web. For example, see [here](https://github.com/JonnyBGod/angular2-webpack-advance-starter/blob/master/src/app/frameworks/i18n/components/lang-switcher.component.ts#L35-L41).
* Don’t use window global. Inject the `WindowService` provided by the seed instead. This includes usage of `alert`, `confirm`, etc. For example:

If you were thinking about doing: `alert('Something happened!');`, *Don't*.
Instead inject `WindowService`:
```
constructor(private win: WindowService) {}

public userAction() {
  if (success) {
    // do stuff
  } else {
    this.win.alert('Something happened!');
  }
}
```

This ensures that when the same code is run in the {N} app, the native `dialogs` module will be used.

* Lastly, understand this video: http://www.nativescriptsnacks.com/videos/2016/06/13/zoned-callbacks.html … As far as dealing with {N} and 3rd party plugins, you want to understand that.

The advice [Nathan Walker's](https://github.com/NathanWalker) likes to give, and I fully support it, is:

> Code with web mentality first. Then provide the native capability using Angular’s `{provide: SomeWebService, useClass: SomeNativeService }` during bootstrap.

There are some cases where you may want to use `useValue` vs. `useClass`, and other times may need to use `useFactory`. Read [the Angular docs here to learn more about which you may need for your use case](https://angular.io/docs/ts/latest/cookbook/dependency-injection.html#!#provide).

## How best to use for your project

#### Setup

*NOTE*: This should be done first before you start making any changes and building out your project. Not doing so will likely result in dificulty when trying to merge in upstream changes later.

1. Download a zip of the seed. (**Do not fork**)
2. `npm run git.setup` - This will initialize `git` as well as setup `upstream` properly.
3. `git remote add origin ...your private repo...`
4. `npm run git.prepare` - This will prepare git to handle the merge
5. `npm run git.merge` - This will fetch upstream and run the first merge (*Important)
  * IMPORTANT: You will see a wall of Conflicts after doing above (a Conflict for every single file). This is normal. There actually will not be any problematic conflicts as it's just reporting every single file which both sides (`upstream` and your first commit) added.
6. `git add .; git commit -m'ready'`. **Yes**, you will be committing all those conflicts, which actually are not a problem in this 1 time case.
7. Now you have `git` setup and ready to develop your application as well as merge in upstream changes in the future.
8. `npm install` (and all other usage docs in this `README` apply)
9. Create a new `framework` for your application in `src/app/frameworks` to build your codebase out. Say your app is called `AwesomeApp`, then create `awesomeapp` and start building out all your components and services in there. Create other frameworks as you see fit to organize.
10. If you don't want an integration that comes out of box with this seed; for example. let's say you don't want to use i18n. Then just delete the `i18n`, remove `ng2-translate` as dependency root `package.json` and `nativescript/package.json`. Then remove any references to `i18n` throughout.

#### Merging latest upstream changes

1. `npm run git:merge:preview` - This will fetch `upstream` and show you how the merge would look
2. `npm run git:merge` - This will actually do the merge
3. Handle any conflicts to get latest upstream into your application.
4. Continue building your app.

You can read more about [syncing a fork here](https://help.github.com/articles/syncing-a-fork/).

If you have any suggestions to this workflow, please post [here](https://github.com/JonnyBGod/angular2-webpack-advance-starter/issues).

## Configuration

Configuration files live in `config/` we are currently using webpack, karma, and protractor for different stages of your application.

Use `config/custom/` configuration files when possible to add your custom configurations or override our configurations. This will help you when updating upstream.

## More Documentation

[angular2-webpack-starter](https://github.com/AngularClass/angular2-webpack-starter)
[angular2-seed-advanced](https://github.com/NathanWalker/angular2-seed-advanced)

## Contributing

Please see the [CONTRIBUTING](https://github.com/JonnyBGod/angular2-webpack-advance-starter/blob/master/.github/CONTRIBUTING.md) file for guidelines.

## Known Bugs

- [ ] ELECTRON: css absolute paths
- [ ] npm run docs (upstream) (https://github.com/TypeStrong/typedoc/issues/234)

___

# License
 [MIT](/LICENSE)
