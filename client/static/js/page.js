console.log('from client page2');
var url = new URLSearchParams(document.location.search.substring(1));
var userId = url.get("id"); 

// function populateList(collectionString){
// 	var collection = JSON.parse(collectionString);
// 	var monUl = document.getElementById("maListe");

// 	collection.forEach(function(item){
// 		var li = document.createElement("li");
// 		li.innerHTML = item.Nom +" "+ item.Prenom;
// 		monUl.appendChild(li);
// 	})
// }

var xhttp = new XMLHttpRequest();

xhttp.open("GET", "http://localhost:3001/liste/" + userId, true);

xhttp.send();

// console.log(this);

xhttp.onreadystatechange = function() {

	console.log("state : " + this.readyState);
	console.log("status :" + this.status);
	console.log("responseText :" + this.responseText);
	


    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       console.log("requete OK");
       document.getElementById("bindUser").innerHTML = this.responseText;
       var responseJson = JSON.parse(this.responseText);
       document.getElementById("nom").innerHTML = responseJson.Nom;
       document.getElementById("prenom").innerHTML = responseJson.Prenom;
       // populateList(this.responseText);
    }
};

