# ember-joda

![Supported Ember versions](https://embadge.io/v1/badge.svg?label=ember&start=2.12.0)
[![Build Status](https://travis-ci.org/buschtoens/ember-joda.svg?branch=master)][travis]
[![Code Climate](https://codeclimate.com/github/buschtoens/ember-joda/badges/gpa.svg)][codeclimate]
[![Coverage](https://codeclimate.com/github/buschtoens/ember-joda/badges/coverage.svg)][codeclimate]
[![npm version](https://badge.fury.io/js/ember-joda.svg)][npm]
[![Ember Observer Score](https://emberobserver.com/badges/ember-joda.svg)][e-observer]
[![npm downloads](https://img.shields.io/npm/dt/ember-joda.svg)][npm]
[![Greenkeeper badge](https://badges.greenkeeper.io/buschtoens/ember-joda.svg)](https://greenkeeper.io/)
[![dependencies Status](https://david-dm.org/buschtoens/ember-joda/status.svg)](https://david-dm.org/buschtoens/ember-joda)
[![devDependencies Status](https://david-dm.org/buschtoens/ember-joda/dev-status.svg)](https://david-dm.org/buschtoens/ember-joda?type=dev)

:clock2: [**js-joda**][joda] — immutable date and time library for [**Ember.js**][ember]

[joda]:        https://github.com/js-joda/js-joda
[ember]:       https://github.com/emberjs/ember.js
[npm]:         https://www.npmjs.com/package/ember-joda
[travis]:      https://travis-ci.org/buschtoens/ember-joda
[codeclimate]: https://codeclimate.com/github/buschtoens/ember-joda
[e-observer]:  https://emberobserver.com/addons/ember-joda

## Installation

```
$ ember install ember-joda
```

Only compatible with Ember 2.12 and onwards. Compatibility with Ember 2.8 LTS [is planned](https://github.com/buschtoens/ember-joda/issues/3).

## Usage

### js-joda

> **js-joda** is an **immutable date and time library** for javascript. It provides a **simple, domain-driven and clean API** based on the [**ISO8601**](https://en.wikipedia.org/wiki/ISO_8601) calendar.
>
> js-joda is a **port of the threeten backport**, that is the base for JSR-310 implementation of the Java SE 8 `java.time` package. Threeten is inspired by **Joda-Time**, having similar concepts and the same author.
>
> js-joda is **robust and stable**. We ported more then 1,700 test-cases with lots of test permutations from the threetenbp project. We run the automated karma test-suite against Firefox, Chrome, Node and phantomjs.

- :page_facing_up: [Cheat Sheet](https://github.com/js-joda/js-joda/blob/master/CheatSheet.md)
- :books: [API Docs](https://js-joda.github.io/js-joda/esdoc/)
- :octocat: [GitHub Repository](https://github.com/js-joda/js-joda)
- :calendar: [Domain Models](https://github.com/js-joda/js-joda#the-threeten-domain-models)

### Importing js-joda classes

All [exports of js-joda](https://github.com/js-joda/js-joda/blob/master/src/js-joda.js) are dynamically re-exported as the `ember-joda` module. This means you can import them like so:

```js
import { LocalDate, YearMonth } from 'ember-joda';
```

You could also directly access the `js-joda` module and load the original,
unwrapped js-joda classes:

```js
import { LocalDate, YearMonth } from 'js-joda';
// or
import { LocalDate } from 'js-joda/LocalDate';
import { YearMonth } from 'js-joda/YearMonth';
```

### Ember Data Transforms

All [js-joda domain models](https://github.com/js-joda/js-joda#the-threeten-domain-models) are available as transforms.

```js
// app/models/user.js
import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  birthdate: attr('local-date')
});
```
