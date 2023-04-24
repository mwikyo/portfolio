<?php

$receiving_email_address = 'mwikyoderrick@gmail.com';

if( file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php' )) {
  include( $php_email_form );
} else {
  die( 'We are unable to send this email right now!');
}

$contact = new PHP_Email_Form;
$contact->ajax = true;

$contact->to = $receiving_email_address;
$contact->from_name = $_POST['name'];
$contact->from_email = $_POST['email'];

$contact->add_message( $_POST['name'], 'From');
$contact->add_message( $_POST['email'], 'Email');
$contact->add_message( $_POST['message'], 'Message', 10);

$headers = "From: " . $contact->from_name . " <" . $contact->from_email . "> \r\n";
$headers .= "Reply-To: " . $contact->from_name . " <" . $contact->from_email . "> \r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

mail($contact->to, 'New Contact Form Submission', $contact->message_html, $headers);

echo 'Message sent!';
?>
