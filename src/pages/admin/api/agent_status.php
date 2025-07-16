<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

include 'db_config.php';

$method = $_SERVER['REQUEST_METHOD'];
$request_body = json_decode(file_get_contents('php://input'), true);

function setAgentOnline($pdo, $data) {
    try {
        $stmt = $pdo->prepare("
            INSERT INTO agent_status (agent_name, agent_email, is_online, status_message) 
            VALUES (?, ?, 1, ?)
            ON DUPLICATE KEY UPDATE 
            is_online = 1,
            last_activity = CURRENT_TIMESTAMP,
            status_message = VALUES(status_message)
        ");
        
        $stmt->execute([
            $data['agent_name'],
            $data['agent_email'],
            $data['status_message'] ?? 'En ligne'
        ]);
        
        return [
            'success' => true,
            'message' => 'Agent status updated to online'
        ];
    } catch (Exception $e) {
        return [
            'success' => false,
            'message' => 'Error setting agent online: ' . $e->getMessage()
        ];
    }
}

function setAgentOffline($pdo, $data) {
    try {
        $stmt = $pdo->prepare("
            UPDATE agent_status 
            SET is_online = 0, status_message = ?
            WHERE agent_email = ?
        ");
        
        $stmt->execute([
            $data['status_message'] ?? 'Hors ligne',
            $data['agent_email']
        ]);
        
        return [
            'success' => true,
            'message' => 'Agent status updated to offline'
        ];
    } catch (Exception $e) {
        return [
            'success' => false,
            'message' => 'Error setting agent offline: ' . $e->getMessage()
        ];
    }
}

function updateAgentActivity($pdo, $agent_email) {
    try {
        $stmt = $pdo->prepare("
            UPDATE agent_status 
            SET last_activity = CURRENT_TIMESTAMP
            WHERE agent_email = ? AND is_online = 1
        ");
        
        $stmt->execute([$agent_email]);
        
        return [
            'success' => true,
            'message' => 'Agent activity updated'
        ];
    } catch (Exception $e) {
        return [
            'success' => false,
            'message' => 'Error updating agent activity: ' . $e->getMessage()
        ];
    }
}

function getAgentStatus($pdo, $agent_email = null) {
    try {
        if ($agent_email) {
            $stmt = $pdo->prepare("
                SELECT * FROM agent_status 
                WHERE agent_email = ?
            ");
            $stmt->execute([$agent_email]);
            $agent = $stmt->fetch(PDO::FETCH_ASSOC);
            
            return [
                'success' => true,
                'agent' => $agent
            ];
        } else {
            $stmt = $pdo->prepare("
                SELECT * FROM agent_status 
                ORDER BY is_online DESC, last_activity DESC
            ");
            $stmt->execute();
            $agents = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            return [
                'success' => true,
                'agents' => $agents
            ];
        }
    } catch (Exception $e) {
        return [
            'success' => false,
            'message' => 'Error getting agent status: ' . $e->getMessage()
        ];
    }
}

function getOnlineAgentsCount($pdo) {
    try {
        $stmt = $pdo->prepare("
            SELECT COUNT(*) as online_count 
            FROM agent_status 
            WHERE is_online = 1
        ");
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        
        return [
            'success' => true,
            'online_count' => $result['online_count'],
            'status' => $result['online_count'] > 0 ? 'online' : 'offline'
        ];
    } catch (Exception $e) {
        return [
            'success' => false,
            'message' => 'Error getting online agents count: ' . $e->getMessage()
        ];
    }
}

// Handle requests
switch ($method) {
    case 'GET':
        if (isset($_GET['action'])) {
            switch ($_GET['action']) {
                case 'count':
                    echo json_encode(getOnlineAgentsCount($pdo));
                    break;
                default:
                    echo json_encode(['success' => false, 'message' => 'Invalid action']);
            }
        } else {
            echo json_encode(getAgentStatus($pdo, $_GET['agent_email'] ?? null));
        }
        break;
        
    case 'POST':
        if (isset($request_body['action'])) {
            switch ($request_body['action']) {
                case 'online':
                    echo json_encode(setAgentOnline($pdo, $request_body));
                    break;
                case 'offline':
                    echo json_encode(setAgentOffline($pdo, $request_body));
                    break;
                case 'heartbeat':
                    echo json_encode(updateAgentActivity($pdo, $request_body['agent_email']));
                    break;
                default:
                    echo json_encode(['success' => false, 'message' => 'Invalid action']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Action required']);
        }
        break;
        
    default:
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
        break;
}
?>