<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection details
$host = "localhost"; // Change this if your database is on a different server
$db_name = "form_submission";
$username = "1heavy0media";
$password = "PhilisiweRadebe73!";

try {
    // Create a PDO connection
    $pdo = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // Handle connection errors
    echo json_encode(array('success' => false, 'message' => 'Database connection error.'));
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    // Sanitize the data (you might want to add more validation)
    $name = filter_var($name, FILTER_SANITIZE_STRING);
    $email = filter_var($email, FILTER_SANITIZE_EMAIL);
    $message = filter_var($message, FILTER_SANITIZE_STRING);

    try {
        // Prepare and execute the SQL query
        $stmt = $pdo->prepare("INSERT INTO form_submission (name, email, message) VALUES (:name, :email, :message)");
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':message', $message);
        $stmt->execute();

        // Successful submission
        echo json_encode(array('success' => true));
    } catch (PDOException $e) {
        // Error inserting into the database
        echo json_encode(array('success' => false, 'message' => 'Error submitting form.'));
    }
} else {
    // Invalid request method
    echo json_encode(array('success' => false, 'message' => 'Invalid request method.'));
}
?>
