var menu = [];
var collListItem_Menu;
var collListItem_TopMenu;
var collListItem_BtnListItems;
var CorrectHeightMenu;


var ReadMoreLabel = "Read More"; 



function menuItem(id, parentID, text, lvl, link,mega, OnlyText , InNewTab, OnlyInPlatform ) {
    this.id = id;
    this.parentID = parentID;
    this.text = text;
    this.lvl = lvl;
    this.link = link;
    this.mega  = mega;
    this.OnlyText = OnlyText;
    this.InNewTab = InNewTab;
    this.OnlyInPlatform = OnlyInPlatform ;
}
 
$(document).ready(function() {
	if(_spPageContextInfo.currentCultureName != "en-US")
	{
		ReadMoreLabel = "Conoce más"; 
	}

	getMenuItems();
	getTopMenuItems();
	getBtnListItems();
	
	$("#ContactButtonA").click(function(){
	    $(".dropdown2").toggleClass("displayed");
	}); 
	
});

function getTopMenuItems() {
	var context = new SP.ClientContext("/");
	
	var oList = context.get_web().get_lists().getByTitle('MenuTop');	
	
	var camlQuery = new SP.CamlQuery();	
	camlQuery.set_viewXml('<View><Query><OrderBy><FieldRef Name="OrderNumber" Ascending="TRUE" /></OrderBy></Query></View>');
	collListItem_TopMenu = oList.getItems(camlQuery);
		
	context.load(collListItem_TopMenu);		
	context.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded_TopMenu), Function.createDelegate(this, this.onQueryFailed));        
		
}

function onQuerySucceeded_TopMenu(sender, args) {
	//var serverSiteURL = _spPageContextInfo.webAbsoluteUrl;
	var listItemEnumerator = collListItem_TopMenu.getEnumerator();
	//var total = collListItem_TopMenu.get_count();
	//alert(total);
	var first = true;
	var topMenuHTML = "";
	var mobile_items_HTML = "";
	while (listItemEnumerator.moveNext()) {
		var oListItem = listItemEnumerator.get_current();
		var ID = oListItem.get_id();
			
		var Title = oListItem.get_item('Title');
		
		var LinkURL = "#";
		var link = oListItem.get_item('Link');
		
		
		if(currLang == "1033"){
			Title = oListItem.get_item('Title_EN');
			link = oListItem.get_item('Link_EN');
		}

		if(link){
			var regexHREF = /<a.*?href="(.*?)"/;
			LinkURL = regexHREF.exec(link)[1];
		}
		
		if(first){
			first = false;
			$('#topMenu_item1_text').text(Title);
		}
		else{
			topMenuHTML += '<li class="nav-item br mobileHide">' +
				'<a class="text-dark" href="' + LinkURL + '">' + Title + '</a>' +
				'</li>';
				
			mobile_items_HTML += '<li id="topMenu_mobile_itemA"class="nav-item br mobileShow">' +
				'<a class="greentext" href="' + LinkURL + '">' + Title + '</a>' +			
				'</li>';
		}				
						  					  
	}	

	$('#extra-menu > li:nth-child(3)').after(topMenuHTML);
	
	//Para menú izquierda móvil
	$('#langButton_mobile').before(mobile_items_HTML);

}


function getBtnListItems() {
	var context = new SP.ClientContext("/");
	
	var oList = context.get_web().get_lists().getByTitle('MenuTop_Contacts');
	
	var isEnglish = 0;
	var currLanguage = _spPageContextInfo.currentLanguage;
	
	if(currLanguage == "1033"){
		modalURL = "/Pages/modal_en.aspx #MCSModal";
		isEnglish = 1;
	}
	
	var camlQuery = new SP.CamlQuery();
	camlQuery.set_viewXml('<View><Query><Where><Eq><FieldRef Name="English" /><Value Type="Boolean">' + isEnglish + '</Value></Eq></Where></Query><RowLimit>1</RowLimit></View>');
	collListItem_BtnListItems = oList.getItems(camlQuery);
		
	context.load(collListItem_BtnListItems);		
	context.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded_BtnListItems), Function.createDelegate(this, this.onQueryFailed));        
		
}

