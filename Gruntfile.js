module.exports = function(grunt) {

	grunt.initConfig({

		// Import package manifest
		pkg: grunt.file.readJSON("navScroll.json"),

		// Banner definitions
		meta: {
			banner: "/*\n" +
				" *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
				" *  <%= pkg.description %>\n" +
				" *  <%= pkg.homepage %>\n" +
				" *\n" +
				" *  Made by <%= pkg.author.name %>\n" +
				" *  Under <%= pkg.licenses[0].type %> License\n" +
				" */\n"
		},

		// Concat definitions
		concat: {
			dist: {
				src: ["src/js/plugins/jquery.nav.scroll.js"],
				dest: "dist/js/jquery.nav.scroll.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},
		
		compass: {                  // Task
		    dist: {                   // Target
		      options: {              // Target options
		        sassDir: 'src/css',
		        cssDir: 'dist/css',
		        environment: 'production',
		        outputStyle:'expanded',
		        imagesDir:'src/images/',
		      }
		    }		    
		  },

		// Minify definitions
		uglify: {
			my_target: {
				src: ["dist/js/jquery.nav.scroll.js"],
				dest: "dist/js/jquery.nav.scroll.min.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},		
		
		// watch for changes to source 
		// Better than calling grunt a million times 
		// (call 'grunt watch')
		watch: {
		    files: ['src/**/*'],
		    tasks: ['default']
		}

	});

	grunt.loadNpmTasks("grunt-contrib-concat");	
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks('grunt-contrib-compass');  	
	grunt.loadNpmTasks("grunt-contrib-watch");

	grunt.registerTask("default", ["concat", "uglify", "compass"]);	

};
