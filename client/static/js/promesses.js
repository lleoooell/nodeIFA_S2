console.log('im in promesses');

var results = [];


function getSearchResults(searchString) {
    var toSearch = {
        recherche: searchString
    }
    return new Promise(function(resolve, reject) {
        var getSearchResults = new XMLHttpRequest();
        getSearchResults.open("POST", "http://localhost:3001/search/", true);
        getSearchResults.setRequestHeader("Content-type", "application/json");
        getSearchResults.send(JSON.stringify(toSearch));
        getSearchResults.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                // var addEleve = JSON.parse(this.responseText);
                console.log(this.responseText);
                // alert(this.responseText);
                // je résout ma promesse, the peux la récupérer dans le callback de mon then
                resolve(this.responseText);
            }
        }
    })
}

function getDetail(searchResults) {
    console.log(searchResults);
    var toSearchJs = JSON.parse(searchResults);
    var objToPush = {};
    var all = [];
    toSearchJs.forEach(function(item) {

        new Promise(function(resolve, reject) {
            var getDetails = new XMLHttpRequest();
            getDetails.open("POST", "http://localhost:3001/detail/", true);
            getDetails.setRequestHeader("Content-type", "application/json");
            var toDetail = {
            	detail : JSON.stringify(item.link)
            }
            getDetails.send(JSON.stringify(toDetail));
            getDetails.onreadystatechange = function() {
                if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                    // var addEleve = JSON.parse(this.responseText);
                    console.log(this.responseText);
                    // alert(this.responseText);
                    // je résout ma promesse, the peux la récupérer dans le callback de mon then
                    var truc = resolve(JSON.parse(this.responseText));
                    all.push(truc);
                }
            }
        });

    });
    Promise.all(all).then(function(results){
    	console.log('im all done');
    	console.log(results);
    });

}

function populateHtml() {

}

function endOfJob() {
    console.log('im done with all my promises');
}

// click.listener(function(clic) {
// 	//onclick step 1
// 	searchList = event
// 	getSearchResults(searchList);
// 	// then
// 	getDetail(forEach.searchList);
// 	// then
// 	populateHtml(results);

// 	endOfJob();
// })
var form = document.getElementById("form-id");
form.addEventListener("submit", function(event) {
    console.log(form.elements);
    event.preventDefault();
    var searchStr = document.getElementById("SearchTxt").value;
    console.log(searchStr);

    var promesse1 = getSearchResults(searchStr);
    promesse1.then(function(results) {
        console.log(results);
        var promesse2 = getDetail(results);
    });


})