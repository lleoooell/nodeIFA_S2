console.log("twitter page");

var socket = io();

function convertTime(timestamp){
	moment.locale('fr');
	return moment(timestamp,'x').fromNow();
}
function insertTwit(tweet){
	var ul = document.getElementById("twtContainer");

	var li = document.createElement("li");

	li.classList.add("twtItem");

	var img = document.createElement("img");
	img.src = tweet.user.profile_image_url;
	img.classList.add("userImg");

	li.prepend(img);

	var cont = document.createElement("span");
	var user = document.createElement('p');
	user.classList.add('userName');
	user.innerHTML = '@' + tweet.user.name + ' <span class="timestamp">(' + convertTime(tweet.timestamp_ms)+')</span>';
	cont.prepend(user);

	var text = document.createElement('p');
	text.innerHTML = tweet.text;

	cont.appendChild(text);
	li.appendChild(cont);
	ul.prepend(li);
}
socket.on("newTwit", function(msg) {
    console.log(msg);
    insertTwit(msg);
})