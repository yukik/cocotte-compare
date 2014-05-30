module.exports = function (grunt) {

  var complieFile = 'cocotte-compare.js';

  // config 
  grunt.initConfig({
    m2r: {
      complie: {
        src: complieFile,
        dest: 'requirejs'
      }
    },

    // auto m2r
    watch: {
      m2r: {
        files: complieFile,
        tasks: ['m2r']
      }
    }
  });

  // plugin
  grunt.loadNpmTasks('grunt-m2r');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // task
  grunt.registerTask('default', ['m2r', 'watch']);

};