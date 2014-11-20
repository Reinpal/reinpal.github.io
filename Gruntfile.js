/* globals module, require */

module.exports = function(grunt) {

  "use strict";

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    copy: {
      jquery: {
        files: [{
          expand: true,
          cwd: "bower_components/jquery/dist/",
          src: "jquery.*",
          dest: "vendor/js/"
        }]
      }
    },

    uglify: {
      global: {
        options: {
          preserveComments: false
        },
        files: {
          "js/site.min.js": ["js/site.js"]
        }
      }
    },

    sass: {
      global: {
        options: {
          style: "compressed",
          compass: true,
          require: ["susy", "breakpoint"]
        },
        files: {
          "css/global-unprefixed.css": "scss/global.scss"
        }
      }
    },

    autoprefixer: {
      global: {
        src: "css/global-unprefixed.css",
        dest: "css/global.css"
      }
    },

    shell: {
      jekyllServe: {
        command: "jekyll serve --baseurl="
      },
      jekyllBuild: {
        command: "jekyll build --config _config.yml"
      }
    },

    responsive_images: {
      dev: {
        options: {
          sizes: [{
            width: 320
          },{
            name: "large",
            width: 640
          },{
            name: "large",
            width: 1024,
            suffix: "_x2",
            quality: 60
          }]
        },
        files: [{
          expand: true,
          src: ['img/*.{jpg,gif,png}'],
          cwd: 'assets/src/',
          dest: 'assets/dist/'
        }]        
      }
    },

    watch: {
      options: {
        livereload: true
      },
      site: {
        files: ["index.html", "projects/index.html", "about.html", "_layouts/*.html", "_posts/*.md", "_projects/*.md", "_includes/*.html"],
        tasks: ["shell:jekyllBuild"]
      },
      js: {
        files: ["js/*.js"],
        tasks: ["uglify", "shell:jekyllBuild"]
      },
      css: {
        files: ["scss/*.scss"],
        tasks: ["sass", "autoprefixer", "shell:jekyllBuild"]
      },
      svgIcons: {
        files: ["svg/*.svg"],
        tasks: ["svgstore", "shell:jekyllBuild"]
      }
    },

    svgstore: {
      options: {
        prefix : "icon-",
        cleanup: false,
        svg: {
          style: "display: none;"
        }
      },
      default: {
        files: {
          "_includes/svg-defs.svg": ["svg/*.svg"]
        }
      }
    }

  });

  require("load-grunt-tasks")(grunt);

  grunt.registerTask("serve", ["copy", "shell:jekyllServe"]);
  grunt.registerTask("default", ["sass", "autoprefixer", "svgstore", "shell:jekyllBuild", "responsive_images", "watch"]);

};