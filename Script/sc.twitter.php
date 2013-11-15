<?php
    class TwitterController {
	private $oauth_token = null;
        private $oauth_verifier = null;
	
	/**
	 * 
	 */
	public function IsConnected(){
	    $isLoggedOnTwitter = false;
	    
	    if (!empty($_GET['oauth_token']) && !empty($_GET['oauth_verifier'])) {
		$this->oauth_token = $_GET['oauth_token'];
		$this->oauth_verifier = $_GET['oauth_verifier'];
                $_SESSION["oauth_token"] = $this->oauth_token;
                $_SESSION["oauth_verifier"] = $this->oauth_verifier;
		
		$isLoggedOnTwitter = true;
	    }
	    else {
		$isLoggedOnTwitter = false;
	    }
	    return $isLoggedOnTwitter;
	}
	
	/**
	 * 
	 */
	public function ClearSession(){
	    /* Load and clear sessions */
	    session_destroy();

	    /* Redirect to page with the connect to Twitter option. */
	    header('Location: ./index.php');
	}
    }
?>
