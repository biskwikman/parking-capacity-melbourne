var occupied = 0;
var unoccupied = 0;
var total = 0;

$(document).ready(function() {
  $.ajax({
    url: "https://data.melbourne.vic.gov.au/resource/dtpv-d4pf.json?status=Present",
    type: "GET",
    data: {
      "$limit" : 5000,
      "$$app_token" : "KlBXA6JcRaU33YUSuYFfxRgpz"
      }
  }).done(function(data) {
    occupied = data.length;
    console.log(data);
    $.ajax({
      url: "https://data.melbourne.vic.gov.au/resource/dtpv-d4pf.json?status=Unoccupied",
      type: "GET",
      data: {
        "$limit" : 5000,
        "$$app_token" : "KlBXA6JcRaU33YUSuYFfxRgpz"
      }
    }).done(function(data) {
      unoccupied = data.length;
      console.log(data);
      total = occupied + unoccupied;
      console.log(total);
      
      //put d3 code below here
      var pie = new d3pie("pieChart", {
	"header": {
		"title": {
			"text": "How full are Melbourne's Parking Bays?",
			"fontSize": 24,
			"font": "open sans"
		},
		"subtitle": {
			"text": "A pie chart which displays how many of Melbourne's electronically monitored on-street parking bays are full",
			"color": "#999999",
			"fontSize": 12,
			"font": "open sans"
		},
		"titleSubtitlePadding": 9
	},
	"footer": {
		"color": "#999999",
		"fontSize": 10,
		"font": "open sans",
		"location": "bottom-left"
	},
	"size": {
		"canvasWidth": 590,
		"pieOuterRadius": "92%"
	},
	"data": {
		"sortOrder": "value-desc",
		"content": [
			{
				"label": "Occupied",
				"value": occupied,
				"color": "#f61c1c"
			},
			{
				"label": "Unoccupied",
				"value": unoccupied,
				"color": "#503d8d"
			},
			{
				"label": "Unknown",
				"value": 4071 - total,
				"color": "#6e6d6d"
			}
		]
	},
	"labels": {
		"outer": {
			"pieDistance": 32
		},
		"inner": {
			"hideWhenLessThanPercentage": 1
		},
		"mainLabel": {
			"fontSize": 11
		},
		"percentage": {
			"color": "#ffffff",
			"decimalPlaces": 0
		},
		"value": {
			"color": "#adadad",
			"fontSize": 11
		},
		"lines": {
			"enabled": true
		},
		"truncation": {
			"enabled": true
		}
	},
	"effects": {
		"pullOutSegmentOnClick": {
			"effect": "linear",
			"speed": 400,
			"size": 8
		}
	},
	"misc": {
		"gradient": {
			"enabled": false,
			"percentage": 100
		}
	}
});
      
    });
  });
  
});