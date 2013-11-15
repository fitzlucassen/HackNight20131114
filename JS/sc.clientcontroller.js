function ClientController() {
    this.socket = {};
    this.interval = {};
    this.lastId = 0;
    this.lastText = '';
}
ClientController.prototype.initialize = function(){
    // On fait écouter le client sur le même port que le serveur pour le dialogue avec socket.Io
    this.socket = io.connect('http://192.168.1.64:1337');
    // Evenement envoyé par le serveur pour rediriger vers la page sécurisé de twitter
    this.socket.on('redirectAfterLogin', function(url){
        $(location).attr('href', url);
    });
    // Le serveur envoie les informations du nouveau connecté pour les afficher dans le DOM
    this.socket.on('newTwitterUser', function(me){
        View.appendUser(me);
    });
    // Le serveur envoie le nouveau tweet apparu dans la timeline d'un client pour qu'il soit affiché
    this.socket.on('displayTimeline', function(me, data){
        View.appendTweet(me, data.text);
    });
    // Le serveur informe qu'un client s'est deconnecté
    this.socket.on('disconnectUser', function(user){
	View.deleteUser(user);
    });
    // Evenement levé à la connexion pour chaque utilisateur déjà actif
    this.socket.on('collectionUser', function(user){
	View.appendUser(user);
    });
    // Evenement levé à la connexion pour chaque message déjà partagé
    this.socket.on('collectionMessage', function(user, message){
	console.log(user);
        console.log(message);
    });
};

// Clique sur le bouton twitter connect
ClientController.prototype.login = function(){
    this.socket.emit('askLogin');
};

// twitter a redirigé correctement vers le callback
ClientController.prototype.confirmLogin = function(oauthToken, oauth_verifier){
    this.socket.emit('confirmLogin', oauthToken, oauth_verifier);
};