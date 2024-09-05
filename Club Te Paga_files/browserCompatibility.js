$(document).ready(function(){

	var currLanguage = _spPageContextInfo.currentLanguage;
	//alert(currLanguage);
	var browserCompat_URL = "/SiteAssets/html/es/es.html";
	if(currLanguage == "1033"){
		browserCompat_URL = "/SiteAssets/html/en/en.html";
	}
	/*
	if(currLanguage == "1033"){
		//alert("...variating");
		$("#outdated").empty();
		var browserCompat_HTML = '<h6>Your browser is out-of-date!</h6>' +
    			'<p>Update your browser to view this website correctly. ' +
    			'<a id="btnUpdateBrowser" href="/en/Pages/browser-update.aspx">Update my browser now </a>' +
    			'</p>' +
    			'<p class="last">' +
    			'<a href="#" id="btnCloseUpdateBrowser" title="Close">&times;</a>' +
    			'</p>';
    	
    	$("#outdated").append(browserCompat_HTML);
	}
	*/
	
	addLoadEvent(function(){
	    outdatedBrowser({
	        bgColor: '#80bd00',
	        color: '#ffffff',
	        lowerThan: 'transform',
	        languagePath: browserCompat_URL
	    });
	});
	//alert($("#outdated").html());
});


function addLoadEvent(func) {
		window.onload = func;

    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            if (oldonload) {
                oldonload();
            }
            func();
        }
    }
    
}
