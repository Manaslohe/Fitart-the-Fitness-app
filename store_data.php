<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
?>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $age = $_POST['age'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];

    // Open the CSV file in append mode
    $file = fopen('userdata.csv', 'a');

    // Write data to the CSV file
    fputcsv($file, array($name, $age, $phone, $email));

    // Close the file
    fclose($file);

    // Redirect or respond back
    echo "User information stored successfully!";
}
?>
