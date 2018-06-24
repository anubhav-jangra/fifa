var url = "https://fifa-2018-apis.herokuapp.com/fifa/grouptable";

axios.get(url)
.then(function(res) {
    var i = 1;
    res.data.data.forEach(function(data){
        Object.keys(data).forEach(function(team, index){
            console.log(team);
            if(team == "title") {
                var group_div = document.createElement('div');
                group_div.className = 'group';
                group_div.innerHTML = '<p>' + data[team] + '</p>';
                document.querySelector(".team-container").appendChild(group_div);
                var details_div = document.createElement('div');
                details_div.className = 'details';
                details_div.innerHTML = '<p class="teams_header">Teams</p>';
                details_div.innerHTML += '<p>P</p>';
                details_div.innerHTML += '<p>W</p>';
                details_div.innerHTML += '<p>D</p>';
                details_div.innerHTML += '<p>L</p>';
                details_div.innerHTML += '<p>F/A</p>';
                details_div.innerHTML += '<p>Pts</p>';
                document.querySelector(".team-container").appendChild(details_div);
            } else {
                var temp_div = document.createElement('div');
                temp_div.className = 'team';
                temp_div.innerHTML = '<p class="index">' + index + '. ' + '</p>';
                temp_div.innerHTML += '<img class="flag" src="' + data[team].flag + '">';
                temp_div.innerHTML += '<p class="name">' + data[team].display_name + '</p>';
                temp_div.innerHTML += '<p class="played">' + data[team].matches_played + '</p>';
                temp_div.innerHTML += '<p class="win">' + data[team].matches_win + '</p>';
                temp_div.innerHTML += '<p class="draw">' + data[team].matches_draw + '</p>';
                temp_div.innerHTML += '<p class="lost">' + data[team].matches_lost + '</p>';
                temp_div.innerHTML += '<p class="goals">' + data[team].goal_for + '/' + data[team].goal_against + '</p>';
                temp_div.innerHTML += '<p class="points">' + data[team].points + '</p>';
                document.querySelector(".team-container").appendChild(temp_div);
            }
        });
    });
})
.catch(function(err) {
    if (err.response) {
        console.log("PROBLLEM WITH RESPONSE!", err.response.status);
    } else if (err.request) {
        console.log("PROBLEM WITH REQUEST!");
    } else {
        console.log("ERROR", err.message);
    }
});
