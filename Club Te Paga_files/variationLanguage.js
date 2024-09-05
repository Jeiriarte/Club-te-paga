var currLang = "";

$(document).ready(function () {

	currLang = _spPageContextInfo.currentLanguage;
	console.log(currLang);
	if (currLang == "1033") {
		$("#langButton").text('Español');
		$("#langButton_mobile a").text('Español');
		$("#homeLink").attr("href", "/en");
		$("#DeltaSiteLogoD img").attr('src', '/SiteAssets/logoMCS-en.png');
		$("#DeltaSiteLogo img").attr('src', '/SiteAssets/logoMCS-en.png');
		$("#homeLink_mobile span").text('Home');
		$("#homeLink_mobile").attr("href", "/en");

		//$('.ms-helperText').val("Search");
	}
	else {
		//$('.ms-helperText').val("Buscar");
	}

	$("#langButton").on("click", function (event) {
		event.preventDefault();
		VariationHandler(event);
	});

	$("#langButton_mobile").on("click", function (event) {
		event.preventDefault();
		VariationHandler(event);
	});

	PreheckListUrls();

});

/*
alert(_spPageContextInfo.siteServerRelativeUrl);
alert(_spPageContextInfo.webAbsoluteUrl);
alert(_spPageContextInfo.siteAbsoluteUrl);
alert(_spPageContextInfo.webServerRelativeUrl);
alert(_spPageContextInfo.serverRequestPath);
*/

function VariationHandler(e) {
	var currPageURL = _spPageContextInfo.serverRequestPath;
	//alert(currPageURL);
	console.log(currPageURL);
	var changeLang = "en";

	//1033 English - 3082 Español
	if (currLang == "1033") {
		changeLang = "es";
	}

	//Para página de detalle de noticia
	var paramID = GetUrlKeyValue("nID", false, location.href);
	var paramIDName = GetUrlKeyValue("id", false, location.href);

	var ctx_Var = SP.ClientContext.get_current();
	var object = SP.Publishing.Variations.getPeerUrl(ctx_Var, currPageURL, changeLang);
	//var object = SP.Publishing.Variations.getPeerUrl(ctx_Var, "/es/Paginas/Inicio.aspx", "en");
	console.log(ctx_Var);
	ctx_Var.executeQueryAsync(


		function () {
			var pageURL = object.get_value();
			//alert(pageURL);
			console.log(pageURL);
			//Para páginas de detalle de noticia
			if (paramID) {
				pageURL = object.get_value() + "?nID=" + paramID;
			}

			if (paramIDName) {
				pageURL = object.get_value() + "?id=" + GetStringVariation(paramIDName);
			}

			//alert(changeLang + " : " + pageURL);
			if (pageURL == "/es" || pageURL == "/en") {
				document.location = UrlOverrideVariation(document.location.pathname);
			} else {
				document.location = pageURL;
			}


		},
		function onQueryFailed(sender, args) {
			console.log(args.get_stackTrace());
			//alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
		}

	);
}

// This method should not be used if variations works properly
function UrlOverrideVariation(url) {
	var pages = [
		{ es: "/es/Paginas/bienestar/pasos-hacia-bienestar/Programa-de-Transicion-de-Cuidado.aspx", en: "/en/Pages/wellness/steps-to-wellbeing/Transition-of-Care-Program.aspx" },
		{ es: "/es/Paginas/individuos-familias/individuos/mcspersonalgold.aspx", en: "/en/Pages/individual-families/individuals/mcspersonalgold.aspx" },
		{ es: "/es/Paginas/No-Surprise-Act-Cost-Calculator.aspx", en: "/en/Pages/No-Surprise-Act-Cost-Calculator.aspx" },
		{ es: "/es/Paginas/herramientas-servicios/Reembolso-Pruebas-Caseras-COVID-19.aspx", en: "/en/Pages/tools-services/Reimbursement-Home-COVID-19-Test.aspx" }
	];



	for (i = 0; i < pages.length; i++) {
		if (pages[i].es == url) {
			return pages[i].en;
		}

		if (pages[i].en == url) {
			return pages[i].es;
		}
	}

	return url;

}

