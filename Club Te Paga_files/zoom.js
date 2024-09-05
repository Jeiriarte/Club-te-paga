var currFFZoom = 1;
var currIEZoom = 100;
$(function () {
    $(".font-button.plus").bind("click", function () {
        if (navigator.userAgent.search("Firefox") != -1) {
            if (currFFZoom < 1.4) {
                var step = 0.2;
                currFFZoom += step;
                $('body').css('MozTransform', 'scale(' + currFFZoom + ')');
                $('body').css('transform-origin', 'center top 0px');
                $('body').css('overflow', 'auto');
                $(".font-button.minus").css("background-color", "#03a167");
            }
            if (currFFZoom == 1.4) 
            {
                $(".font-button.plus").css("background-color", "#ababab");
            }
        } else {
            if (currIEZoom < 140) {
                var step = 20;
                currIEZoom += step;
                $('body').css('zoom', ' ' + currIEZoom + '%');
                $('body').css('overflow', 'auto');
                $(".font-button.minus").css("background-color", "#03a167");
            }
            if (currIEZoom == 140)
            {
                $(".font-button.plus").css("background-color", "#ababab");
            }
        }
    });

    $(".font-button.minus").bind("click", function () {
        
        if (navigator.userAgent.search("Firefox") != -1) {
            if (currFFZoom > 0.61) {
                var step = 0.2;
                currFFZoom -= step;
                $('body').css('MozTransform', 'scale(' + currFFZoom + ')');
                $('body').css('transform-origin', 'center top 0px');
                $('body').css('overflow', 'auto');
                $(".font-button.plus").css("background-color", "#03a167");
            }
            if (currFFZoom < 0.61)
            {
                $(".font-button.minus").css("background-color", "#ababab");
            }
        } else {
            if (currIEZoom > 60) {
                var step = 20;
                currIEZoom -= step;
                $('body').css('zoom', ' ' + currIEZoom + '%');
                $('body').css('overflow', 'auto');
                $(".font-button.plus").css("background-color", "#03a167");
            }
            if (currIEZoom == 60) {
                $(".font-button.minus").css("background-color", "#ababab");
            }
         }       
    });
});


