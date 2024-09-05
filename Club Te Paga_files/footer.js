var collListItem_FooterLinks;
var collListItem_ContactInfo;
var collListItem_Disclaimer;
var allLinkItems = [];
var footerItem_Col1 = [];
var footerItem_Col2_A = [];
var footerItem_Col2_B = [];
var footerItem_Col3_A = [];
var footerItem_Col3_B = [];
var footerItem_Col3_C = [];
var footerItem_Col3_D = [];

function footerItem(id, parentID, title, text, header, link) {
    this.id = id;
    this.parentID = parentID;
    this.title = title;
    this.text = text;
    this.header = header;
    this.link = link;
}
 
$(document).ready(function() {
	getFooterLinks();
	getContactInfo();
	getDisclaimer();
	
	getCurrentListItem(
	   function(listItem) {
	       	var code = listItem.get_item('ApprovalCode');	       
	       	var approvalDate = listItem.get_item('ApprovalDate');
			
	       	$('#approvalCode').text(code);
	       	$('#approvalDate').text(approvalDate);
	   },
	   function(sender,args){
	        console.log(args.get_message());    
	   }
	);

	//getApprovalCode();
	/*
	alert(_spPageContextInfo.siteServerRelativeUrl);
	alert(_spPageContextInfo.webAbsoluteUrl);
	alert(_spPageContextInfo.siteAbsoluteUrl);
	alert(_spPageContextInfo.webServerRelativeUrl);
	alert(_spPageContextInfo.serverRequestPath);
	*/

	
});

function getDisclaimer() {
	//alert("..ok");
	var context = new SP.ClientContext("/");
	
	var oList = context.get_web().get_lists().getByTitle('FooterMain_Disclaimer');
		
	var camlQuery = new SP.CamlQuery();
	collListItem_Disclaimer= oList.getItems(camlQuery);
		
	context.load(collListItem_Disclaimer);		
	context.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded_Disclaimer), Function.createDelegate(this, this.onQueryFailed));        
		
}

function onQuerySucceeded_Disclaimer(sender, args) {

	//var serverSiteURL = _spPageContextInfo.webAbsoluteUrl;
	var listItemEnumerator = collListItem_Disclaimer.getEnumerator();
	//var total = collListItem_Disclaimer.get_count();
	//alert(total);
	
	while (listItemEnumerator.moveNext()) {
		var oListItem = listItemEnumerator.get_current();
		var ID = oListItem.get_id();
		//var Title = oListItem.get_item('Title');
		var Text = oListItem.get_item('Text');
		
	//	var img = oListItem.get_item('Image');		
	//	var regexSRC = /<img.*?src="(.*?)"/;
	//	var imgURL = regexSRC.exec(img)[1];
		
		var imgURL = oListItem.get_item('Image');
		
		var linkURL = "#";
		var link = oListItem.get_item('Link');
		if(link){
			var regexHREF = /<a.*?href="(.*?)"/;
			linkURL = regexHREF.exec(link)[1];
		}

		if(currLang == "1033"){
			Text = oListItem.get_item('Text_EN');
		}
	
		$('#disclaimerText').append(Text);		
		
		var disclaimerImg_HTML = '<a class="confirm-link footerModalLink" data-toggle="modal" data-target="#MCSModal" data-link="' + linkURL + '">' + 
								 '<img src="' + imgURL + '" alt="CertifiedWebIcon"/>' + 
								 '</a>';	
	
		$('#disclaimerImg').append(disclaimerImg_HTML);

		
		$(".footerModalLink").on("click",function(){
			element = $(this);
		});

				  
	}	
}



function getContactInfo() {
	//alert("..ok");
	var context = new SP.ClientContext("/");
	
	var oList = context.get_web().get_lists().getByTitle('FooterMain_Contacts');
		
	var camlQuery = new SP.CamlQuery();
	collListItem_ContactInfo = oList.getItems(camlQuery);
		
	context.load(collListItem_ContactInfo);		
	context.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded_ContactInfo), Function.createDelegate(this, this.onQueryFailed));        
		
}

