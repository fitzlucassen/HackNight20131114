/* MAiN JS */

var Twitter = {};
var View = {};
var ErrorGame = {};
var Client = {};
var endOfGame = false;

$(document).ready(function () {
    // Initialisation des controllers
    Twitter = new TwitterController();
    View = new MainView();
    ErrorGame = new ErrorView();
    Client = new ClientController();
    
    Client.initialize();
    
    $('#twt-connect').click(function(){
         Client.login();
         return false;
    });
});