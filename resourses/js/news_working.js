var url = "https://fifa-2018-apis.herokuapp.com/fifa/news";

axios.get(url)
.then(function(res) {
    res.data.data.forEach( function(news) {
        console.log(news.news_title);
        var news_div = document.createElement('div');
        news_div.className = 'news';
        news_div.innerHTML = '<img class="news_img" src="' + news.image_link + '">';
        news_div.innerHTML += '<a class="news_title" href="' + news.news_link + '">' + news.news_title + '</a>';
        news_div.innerHTML += '<p class="news_date">' + news.date + '</p>';
        document.querySelector(".container").appendChild(news_div);
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
