
var appManager = {
	csrftoken: "",

	init: function () {
		var self = this;

		self.fixCsrfToken();
		self.initClickHandlers();
	},
	initClickHandlers: function () {
		var self = this;

		$(document).on("click", "#getgraphdatabtn", function (e) {
			self.graphButtonClick(1);
		});
		$(document).on("click", "#getlinegraphdatabtn", function (e) {
			self.graphButtonClick(2);
		});

	},
	graphButtonClick: function (type) {
		var self = this;
		$(".error-wrapper").html("");
		var canSubmit = true;
		var message = "";

		if ($("#min").val() > $("#max").val()) {
			canSubmit = false;
			message += "Max value needs to be > min value";
			message += "<br />";
		}
		if($("#number_of_series").val() <= 0) {
			canSubmit = false;
			message += "Number of series needs to be > 0";
		}

		if (canSubmit) {
			self.getGraphDataAjaxCall($("#min").val(), $("#max").val(), $("#number_of_series").val(), type);
		}
		else {
			$(".error-wrapper").html(message);
		}
	},
	getGraphObjArray: function (data) {
		var graphObjs = [];
		for (var i = 0; i < data.length; i++) {
			var red = Math.floor((Math.random() * 255));
			var green = Math.floor((Math.random() * 255));
			var blue = Math.floor((Math.random() * 255));

			var tmp = {
				name: 'Serie ' + (i + 1),
				color: 'rgba(' + red + ', ' + green + ', ' + blue + ', .5)',
				data: data[i],
				pointStart: Date.UTC(2015, 0, 1),
				pointInterval: 24 * 3600 * 1000 // one day
			};
			graphObjs.push(tmp);
		}
		return graphObjs;
	},
	setupGraph: function (data, chartType) {
		var self = this;
		
		var graphSerieObjs = self.getGraphObjArray(data);

		$('.graph-container').highcharts({
			chart: {
				type: chartType,
				zoomType: 'xy'
			},
			title: {
				text: $("#title").val()
			},
			subtitle: {
				text: ''
			},
			xAxis: {
				type: 'datetime',
				dateTimeLabelFormats: { // don't display the dummy year
					month: '%e. %b',
					year: '%b'
				},
				title: {
					enabled: true,
					text: 'Date'
				},
				startOnTick: true,
				endOnTick: true,
				showLastLabel: true

			},
			yAxis: {
				title: {
					text: 'Min/Max'
				}
			},
			legend: {
				layout: 'vertical',
				align: 'left',
				verticalAlign: 'top',
				x: 100,
				y: 70,
				floating: true,
				backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
				borderWidth: 1
			},
			plotOptions: {
				scatter: {
					marker: {
						radius: 5,
						states: {
							hover: {
							enabled: true,
								lineColor: 'rgb(100,100,100)'
							}
						}
					},
					states: {
						hover: {
							marker: {
								enabled: false
							}
						}
					},
					tooltip: {
						headerFormat: '<b>{series.name}</b><br>',
						pointFormat: '{point.x}' + ' date, {point.y} val',
						pointFormatter: function () {
							var myDate = new Date(this.x).toISOString();

							return 'The value for <b>' + myDate +
							'</b> is <b>' + this.y + '</b>';
						}
					}
				}
			},

			series: graphSerieObjs
		});
	},

	getGraphDataAjaxCall: function (min, max, number_of_series, type) {
		var self = this;
		$.ajax({
			url: "/graph/generate/data/",
			type: 'POST',
			async: false,
			data: {
				min: min,
				max: max,
				number_of_series: number_of_series
			},
			complete: function(xhr, textStatus) {
			},
			success: function(data, textStatus, xhr) {
				if(data){
					var graphType = 'line';
					if(type == 1)
						graphType = 'scatter';
						
					self.setupGraph(data.data, graphType);
				}
				else {
					$(".error-wrapper").html("No data retrieved");
				}

			},
			error: function(xhr, textStatus, errorThrown) {
				/*//called when there is an error*/
				$(".error-wrapper").html("Error: " + errorThrown);
			}
		});
	},
	fixCsrfToken: function () {
		var self = this;
		self.csrftoken = self.getCookie('csrftoken');

		$.ajaxSetup({
			beforeSend: function(xhr, settings) {
				if (!self.csrfSafeMethod(settings.type) && !this.crossDomain) {
					xhr.setRequestHeader("X-CSRFToken", self.csrftoken);
				}
			}
		});

	},
	getCookie: function (name) {
		var cookieValue = null;
		if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = jQuery.trim(cookies[i]);
				// Does this cookie string begin with the name we want?
				if (cookie.substring(0, name.length + 1) == (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	},
	csrfSafeMethod: function (method) {
		// these HTTP methods do not require CSRF protection
		return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
	}
};

$(document).ready(function () {
	appManager.init();
});
