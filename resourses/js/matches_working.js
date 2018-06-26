/*jshint esversion: 6 */
// ======================GLOBALS=======================
var url2 = "https://raw.githubusercontent.com/lsv/fifa-worldcup-2018/master/data.json";
var unknown_image = "https://d30y9cdsu7xlg0.cloudfront.net/png/513446-200.png";
var allMatches = [];
var allData = {};

// ===========================MAJOR FUNCTIONING===========================
document.addEventListener('DOMContentLoaded', () => {
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
        var knockout = res.data.knockout;
        Object.keys(knockout).forEach(function(data){
            knockout[data].matches.forEach(function(match) {
                var a_match = new Match(match.name, match.home_team, match.away_team, match.date, match.stadium, match.home_result, match.away_result, match.finished, match.matchday);
                allMatches[Number(a_match.name)] = a_match;
            });
        });
    })
    .then(function() {
        var temp_day;
        for(var i = 1; i < allMatches.length; i++) {
            var date = allMatches[i].date;
            var match_date = returnDate(date);

            if(i <= 48) {
                temp_day = createDateDiv(temp_day, match_date);
                if(allMatches[i].finished) {
                    createDoneMatch(i, match_date);
                } else {
                    createNotDoneMatch(i, match_date);
                }
            } else if(49 <= i && i <= 56) {
                temp_day = createDateDiv(temp_day, match_date);
                if(allMatches[i].finished) {
                    createDoneMatch(i, match_date);
                } else {
                    createNotDoneMatch(i, match_date);
                }
            } else if(57 <= i && i <= 60) {
                if(allMatches[i].finished) {
                    temp_day = createDateDiv(temp_day, match_date);
                    createDoneMatch(i, match_date);
                }
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
});

// ===============================HELPRE FUNCTIONS======================================

// Constructor function for making a match object
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

function returnDate(date) {
    var match_day = String(date).slice(8, 10) + ' ' + String(date).slice(5, 7);
    var match_time = (Number(String(date).slice(11, 13))) + String(date).slice(13 , 19);
    if(match_day[match_day.length-1] == 6) {
        match_day = match_day.slice(0, 3) + "June";
    } else if(match_day[match_day.length-1] == 7) {
        match_day = match_day.slice(0, 3) + "July";
    }
    var match_date = {
        match_day: match_day,
        match_time: match_time
    };
    return match_date;
}

function createDateDiv(temp_day, match_date) {
    if(temp_day != match_date.match_day) {
        var details_div = document.createElement('div');
        details_div.className = 'date';
        details_div.innerHTML = '<p class="matches_header">' + match_date.match_day + '</p>';
        document.querySelector(".matches-container").appendChild(details_div);
        temp_day = match_date.match_day;
    }
    return temp_day;
}

function returnTeam(team) {
    let temp_div = document.createElement('div');
    temp_div.className = 'team';
    if(String(team)[0] != 'r' && String(team)[0] != 'w') {
        temp_div.innerHTML = '<p class="team-name">' + allData.teams[Number(team)-1].name + '</p>';
        temp_div.innerHTML += '<img class="team-flag" src="' + allData.teams[Number(team)-1].flag + '">';
    } else {
        temp_div.innerHTML = '<p class="team-name">' + team + '</p>';
        temp_div.innerHTML += '<img class="team-flag" src="' + unknown_image + '">';
    }
    return temp_div;
}

function createMatch(i, match_date, inner) {
    var team_div = document.createElement('div');
    team_div.className = 'match';
    let temp_div1 = returnTeam(allMatches[i].home_team);
    team_div.appendChild(temp_div1);

    let center_div = document.createElement('div');
    center_div.className = 'centeral';
    center_div.innerHTML = '<p class="time">' + match_date.match_time + '</p>';

    let lower_center_div = document.createElement('div');
    lower_center_div.className = 'scores';
    lower_center_div.innerHTML = inner;
    center_div.appendChild(lower_center_div);
    team_div.appendChild(center_div);

    // console.log(String(allMatches[i].away_team));
    var temp_div2 = returnTeam(allMatches[i].away_team);
    team_div.appendChild(temp_div2);
    document.querySelector(".matches-container").appendChild(team_div);
}

function createDoneMatch (i, match_date) {
    var inner = '<p class="home_result">' + allMatches[i].home_result + '</p>' + '<p>-</p>' + '<p class="away_result">' + allMatches[i].away_result + '</p>';
    createMatch(i, match_date, inner);
}

function createNotDoneMatch (i, match_date) {
    var inner = '<p>VS</p>';
    createMatch(i, match_date, inner);
}