function onQuerySucceeded_BtnListItems(sender, args) {
	//var serverSiteURL = _spPageContextInfo.webAbsoluteUrl;
	var listItemEnumerator = collListItem_BtnListItems.getEnumerator();
	//var total = collListItem_BtnListItems.get_count();
	//alert(total);	
	while (listItemEnumerator.moveNext()) {
		var oListItem = listItemEnumerator.get_current();
		var ID = oListItem.get_id();
			
		var Title = oListItem.get_item('Title');
		var Subtitle = oListItem.get_item('Subtitle');
		var Text1 = oListItem.get_item('Text1');
		var Phone1 = oListItem.get_item('Phone1');
		var Text2 = oListItem.get_item('Text2');
		var Phone2 = oListItem.get_item('Phone2');
		var Text3 = oListItem.get_item('Text3');
		var Phone3 = oListItem.get_item('Phone3');
		var Text4 = oListItem.get_item('Text4');
		var Phone4 = oListItem.get_item('Phone4');
		var Subtitle2 = oListItem.get_item('Subtitle2');
		var Subtitle2_Text1 = oListItem.get_item('Subtitle2_Text1');
		var Subtitle2_Text2 = oListItem.get_item('Subtitle2_Text2');
		var Mobile_Subtitle3 = oListItem.get_item('Mobile_Subtitle3');
		var Mobile_Line1 = oListItem.get_item('Mobile_Line1');
		var Mobile_Line2 = oListItem.get_item('Mobile_Line2');
		var Mobile_Line3 = oListItem.get_item('Mobile_Line3');
		var Mobile_Line4 = oListItem.get_item('Mobile_Line4');
		var Mobile_BtnText = oListItem.get_item('Mobile_BtnText');
		
		var Mobile_BtnLink= "#";
		var link = oListItem.get_item('Link');
		if(link){
			var regexHREF = /<a.*?href="(.*?)"/;
			Mobile_BtnLink = regexHREF.exec(link)[1];
		}
		
		var EndButton_Text = oListItem.get_item('EndButton_Text');
		
		var EndButton_Link= "#";
		var link2 = oListItem.get_item('Link2');
		if(link2){
			var regexHREF = /<a.*?href="(.*?)"/;
			EndButton_Link = regexHREF.exec(link2)[1];
		}

		
		var phone1_Tel = "#";
		if(Phone1){
			phone1_Tel = Phone1.trim().replace(/\./g,'-');
		}
		
		var phone2_Tel = "#";
		if(Phone2){
			phone2_Tel = Phone2.trim().replace(/\./g,'-');
		}

		var phone3_Tel = "#";
		if(Phone3){
			phone3_Tel = Phone3.trim().replace(/\./g,'-');
		}

		var phone4_Tel = "#";
		if(Phone4){
			phone4_Tel = Phone4.trim().replace(/\./g,'-');
		}
	
		var btnList_HTML = '<li><h6>' + Title + '</h6></li>' +
			'<li class="text-primary"><small><strong>' + Subtitle + '</strong></small></li>' +
			'<li><small>' + Text1 + '</small></li>' +
			'<li class="btn btn-primary btn-sm btn-block m-0 light-text"><a class="call-btn" href="tel:' + phone1_Tel + '">' + Phone1 + '</a></li>' +
			'<li class="mt-10"><small>' + Text2 + '</small></li>' +
			'<li class="btn btn-primary btn-sm btn-block m-0 light-text"><a class="call-btn" href="tel:' + phone2_Tel + '">' + Phone2 + '</a></li>' +
			'<li class="mt-10"><small>' + Text3 + '</small></li>' +
			'<li class="btn btn-primary btn-sm btn-block m-0 light-text"><a class="call-btn" href="tel:' + phone3_Tel + '">' + Phone3 + '</a></li>' +
			'<li class="mt-10"><small>' + Text4 + '</small></li>' +
			'<li class="btn btn-primary btn-sm btn-block m-0 light-text"><a class="call-btn" href="tel:' + phone4_Tel + '">' + Phone4 + '</a></li>' + 
			'<li class="text-primary mt-10"><small><strong>' + Subtitle2 + '</strong></small></li>' +
			'<li class="mb-10"><small>' + Subtitle2_Text1 + '</br>' + Subtitle2_Text2 + '</small></li>' +
			'<li class="btn btn-primary btn-sm btn-block m-0 light-text">' +
			'<a class="call-btn" href="' + EndButton_Link + '">' + EndButton_Text + '</a>' +
			'</li>';			
			
		$('#topMenu_item1_list').append(btnList_HTML);
		
		var mobileContactUsHTML = '<div id="mobileContacts" class="mobileShow">' +
			'<div><h2 class="mt-5 mb-10">' + Title + '</h2></div>' +
			'<p class="text-primary mb-5">' + Subtitle + '</p>' +
			'<p class="mb-5"><small>' + Text1 + '</small></p>' +
			'<p class="btn btn-primary btn-block m-0 light-text"><a class="call-btn" href="tel:' + phone1_Tel + '">' + Phone1 + '</a></p>' +
			'<p class="mb-5 mt-10" ><small>' + Text2 + '</small></p>' +
			'<p class="btn btn-primary btn-block m-0 light-text"><a class="call-btn" href="tel:' + phone2_Tel + '">' + Phone2 + '</a></p>' +
			'<p class="mb-5 mt-10" style="line-height: 1;"><small>' + Text3 + '</small></p>' +
			'<p class="btn btn-primary btn-block m-0 light-text"><a class="call-btn"  href="tel:' + phone3_Tel + '">' + Phone3 + '</a></p>' +
			'<p class="mb-5 mt-10"><small>' + Text4 + '</small></p>' +
			'<p class="btn btn-primary btn-block m-0 light-text"><a class="call-btn" href="tel:' + phone4_Tel + '">' + Phone4 + '</a></p>' +
			'<p class="text-primary mb-5 mt-10">' + Subtitle2 + '</p>' +
			'<p>' + Subtitle2_Text1 + '</br>' + Subtitle2_Text2 + '</p>' +
			'<div class="">' +
			'<p class="text-primary mb-5 mt-10">' + Mobile_Subtitle3 + '</p><p>' + Mobile_Line1 + '<br>' + Mobile_Line2 + '<br>' + Mobile_Line3 + '<br>' + Mobile_Line4 + '</p>' +
			//'<a href="' + Mobile_BtnLink + '" class="btn btn-primary btn-block m-0 text-light" id="map-btn"><i class="fal fa-map-marker-alt"></i>' + Mobile_BtnText + '</a>' +
			'<p class="btn btn-primary btn-block mv-10 light-text"><a class="call-btn" href="' + Mobile_BtnLink + '" id="map-btn"><i class="fal fa-map-marker-alt"></i>' + Mobile_BtnText + '</a></p>' +
			'<p class="btn btn-primary btn-block m-0 light-text"><a class="call-btn" href="' + EndButton_Link + '">' + EndButton_Text + '</a></p>' +
			'</div>' +
			'</div>';
			
		$('#langItem').after(mobileContactUsHTML);
				  					  
	}	

}