function onQuerySucceeded_ContactInfo(sender, args) {

	//var serverSiteURL = _spPageContextInfo.webAbsoluteUrl;
	var listItemEnumerator = collListItem_ContactInfo.getEnumerator();
	//var total = collListItem_ContactInfo.get_count();
	//alert(total);
	
	while (listItemEnumerator.moveNext()) {
		var oListItem = listItemEnumerator.get_current();
		var ID = oListItem.get_id();
		//var Title = oListItem.get_item('Title');
		var ContactName = oListItem.get_item('ContactName');
		var ContactText = oListItem.get_item('ContactText');		
		var AreaMetroName= oListItem.get_item('AreaMetroName');
		var AreaMetroNumber = oListItem.get_item('AreaMetroNumber');
		var LibreCostoName = oListItem.get_item('LibreCostoName');		
		var LibreCostoNumber = oListItem.get_item('LibreCostoNumber');
		var PersonasImpName = oListItem.get_item('PersonasImpName');
		var PersonasImpNumber = oListItem.get_item('PersonasImpNumber');		
	//	var TeleventasName = oListItem.get_item('TeleventasName');
	//	var TeleventasNumber = oListItem.get_item('TeleventasNumber');
		var HorarioName = oListItem.get_item('HorarioName');
		var HorarioText = oListItem.get_item('HorarioText');		
	//	var MCSAdvName = oListItem.get_item('MCSAdvName');
	//	var MCSAdvText = oListItem.get_item('MCSAdvText');
		var OficinaCentralName = oListItem.get_item('OficinaCentralName');		
		var OficinaCentralText = oListItem.get_item('OficinaCentralText');		
		var SubText = oListItem.get_item('SubText');

		var MapName = oListItem.get_item('MapLink').get_description();
		var MaplinkURL = oListItem.get_item('MapLink').get_url();
		
		if(currLang == "1033"){
			ContactName = oListItem.get_item('ContactName_EN');
			ContactText = oListItem.get_item('ContactText_EN');		
			AreaMetroName= oListItem.get_item('AreaMetroName_EN');
			AreaMetroNumber = oListItem.get_item('AreaMetroNumber_EN');
			LibreCostoName = oListItem.get_item('LibreCostoName_EN');		
			LibreCostoNumber = oListItem.get_item('LibreCostoNumber_EN');
			PersonasImpName = oListItem.get_item('PersonasImpName_EN');
			PersonasImpNumber = oListItem.get_item('PersonasImpNumber_EN');		
		//	TeleventasName = oListItem.get_item('TeleventasName_EN');
		//	TeleventasNumber = oListItem.get_item('TeleventasNumber_EN');
			HorarioName = oListItem.get_item('HorarioName_EN');
			HorarioText = oListItem.get_item('HorarioText_EN');		
		//	MCSAdvName = oListItem.get_item('MCSAdvName_EN');
		//	MCSAdvText = oListItem.get_item('MCSAdvText_EN');
			OficinaCentralName = oListItem.get_item('OficinaCentralName_EN');		
			OficinaCentralText = oListItem.get_item('OficinaCentralText_EN');		
			SubText = oListItem.get_item('SubText_EN');
	
			MapName = oListItem.get_item('MapLink_EN').get_description();
			MaplinkURL = oListItem.get_item('MapLink_EN').get_url();
		}

		
		var FooterLinks_Col4_HTML = '<h3>' + ContactName +  '</h3><ul>' +	
		  	'<div class="dark-text">' + ContactText + '</div>' +
		  	'<div class="col col-md-4 col-sm-4 col-xs-6" id="csc">' +
		  	
		  	'<div class="pcontact">' +
		  	'<div class="block">' +
		  	'<img src="/SiteAssets/images/CorporateImg/phone_foot.png" alt="phone"/>' +

		  	'</div>' +
		  	'<b>' + AreaMetroName + '</b>' +
		  	AreaMetroNumber +
		  	'</div>' + 
		  	
		  	'<div class="pcontact">' +
		  	'<div class="block">' +
		 // 	'<i class="fa fa-phone fa-flip-horizontal"></i>' +
		 	  	'<img src="/SiteAssets/images/CorporateImg/phone_foot.png" alt="phone"/>' +

		  	'</div>' +
			'<b>' + LibreCostoName + '</b>' +
			LibreCostoNumber +
			'</div>' +
			'<div class="pcontact footer-align">' +
			'<b>' + PersonasImpName + '</b>' +
			PersonasImpNumber +
			'</div></div>' + 
			
			'<div class="col-md-4 col-sm-4 col-xs-12">' +
		//	'<div class="pcontact">' + 
		//	'<div class="block">' +
		//	'<i class="fa fa-phone fa-flip-horizontal"></i>' +
		//	'</div>' + 
		//	'<b>' + TeleventasName + '</b>' +
		//	TeleventasNumber +
		//	'</div>' +
			'<div class="pcontact footer-align">' +
			'<b>' + HorarioName + '</b>' +
			HorarioText +			 		
			'</div>' +
			'<div class="pcontact footer-align">' +
		//	'<b>' + MCSAdvName + '</b>' +
		//	MCSAdvText + 							 		
			'</div></div>' +
			'<div class="col-md-4 col-sm-4 col-xs-12 pcontact">' +
			'<b>' + OficinaCentralName + '</b>' +
			OficinaCentralText + 					
			'<a href="' + MaplinkURL + '" class="btn btn-primary btn-block btn-sm text-light" id="map-btn" target="_blanc"><i class="fal fa-map-marker-alt"></i>' + MapName + '</a>' +
			'</div>';
						
		$('#footer_col4').append(FooterLinks_Col4_HTML);

		$('#footer_SubText').append(SubText);
		
		$(".footerModalLink").on("click",function(){
			element = $(this);
		});

				  
	}	
}

