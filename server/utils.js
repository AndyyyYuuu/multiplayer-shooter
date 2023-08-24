module.exports = {
	makeId,
}

function makeId(length){
	var result = '';
	var characters = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890";
	for (var i=0; i<length; i++){
		result += characters.charAt(Math.floor(Math.random()*characters.length));
	}
	return result;
}