var textVariations = '{ "Variations" : [' +
	'{ "es":"stepstowellness" , "en":"stepstowellness" },' +
	'{ "es":"madresybebés" , "en":"mothersandbabies" },' +
	'{ "es":"programasdebienestar" , "en":"wellnessprograms" },' +

	'{ "es":"saludpreventiva" , "en":"preventivehealth" },' +
	'{ "es":"estrés" , "en":"stress" },' +
	'{ "es":"efectosdelalcohol" , "en":"alcoholeffects" },' +
	'{ "es":"cesacióndefumar" , "en":"quitsmoking" },' +
	'{ "es":"sueñoydescanso" , "en":"sleepandrest" },' +
	'{ "es":"itinerariodevacunaciones" , "en":"vaccinationschedules" },' +
	'{ "es":"elzika" , "en":"zikavirus" },' +


	'{ "es":"diabetes" , "en":"diabetes" },' +
	'{ "es":"enfermedadcrónicadelriñón" , "en":"chronickidneydisease" },' +
	'{ "es":"infeccionesrespiratorias" , "en":"respiratoryinfections" },' +
	'{ "es":"presiónarterial" , "en":"bloodpreasure" },' +
	'{ "es":"asma" , "en":"asthma" },' +
	'{ "es":"enfermedadesgastrointestinales" , "en":"gastrointestinaldiseases" },' +

	'{ "es":"2a50empleados" , "en":"2to50employees" },' +
	'{ "es":"51empleadosomás" , "en":"51employeesormore" },' +
	'{ "es":"retiradosela" , "en":"elaretiree" },' +
	'{ "es":"mcsclassicaregrupal" , "en":"mcsclassicareforgroups" },' +

	'{ "es":"individuos" , "en":"individuals" },' +
	'{ "es":"mcsclassicare" , "en":"mcsclassicare" },' +
	'{ "es":"retiradosela" , "en":"elaretiree" },' +


	'{ "es":"trasfondolegislativo" , "en":"legislativebackground" },' +
	'{ "es":"avisodeprácticasdeprivacidad" , "en":"privacynotice" },' +
	'{ "es":"solicitudes" , "en":"forms" },' +
	'{ "es":"Programa-de-Transicion-de-Cuidado" , "en":"Transition-of-Care-Program" },' +
	'{ "es":"bienestar" , "en":"wellness" },' +
	'{ "es":"pasos-hacia-bienestar" , "en":"steps-to-wellbeing" } '+
	']}'

	;
var JsonVariations = JSON.parse(textVariations);


function GetStringVariation(Text) {

	for (i = 0; i < JsonVariations.Variations.length; i++) {
		if (JsonVariations.Variations[i].es == Text) {
			return JsonVariations.Variations[i].en;
		}

		if (JsonVariations.Variations[i].en == Text) {
			return JsonVariations.Variations[i].es;
		}
	}

	return "null"
}



//----------------------


function PreheckListUrls() {
  
	var Idioma = (SP.Res.lcid == 1033)? 'en' : 'es';
	
	var replaceurl = CheckListUrls(Idioma);
	if (replaceurl != ""){
	 	$("#langButton").unbind();
 		$( "#langButton" ).attr('href', replaceurl);
	}
	
};

 					


						
function CheckListUrls(leng) {

	var CustomVariations = [
 

		{ "en":"/en/Pages/conexion-de-salud/Conectando-con-nuestra-red.aspx",
		"es":"/es/Paginas/conexion-de-salud/Conectando-con-nuestra-red.aspx"},

	]
	



	url = window.location.href;
	var endUrl = '';
	
	$.each(CustomVariations , function(i, item) {
		if(leng == 'es'){
			if(url.includes(item.es))
			{
				endUrl = item.en;
			}
		}else{
			if(url.includes(item.en))
			{
				endUrl = item.es;
			}
		}
	});

  	return endUrl;
}			

