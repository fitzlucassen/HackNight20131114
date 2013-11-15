<?php
    include("Script/sc.config.php");
?>
<!DOCTYPE HTML>
<html>
    <head>
	<title>Hacknight 11/14 !</title>

	<?php
	    include("Partial/meta.php");
	?>
    </head>
    <body>
	<div id="global">
	    <header>
		<h1></h1>
	    </header>
	    <?php
		if(!isset($_SESSION['oauth_token']) && !isset($_SESSION['oauth_verifier'])){
	    ?>
	    <div class="btnTweet">
		<a href="#" id="twt-connect">
		    <img src="https://dev.twitter.com/sites/default/files/images_documentation/sign-in-with-twitter-gray.png" alt="Sign in with Twitter" title="Sign in with Twitter"/>
		</a>
	    </div>
	    <?php
		}
		else {
	    ?>
	    <div id="tableOfCard">

	    </div>
	    
	    <script>
		$(document).ready(function () {
		    Client.confirmLogin('<?php echo $_SESSION['oauth_token'];?>', '<?php echo $_SESSION['oauth_verifier']; ?>');
		});
	    </script>
	    <?php
		}
	    ?>
	</div>
    </body>
</html>