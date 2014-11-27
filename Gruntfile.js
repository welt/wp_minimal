module.exports = function(grunt) {

require('time-grunt')(grunt);

  grunt.initConfig({
  	pkg: grunt.file.readJSON('package.json'),

 	// TODO:
  	// 1. never overwrite scaffolded files ! how? `if not exists file`?
  	// 2. change name of current theme dir based on package config theme name? or make a production version for export
  	//

  	// GET REQUIRED BOWER PACKAGES - config from bower.json
  	// all good except production Modernizr should be a custom build per project...
  	//
	bower: {
		install: {
			options: {
				copy: false
			}
		}
	},

  	// REQUIRED BANNER FOR STYLE.CSS - config from package.json
  	//
    tag: {
      wp_theme_file_banner: '/*! \n' +
        'Theme Name: <%= pkg.wp_theme_name %> \n' +
        'Theme URI: <%= pkg.wp_theme_uri %> \n' +
        'Description: <%= pkg.wp_theme_description %> \n' +
        'Author: <%= pkg.wp_theme_author_name %> \n' +
        'Author URI: <%= pkg.wp_theme_author_uri %> \n' +
        'Version: <%= pkg.wp_theme_version %> \n' +
        '*/'
    },

	// COPY FILES
	//
	copy : {
		// SCAFFOLD OUT INITIAL FUNCTIONS.PHP & THEME CUSTOM JS FILE
		//
		scaff : {
			files : [
				{
					src: 'custom_functions.php.ejs',
					dest: 'functions.php'
				},
				{
					src: 'custom_js.js.ejs',
					dest: 'javascripts/<%= pkg.wp_theme_text_domain %>_custom.js'
				}
			],
			options: {
				process: function(content, srcpath) {
					return grunt.template.process(content);
				}
			}
		},
		// COPY BOWER COMPONENTS TO PROJECT DIRS
		//
		main : {
		  files : [
			  {
				cwd: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/',
				src: '**',
				dest: 'fonts',
				expand: true
			  },
			  {
				cwd: 'bower_components/wp-bootstrap-navwalker/',
				src: '*.php',
				dest: 'includes',
				expand: true
			  },
			  {
				cwd: 'bower_components/modernizr/',
				src: 'modernizr.js',
				dest: 'javascripts/libs',
				expand: true
			  },
			  {
				cwd: 'bower_components/bootstrap-sass-official/assets/javascripts/',
				src: '*/*',
				dest: 'javascripts/libs',
				expand: true
			  },
			  {
				cwd: 'bower_components/bootstrap-sass-official/assets/javascripts/',
				src: '*/bootstrap.js',
				dest: 'javascripts/libs',
				expand: true
			  },
			  {
				cwd: 'bower_components/bootstrap-sass-official/assets/stylesheets/',
				src: ['*/*', '*/*/*'],
				dest: 'scss',
				expand: true
			  },
			  {
				cwd: 'bower_components/bootstrap-sass-official/assets/stylesheets/',
				src: '_bootstrap.scss',
				dest: 'scss',
				expand: true
			  }
			]
		}
	},

    // WATCHES FOR CHANGES AND RUNS TASKS: default port 35729
    //
    watch : {
      sass : {
        files : ['scss/**/*.scss'],
        tasks : ['sass:dev', 'autoprefixer'],
        options : {
          livereload : 35729
        }
      },
      js : {
        files : ['js/*.js'],
        options : {
          livereload : 35729
        }
      },
      php : {
        files : ['**/*.php'],
        options : {
          livereload : 35729
        }
      }
    },

    // DEV AND PRODUCTION BUILD FOR SASS
    //
    sass : {
      production : {
        files : [
          {
            src : ['**/*.scss', '!**/_*.scss', '!**/style.scss', '!**/editor-style.scss'],
            cwd : 'scss',
            dest : 'css',
            ext : '.css',
            expand : true
          },
          {
            src : ['**/style.scss', '**/editor-style.scss'],
            cwd : 'scss',
            dest : '',
            ext : '.css',
            expand : true
          }
        ],
        options : {
          style : 'compressed',
          banner: '<%= tag.wp_theme_file_banner %>',
          compass: true,
          sourcemap: 'none'
        }
      },
      dev : {
        files : [
          {
            src : ['**/*.scss', '!**/_*.scss', '!**/style.scss', '!**/editor-style.scss'],
            cwd : 'scss',
            dest : 'css',
            ext : '.css',
            expand : true
          },
          {
            src : ['**/style.scss', '**/editor-style.scss'],
            cwd : 'scss',
            dest : '',
            ext : '.css',
            expand : true
          }
        ],
        options : {
          style : 'expanded',
          banner: '<%= tag.wp_theme_file_banner %>',
          compass: true,
          sourcemap: 'none'
        }
      }
    },

    // AUTO PREFIXER SETTINGS FOR BROWSER PREFIXES
    //
    autoprefixer: {
      options: {
        browsers: ['last 2 versions'],
        map: false
      },
      dist: {
        files: [{
          expand: true,
          cwd: '',
          src: '**/*.css',
          dest: ''
        }]
      }
    },

    // IMAGE MIN
    //
    imagemin : {
      production : {
        files : [
          {
            expand: true,
            cwd: 'images',
            src: '**/*.{png,jpg,jpeg}',
            dest: 'images'
          }
        ]
      }
    },

    // SVG MIN
    //
    svgmin: {
      production : {
        files: [
          {
            expand: true,
            cwd: 'images',
            src: '**/*.svg',
            dest: 'images'
          }
        ]
      }
    },

  });

  // Default task
  grunt.registerTask('default', ['watch']);

  // Scaffold functions.php & <theme_name>_custom.js
  grunt.registerTask('scaffold', ['copy:scaff']);

  // copy files if needed
  grunt.registerTask('copy_files', ['copy:main']);

  // Template Setup Task
  grunt.registerTask('setup', ['bower:install', 'scaffold', 'copy_files', 'sass:dev'])

  // Build task
  grunt.registerTask('build', ['sass:production', 'imagemin:production', 'svgmin:production', 'autoprefixer']);

  // Load up tasks
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-svgmin');

};
