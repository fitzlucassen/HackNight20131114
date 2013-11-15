function MainView() {

}

// Ajoute un nouvel utilisateur dans le DOM
MainView.prototype.appendUser = function(user){
    if($('.' + user.id).length === 0){
	var html = '';
	html += '<div class="carteVisite ' + user.id + '">';
	html += '<img src="' + user.image + '" alt="' + user.pseudo + '" />';
	html += '<span class="scPseudo">' + user.pseudo + '</span>';
	html += '<div class="timeline timeline' + user.id + '">';
	html += '<h2 class="headerTweet">Derniers tweet de <b>' + user.pseudo + '</b></h2>';
	html += '<div class="tweetsHere tweetsHere' + user.id + '"></div>';
	html += '</div>';
	html += '</div>';

	$('#tableOfCard').append(html);
	
	if($('.carteVisite').length > 1){
	    $('.carteVisite').css({display: 'inline-block', margin:'0 5px'});
	    $('#tableOfCard').css({width: ($('.carteVisite').length * 310) + 'px'});
	}
    }
};
// Supprime un utilisateur du DOM
MainView.prototype.deleteUser = function(user){
    $('.' + user.id).remove();
};
// Ajoute un tweet dans la timeline d'un utilisateur
MainView.prototype.appendTweet = function(user, message){
    var html = '';
    
    html += '<p>' + message + '</p>';
    $('.tweetsHere' + user.id).prepend(html);
};