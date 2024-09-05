var $window;
var animation_elements = [];

var $animations = {
    top_position: 0,    
    heightNum :0,
    bottom_position:0,
    animation : "",
    animation_id : ""
};

$(document).ready(function(){
	var $animations = $('.animate');
	$window = jQuery('#s4-workspace');	
	$window.on('scroll resize', check_if_in_view);
	var count = 1;
	
	$.each($animations, function() {
		var element = $(this);
		element.top_position = element.offset().top;
		element.heightNum = element.outerHeight();
		element.bottom_position = element.top_position + element.heightNum;		
		element.animation = element.data("animation");
		element.animation_id = "animation" + count;
		element.attr('data-id', element.animation_id);
		animation_elements.push(element);
		//alert(element.animation+ " : " + element.top_position + " : " + element.heightNum + " : " + element.bottom_position + " : " + element.animation_id);
		count++;
	});
	
});

function check_if_in_view() {
  var window_height = $window.height();
  var window_top_position = $window.scrollTop();
  var window_bottom_position = (window_top_position + window_height);
	//alert(animation_elements.length);
	
	animation_elements.forEach(function(element) {
    
    //alert(element.animation+ " : " + element.top_position + " : " + element.heightNum + " : " + element.bottom_position);
    var animationElement = $('[data-id="' + element.animation_id + '"]'); //setter
    //var animationElement = $("#" + element.animation_id + "");
    if ((element.bottom_position >= window_top_position) &&
        (element.bottom_position <= window_bottom_position)) {        

      	animationElement.addClass('in-view');
      	
	  	animationElement.addClass(element.animation);
    } else {
     	animationElement.removeClass('in-view');
    }


	});
	/*
  $.each(animation_elements, function() {
    //var element = $(this);
    //var element_height = $element.outerHeight();    
    //var element_top_position = $element.offset().top;
    //var element_bottom_position = (element_top_position + element_height);
    
    
	alert(element['animation']+ " : " + element.top_position + " : " + element.heightNum + " : " + element.bottom_position);

    //check to see if this current container is within viewport
    if (($element.bottom_position >= window_top_position) &&
        ($element.bottom_position <= window_bottom_position)) {
        //alert($element.offset() + " : " + $element.top);
        //alert($element.data("animation") + " : " + element_top_position + " >= " +  element_height);
        //alert($element.data("animation") + " : " + element_bottom_position + " >= " +  window_top_position + " // " + element_top_position + " <= " + window_bottom_position);
        //alert(element_bottom_position + " : "+ window_top_position);
        //alert("why");
      $element.addClass('in-view');
	  $element.addClass($element.data("animation"));
    } else {
      $element.removeClass('in-view');
    }
    */
  //});
}