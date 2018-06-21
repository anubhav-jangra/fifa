var url = "https://raw.githubusercontent.com/lsv/fifa-worldcup-2018/master/data.json";

axios.get(url)
.then(function(res) {
    var i = 0;
    res.data.teams.forEach(function(data){
        if(i % 4 == 0) {
            var group_div = document.createElement('div');
            group_div.className = 'group';
            group_div.innerHTML = '<p>Group ' + String.fromCharCode(i/4 + 65) + '</p>';
            document.querySelector(".team-container").appendChild(group_div);
        }
        i++;
        console.log(data);
        var temp_div = document.createElement('div');
        temp_div.className = 'team';
        temp_div.innerHTML = '<p class="name">' + data.id + '. ' + data.name + ' (' + data.fifaCode + ')</p>' + '<img class="flag" src="' + data.flag + '">';
        document.querySelector(".team-container").appendChild(temp_div);
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
