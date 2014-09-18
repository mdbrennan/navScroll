
(function($, window, document, undefined) {

	$.widget('mbrennan.navScroll', {
		
		selector:'[data-section-nav]',
		// Default options
		options: {
			speed:'fast'
		},

		_create: function() {
			var self = this;
			self.install();
		},

		install: function() {
			var self = this,
				options = self.options,
				element = self.element;

			//process the sections
			var sectionEl = $('#'+$(element).data('section-nav'))				
			var section = {
				el: sectionEl,
				top:sectionEl.position().top,
				height:sectionEl.height()
			}
			
			self.anchorPoints.push(section);								

			self._on(self.selector,{
				'click':self.clickScroll
			});
			
			self._on(window,{
				'scroll':self.watchScroll				
			});
							
			
		},

		anchorPoints : [],

		clickScroll : function(e){
			//console.log('clicked');


		},
		//reset the title attribute
		watchScroll : function(e){
			var self = this;
			var pos = $(window).scrollTop()
			var anchorPoints = self.anchorPoints;
			for(var i = 0; i < anchorPoints.length; i++){
				if (pos >= anchorPoints[i].top && pos < anchorPoints[i].top + anchorPoints[i].height){
					//anchorPoints[i].el
				}
			}

			
		}
	});

})(jQuery, window, document);