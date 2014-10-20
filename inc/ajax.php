<?php 
	
	// AJAX REQUEST PROCESSING


	$email_notif = "ortizcdavid@gmail.com"; // SET EMAIL NOTIFICATIONS


	if($_SERVER['REQUEST_METHOD']==="POST" && $_REQUEST['action'] ==='sendEmail') sendEmail($email_notif);
	else if($_SERVER['REQUEST_METHOD']==="POST" && $_REQUEST['action'] ==='signUpForDemo') signUpForDemo($email_notif);
	else exit;


	// TEMPLATE FOR SIGNUP DEMO
	function signUpForDemo($email_notif) {
		$con_email = $_POST['email_subscribe'];

		$msgSubject = "Signup for a demo"; // THE SUBJECT FOR THE EMAIL
		$msgString = "I would like to signup for a demo."; // CONTENT FOR THE EMAIL

		$subject = "Signup for Demo";

		// MESSAGE BODY FOR MAIL SERVER THAT ACCEPTS HTML FORMATTING
		$messageHTML = "
			<html>
			<head>
			<title>EMAIL REQUEST: {$msgSubject}</title>
			</head>
			<body>
			<strong>EMAIL REQUEST:</strong> {$msgSubject}<br /><br />
			<strong>SUBJECT: </strong>{$msgSubject}<br /><br />
			<strong>MESSAGE: </strong>{$msgString}
			</p>
			</body>
			</html>
		";

		// MESSAGE BODY FOR MAIL SERVER THAT ACCEPTS TEXT ONLY FORMATTING
		$messageText = "
			EMAIL REQUEST: <$con_email>
			SUBJECT: {$msgSubject} 
			MESSAGE: {$msgString}
		";

		$headers = "MIME-Version: 1.0" . "\r\n";
		$headers .= "Content-type:text/html;charset=iso-8859-1" . "\r\n"; 
		$headers .= 'From: YOUR DOMAIN' . "\r\n"; // SETTING UP FROM HEADER

		if(!empty($con_email)) {
			mail($email_notif, $msgSubject, $messageHTML, $headers);
			$response = json_encode( array( 'success' => true ) ); 
			header( "Content-Type: application/json" );
		} else {
			$response = json_encode( array( 'success' => false ) ); 
			header( "Content-Type: application/json" );
		}
		echo $response;	
		exit;
	}

	// TEMPLATE FOR CONTACT REQUEST
	function sendEmail($email_notif) {
		$con_name = $_POST['contact_name']; // CONTACT NAME
		$con_email = $_POST['contact_email']; // CONTACT EMAIL
		$con_subject = $_POST['contact_subject']; // CONTACT SUBJECT
		$con_message = $_POST['contact_message']; // CONTACT MESSAGE

		$subject = "Contact Request : {$con_name}";

		// MESSAGE BODY FOR MAIL SERVER THAT ACCEPTS HTML FORMATTING
		$messageHTML = "
			<html>
			<head>
			<title>Email Request</title>
			</head>
			<body>
			<p><strong>Request From:</strong> {$con_name} <{$con_email}><br /><br />
			<strong>Subject: </strong>{$con_subject}<br /><br />
			<strong>Message: </strong>{$con_message}
			</p>
			</body>
			</html>
		";

		// MESSAGE BODY FOR MAIL SERVER THAT ACCEPTS TEXT ONLY FORMATTING
		$messageText = "
			EMAIL REQUEST: {$con_name} <$con_email>
			SUBJECT: {$con_name} 
			MESSAGE: {$con_message}
		";
		$headers = "MIME-Version: 1.0" . "\r\n";
		$headers .= "Content-type:text/html;charset=iso-8859-1" . "\r\n";
		$headers .= 'From: <'.$con_name.'>' . "\r\n";

		if(!empty($con_name) && !empty($con_email) && !empty($con_subject) && !empty($con_message)) {
			mail($email_notif, $subject, $messageHTML, $headers);
			$response = json_encode( array( 'success' => true ) ); 
			header( "Content-Type: application/json" );
		} else {
			$response = json_encode( array( 'success' => false ) ); 
			header( "Content-Type: application/json" );
		}
		echo $response;	
		exit;
	}
?>