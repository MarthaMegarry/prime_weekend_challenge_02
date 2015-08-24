//var apikey = 'something something'
var apikey = '457f7d08-2801-4a8a-adc6-145c04ed3a65';



$(document).ready(function(){
	$('#go').on('click', function(e){
		$('.current').remove();
		var query = $('#summonerName').val();
		var region = $('#region').val();
		console.log('Searching: ', query);
		search(query, region);
	})	
});

function search(query, region){
	var summoner = query.toLowerCase();
	$.ajax({
		type: 'GET',
	    url: 'https://' + region + '.api.pvp.net/api/lol/' + region + '/v1.4/summoner/by-name/' + query + '?api_key=' + apikey,
	    crossDomain: true,
	    dataType: 'json',
	    success: function (response) {
	    	console.log(region);
	        var summonerID = response[summoner]['id'];
	        getRecentGames(summonerID, region);
	    },
	    error: function (xhr, status) {
	        alert('Error: ' + status);
	    }
	});
}

function getRecentGames(summonerID, region) {
	console.log(summonerID);
	$.ajax({
		type: 'GET',
	    url: 'https://' + region + '.api.pvp.net/api/lol/' + region + '/v1.3/game/by-summoner/' + summonerID + '/recent' + '?api_key=' + apikey,
	    crossDomain: true,
	    dataType: 'json',
	    success: function (response) {
	        console.log(response.games);
	        for(i = 0; i < response.games.length; i++) {
	        	var champID = response['games'][i].championId;
	        	console.log(champID);
	        	getChampInfo(champID, region);
	        }
	    },
	    error: function (xhr, status) {
	        alert('Error: ' + status);
	    }
	});
}

function getChampInfo(champID, region) {
		$.ajax({
			type: 'GET',
		    url: 'https://global.api.pvp.net/api/lol/static-data/' + region + '/v1.2/champion/' + champID + '?champData=image' + '&api_key=' + apikey,
		    crossDomain: true,
		    dataType: 'json',
		    success: function (response) {
		        console.log(response);
		        console.log(response['name']);
		        var $div = $('<div></div>').attr('class', 'current');
		        var $awesome = $div.text(response['name']);
		        $('.content').append($awesome);
		        
		    },
		    error: function (xhr, status) {
		        alert('Error: ' + status);
		    }
		});
	}


