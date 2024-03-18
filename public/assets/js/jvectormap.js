!function($) {
    "use strict";
	
	$('#world_map').vectorMap({
		map: 'world_mill',
		scaleColors : ['#7539FF', '#7539FF'],
		normalizeFunction : 'polynomial',
		hoverOpacity : 0.7,
		hoverColor : false,
		regionStyle : {
			initial : {
				fill : '#7638ff'
			}
		},
		backgroundColor : 'transparent'
	});
	
	$('#usa').vectorMap({
		map: 'us_aea',
		backgroundColor: 'transparent',
		regionStyle: {
			initial: {
				fill: '#7638ff'
			}
		}
	});
	$('#india').vectorMap({
		map : 'in_mill',
		backgroundColor : 'transparent',
		regionStyle : {
			initial : {
				fill : '#7638ff'
			}
		}
	});
	$('#uk').vectorMap({map: 'uk_countries_mill',backgroundColor: 'transparent',
			  regionStyle: {
				initial: {
				  fill: '#7638ff'
				}
			  }});
	$('#russia').vectorMap({
		map: 'ru_mill',
		backgroundColor: 'transparent',
			  regionStyle: {
				initial: {
				  fill: '#7638ff'
				}
			  }});

}(window.jQuery)
