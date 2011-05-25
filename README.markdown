# sortNselect jQuery UI extention 
## Version .02

This extention adds selectable functionality to the jQuery UI sortable plugin.  This extention requires the following to be installed in order to work:

1. jQuery 1.4 or newer
2. jQuery UI 1.8 or newer
3. jQuery UI sortable plugin
4. jQuery UI theme with icons

## Usage
	$(document).ready(function(){
		$("#selectorforullist").sortnselect()
	});

## Version change log
* .02 - checked elements will now be selected upon load

## TODO:
* fix bug where you can move a selected item below the selected list
* need to add options to the plugin for different sytles
* reorder list upon load
