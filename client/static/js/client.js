console.log('from client');

function populateList(collectionString) {
    var collection = JSON.parse(collectionString);
    var monUl = document.getElementById("maListe");

    collection.forEach(function(item) {
        var li = document.createElement("li");
        li.innerHTML = item.Nom + " " + item.Prenom;


        li.addEventListener("click", function(event) {
            console.log('je clique');
            // console.log(event.target);
            // console.log(item);
            window.location.href= "http://localhost:3001/profil?id=" + item._id;
        });
        monUl.appendChild(li);
    })
}

var xhttp = new XMLHttpRequest();

xhttp.open("GET", "http://localhost:3001/liste", true);

xhttp.send();

// console.log(this);

xhttp.onreadystatechange = function() {

    console.log("state : " + this.readyState);
    console.log("status :" + this.status);
    console.log("responseText :" + this.responseText);



    if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        console.log("requete OK");
        // document.getElementById("demo").innerHTML = this.responseText;
        populateList(this.responseText);
    }
};