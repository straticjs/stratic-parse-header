# `stratic-parse-header`

[![Greenkeeper badge](https://badges.greenkeeper.io/straticjs/stratic-parse-header.svg)](https://greenkeeper.io/)

[Gulp][1] plugin to fully parse and process a standard [Stratic][2] header:

1. Validate the header
2. Extract metadata
3. Strip out the header 

## Installation

    npm install stratic-parse-header

## Usage

`gulpfile.js`:

```js
var gulp = require('gulp')
var straticParseHeader = require('stratic-parse-header');

gulp.task('parse', function() {
    gulp.src('*.md')
        .pipe(straticParseHeader());
});
```

Any Gulp plugin downstream of the call to `straticParseHeader()` may now consume Stratic metadata. See **METADATA**.

## Metadata

Metadata is represented as properties on the Vinyl object:

`title` (`String`) — the title of the blog post

`author` (`String`) — the author of the blog post

`time` (`Object`) — the time the blog post was published

`categories` (`Array`) — the categories the blog post was published in

### The `time` object

Contains two values that represent the time the blog post was published:

`epoch` (`Number`) — the time the blog post was published represented as [seconds since the epoch][3]

`utcoffset` (`String`) — the timezone the post was published in, represented as a UTC offset of the form `UTC-N` or `UTC+N`, where `N` is an integer.

The localtime value of when the post was published may be retrieved by combining these values.

## License

LGPL 3.0+

## Author

Alex Jordan <alex@strugee.net>

 [1]: http://gulpjs.com/
 [2]: https://github.com/strugee/generator-stratic
 [3]: https://en.wikipedia.org/wiki/Unix_time
