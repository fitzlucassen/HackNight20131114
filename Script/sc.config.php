<?php
    session_start();
    
    define("CONSUMER_KEY", "bUdFpRSzU2DtJg4THKmJA");
    define("CONSUMER_SECRET", "MHcyiC1MPaHLUifEaO015KVIYY3os4IZg4Spo5GxGQ");
    define("OAUTH_CALLBACK", "http://localhost/HackNight20131114/twitterCallback.php");
    
    include("Lib/twitteroauth.php");
    include("sc.twitter.php");
    
    $Twitter = new TwitterController();
