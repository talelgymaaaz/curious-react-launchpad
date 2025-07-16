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
    
    // Get product ID from URL parameter
    if (!isset($_GET['id']) || empty($_GET['id'])) {
        echo json_encode([
            'success' => false,
            'message' => 'Product ID is required'
        ]);
        exit;
    }
    
    $productId = (int)$_GET['id'];
    
    // Check if product exists
    $checkQuery = "SELECT id_product, img_product, img2_product, img3_product, img4_product FROM products WHERE id_product = ?";
    $checkStmt = $db->prepare($checkQuery);
    $checkStmt->execute([$productId]);
    $existingProduct = $checkStmt->fetch();
    
    if (!$existingProduct) {
        echo json_encode([
            'success' => false,
            'message' => 'Product not found'
        ]);
        exit;
    }
    
    // Handle image uploads
    $imageFields = ['img_product', 'img2_product', 'img3_product', 'img4_product'];
    $uploadedImages = [];
    
    // Process uploaded images
    for ($i = 1; $i <= 4; $i++) {
        if (isset($_FILES["image{$i}"]) && $_FILES["image{$i}"]['error'] === UPLOAD_ERR_OK) {
            $file = $_FILES["image{$i}"];
            
            // Validate file type
            $allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
            $fileType = $file['type'];
            $fileName = $file['name'];
            $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
            
            if (!in_array($fileType, $allowedTypes)) {
                echo json_encode([
                    'success' => false,
                    'message' => 'Invalid file type. Only JPEG, JPG, PNG, and GIF are allowed.'
                ]);
                exit;
            }
            
            // Generate unique filename
            $uniqueFileName = uniqid() . '_' . time() . '.' . $fileExtension;
            $uploadPath = 'uploads/' . $uniqueFileName;
            
            // Create uploads directory if it doesn't exist
            if (!is_dir('uploads')) {
                mkdir('uploads', 0755, true);
            }
            
            // Move uploaded file
            if (move_uploaded_file($file['tmp_name'], $uploadPath)) {
                $uploadedImages[$imageFields[$i - 1]] = $uploadPath;
            } else {
                echo json_encode([
                    'success' => false,
                    'message' => 'Failed to upload image ' . $i
                ]);
                exit;
            }
        }
    }
    
    // Build update query dynamically based on provided fields
    $updateFields = [];
    $params = [];
    
    $allowedFields = [
        'reference_product', 'nom_product', 'description_product', 'type_product',
        'category_product', 'itemgroup_product', 'price_product', 'qnty_product',
        '3xl_size', 's_size', 'xs_size', '4xl_size', 'm_size', 'l_size',
        'xl_size', 'xxl_size', 'color_product', 'collection_product', 'status_product',
        'related_products', 'discount_product', '48_size', '50_size',
        '52_size', '54_size', '56_size', '58_size'
    ];
    
    foreach ($allowedFields as $field) {
        if (isset($_POST[$field])) {
            $updateFields[] = "`{$field}` = ?";
            $params[] = $_POST[$field];
        }
    }
    
    // Add uploaded images to update fields
    foreach ($uploadedImages as $field => $path) {
        $updateFields[] = "`{$field}` = ?";
        $params[] = $path;
        
        // Delete old image if it exists
        $oldImagePath = $existingProduct[$field];
        if ($oldImagePath && file_exists($oldImagePath)) {
            unlink($oldImagePath);
        }
    }
    
    // Handle image deletions (if images_to_delete is provided)
    if (isset($_POST['images_to_delete']) && !empty($_POST['images_to_delete'])) {
        $imagesToDelete = json_decode($_POST['images_to_delete'], true);
        if (is_array($imagesToDelete)) {
            foreach ($imagesToDelete as $imageField) {
                if (in_array($imageField, $imageFields)) {
                    $updateFields[] = "`{$imageField}` = NULL";
                    
                    // Delete physical file
                    $oldImagePath = $existingProduct[$imageField];
                    if ($oldImagePath && file_exists($oldImagePath)) {
                        unlink($oldImagePath);
                    }
                }
            }
        }
    }
    
    if (empty($updateFields)) {
        echo json_encode([
            'success' => false,
            'message' => 'No valid fields to update'
        ]);
        exit;
    }
    
    // Add product ID to params for WHERE clause
    $params[] = $productId;
    
    $updateQuery = "UPDATE products SET " . implode(', ', $updateFields) . " WHERE id_product = ?";
    $updateStmt = $db->prepare($updateQuery);
    
    if ($updateStmt->execute($params)) {
        // Fetch updated product
        $selectQuery = "SELECT * FROM products WHERE id_product = ?";
        $selectStmt = $db->prepare($selectQuery);
        $selectStmt->execute([$productId]);
        $updatedProduct = $selectStmt->fetch();
        
        echo json_encode([
            'success' => true,
            'message' => 'Product updated successfully',
            'data' => $updatedProduct
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Failed to update product'
        ]);
    }
    
} catch(Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage()
    ]);
}
?>