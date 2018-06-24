// var today = new Date();
// var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
// var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
// var dateTime = date+' '+time;
// console.log(today.getDate() + " " + today.getMonth() + " " + today.getFullYear());

var url2 = "https://raw.githubusercontent.com/lsv/fifa-worldcup-2018/master/data.json";

function Match(name, home_team, away_team, date, stadium, home_result, away_result, finished, match_day) {
    this.name           = name;
    this.home_team      = home_team;
    this.away_team      = away_team;
    this.date           = date;
    this.stadium        = stadium;
    this.home_result    = home_result;
    this.away_result    = away_result;
    this.finished       = (finished === true);
    this.match_day      = match_day;
}

var allMatches = [];
var allData = {};

axios.get(url2)
.then(function(res) {
    allData = res.data;
    var groups = res.data.groups;
    Object.keys(groups).forEach(function(data){
        groups[data].matches.forEach(function(match) {
            var a_match = new Match(match.name, match.home_team, match.away_team, match.date, match.stadium, match.home_result, match.away_result, match.finished, match.matchday);
            allMatches[Number(a_match.name)] = a_match;
        });
    });
})
.then(function(){
    console.log(allMatches);
    // console.log(allData.teams);
    var temp_day;
    for(var i = 1; i < allMatches.length; i++) {
        var date = allMatches[i].date;
        var match_day = String(date).slice(8, 10) + ' ' + String(date).slice(5, 7);
        if(match_day[match_day.length-1] == 6) {
            match_day = match_day.slice(0, 3) + "June";
        }
        if(temp_day != match_day) {
            var details_div = document.createElement('div');
            details_div.className = 'date';
            details_div.innerHTML = '<p class="matches_header">' + match_day + '</p>';
            document.querySelector(".matches-container").appendChild(details_div);
            temp_day = match_day;
        }
        var team_div = document.createElement('div');
        if(allMatches[i].finished) {
            team_div.className = 'match';
            // team_div.innerHTML = '<p class="home_team">' +  + '</p>';
            var temp_div1 = document.createElement('div');
            temp_div1.className = 'team';
            temp_div1.innerHTML = '<p class="team-name">' + allData.teams[Number(allMatches[i].home_team)-1].name + '</p>';
            temp_div1.innerHTML += '<img class="team-flag" src="' + allData.teams[Number(allMatches[i].home_team)-1].flag + '">';
            team_div.appendChild(temp_div1);

            team_div.innerHTML += '<p class="home_result">' + allMatches[i].home_result + '</p>';

            team_div.innerHTML += '<p>-</p>';

            team_div.innerHTML += '<p class="away_result">' + allMatches[i].away_result + '</p>';

            var temp_div2 = document.createElement('div');
            temp_div2.className = 'team';
            temp_div2.innerHTML = '<p class="team-name">' + allData.teams[Number(allMatches[i].away_team)-1].name + '</p>';
            temp_div2.innerHTML += '<img class="team-flag" src="' + allData.teams[Number(allMatches[i].away_team)-1].flag + '">';

            team_div.appendChild(temp_div2);
            document.querySelector(".matches-container").appendChild(team_div);
        } else {
            team_div.className = 'match';
            // team_div.innerHTML = '<p class="home_team">' +  + '</p>';
            var temp_div1 = document.createElement('div');
            temp_div1.className = 'team';
            temp_div1.innerHTML = '<p class="team-name">' + allData.teams[Number(allMatches[i].home_team)-1].name + '</p>';
            temp_div1.innerHTML += '<img class="team-flag" src="' + allData.teams[Number(allMatches[i].home_team)-1].flag + '">';
            team_div.appendChild(temp_div1);

            team_div.innerHTML += '<p>VS</p>';

            var temp_div2 = document.createElement('div');
            temp_div2.className = 'team';
            temp_div2.innerHTML = '<p class="team-name">' + allData.teams[Number(allMatches[i].away_team)-1].name + '</p>';
            temp_div2.innerHTML += '<img class="team-flag" src="' + allData.teams[Number(allMatches[i].away_team)-1].flag + '">';

            team_div.appendChild(temp_div2);
            document.querySelector(".matches-container").appendChild(team_div);
        }
    }
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

// var url = "https://fifa-2018-apis.herokuapp.com/fifa/fixtures";
// axios.get(url)
// .then(function(res) {
//     var i = 1;
//     console.log(res.data.data);
//         Object.keys(res.data.data.group_stages).forEach(function(day, index) {
//             console.log(day);
//         });
// })
// .catch(function(err) {
//     if (err.response) {
//         console.log("PROBLLEM WITH RESPONSE!", err.response.status);
//     } else if (err.request) {
//         console.log("PROBLEM WITH REQUEST!");
//     } else {
//         console.log("ERROR", err.message);
//     }
// });