function getFooterLinks() {
	//alert("..ok");
	var context = new SP.ClientContext("/");
	
	var oList = context.get_web().get_lists().getByTitle('FooterMain');
		
	var camlQuery = new SP.CamlQuery();
	collListItem_FooterLinks = oList.getItems(camlQuery);
		
	context.load(collListItem_FooterLinks);		
	context.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded_FooterLinks), Function.createDelegate(this, this.onQueryFailed));        
		
}

function onQuerySucceeded_FooterLinks(sender, args) {

	//var serverSiteURL = _spPageContextInfo.webAbsoluteUrl;
	var listItemEnumerator = collListItem_FooterLinks.getEnumerator();
	//var total = collListItem_FooterLinks.get_count();
	//alert(total);
	
	while (listItemEnumerator.moveNext()) {
		var oListItem = listItemEnumerator.get_current();
		var ID = oListItem.get_id();
		var Title = oListItem.get_item('Title');
		var text = oListItem.get_item('Text');
				
		var isHeader = oListItem.get_item('Header');
		
		var parentLookup = oListItem.get_item('Parent');
		var parentValue = "";
		var parentID = 0;
		
		if(parentLookup){
			parentValue = parentLookup.get_lookupValue();
			parentID = parentLookup.get_lookupId();
		}		
		
		var linkURL = "#";
		var link = oListItem.get_item('Link');
		
		if(currLang == "1033"){
			text = oListItem.get_item('Text_EN');
			link = oListItem.get_item('Link_EN');
		}
		
		if(link){
			var regexHREF = /<a.*?href="(.*?)"/;
			linkURL = regexHREF.exec(link)[1];
		}
				
		var item = new footerItem(ID, parentID, Title, text, isHeader , linkURL);
		
		switch(Title) {
		    case "GroupTitle1":
		        footerItem_Col1.push(item);
		        break;
		    case "GroupTitle2":
		        footerItem_Col2_A.push(item);
		        break;
		    case "GroupTitle3":
		        footerItem_Col2_B.push(item);
		        break;
		    case "GroupTitle4":
		        footerItem_Col3_A.push(item);
		        break;
		    case "GroupTitle5":
		        footerItem_Col3_B.push(item);
		        break;
			case "GroupTitle5-ColC":
		        footerItem_Col3_C.push(item);
		        break;
		    case "GroupTitle6":
		        footerItem_Col3_C.push(item);
		        break;
			case "GroupTitle7":
				footerItem_Col3_D.push(item);
				break;
		}
				
		allLinkItems.push(item);
		  					  
	}
	
	allLinkItems.filter(function( obj ) {
	
			switch(obj.parentID) {
		    case footerItem_Col1[0].id:
		        footerItem_Col1.push(obj);
		        break;
		//    case footerItem_Col2_A[0].id:
		//        footerItem_Col2_A.push(obj);
		//        break;
		    case footerItem_Col2_B[0].id:
		        footerItem_Col2_B.push(obj);
		        break;
//		    case footerItem_Col3_A[0].id:
//		        footerItem_Col3_A.push(obj);
//		        break;
		    case footerItem_Col3_B[0].id:
		        footerItem_Col3_B.push(obj);
		        break;
			case footerItem_Col3_C[0].id:
		        footerItem_Col3_C.push(obj);
		        break;
			/*case footerItem_Col3_D[0].id:
				footerItem_Col3_D.push(obj);
				break;			*/
			//    case footerItem_Col3_C[0].id:
		//        footerItem_Col3_C.push(obj);
		//        break;
		}
	});	
		
	//*********************************************************
	console.log(footerItem_Col1);
	console.log(footerItem_Col2_A);
	console.log(footerItem_Col2_B);
	console.log(footerItem_Col3_A);
	console.log(footerItem_Col3_B);
	console.log(footerItem_Col3_C);		
	
	var FooterLinks_Col1_HTML = '';
	var FooterLinks_Col2_HTML = '';
	var FooterLinks_Col3_HTML = '';

	FooterLinks_Col1_HTML = '<h3>' + footerItem_Col1[0].text +  '</h3><ul>';	
	for (i = 1; i < footerItem_Col1.length; i++) {
	    FooterLinks_Col1_HTML += '<li><a href="' + footerItem_Col1[i].link + '">' + footerItem_Col1[i].text + '</a></li>';
	}	
	FooterLinks_Col1_HTML += '</ul>';	
	$('#footer_col1').append(FooterLinks_Col1_HTML);
	
	
	
//	FooterLinks_Col2_HTML = '<h3>' + footerItem_Col2_A[0].text +  '</h3><ul>';	
//	for (i = 1; i < footerItem_Col2_A.length; i++) {
//	    FooterLinks_Col2_HTML += '<li><a href="' + footerItem_Col2_A[i].link + '">' + footerItem_Col2_A[i].text + '</a></li>';
//	}	
	FooterLinks_Col2_HTML += '</ul><h3>' + footerItem_Col2_B[0].text +  '</h3><ul>';
	for (i = 1; i < footerItem_Col2_B.length; i++) {
	    FooterLinks_Col2_HTML += '<li><a href="' + footerItem_Col2_B[i].link + '">' + footerItem_Col2_B[i].text + '</a></li>';
	}	
	
	//
	FooterLinks_Col2_HTML += '</ul><h3>' + footerItem_Col3_B[0].text +  '</h3><ul>';
	for (i = 1; i < footerItem_Col3_B.length; i++) {
	    FooterLinks_Col2_HTML += '<li><a href="' + footerItem_Col3_B[i].link + '">' + footerItem_Col3_B[i].text + '</a></li>';
	}	

		FooterLinks_Col2_HTML += '</ul><h3>' + footerItem_Col3_C[0].text +  '</h3><ul>';
	for (i = 1; i < footerItem_Col3_C.length; i++) {
	    FooterLinks_Col2_HTML += '<li><a href="' + footerItem_Col3_C[i].link + '">' + footerItem_Col3_C[i].text + '</a></li>';
	}	
	//
	

	
	FooterLinks_Col2_HTML += '</ul><h3>' + footerItem_Col3_D[0].text.toUpperCase() +  '</h3><ul>';
	for (i = 1; i < footerItem_Col3_D.length; i++) {
	    FooterLinks_Col2_HTML += '<li><a href="' + footerItem_Col3_D[i].link + '">' + footerItem_Col3_D[i].text + '</a></li>';
	}	
	//

	FooterLinks_Col2_HTML += '</ul>';
	$('#footer_col2').append(FooterLinks_Col2_HTML);
	
	
	
//	FooterLinks_Col3_HTML = '<h3>' + footerItem_Col3_A[0].text +  '</h3><ul>';	
//	for (i = 1; i < footerItem_Col3_A.length; i++) {
//	    FooterLinks_Col3_HTML += '<li><a href="' + footerItem_Col3_A[i].link + '">' + footerItem_Col3_A[i].text + '</a></li>';
//	}	
/*
	FooterLinks_Col3_HTML += '</ul><h3>' + footerItem_Col3_B[0].text +  '</h3><ul>';
	for (i = 1; i < footerItem_Col3_B.length; i++) {
	    FooterLinks_Col3_HTML += '<li><a href="' + footerItem_Col3_B[i].link + '">' + footerItem_Col3_B[i].text + '</a></li>';
	}	
	*/
//	FooterLinks_Col3_HTML += '</ul><h3>' + footerItem_Col3_C[0].text +  '</h3><ul>';
//	for (i = 1; i < footerItem_Col3_C.length; i++) {
//	    FooterLinks_Col3_HTML += '<li><a href="' + footerItem_Col3_C[i].link + '">' + footerItem_Col3_C[i].text + '</a></li>';
//	}	


	FooterLinks_Col3_HTML += '</ul>';

//	$('#footer_col3').append(FooterLinks_Col3_HTML);


	$(".footerModalLink").on("click",function(){
		element = $(this);
	});

}


function getCurrentListItem(success, error)
{
   var context = SP.ClientContext.get_current();
   var web = context.get_web(); 
   var currentList = web.get_lists().getById(_spPageContextInfo.pageListId); 
   var currentListItem = currentList.getItemById(_spPageContextInfo.pageItemId);
   context.load(currentListItem);
   context.executeQueryAsync(
     function(){
        success(currentListItem);
     }, 
     error
   );
}

function getMonthName_Approval(month){


	var monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
	  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
	];
	
	if(currLang == "1033"){
		monthNames = ["January", "February", "March", "April", "May", "June",
		  "July", "August", "September", "October", "November", "December"
		];
	}

	return monthNames[month];
}