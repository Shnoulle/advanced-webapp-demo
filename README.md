Medical Demo
=================
This is a small, no-server, demonstration of a medical application.

Bootstrap
-----------------

Twitter has included a makefile with convenience methods for working with the Bootstrap library.

+ **dependencies**
The makefile depends on you having recess, uglify.js, and jshint installed. To install, just run the following command in npm:

```
$ npm install recess uglify-js jshint -g
```

+ **build** - `make`
Runs the recess compiler to rebuild the `/less` files and compiles the docs pages. Requires recess and uglify-js. <a href="http://twitter.github.com/bootstrap/less.html#compiling">Read more in our docs &raquo;</a>

+ **test** - `make test`
Runs jshint and qunit tests headlessly in phantom js (used for ci). Depends on having phatomjs installed.

+ **watch** - `make watch`
This is a convenience method for watching just Less files and automatically building them whenever you save. Requires the Watchr gem.

The build output is found in docs/assets/js and docs/assets/css which can be copied into the js and css folders