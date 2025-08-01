<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = htmlspecialchars(trim($_POST["name"]));
    $phone = htmlspecialchars(trim($_POST["phone"]));
    $honeypot = trim($_POST["website"]); // honeypot field

    // Block bots via honeypot
    if (!empty($honeypot)) {
        echo "error: spam detected";
        exit;
    }

    // Required fields
    if (empty($name) || empty($phone)) {
        echo "error: empty fields";
        exit;
    }

    // Looser phone validation: digits, space, +, (, ), -
    if (!preg_match('/^[\d\s()+-]{7,20}$/', $phone)) {
        echo "error: invalid phone";
        exit;
    }

    // Send email
    $to = "antontronenko@gmail.com"; // change to your email
    $subject = "Нова заявка з сайту";
    $message = "Імʼя: $name\nНомер телефону: $phone";
    $headers = "From: no-reply@retroscooter.od.ua";

    if (mail($to, $subject, $message, $headers)) {
        echo "success";
    } else {
        echo "error: mail failed";
    }
} else {
    echo "error: invalid request";
}
?>