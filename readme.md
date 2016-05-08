# angular-2
A learning opportunity, initially put together with [this yeoman Angular2 generator](https://github.com/swirlycheetah/generator-angular2).

Followed along with the [Tour of Heroes](https://angular.io/docs/ts/latest/tutorial/) tutorial.

# To use this
* download it
* install Node
* **npm install -g gulp gulp-cli** (globally install some packages)  
* [Use this to bring your node/npm install up to at least 3.8.2](https://github.com/felixrieseberg/npm-windows-upgrade)
* **npm install** (downloads node packages, not included in this git repo)
* **npm start** (looks in package.json and runs whatever is in the start property)

# Changes to gulp build from the generator's product
* added a TypeScript build step
* added a "watch" feature to the build
* added concurrently to ... build with gulp and serve with lite-server
* added a prestart step, which hydrates the /build folder
* followed the tour of heroes example (components, service, routing)

# [Use Atom](http://atom.io) helpful plugins
* atom-typescript
* angular2-snippets
* atom-beautify
* minimap
* terminal-plus
* jshint
* linter
* linter-htmlhint
