<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

$errors = [];
$response = ['success' => false, 'message' => ''];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get POST data
    $name = isset($_POST['name']) ? strip_tags(trim($_POST['name'])) : '';
    $email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
    $message = isset($_POST['message']) ? htmlspecialchars(trim($_POST['message'])) : '';

    // Validate form fields
    if (empty($name)) {
        $errors[] = 'Name is empty';
    }

    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Email is invalid';
    }

    if (empty($message)) {
        $errors[] = 'Message is empty';
    }

    // If no errors, send email
    if (empty($errors)) {
        $mail = new PHPMailer(true);
        try {
            // Server settings
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com'; // Gmail SMTP server
            $mail->SMTPAuth = true;
            $mail->Username = 'muriranguyai@gmail.com'; // Your Gmail address
            $mail->Password = 'your_app_password'; // Your App Password. IMPORTANT!
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            // Recipients
            $mail->setFrom($email, $name); // User's email as sender
            $mail->addAddress('muriranguyai@gmail.com'); // Recipient email (your email)

            // Content
            $mail->isHTML(false);
            $mail->Subject = 'Contact Form Submission';
            $mail->Body = "Name: $name\nEmail: $email\nMessage: $message";

            $mail->send();
            $response['success'] = true;
            $response['message'] = "Email sent successfully!";

        } catch (Exception $e) {
            error_log("Mailer Error: " . $mail->ErrorInfo);
            $response['message'] = "Failed to send email. Please try again later. Error: " . $mail->ErrorInfo;
        }
    } else {
        // Display errors
        $response['message'] = "The form contains the following errors:<br>";
        foreach ($errors as $error) {
            $response['message'] .= "- $error<br>";
        }
    }
} else {
    // Not a POST request, display a 403 forbidden error
    header("HTTP/1.1 403 Forbidden");
    $response['message'] = "You are not allowed to access this page.";
}

header('Content-Type: application/json');
echo json_encode($response);
?>