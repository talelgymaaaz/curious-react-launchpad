<?php
require_once 'config.php';

try {
    $database = new Database();
    $db = $database->getConnection();
    
    // Only allow POST method
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        echo json_encode([
            'success' => false,
            'message' => 'Only POST method allowed'
        ]);
        exit;
    }
    
    // Get product ID and image field
    if (!isset($_POST['product_id']) || !isset($_POST['image_field'])) {
        echo json_encode([
            'success' => false,
            'message' => 'Product ID and image field are required'
        ]);
        exit;
    }
    
    $productId = (int)$_POST['product_id'];
    $imageField = $_POST['image_field'];
    
    // Validate image field
    $allowedFields = ['img_product', 'img2_product', 'img3_product', 'img4_product'];
    if (!in_array($imageField, $allowedFields)) {
        echo json_encode([
            'success' => false,
            'message' => 'Invalid image field'
        ]);
        exit;
    }
    
    // Get current image path
    $query = "SELECT {$imageField} FROM products WHERE id_product = ?";
    $stmt = $db->prepare($query);
    $stmt->execute([$productId]);
    $product = $stmt->fetch();
    
    if (!$product) {
        echo json_encode([
            'success' => false,
            'message' => 'Product not found'
        ]);
        exit;
    }
    
    $currentImagePath = $product[$imageField];
    
    // Update database to remove image reference
    $updateQuery = "UPDATE products SET {$imageField} = NULL WHERE id_product = ?";
    $updateStmt = $db->prepare($updateQuery);
    
    if ($updateStmt->execute([$productId])) {
        // Delete physical file if it exists
        if ($currentImagePath && file_exists($currentImagePath)) {
            unlink($currentImagePath);
        }
        
        echo json_encode([
            'success' => true,
            'message' => 'Image deleted successfully'
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Failed to delete image'
        ]);
    }
    
} catch(Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage()
    ]);
}
?>