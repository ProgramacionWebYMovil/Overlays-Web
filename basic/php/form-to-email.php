<?php
if(!isset($_POST['submit'])){
	//Esta página no tiene que ser accedida directamente, necesita mandar el formulario
	echo "error; you need to submit the form"
}

$name = $_POST['name'];
$visitor_email= $_POST['email'];
$message = $_POST['message'];

//Validate first
if(empty($name)||empty($visitor_email)){
	echo "Name and email are mandatory!";
	exit;
}

$email_from = 'creapadeltv@gmail.com'; //Your email
$email_subject = "Your OVERLAY WEB EMAIL";
$email_body = "You have received a new message from the user $name. \n".
			"email address_ $visitor_email\n".
			"Here is the message:\n\n $message";

$to = "creapadeltv@gmail";
$headers = "From: $email_from \r\n";

//Send the EMAIL
if(mail($to,$email_subject,$email_body,$headers)){
	echo "EMAIL SENT";
}else{
	echo "Fail sending the email";
}

?>