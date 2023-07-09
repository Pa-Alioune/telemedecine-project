<?php
try {
    $pdo = new PDO('mysql:host=localhost;dbname=mglsi_news', 'root', "");
    $query = $pdo->query("SELECT * FROM article");
    $results = $query->fetchAll();
    foreach ($results as $result) {
        echo $result['id'];
    }
} catch (Exception $e) {
    die('Erreur : ' . $e->getMessage());
}
