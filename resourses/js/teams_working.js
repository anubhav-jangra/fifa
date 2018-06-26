var url = "https://raw.githubusercontent.com/lsv/fifa-worldcup-2018/master/data.json";

document.addEventListener('DOMContentLoaded', () => {
    (function($) {
        var $window = $(window),
            $menu = $('.ui.menu');

        function resize() {
            if ($window.width() < 580) {
                $menu.addClass('tiny');
                $menu.removeClass('massive');
                return $menu.removeClass('pointing');
            }
            $menu.addClass('massive');
            $menu.addClass('pointing');
            $menu.removeClass('tiny');
        }

        $window
            .resize(resize)
            .trigger('resize');
    })(jQuery);
    axios.get(url)
    .then(function(res) {
        var i = 0;
        res.data.teams.forEach(function(data){
            if(i % 4 == 0) {
                createGroupTemplate(i);
            }
            i++;
            console.log(data);
            createTeamTemplate(data);
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
});

function createGroupTemplate(i) {
    var group_div = document.createElement('div');
    group_div.className = 'group';
    group_div.innerHTML = '<p>Group ' + String.fromCharCode(i/4 + 65) + '</p>';
    document.querySelector(".team-container").appendChild(group_div);
}

function createTeamTemplate(data) {
    var temp_div = document.createElement('div');
    temp_div.className = 'team';
    temp_div.innerHTML = '<p class="name">' + data.id + '. ' + data.name + ' (' + data.fifaCode + ')</p>' + '<img class="flag" src="' + data.flag + '">';
    document.querySelector(".team-container").appendChild(temp_div);
}
