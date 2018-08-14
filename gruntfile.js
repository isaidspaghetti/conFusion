'use strict';

module.exports = function(grunt) { /* this definese a node module */
    require('time-grunt')(grunt); /* shows time it takes for tasks */
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    }); /* ensures any other node modules will be loaded as implied */

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
        },
        /* the following are for grunt- install grunt-contrib-clean and grunt-contrib-copy */
        copy: { 
            html:{
                files: [{
                    expand: true,
                    dot: true,
                    cwd:'./',
                    src:['*.html'],
                    dest: 'dist'
                }]            
            },
            fonts: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'node_modules/font-awesome',
                    src: ['fonts/*.*'],
                    dest: 'dist'
                }]
            }
        },
        clean: {
            build: {
                src: ['dist/']
            }
        },
        /* use npm install --save-dev grunt-contrib-imagemin */
        imagemin:{
            dynamic:{
                files: [{
                    expand: true,
                    dot: true,
                    cwd:'./',
                    src:['img/*.{png,jpg,gif}'],
                    dest: 'dist/'
                }]
            }
        },

        /* for the following: npm install --save-dave grunt-contrib-concat grunt-contrib-cssmin grunt-contrib-htmlmin grunt-contrib-uglify grunt-filerev grunt-usemin */
        useminPrepare:{
            foo:{
                dest: 'dist',
                src:['contactus.html', 'aboutus.html', 'index.html']
            },
            options: {
                flow: {
                    steps: {
                        css: ['cssmin'],
                        js:['uglify']
                    },
                    post:{
                        css: [{
                            name: 'cssmin',
                            createConfig: function (context,block){
                                var generated = context.options.generated;
                                generated.options = {
                                    keepSpecialComments: 0,rebase: false
                                };
                            }
                        }]
                    }
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {},
            uglify:{
                dist: {}
            },
            cssmin:{
                dist:{}
            },
            filerev: {
                /* This adds a revision tag to the end of js and css files */
                options:{
                    encoding: 'utf8',
                    algorithm: 'md5',
                    length: 20
                },
                release: {
                    files: [{
                        src: [
                            'dist/js/*.js',
                            'dist/css/*.css'
                        ]
                    }]
                }
            }
        },
        usemin:{
            html: ['dist/contactus.html', 'dist/about.html','dist/index.html'],
            options: {
                assetsDirs: ['dist', 'dist/css', 'dist/js']
            }
        },
        htmlmin: {
            dist:{
                options: {
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html':'dist/index.html',
                    'dist/contactus.html':'dist/contactus.html',
                    'dist/aboutus.html':'dist/aboutus/html'
                }
            }
        }
    });
/* to execute the tasks above */
    grunt.registerTask('css'/* name of task - use this in coli*/,['npm insass']/* what the task involves */)
    grunt.registerTask('default', ['browserSync','watch']);
    grunt.registerTask('build',[
        'clean',
        'copy',
        'imagemin',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ]);
};