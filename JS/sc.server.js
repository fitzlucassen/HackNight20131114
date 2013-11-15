var http = require('http');

// Création serveur
var httpServer = http.createServer(function(req,res){
    console.log('un utilisateur a affiche la page');
});
// Ecoute sur le port 1337 pour socket.io
httpServer.listen(1337);
// Implémentation de socket.io
var io = require('socket.io').listen(httpServer);
// Implémentation de l'API twitter pour node js
var twitterAPI = require('node-twitter-api');
var twitter = new twitterAPI({
    consumerKey: 'bUdFpRSzU2DtJg4THKmJA',
    consumerSecret: 'MHcyiC1MPaHLUifEaO015KVIYY3os4IZg4Spo5GxGQ',
    callback: 'http://localhost/HackNight20131114/twitterCallback.php'
});
var twitterVars = {
    requestToken: '',
    requestTokenSecret: '',
    accessToken: '',
    accessTokenSecret: ''
};
var users = {};
var messages = [];

// A la connexion d'un nouveau client
io.sockets.on('connection', function(socket){
    // On créée la variable propre au client
    var me = {};

    console.log('un utilisateur a affiche la page');
    // A la deconnexion du client
    socket.on('disconnect', function(){
	if(!me)
	    return false;
	
	delete users[me.id];
	io.sockets.emit('disconnectUser', me);
    });
    
    // Quand le client a cliqué sur le twitter connect
    socket.on('askLogin',function(){
        twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
            if (error) {
                console.log("Error getting OAuth request token : " + error);
            } else {
                twitterVars.requestToken = requestToken;
                twitterVars.requestTokenSecret = requestTokenSecret;
                
                var url = 'https://twitter.com/oauth/authenticate?oauth_token=' + twitterVars.requestToken;
                socket.emit('redirectAfterLogin', url);
            }
        });
    });
    
    // Quand twitter a confirmé l'identification du client
    socket.on('confirmLogin',function(oauthToken, oauth_verifier){
        twitter.getAccessToken(twitterVars.requestToken, twitterVars.requestTokenSecret, oauth_verifier, function(error, accessToken, accessTokenSecret, results) {
            if (error) {
                console.log(error);
            } else {
                twitterVars.accessToken = accessToken;
                twitterVars.accessTokenSecret = accessTokenSecret;
                
                // On récupère les infos du compte client
                twitter.verifyCredentials(accessToken, accessTokenSecret, function(error, data, response) {
                    if (error) {
                        console.log(error);
                    } else {
                        
                        // Puis pour chaque client déjà connecté on affiche sa carte de visite
                        for(var thisUser in users){
                            console.log(users[thisUser]);
                            io.sockets.emit('collectionUser', users[thisUser]);
                        }
                        // Pour chacun des messages des clients connectés, on les affiches pour l'historique
                        for(var thisUser in messages){
                            for(var thisMessage in thisUser){
                                io.sockets.emit('collectionMessage', users[thisUser], messages[thisUser][thisMessage]);
                            }
                        }
                        // On remplit la variable me pour le client cible
                        me = {
                            id: data['id'],
                            pseudo: data["screen_name"],
                            image: data["profile_image_url"]
                        };
                        // Et on l'ajoute au tableau des clients connectés
                        users[me.id] = me;
                        
                        io.sockets.emit('newTwitterUser', me);
                        
                        // On bind un listener sur le stream de la timeline du client actuel
                        twitter.getStream("user", {
                                screen_name: me.pseudo
                            },
                            twitterVars.accessToken,
                            twitterVars.accessTokenSecret,
                            function(error, data, response) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    if(data.text !== undefined){
                                        // Et on affiche le tweet dès qu'il y en a un nouveau
                                        io.sockets.emit('displayTimeline', me, data);
                                    }
                                }
                            },
                            function(error, data, response) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log(data);
                                }
                            }                            
                        );
                    }
                });
            }
        });
    });
});