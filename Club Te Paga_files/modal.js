var element;

$(document).ready(function() {
	
	$("[data-target='#MCSModal']").on("click", function() {
		element = $(this);
		//alert(element.attr("data-link"));
	});
	
	var modalURL = "/Pages/modal_es.aspx #MCSModal";
	
	var currLanguage = _spPageContextInfo.currentLanguage;
	if (currLanguage == "1033") {
		modalURL = "/Pages/modal_en.aspx #MCSModal";
	}

	$("#MCSModalParent").load(modalURL, function(responseTxt, statusTxt, jqXHR) {
		if (statusTxt == "success") {
			$('#btnYes').on("click", function() {	
				var link = $(element).attr("data-link");
				console.log(link);
				window.location.href = link; // Redirige a la URL especificada
			});
		}
		if (statusTxt == "error") {
			alert("Error: " + jqXHR.status + " " + jqXHR.statusText);
		}
	});
});
