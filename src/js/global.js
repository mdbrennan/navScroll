RESUME = function(){   
    var _this;

    return{
    	init:function(){
    		console.log('started');
    		console.log($('[data-section-nav]'));
    		$('[data-section-nav]').navScroll();
    	}
    }
}();

// load on document ready
$(function() {
	RESUME.init();
});