$(document).ready(function(){

    var $debug = $('#debug');

    Slider = {
        $slider: null,
        $items: null,
        itemsCount: 0,
        $current: null,
        currentId: 1,
        threshold: 10,
        touch: {
            startPoint: 0,
            currPoint: 0,
            endPoint: 0
        },
        setCurrent: function(){
            this.$items.removeClass('current');
            this.$current = this.$items.filter(':nth-child(' + this.currentId + ')');
            this.$current.addClass('current');
        },
        moveCurrent: function(amount) {
            // this.$current.css('left', amount);
            this.$current.css('transform', 'translateX(' + amount + 'px)');
        },
        slideCurrent: function(value) {
            if(Math.abs(value) > this.threshold){
                if(value < 0) { this.currentId--; }
                if(value > 0) { this.currentId++; }
                if(this.currentId < 1) { this.currentId = this.itemsCount; }
                if(this.currentId > this.itemsCount) { this.currentId = 1; }
                this.setCurrent();
            }
        },
        init: function(selector){

            this.$slider = $(selector);
            this.$items = this.$slider.children(selector + '-item');
            this.itemsCount = this.$items.length;

            this.setCurrent();

            this.$slider.on('touchstart',function(ev){
                Slider.touch.startPoint = Number(ev.changedTouches[0].clientX);
                $debug.append('start: ' + Slider.touch.startPoint);
                ev.preventDefault();
            });
        
            this.$slider.on('touchmove',function(ev){
                Slider.touch.currPoint = Number(ev.changedTouches[0].clientX);
                $debug.append(',' + Slider.touch.currPoint);
                Slider.moveCurrent(Slider.touch.currPoint - Slider.touch.startPoint);
                ev.preventDefault();
            });
        
            this.$slider.on('touchend',function(ev){
                Slider.touch.endPoint = Number(ev.changedTouches[0].clientX);
                $debug.append(' end: ' + Slider.touch.endPoint + ';<br>');
                Slider.slideCurrent(Slider.touch.endPoint - Slider.touch.startPoint);
                Slider.moveCurrent(0);
                ev.preventDefault();
            });

        }
    }

    Slider.init('.slider');

    console.log('OK');

});