function getMenuItems() {
	var context = new SP.ClientContext("/");
	
	var oList = context.get_web().get_lists().getByTitle('Menu');
		
	var camlQuery = new SP.CamlQuery();
	camlQuery.set_viewXml('<View><Query><OrderBy><FieldRef Name="Order0" Ascending="TRUE"/></OrderBy></Query></View>');
	collListItem_Menu = oList.getItems(camlQuery);
		
	context.load(collListItem_Menu);		
	context.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded_Menu), Function.createDelegate(this, this.onQueryFailed));        
		
}

function onQuerySucceeded_Menu(sender, args) {
	//var serverSiteURL = _spPageContextInfo.webAbsoluteUrl;
	var listItemEnumerator = collListItem_Menu.getEnumerator();
	//var total = collListItem_Menu.get_count();
	//alert(total);
	var MenuHTML = '';
	
	while (listItemEnumerator.moveNext()) {
		var oListItem = listItemEnumerator.get_current();
		var ID = oListItem.get_id();
		
		var parentLookup = oListItem.get_item('Parent');
		var parentValue = "";
		var parentID = 0;
		
		if(parentLookup){
			parentValue = parentLookup.get_lookupValue();
			parentID = parentLookup.get_lookupId();
		}
		
		var Title = oListItem.get_item('Title');
		var lvl = oListItem.get_item('Nivel');
		var mega = oListItem.get_item('MegaMenu');
		var order = oListItem.get_item('Order0');
		var OnlyText = oListItem.get_item('OnlyText');
		var InNewTab = oListItem.get_item('InNewTab');
		var OnlyInPlatform = oListItem.get_item('OnlyInPlatform');
		
		var linkURL = "#";
		var link = oListItem.get_item('Link');

		if(currLang == "1033"){
			Title = oListItem.get_item('Title_EN');
			link = oListItem.get_item('Link_EN');
		}

		if(link){
			var regexHREF = /<a.*?href="(.*?)"/;
			linkURL = regexHREF.exec(link)[1];
		}		
		
		var item = new menuItem(ID, parentID, Title, lvl, linkURL , mega, OnlyText, InNewTab, OnlyInPlatform );
		menu.push(item);			  					  
	}
	//*********************************************************
	//console.log(menu);
	
	var parentItems = menu.filter(function( obj ) {
	  return obj.lvl == 1;
	});	
	//console.log(parentItems);
	var length = parentItems.length;
	var count = 0;

	$.each(parentItems, function() {
		count++;
		var pID = this.id;
		var megaMenu = this.mega;
		//var url = this.link;
				
		var children = menu.filter(function( obj ) {
		  return obj.lvl == 2 && obj.parentID == pID;
		});		
		console.log(children);
		
		
		
		//Añadir línea de separar antes del último item
		if (count === length) {
              MenuHTML += '<li class="mobileHide"><img class="" alt="" src="/Style%20Library/Images/rline.png"/></li>';

        }

		
		if(megaMenu){
			MenuHTML = MenuHTML + '<li><a class="greentext" href="' + this.link + '">' + splitTitle(this.text) + '</a>';						  
			if(children.length > 0){
				MenuHTML = MenuHTML +'<div class="megamenu clearfix">';
			}
		}
		else{
			MenuHTML = MenuHTML + '<li><a class="greentext" href="' + this.link + '">' + splitTitle(this.text) + '</a>';
			if(children.length > 0){
				MenuHTML = MenuHTML +'<ul class="wsmenu-submenu">';
			}

					  
		}
		
		$.each(children, function() {
			var cID = this.id;
			var grandchildren = menu.filter(function( obj ) {
			  return obj.lvl == 3 && obj.parentID == cID;
			});				
			console.log(grandchildren);	
			
			var NewTab = "";
			if(this.InNewTab ){
				NewTab = "target='_blank'"
			}
			
			if(megaMenu){
			
				if(this.OnlyText){
					MenuHTML = MenuHTML + '<ul class="col-lg-3 col-md-3 col-xs-12 link-list02 MenuGreenSection MenuColumn" >' +
									  '<li class="title greentext"><a href="' + this.link + '"' + NewTab  + ' >' + this.text + '</a></li>';
				}
				else{
					MenuHTML = MenuHTML + '<ul class="col-lg-3 col-md-3 col-xs-12 link-list02 MenuColumn" >' +
									  '<li class="title greentext"><a href="' + this.link + '"' + NewTab  + ' >' + this.text + '</a></li>';
			
				}
			
			}			
			else{
				
				if(this.OnlyText){
					MenuHTML = MenuHTML + '<li><p>' + this.text + '</p>';
				}
				else{
					MenuHTML = MenuHTML + '<li class="'+ this.OnlyInPlatform + '"><a class="ItemMenuWithBullet" href="' + this.link + '" ' + NewTab  + '><i class="fa fa-angle-right ItemMenuWithBullet"></i>' + this.text + '</a>';
				}
				

				
				
				if(grandchildren.length > 0){
					MenuHTML = MenuHTML + '<ul class="wsmenu-submenu-sub">';
				}
					  
			}

		$.each(grandchildren, function() {
		
			var NewTab = "";
			if(this.InNewTab ){
				NewTab = "target='_blank'"
			}

		
			if(this.OnlyText){
				MenuHTML = MenuHTML + '<li class="NoStyle"><p>' + this.text + '</p> <a class="MenuMoreButton" ' + NewTab  + ' href="' + this.link + '">' + ReadMoreLabel + '</a></li>';

			}
			else{
				MenuHTML = MenuHTML + '<li  class="'+ this.OnlyInPlatform + '"><a class="ItemMenuWithBullet" href="' + this.link + '" ' + NewTab  + '><i class="fa fa-angle-right ItemMenuWithBullet"></i>' + this.text + '</a></li>';
				}
			});
			
			if(megaMenu){
				MenuHTML = MenuHTML + '</ul>';
			}
			else{
				if(grandchildren.length > 0){
					MenuHTML = MenuHTML + '</ul>';
				}
				MenuHTML = MenuHTML + '</li>';
			}
			
		});		
		
		if(megaMenu){
			if(children.length > 0){
				MenuHTML = MenuHTML + '</div>';
			}
			MenuHTML = MenuHTML + '</li>';
		}
		else{
			if(children.length > 0){
				MenuHTML = MenuHTML + '</ul>';
			}
			MenuHTML = MenuHTML + '</li>';
		}

		
		
	});	
	$('#menuList li:eq(0)').after(MenuHTML);	
	
	var jsHTML = '<script src="/Style%20Library/MCS/js/Menu/webslidemenu.js"></script>';
	$('#menuJSDiv').append(jsHTML);
	
	CorrectHeightMenu = setInterval(CorrectHeightMenuFunction, 1000);

}

function splitTitle(title){
	if(title.length > 15){
		var text = title;
		var done = false;
		var count = 4;
		while(!done){
			var index = text.lastIndexOf(" ");
			text = text.slice(0,index);
			//alert(text);
			if(text.length <=15){
				//alert(title.slice(0, index) + '<br class="mobileHide"/>' + title.slice(index));
				return title.slice(0, index) + '<br class="mobileHide"/>' + title.slice(index);
				done = true;
			}
			count--;
			if(count == 0){
				done = true;
			}
		}
	}
	
	return title;

}
function onQueryFailed(sender, args) {

	//alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}







function CorrectHeightMenuFunction() {
    
    if($(".megamenu").height() >= $(".MenuGreenSection").height() && $("body").width() > 991){
    	
    	$(".MenuGreenSection").height( $(".megamenu").height() );
    }else{
    	$(".MenuGreenSection").css( "height" , "auto") ;

    }
    
}

