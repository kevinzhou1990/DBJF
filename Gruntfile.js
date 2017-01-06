module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> updated in <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        options: {
          mangle: false, //不混淆变量名
          // preserveComments: 'all', //不删除注释，还可以为 false（删除全部注释），some（保留@preserve @license @cc_on等注释）
          // footer:'\n/*! <%= pkg.name %> 最后更新时间： <%= grunt.template.today("yyyy-mm-dd") %> */'//添加footer
        },
        files: [{
          expand: true,
          cwd: 'js', //只压缩业务逻辑相关的js
          src: ['apps/*.js'],
          dest: 'dist/js/'
        }]
      }
    },
    imagemin: { //压缩图片大小
      dist: {
        options: {
          optimizationLevel: 3 //定义 PNG 图片优化水平
        },
        files: [{
          expand: true,
          cwd: 'img',
          src: ['**/*.{png,jpg,jpeg}'], // 优化 img 目录下所有 png/jpg/jpeg 图片
          dest: 'build/img' // 优化后的图片保存位置
        }]
      }
    },
    cssmin: { //css压缩
      target: {
        files: [{
          expand: true,
          cwd: 'css/',
          src: ['my-app.css', 'common.css'],
          dest: 'build/css',
          ext: '.css'
        }]
      }
    },
    /*jshint: {
      all: [
        'js/controller/!**!/!*.js',
        'js/main/!**!/!*.js'
      ],
      options: {
        globals: {
          $: false,
          jQuery: false
        },
        browser: true,
        devel: true
      }
    },*/
    less: {
      development: {
        files: [{
          expand: true,
          cwd: 'less',
          src: ['**/*.less'],
          dest: 'css/component/',
          ext: '.css'
        }]
      }
    },
    concat: { //合并文件
      options: {
        banner: '/**V1.0 DBJF only css file **/'
      },
      dist: {
        src: 'css/component/**.css',
        dest: 'css/my-app.css'
      }
    },
    watch: { //检测文件是否有改动
      scripts: {
        files: [
          'less/**.less'
        ],
        tasks: [ 'less', 'cssmin', 'concat'],
        options: {
          interrupt: true,
        },
      },
    }
  });

  // 加载包含 "uglify" 任务的插件。
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // 默认被执行的任务列表。
  grunt.registerTask('default', ['uglify','less','cssmin','concat','watch']);
};