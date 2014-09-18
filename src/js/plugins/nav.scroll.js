

(function($, window, document, undefined) {

	$.widget('mbrennan.navScroll', {
		
		
		// Default options
		options: {			
			speed:'1500',
			header: 0		
		},

		_create: function() {
			var self = this;
			self.install();	

			/*
			var timer;
			self._on(window,{
				'resize':function(){
						clearTimeout(timer);
			    		timer = setTimeout(function(){
			    		self.resizePanels();
			    	},100)
				}
			})
			*/	
		},

		install: function() {
			var self = this,
				options = self.options,
				element = self.element;
						
			//process the sections
			var sectionEl = $('[data-scroll-section='+$(element).data('scroll-nav')+']');
			var section = {							
				name: $(element).data('scroll-nav'),
				element: element,
				section: sectionEl,
				top:sectionEl.offset().top,
				height:sectionEl.height()				
			}		
			self.anchorPoints.push(section);											
			console.log(section);			

			self._on(element,{
				'click':self.clickScroll
			});
			
			self._on(window,{
				'scroll':self.watchScroll				
			});

			//$(window).scroll();			
										
		},

		anchorPoints : [],

		clickScroll : function(e){
			//console.log('clicked');
			var self = this,
				options = self.options;

			e.preventDefault();
						
			var scrollAnchor = $('[data-scroll-section='+$(e.currentTarget).data('scroll-nav')+']').position().top;
						
			$('body,html').animate({
            		scrollTop: scrollAnchor
        		}, 
        		options.speed || 'default',
        		'easeOutCubic',
        		function(){
        			window.location.hash = $(e.target).attr('href'); 
        		}
    		);
    		


		},
		//reset the title attribute
		watchScroll : function(e){
			//console.log('watch');
			var self = this,
				options = self.options;					
			var pos = $(window).scrollTop();
			var anchorPoints = self.anchorPoints;									
			for(var i = 0; i < anchorPoints.length; i++){													
				if (pos >= (anchorPoints[i].top - options.header) && pos < (anchorPoints[i].top + anchorPoints[i].height) - options.header){					
					$('.scroll-active').removeClass('scroll-active');
					$(anchorPoints[i].element).addClass('scroll-active');
					$(anchorPoints[i].section).addClass('scroll-active');
																		
				}else if(pos < options.header){
					$('.scroll-active').removeClass('scroll-active');	
				}
			}
		},

		resizePanels : function(){
			console.log('resize');
			var self = this;
			var anchorPoints = self.anchorPoints;	
			for(var i = 0; i < anchorPoints.length; i++){
				anchorPoints[i].top = anchorPoints[i]['section'].offset().top;
				anchorPoints[i].height = anchorPoints[i]['section'].height();
			}

			console.log(anchorPoints);

		}
	});

	// pass selector through to the widget
	var selectorMethod = $.fn.navScroll;
	$.fn.navScroll = function(obj){	    
	    $.extend(obj, { selector: this.selector });	    
	    return selectorMethod.apply(this,arguments);
	};

})(jQuery, window, document);