console.log('from client');

console.log(socket);
socket.emit("hello",'salut');
socket.on("newEleve", function(msg) {
    console.log(msg);
    addItemToList(msg);

});
socket.on("liste", function(msg) {
    console.log("get list socket");
    console.log(msg);
    // addItemToList(msg);

});
// socket.on("newTwit", function(msg) {
//     console.log("get list twit");
//     console.log(msg);
//     // addItemToList(msg);

// });
socket.on("deleteUser", function(msg) {
    console.log("delete list ");
    console.log(msg);
    var elem = document.getElementById(msg.id);
    elem.remove();
    // addItemToList(msg);

});
socket.on("updateUser", function(user) {
    console.log('user edition socket');
   console.log(user);
   var liToEdit = document.getElementById(user._id);
   var spanId = "info" + user._id;
   var spanToEdit = document.getElementById(spanId);
   spanToEdit.innerHTML = user.Nom + " " + user.Prenom;
  
});
// socket.emit('hello', {
//     "salut": "toi"
// });

// fonction pour delete user
function deleteUser(id) {
    // je crée une promesse pour pouvoir chainer la réponse
    return new Promise(function(resolve, reject) {
        var deleteReq = new XMLHttpRequest();
        deleteReq.open("DELETE", "http://localhost:3001/liste/" + id, true);
        deleteReq.setRequestHeader("Content-type", "application/json");
        deleteReq.send();
        deleteReq.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                // var addEleve = JSON.parse(this.responseText);
                // console.log(this.responseText);
                alert(this.responseText);
                // je résout ma promesse, the peux la récupérer dans le callback de mon then
                resolve(this.responseText);
            }
            if (this.status == 500) {
                reject({
                    "msg": 'problème serveur',
                    "code": 102
                });
            }
        };
    });

}

function addItemToList(item) {

    var monUl = document.getElementById("maListe");
    // je crée un li
    var li = document.createElement("li");
     li.id = item._id;
    // j'ajout un span qui contient les infos des user
    var spanInfo = document.createElement("span");
    spanInfo.id = "info" + item._id;
    spanInfo.innerHTML = item.Nom + " " + item.Prenom;

    // le span va réagir au clic pour afficher le profil
    spanInfo.addEventListener("click", function(event) {
        // console.log('je clique');
        window.location.href = "http://localhost:3001/profil?id=" + item._id;
    });
    // j'ajoute mon span au li
    li.appendChild(spanInfo);

    // je crée un span qui va gérer l'édition 
    var spanEdit = document.createElement("span");
    spanEdit.innerHTML = "<span class='edit'>Edit</span>";
    spanEdit.addEventListener("click", function(event) {
        event.preventDefault();
        // le span me redirige vers la page d'édition qui est la même que pour ajouter un nouveau user mais avec l'id en query et un boolean pour indiquer si je suis en mode etition ou ajout
        window.location.href = "http://localhost:3001/new?edit=true&id=" + item._id;
    });
    li.appendChild(spanEdit);

    // je crée un span pour gérer la suppression
    var spanDelete = document.createElement("span");
    spanDelete.innerHTML = "<span class='delete'>Delete</span>";

    spanDelete.addEventListener("click", function(event) {
        event.preventDefault();
        // je demande a l'utilisateur de confirmer avant
        var conf = confirm("voulez vous supprimer cet utilisateur ?");
        if (conf == true) {
            // j'appelle ma fonction deleteUser qui me retourne une promesse, je peux donc utiliser .then...
            deleteUser(item._id).then(function(success) {
                // je récupère le parent du parent de mon span delete, afin de remove l'element li de la liste une fois l'element supprimé de ma base de données
                // var elem = event.target.parentNode.parentNode;
                // elem.remove();
            }, function(err) {
                console.log(err);
            });

        } else {
            console.log("cancel");
        }
    });
    li.appendChild(spanDelete);

    // J'ajoute finalement le li contenant tous les spans a mon ul
    monUl.appendChild(li);

}
// function de création de la liste
function populateList(collectionString) {
    // je reçoit la liste en string, je la parse en json pour pouvoir la manipuler
    var collection = JSON.parse(collectionString);
    // je vais chercher mon container ul
    var monUl = document.getElementById("maListe");

    // pour chaque item de ma collection
    collection.forEach(function(item) {
        // je crée un li
        var li = document.createElement("li");

        li.id = item._id;
        // j'ajout un span qui contient les infos des user
        var spanInfo = document.createElement("span");
        spanInfo.id = "info" + item._id
        spanInfo.innerHTML = item.Nom + " " + item.Prenom;

        // le span va réagir au clic pour afficher le profil
        spanInfo.addEventListener("click", function(event) {
            console.log('je clique');
            window.location.href = "http://localhost:3001/profil?id=" + item._id;
        });
        // j'ajoute mon span au li
        li.appendChild(spanInfo);

        // je crée un span qui va gérer l'édition 
        var spanEdit = document.createElement("span");
        spanEdit.innerHTML = "<span class='edit'>Edit</span>";
        spanEdit.addEventListener("click", function(event) {
            event.preventDefault();
            // le span me redirige vers la page d'édition qui est la même que pour ajouter un nouveau user mais avec l'id en query et un boolean pour indiquer si je suis en mode etition ou ajout
            window.location.href = "http://localhost:3001/new?edit=true&id=" + item._id;
        });
        li.appendChild(spanEdit);

        // je crée un span pour gérer la suppression
        var spanDelete = document.createElement("span");
        spanDelete.innerHTML = "<span class='delete'>Delete</span>";

        spanDelete.addEventListener("click", function(event) {
            event.preventDefault();
            // je demande a l'utilisateur de confirmer avant
            var conf = confirm("voulez vous supprimer cet utilisateur ?");
            if (conf == true) {
                // j'appelle ma fonction deleteUser qui me retourne une promesse, je peux donc utiliser .then...
                deleteUser(item._id).then(function(success) {
                    // je récupère le parent du parent de mon span delete, afin de remove l'element li de la liste une fois l'element supprimé de ma base de données
                    // var elem = event.target.parentNode.parentNode;
                    // elem.remove();
                    console.log('eleve deleted');
                }, function(err) {
                    console.log(err);
                });

            } else {
                console.log("cancel");
            }
        });
        li.appendChild(spanDelete);

        // J'ajoute finalement le li contenant tous les spans a mon ul
        monUl.appendChild(li);
    })
}

// je prépare ma requette http get pour aller récupérer la liste sur mon API
var xhttp = new XMLHttpRequest();

xhttp.open("GET", "http://localhost:3001/liste", true);

xhttp.send();

// console.log(this);

// j'écoute les évenements de ma requete, readystate et status
xhttp.onreadystatechange = function() {

    // console.log("state : " + this.readyState);
    // console.log("status :" + this.status);
    // console.log("responseText :" + this.responseText);


    // if readystate = 4 et status 200, ma requete est ok
    if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        // console.log("requete OK");
        // document.getElementById("demo").innerHTML = this.responseText;
        // je passe le resultat de ma requete (responseText), en string, a ma fonction pour créer la liste et les spans
        populateList(this.responseText);
    }
};



