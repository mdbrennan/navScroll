;(function ( $, window, document, undefined ) {

    // Create the defaults once
    var pluginName = "navScroll",
        defaults = {
            speed:'1500',
            header: 0 ,
            selectorNav:'data-scroll-nav'  
        };

    // The actual plugin constructor
    function Plugin( element, options ) {

        //console.log(arguments);
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this._base = install(this);
        
        this._base.init();
    }

    install = function(obj){

        var _this;

        return{

            self : obj,

            init: function() {
                    
                _this = this;

                var self = _this.self,
                    options = self.options,
                    element = self.element;

                $('['+options.selectorNav+']').each(function(){
                    //process the sections
                    var sectionEl = $('[data-scroll-section='+$(this).data('scroll-nav')+']');
                    var section = {                         
                        name: $(element).data('scroll-nav'),
                        element: element,
                        section: sectionEl,
                        top:sectionEl.offset().top,
                        height:sectionEl.height()               
                    }       
                    _this.anchorPoints.push(section);   
                })
                                                                         
                $('['+options.selectorNav+']').on('click',_this.clickScroll);
                
                $(window).on('scroll',_this.watchScroll);
                
            },

            anchorPoints : [],

            clickScroll : function(e){

                var self = _this.self,
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
                
                var self = _this.self,
                    options = self.options;  

                var pos = $(window).scrollTop();
                var anchorPoints = _this.anchorPoints;                                   
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
                var anchorPoints = _this.anchorPoints;   
                for(var i = 0; i < anchorPoints.length; i++){
                    anchorPoints[i].top = anchorPoints[i]['section'].offset().top;
                    anchorPoints[i].height = anchorPoints[i]['section'].height();
                }

            }
        }
        
    };
    
    $.fn[ pluginName ] = function ( options ) {
                this.each(function() {                        
                        if ( !$.data( this, "plugin_" + pluginName ) ) {
                                $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
                        }
                });

                // chain jQuery functions
                return this;
        };

})( jQuery, window, document );