// j'instancie les variables qui vont etres utiles: formulaire, userId et isEdit
var form = document.getElementById("form-id");
var url = new URLSearchParams(document.location.search.substring(1));
var userId = url.get("id");
var isEdit = url.get("edit");

// je crée une promesse pour récuperer les infos de l'utilisateur à partir de l'id en paramètres dans l'url
var getUserID = new Promise(function(resolve, reject) {
    if (userId) {
        var getUserReq = new XMLHttpRequest();
        getUserReq.open("GET", "http://localhost:3001/liste/" + userId, true);
        getUserReq.send();
        getUserReq.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            	// je parse ma réponse en json 
                var responseJson = JSON.parse(this.responseText);
                // je résout ma promesse avec ma response en json
                resolve(responseJson);
            }
        };
    }
});

// function getUser(id) {
//     var getUserReq = new XMLHttpRequest();
//     getUserReq.open("GET", "http://localhost:3001/liste/" + id, true);
//     getUserReq.send();
//     getUserReq.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//         	// console.log(this.responseText);
//             var responseJson = JSON.parse(this.responseText);
//             // console.log(responseJson);
//             return responseJson;
//         }
//     };
// };
// fonction helper pour créer un user
function createUser(newUser) {
    var createUserReq = new XMLHttpRequest();
    createUserReq.open("POST", "http://localhost:3001/liste/", true);
    // je défini le header de ma requête pour indiquer au serveur que je vais lui transmettre du json
    createUserReq.setRequestHeader("Content-type", "application/json");
    createUserReq.send(JSON.stringify(newUser));
    createUserReq.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            var addEleve = JSON.parse(this.responseText);
            alert('new user created ' + this.responseText);
            window.location.href='/';
        }
    };
};
// fonction helper pour editer un user
function updateUser(userToEdit) {
    var editReq = new XMLHttpRequest();
    editReq.open("POST", "http://localhost:3001/liste/"+ userId, true);
    editReq.setRequestHeader("Content-type", "application/json");
    editReq.send(JSON.stringify(userToEdit));
    editReq.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            // var addEleve = JSON.parse(editReq.responseText);
            alert('edition OK');
            window.location.href='/'
        }
    };
};

// ce qu'il se passe si dans l'url j'ai edit à true
if (isEdit && isEdit == "true") {
    console.log("edition mode");
    document.getElementById("title").innerHTML = "Editer Elève";
    // j'appelle ma promesse pour récuperer les infos ... then, binder les valeurs dans les champs de mon form afin qu'il soit pré rempli
    getUserID.then(function(userToEdit) {
    	// j'utilise lodash, _, pour boucler dans mon objet
        _.forIn(form.elements, function(item) {
        	// pour chaque input de mon formulaire, parce que le name est le même que les clés de mon modèle, je peux dire que la valeur de chaque input est égale à la valeur de la clé de mon objet à éditer 
            item.value = userToEdit[item.name];
        });
        // je capture la soumission du form
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            // pour chaque element dans mon form
            for (i = 0; i < form.elements.length; i++) {
                if (form.elements[i].value !== "submit") {
                	// si l'element n'est pas de type submit, alors mon objet a éditer se voit assigner les valeurs des champs de mon form
                    userToEdit[form.elements[i].name] = form.elements[i].value;
                }
            };
            // je passe une fois l'objet a éditer a mon helper d'edition
            updateUser(userToEdit);

        })

    });



} 
// ce qu'il se passe quand la page n'est pas en mode edition donc en creation...
else if (!isEdit) {
    console.log("not edition mode");
    form.addEventListener("submit", function(event) {
        console.log(form.elements);
        event.preventDefault();
        // j'instancie l'objet que je vais save
        var newUser = {};
        // pour chaque élément de mon form j'assigne la clé/valeur a mon objet
        for (i = 0; i < form.elements.length; i++) {
            if (form.elements[i].value !== "submit") {
                console.log(form.elements[i].value);
                console.log(form.elements[i].name);
                newUser[form.elements[i].name] = form.elements[i].value;
                console.log(newUser);


            }
        };

        console.log("user final " + newUser.toString());
        // j'envoie le nouvel objet ainsi crée vers le helper de creation
        createUser(newUser);

    })
}