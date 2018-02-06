// je récupère les valeurs en paramètres dans l'url
var url = new URLSearchParams(document.location.search.substring(1));
// mon user id:
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

// je crée une nouvelle requette HTTP pour récuperer les infos de mon objet
var xhttp = new XMLHttpRequest();

// je passe l'id en paramètre
xhttp.open("GET", "http://localhost:3001/liste/" + userId, true);

xhttp.send();

// console.log(this);

xhttp.onreadystatechange = function() {

	console.log("state : " + this.readyState);
	console.log("status :" + this.status);
	console.log("responseText :" + this.responseText);
	


    if (this.readyState == 4 && this.status == 200) {
       document.getElementById("bindUser").innerHTML = this.responseText;
       // je parse ma responseText en json pour pouvoir la manipuler
       var responseJson = JSON.parse(this.responseText);
       // je bind les infos de mon json dans ma vue
       document.getElementById("nom").innerHTML = responseJson.Nom;
       document.getElementById("prenom").innerHTML = responseJson.Prenom;
    }
};

