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
    
    // Validate required fields
    $requiredFields = ['reference_product', 'nom_product', 'price_product'];
    foreach ($requiredFields as $field) {
        if (!isset($_POST[$field]) || empty($_POST[$field])) {
            echo json_encode([
                'success' => false,
                'message' => "Field {$field} is required"
            ]);
            exit;
        }
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
    
    // Prepare insert data
    $insertData = [
        'reference_product' => $_POST['reference_product'],
        'nom_product' => $_POST['nom_product'],
        'description_product' => $_POST['description_product'] ?? '',
        'type_product' => $_POST['type_product'] ?? '',
        'category_product' => $_POST['category_product'] ?? '',
        'itemgroup_product' => $_POST['itemgroup_product'] ?? '',
        'price_product' => $_POST['price_product'],
        'qnty_product' => $_POST['qnty_product'] ?? 0,
        'collection_product' => $_POST['collection_product'] ?? '',
        'color_product' => $_POST['color_product'] ?? '',
        'status_product' => $_POST['status_product'] ?? 'active',
        'discount_product' => $_POST['discount_product'] ?? 0,
        'related_products' => $_POST['related_products'] ?? null,
        // Size fields
        's_size' => $_POST['s_size'] ?? 0,
        'm_size' => $_POST['m_size'] ?? 0,
        'l_size' => $_POST['l_size'] ?? 0,
        'xl_size' => $_POST['xl_size'] ?? 0,
        'xxl_size' => $_POST['xxl_size'] ?? 0,
        '3xl_size' => $_POST['3xl_size'] ?? 0,
        '4xl_size' => $_POST['4xl_size'] ?? 0,
        'xs_size' => $_POST['xs_size'] ?? 0,
        '48_size' => $_POST['48_size'] ?? 0,
        '50_size' => $_POST['50_size'] ?? 0,
        '52_size' => $_POST['52_size'] ?? 0,
        '54_size' => $_POST['54_size'] ?? 0,
        '56_size' => $_POST['56_size'] ?? 0,
        '58_size' => $_POST['58_size'] ?? 0,
        // Image fields
        'img_product' => $uploadedImages['img_product'] ?? null,
        'img2_product' => $uploadedImages['img2_product'] ?? null,
        'img3_product' => $uploadedImages['img3_product'] ?? null,
        'img4_product' => $uploadedImages['img4_product'] ?? null,
    ];
    
    // Build insert query
    $fields = array_keys($insertData);
    $placeholders = array_fill(0, count($fields), '?');
    $values = array_values($insertData);
    
    $insertQuery = "INSERT INTO products (`" . implode('`, `', $fields) . "`) VALUES (" . implode(', ', $placeholders) . ")";
    $insertStmt = $db->prepare($insertQuery);
    
    if ($insertStmt->execute($values)) {
        $newProductId = $db->lastInsertId();
        
        // Fetch the newly created product
        $selectQuery = "SELECT * FROM products WHERE id_product = ?";
        $selectStmt = $db->prepare($selectQuery);
        $selectStmt->execute([$newProductId]);
        $newProduct = $selectStmt->fetch();
        
        echo json_encode([
            'success' => true,
            'message' => 'Product created successfully',
            'data' => $newProduct
        ]);
    } else {
        // Clean up uploaded images on failure
        foreach ($uploadedImages as $imagePath) {
            if (file_exists($imagePath)) {
                unlink($imagePath);
            }
        }
        
        echo json_encode([
            'success' => false,
            'message' => 'Failed to create product'
        ]);
    }
    
} catch(Exception $e) {
    // Clean up uploaded images on error
    if (isset($uploadedImages)) {
        foreach ($uploadedImages as $imagePath) {
            if (file_exists($imagePath)) {
                unlink($imagePath);
            }
        }
    }
    
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage()
    ]);
}
?>