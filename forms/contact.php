<?php
  $to_email = "mwikyoderrick@gmail.com"; // replace with your email address
  $subject = "New message from website contact form";
  $name = $_POST["name"];
  $email = $_POST["email"];
  $message = $_POST["message"];
  $headers = "From: $name <$email>";

  // send email
  if (mail($to_email, $subject, $message, $headers)) {
    echo "success";
  } else {
    echo "error";
  }
?>
