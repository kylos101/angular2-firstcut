# angular-2
A learning opportunity, initially put together with [this yeoman Angular2 generator](https://github.com/swirlycheetah/generator-angular2).

# To use this
* download the ZIP
* get Node installed on your machine
* globally install some packages
  * npm install -g gulp gulp-cli
* [Use this to bring your node/npm install up to 3.8.2](https://github.com/felixrieseberg/npm-windows-upgrade)
* **npm update** (downloads node packages, not included in this git repo)
* **npm start** (looks in package.json and runs whatever is in the start property)

# Modifications from the generator
* added a TypeScript build step
* added a "watch" feature to the gulp build
* added a sample component, claimant

# Update Notepad++
* [Download this language file, import it as a user defined language in Notepad++, restart the editor, and open a .ts file](http://notepad-plus.sourceforge.net/commun/userDefinedLang/TypeScript-UserDefinedLanguage.xml)
* Add some helpful plugins
  * Explorer (after installed, activate once via the Plugins menu)
  * JSTools
  * JSONViewer
  * TortoiseSVN
  * JSLint
  * Task List