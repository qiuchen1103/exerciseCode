module.exports = function(grunt) {
    grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),  

    
    watch: {
        livereload: {
            options: {
              livereload: '<%= connect.options.livereload %>'
            },
            files: [  
              'index.html',         
              'css/index.css',
              'css/jquery.fullPage.css',
              'js/section1.js',
              'js/section2.js'                    
            ]
        }
    },
    connect: {
      options: {
          port: 9000,
          open: true,
          livereload: 35729,
          // Change this to '0.0.0.0' to access the server from outside
          hostname: 'localhost'
      },
      server: {
        options: {
          port: 9001,
          base: './'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  
  grunt.registerTask('watchit',['connect','watch']);
  grunt.registerTask('default');


};