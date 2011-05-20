/*
Copyright (c) 2011 Ryan Anklam

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
(function($){
	$.fn.extend({
		sortnselect: function(){
		
			var target = this;
			var checkOK = '<span class="ui-icon ui-icon-circle-check"></span>';
			var handle = '<span class="ui-icon ui-icon-grip-dotted-vertical"></span>';
			var hiddenInput = $('<input type="hidden" name="selectedItems" id="selectedItems" value="">');
						
			target.children().prepend(handle);
			target.children().addClass("ui-state-default ui-corner-all");
			target.append(hiddenInput);
			
			target.sortable({
					placeholder: "ui-state-highlight",
					cursor: "hand",
					start: function(event,ui){
						$(this).addClass("noclick");
					},
					stop: function(event,ui){
							$.setItems($(this),event)
					}
			}).children().click(function(event){
				sortableClick($(this),event);
				
			}).children(":checkbox").offset({top:0,left:-999}).end().css( 'cursor', 'pointer').mousedown(function(){
				$(this).css('cursor','move');
			}).mouseup(function(){
				$(this).css('cursor','pointer');
			});
	
			target.disableSelection();
			
			var sortableClick = function(element, event){
				if(!element.parent().hasClass("noclick")){
					if(!element.hasClass("ui-state-hover")){
				
						element.addClass("ui-state-hover");
						element.children(":checkbox").attr("checked","checked");
				
						if(element.children(".ui-icon-circle-check").length === 0){
							element.append(checkOK);	
						}				
					}
					else{
				
						element.removeClass("ui-state-hover");
						element.children(":checkbox").removeAttr('checked');
				
						element.children(".ui-icon-circle-check").remove();
					}
			
					$.reorderList(element,element.parent(),event);
					$.setItems(element.parent(),event);
			
					event.preventDefault();
				}
				else{
					element.parent().removeClass("noclick");
				}
			}
		
			$.reorderList = function(theTarget,theList,event){
	
				theTarget.detach();

				if(theList.children(".ui-state-hover").length){
					theList.children(".ui-state-hover:last").after(theTarget);
				}
				else{
					theList.prepend(theTarget);
				}
			};
			
			
			
			$.setItems = function(theList,event){
				var hiddenInput = $("#selectedItems");
				var items = "";
	
				theList.children(".ui-state-hover").each(function(){
					items += $(this).children('input:checkbox').val() + ",";	
				});
	
				
				
				hiddenInput.val(items.substring(0,items.length - 1));
				
				console.log(hiddenInput.val());
			};	
		}
	})
})(jQuery);

