Ping Access Labs Challenge
==========================

PAL Challenge is a 4 player game for the Labs booth at Red Hat Summit.

![screenshot](https://raw.githubusercontent.com/redhataccess/pinglabs/master/src/assets/icons/readme-screenshot.png)

FEATURES
--------

 - web-based (JavaScript, WebGL, Web Gamepad API, etc)
 - gamepad input
 - three powerups
   - HACK: reverse opponents controls for 1 second
   - KICK: double puck velocity on your next bounce
   - FLIP: make puck go the other way
 - basic AI
 - live leaderboard

INSTALL
-------

    yum install npm
    npm install -g bower grunt-cli
    git clone git@github.com:redhataccess/pinglabs.git
    cd pinglabs
    npm install && bower install
    grunt build:dev
    grunt connect

Navigate to [localhost:9001](http://localhost:9001/).

To view the leaderboard, navigat to [localhost:9001/leaderboard](http://localhost:9001/leaderboard).

HACKING
-------

This game uses the following packages:

 - [PhaserJS][phaser] as overall game framework (WebGL, gamepads, physics, etc)
 - [Babel][babel] for transpiling es6 into es5 (AMD modules)
 - [RequireJS][requirejs] for runtime AMD module loading
 - [Bower][bower] for client-side JS package management
 - [npm][npm] for 'build-side' package management
 - [grunt][grunt] for build tasks
 - [grunt-bower-requirejs][gbrjs] for adding bower packages to RequireJS config

Most of the above setup was created for [DiMo][dimo] and re-used here.

To perform a dev build:

    grunt build:dev

[dimo]: https://github.com/geekspark-rh/dimo-2015-renderer
[babel]: http://babeljs.io/
[requirejs]: http://requirejs.org/
[bower]: http://bower.io/
[npm]: https://www.npmjs.com/
[grunt]: http://gruntjs.com/
[gbrjs]: https://www.npmjs.com/package/grunt-bower-requirejs
[phaser]: http://phaser.io/
