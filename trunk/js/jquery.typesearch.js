/*
 * jQuery.typeSearch 0.1.1 - <input type="search"> for all browsers
 *
 * Copyright (c) 2008 Lim Chee Aun (cheeaun.com)
 * Licensed under the MIT license.
 */

;(function($){
	$.fn.typeSearch = function(options) {

		var defaults = {
			results: 0,
			placeholder: 'Search...',
			autosave: ''
		};
		
		var options = $.extend(defaults, options);

		return this.filter(':text').each(function() {
			var el = $(this);
			
			if ($.browser.safari) {
				this.setAttribute('type', 'search');
				this.setAttribute('results', options.results);
				if (options.placeholder) this.setAttribute('placeholder', options.placeholder);
				if (options.autosave) this.setAttribute('autosave', options.autosave);
			}
			else {
				// inherit initial values - value, width and margin
				var val = $.trim(el.val());
				var width = el.outerWidth();
				var margin = [];
				var directions = ['top', 'right', 'bottom', 'left'];
				for (var i=0, len=directions.length ; i<len; i++) margin.push(el.css('margin-'+directions[i]));
				
				var focusSearchbar = function(){
					searchbar.focus();
				}
				
				// set up searchbar
				var wrapper = $('<div class="type-search-container">')
					.width(width)
					.css('margin', margin.join(' '));
				var left = $('<span class="left"></span>').click(focusSearchbar);
				var right = $('<span class="right"></span>').click(focusSearchbar);
				var reset = $('<div class="reset"></div>').click(function(){
					searchbar.val('').focus();
					reset.hide();
				});
				if (val == '' || val == options.placeholder) reset.hide();
				
				var searchbar = $('<input type="text" class="type-search">')
					.attr({
						'id': el.attr('id'),
						'name': el.attr('name')
					})
					.insertAfter(el)
					.wrap(wrapper)
					.before(left)
					.after(reset)
					.after(right)
					.width(width - left.outerWidth() - right.outerWidth())
					.css({
						'left': left.outerWidth(),
						'outline': 0
					}).
					val(val || options.placeholder)
					.focus(function(){
						if ($.trim(searchbar.val()) == options.placeholder) searchbar.val('');
					})
					.blur(function(){
						if ($.trim(searchbar.val()) == '') searchbar.val(options.placeholder);
					})
					.keyup(function(){
						($.trim(searchbar.val()) == '') ? reset.hide() : reset.show();
					});
					
				el.remove();
			}
		});
	};
})(jQuery);
