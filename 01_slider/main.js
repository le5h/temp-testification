$(document).ready(function(){

    Slider = {
        $slider: null, width: 0,
        $items: null, itemsCount: 0, /* TODO: <3 items */
        currentId: 0, previousId: 0, nextId: 0,
        $current: null, $previous: null, $next: null,
        threshold: 100, /* px, to pass slide effect */
        touch: { startPoint: 0, currPoint: 0, endPoint: 0 },
        setCurrent: function(){
            this.$items.removeClass('current previous next');
            this.$current = this.$items.filter(':nth-child(' + this.currentId + ')');
            this.$current.addClass('current');
            this.$previous = this.$items.filter(':nth-child(' + this.previousId + ')');
            this.$previous.addClass('previous');
            this.$next = this.$items.filter(':nth-child(' + this.nextId + ')');
            this.$next.addClass('next');
        },
        moveCurrent: function(amount) {
            this.$current.css('transform', 'translateX(' + amount + 'px)');
            this.$previous.css('transform', 'translateX(' + (amount - this.width) + 'px)');
            this.$next.css('transform', 'translateX(' + (amount + this.width) + 'px)');
        },
        freeCurrent: function(){
            this.$current.css('transform', '');
        },
        slideThreshold: function(value) {
            if(Math.abs(value) > this.threshold){
                this.slide(value);
            }
        },
        slide: function(value){
            // change current
            if(value > 0) { this.currentId--; }
            if(value < 0) { this.currentId++; }
            if(this.currentId < 1) { this.currentId = this.itemsCount; }
            if(this.currentId > this.itemsCount) { this.currentId = 1; }
            // calc prev next
            this.previousId = this.currentId - 1;
            if(this.previousId < 1) { this.previousId = this.itemsCount; }
            if(this.previousId > this.itemsCount) { this.previousId = 1; }
            this.nextId = this.currentId + 1;
            if(this.nextId < 1) { this.nextId = this.itemsCount; }
            if(this.nextId > this.itemsCount) { this.nextId = 1; }
            this.setCurrent();
        },
        init: function(selector){

            this.$slider = $(selector);
            this.width = this.$slider.width();
            this.$items = this.$slider.children(selector + '-item');
            this.itemsCount = this.$items.length;
            this.currentId = 1;
            this.slide(0);

            this.$slider.on('touchstart',function(ev){
                Slider.touch.startPoint = Number(ev.changedTouches[0].clientX);
                Slider.$slider.addClass('moving');
                ev.preventDefault();
            });
        
            this.$slider.on('touchmove',function(ev){
                Slider.touch.currPoint = Number(ev.changedTouches[0].clientX);
                Slider.moveCurrent(Slider.touch.currPoint - Slider.touch.startPoint);
                ev.preventDefault();
            });
        
            this.$slider.on('touchend',function(ev){
                Slider.touch.endPoint = Number(ev.changedTouches[0].clientX);
                Slider.$slider.removeClass('moving');
                Slider.freeCurrent();
                Slider.slideThreshold(Slider.touch.endPoint - Slider.touch.startPoint);
                Slider.moveCurrent(0);
                ev.preventDefault();
            });

            // TODO: onresize

        }
    }

    Slider.init('.slider');

});