/*
 * moo.typeSearch 0.1 - <input type="search"> for all browsers
 *
 * Copyright (c) 2008 Lim Chee Aun (cheeaun.com)
 * Licensed under the MIT license.
 */

var typeSearch = new Class({

	Implements: [Options],

	options:{
		results: 0,
		placeholder: 'Search...',
		autosave: ''
	},

	initialize: function(el, options){
		this.setOptions(options);
		this.input = $(el);
		
		var self = this;
		
		if (Browser.Engine.webkit){
			this.input.set($extend({ 'type': 'search' }, this.options));
		}
		else {
			// inherit initial values - value, width and margin
			var val = this.input.get('value').trim();
			var width = this.input.getSize().x;
			
			var focusSearchbar = function(){
				searchbar.focus();
			}
			
			// set up searchbar
			var wrapper = new Element('div', {
				'class': 'type-search-container',
				'styles': {
					'width': width,
					'margin': self.input.getStyle('margin')
				}
			}).replaces(this.input);
			var left = new Element('span', {
				'class': 'left',
				'events': {
					'click': focusSearchbar
				}
			}).inject(wrapper);
			var right = new Element('span', {
				'class': 'right',
				'events': {
					'click': focusSearchbar
				}
			}).inject(wrapper);
			var reset = new Element('div', {
				'class': 'reset',
				'events': {
					'click': function(){
						searchbar.set('value', '').focus();
						reset.setStyle('display', 'none');
					}
				}
			}).inject(wrapper);
			if (val == '' || val == this.options.placeholder) reset.setStyle('display', 'none');
			
			var searchbar = new Element('input', {
				'type': 'text',
				'class': 'type-search',
				'styles': {
					'width': width - left.getSize().x - right.getSize().x,
					'left': left.getSize().x,
					'outline': 0
				},
				'value': val || self.options.placeholder,
				'events': {
					'focus': function(){
						if (searchbar.get('value').trim() == self.options.placeholder) searchbar.set('value', '');
					},
					'blur': function(){
						if (searchbar.get('value').trim() == '') searchbar.set('value', self.options.placeholder);
					},
					'keyup': function(){
						reset.setStyle('display', (searchbar.get('value').trim() == '') ? 'none' : '');
					}
				}
			}).inject(left, 'after');
		}
	},
	
});

Element.implement({

	typeSearch: function(options){
		new typeSearch(this, options);
		return this;
	}

});