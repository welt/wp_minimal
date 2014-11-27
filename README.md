# WordPress minimal starter project

## Description: 

Not a theme, just automates a couple of the tasks for the start of a WordPress project. Includes Twitter Bootstrap official SASS for convenience.

All configs are in set package.json.

The Grunt setup task gets the Bower components set in bower.json & scaffolds a basic functions.php & a custom js file.

The default Grunt task watches, compiles SASS & handles livereload.

JavaScripts are left alone:
1. WordPress script loader handles dependancies
2. it's less easy to accidentally include more than one copy of external libs
3. use WordPress's own copy of jQuery
4. you can use a plugin to concatenate scripts in production e.g. MinQueue

### Depends: SASS Gem, Bower, Grunt CLI

1. edit package.json with details of the project - required for WordPress style.css & scaffolding tasks
2. `$> npm install`
3. `$> grunt setup`
4. `$> grunt`

### Feedback

Suggestions/improvements
[welcome](https://github.com/welt/wp_minimal/issues)!

### Thanks

[wp-bootstrap-navwalker](https://github.com/twittem/wp-bootstrap-navwalker)
