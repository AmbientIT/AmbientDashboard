# Ambient Dashboard

This application use Koa2 and React.

## What's inside

* koa2 (and a bunch of usefull middleware)
* mongoose
* graffiti (mongoose + graphql)
* auto-loading of api router and models
* oAuth auth with google api
* nodemon for auto-restart the server on change
* yenv to manage configuration via environment variables
* react
* react-router
* redux
* appoloStack (graphql higher order components)
* material-ui
* radium (inline styling under steroïds)
* `babel` with `es2015-node6` + `stage-1` presets, `transform-runtime` plugin and sourcemaps
* eslint with airbnb configuration
* `mocha-sinon-chai` testing, as well as `supertest` for API testing (soon)
* hot-module-reload for components and reducers (fix soon)

## `npm run` scripts

There are a few defined run scripts, here's a list of them with a description of what they do. To run them, simply execute `npm run <script name>` - e.g. `npm run dev`

* `start`: Used by the production environment to start the app. This will run a compiled version, so you need to execute `build` first.
* `build`: Runs the `babel` CLI to compile the app. Files are emitted to `dist/`.
* `dev`: Runs the app in development mode - uses `babel-node` to compile on-the-fly. Also uses `nodemon` to automatically restart when stuff changes.
* `debug`: Runs the app in development mode with `icebug` (a combo of `nodemon` + `node-inspector`). (quite buggy actually)
* `test`: Runs `mocha` tests.
* `test-watch`: Runs `mocha` tests in watch-mode.
* `lint`: Lints the code in `src` and `test` with `eslint`.
* `lint-watch`: Same as above, in watch-mode.

**Tip**: to pass additional arguments to the actual CLI's being called, do it like in this example:

```bash
npm run test -- --debug
```

*Note the __`--`__ before the actual arguments.*

# Authors

* Charles Jacquin

# License

MIT.

[standard]: http://standardjs.com/
[respond]: https://github.com/jeffijoe/koa-respond
[yenv]: https://github.com/jeffijoe/yenv
[awilix]: https://github.com/jeffijoe/awilix
[icebug]: https://github.com/jeffijoe/icebug
