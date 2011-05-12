$(document).ready(function(){
	var checkOK = '<span class="ui-icon ui-icon-circle-check"></span>';
	
	$( "ul#sortable" ).sortable({
			placeholder: "ui-state-highlight",
			cursor: "hand",
			start: function(event,ui){
				$(this).addClass("noclick");
			},
			stop: function(event,ui){
					$.setShortlist($(this),event)
					//$.reorderList
			}
	}).children().click(function(event){
		
		if(!$(this).parent().hasClass("noclick")){
			if(!$(this).hasClass("ui-state-hover")){
				
				$(this).addClass("ui-state-hover");
				$(this).children(":checkbox").attr("checked","checked");
				
				if($(this).children(".ui-icon-circle-check").length === 0){
					$(this).append(checkOK);	
				}				
			}
			else{
				
				$(this).removeClass("ui-state-hover");
				$(this).children(":checkbox").removeAttr('checked');
				
				$(this).children(".ui-icon-circle-check").remove();
			}
			
			$.reorderList($(this),$(this).parent(),event);
			$.setShortlist($(this).parent(),event);
			
			event.preventDefault();
		}
		else{
			$(this).parent().removeClass("noclick");
		}
	}).children(":checkbox").offset({top:0,left:-999}).end().css( 'cursor', 'pointer').mousedown(function(){
		$(this).css('cursor','move');
	}).mouseup(function(){
		$(this).css('cursor','pointer');
	});
	
	
	$( "ul#sortable" ).disableSelection();
});

$.reorderList = function(theTarget,theList,event){
	
	theTarget.detach();

	if(theList.children(".ui-state-hover").length){
		theList.children(".ui-state-hover:last").after(theTarget);
	}
	else{
		theList.prepend(theTarget);
	}
}
	
$.setShortlist = function(theList,event){
	var shortlistHiddenInput = $("#shortlist");
	var shortlistVendors = "";
	
	theList.children(".ui-state-hover").each(function(){
		shortlistVendors += $(this).children('input:checkbox').val() + ",";	
	});
	
	shortlistHiddenInput.val(shortlistVendors);
	
	console.log(shortlistHiddenInput.val());
}
