'use strict';

module.exports = function(grunt) { /* this definese a node module */
    require('time-grunt')(grunt); /* shows time it takes for tasks */
    require('jit-grunt')(grunt); /* ensures any other node modules will be loaded as implied */
    grunt.initConfig({/* this task converts scss to css */
        sass:{  /*<-- task to configure */
            dist: {
                files: {
                    /* file to convert */'css/styles.css' :/* dependent on: */'css/styles.scss'
                }
            }
        },
        watch:{/* filesl you are watching */
            files: 'css/*.scss', 
            tasks: ['sass']
        },
        browserSync:{
            dev:{
                bsFiles: {
                    src: [ 
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: './'
                    }
                }
            }
        }
    });
/* to execute the tasks above */
    grunt.registerTask('css'/* name of task - use this in coli*/,['npm insass']/* what the task involves */)
    grunt.registerTask('default', ['browserSync','watch']);
};