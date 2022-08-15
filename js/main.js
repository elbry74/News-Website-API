var news;
var term;
var searchInp = document.getElementById('searchInp');
var links = document.getElementsByClassName('nav-link');
var category = 'general';
var country = 'eg';


getNews();

searchInp.addEventListener('keyup', function() {
    term = searchInp.value;
    console.log(term);
    globalSearch();
})


for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function(e) {
        category = e.target.innerHTML;
        getNews()
    })
}

function getNews() {


    var req;

    if (window.XMLHttpRequest) {
        // code for modern browsers
        req = new XMLHttpRequest();
    } else {
        // code for old IE browsers
        req = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var url = `https://newsapi.org/v2/top-headlines?country=` + country + `&category=` + category + `&apiKey=0cb64ad860124ad390f292aa497d2a41`;
    req.open("GET", url);

    req.onreadystatechange = function() {
        if (req.status == 200 && req.readyState == 4) {
            news = JSON.parse(req.response);
            news = news.articles;
            displayNews()
        }
    }
    req.send();
}

function displayNews() {
    var temp = "";
    for (var i = 0; i < news.length; i++) {
        temp += `<div class="col-lg-3 col-sm-6">
        <a href="` + news[i].url + `" class="linkUrl" target="_blank">
            <div class="new text-right">
            <img src="` + news[i].urlToImage + `" class="img-fluid"/>
                <h5>` + news[i].title + `</h5>
                <p class="text-muted">` + news[i].description + `</p>
                
            </div>
            </a>
        </div>`
    }

    document.getElementById("NewsRow").innerHTML = temp;
}

function globalSearch() {
    var req;

    if (window.XMLHttpRequest) {
        // code for modern browsers
        req = new XMLHttpRequest();
    } else {
        // code for old IE browsers
        req = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var url = `https://newsapi.org/v2/top-headlines?country=` + country + `&category=` + term + `&apiKey=0cb64ad860124ad390f292aa497d2a41`;
    
    req.open("GET", url);

    req.onreadystatechange = function() {
        if (req.status == 200 && req.readyState == 4) {
            news = JSON.parse(req.response);
            news = news.articles;
            displayNews()
        }
    }
    req.send();
}