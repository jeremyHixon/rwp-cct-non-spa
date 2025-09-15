<?php
/**
 * Test script for RWP CCT Authentication API
 *
 * Run this script to test the authentication endpoints
 * Usage: php test-endpoints.php
 */

// Test configuration
$base_url = 'https://creatortools.local/wp-json/rwp-cct/v1/auth';
$test_email = 'test@example.com';
$test_password = 'testpass123';

/**
 * Make HTTP request
 */
function make_request($url, $method = 'GET', $data = null, $headers = array()) {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

    if ($method === 'POST') {
        curl_setopt($ch, CURLOPT_POST, true);
        if ($data) {
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
            $headers[] = 'Content-Type: application/json';
        }
    }

    if (!empty($headers)) {
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    }

    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($error) {
        return array('error' => $error);
    }

    return array(
        'http_code' => $http_code,
        'body' => $response,
        'data' => json_decode($response, true)
    );
}

echo "🧪 Testing RWP CCT Authentication API\n";
echo "=====================================\n\n";

// Test 1: Registration
echo "1️⃣  Testing User Registration\n";
echo "Endpoint: POST {$base_url}/register\n";

$register_data = array(
    'email' => $test_email,
    'password' => $test_password
);

$response = make_request($base_url . '/register', 'POST', $register_data);

if (isset($response['error'])) {
    echo "❌ CURL Error: " . $response['error'] . "\n";
} else {
    echo "HTTP Status: " . $response['http_code'] . "\n";
    echo "Response: " . $response['body'] . "\n";

    if ($response['http_code'] === 201 && isset($response['data']['success'])) {
        echo "✅ Registration successful!\n";
        $jwt_token = $response['data']['token'];
        $user_data = $response['data']['user'];
        echo "User ID: " . $user_data['id'] . "\n";
        echo "Email: " . $user_data['email'] . "\n";
        echo "Role: " . $user_data['role'] . "\n";
    } else {
        echo "❌ Registration failed\n";
        $jwt_token = null;
    }
}

echo "\n" . str_repeat("-", 50) . "\n\n";

// Test 2: Login (only if registration failed, user might already exist)
echo "2️⃣  Testing User Login\n";
echo "Endpoint: POST {$base_url}/login\n";

$login_data = array(
    'email' => $test_email,
    'password' => $test_password
);

$response = make_request($base_url . '/login', 'POST', $login_data);

if (isset($response['error'])) {
    echo "❌ CURL Error: " . $response['error'] . "\n";
} else {
    echo "HTTP Status: " . $response['http_code'] . "\n";
    echo "Response: " . $response['body'] . "\n";

    if ($response['http_code'] === 200 && isset($response['data']['success'])) {
        echo "✅ Login successful!\n";
        $jwt_token = $response['data']['token'];
        $user_data = $response['data']['user'];
        echo "User ID: " . $user_data['id'] . "\n";
        echo "Email: " . $user_data['email'] . "\n";
        echo "Role: " . $user_data['role'] . "\n";
    } else {
        echo "❌ Login failed\n";
    }
}

echo "\n" . str_repeat("-", 50) . "\n\n";

// Test 3: Token Verification (only if we have a token)
if (isset($jwt_token) && $jwt_token) {
    echo "3️⃣  Testing Token Verification\n";
    echo "Endpoint: GET {$base_url}/verify\n";

    $headers = array('Authorization: Bearer ' . $jwt_token);
    $response = make_request($base_url . '/verify', 'GET', null, $headers);

    if (isset($response['error'])) {
        echo "❌ CURL Error: " . $response['error'] . "\n";
    } else {
        echo "HTTP Status: " . $response['http_code'] . "\n";
        echo "Response: " . $response['body'] . "\n";

        if ($response['http_code'] === 200 && isset($response['data']['valid'])) {
            echo "✅ Token verification successful!\n";
            $user_data = $response['data']['user'];
            echo "User ID: " . $user_data['id'] . "\n";
            echo "Email: " . $user_data['email'] . "\n";
            echo "Role: " . $user_data['role'] . "\n";
        } else {
            echo "❌ Token verification failed\n";
        }
    }
} else {
    echo "3️⃣  ⏭️  Skipping Token Verification (no valid token)\n";
}

echo "\n" . str_repeat("-", 50) . "\n\n";

// Test 4: Invalid token verification
echo "4️⃣  Testing Invalid Token\n";
echo "Endpoint: GET {$base_url}/verify\n";

$headers = array('Authorization: Bearer invalid.token.here');
$response = make_request($base_url . '/verify', 'GET', null, $headers);

if (isset($response['error'])) {
    echo "❌ CURL Error: " . $response['error'] . "\n";
} else {
    echo "HTTP Status: " . $response['http_code'] . "\n";
    echo "Response: " . $response['body'] . "\n";

    if ($response['http_code'] === 401) {
        echo "✅ Invalid token correctly rejected!\n";
    } else {
        echo "❌ Invalid token should return 401 status\n";
    }
}

echo "\n" . str_repeat("-", 50) . "\n\n";

// Test 5: Password validation
echo "5️⃣  Testing Password Validation\n";
echo "Endpoint: POST {$base_url}/register\n";

$weak_password_data = array(
    'email' => 'weak@example.com',
    'password' => '123' // Too short
);

$response = make_request($base_url . '/register', 'POST', $weak_password_data);

if (isset($response['error'])) {
    echo "❌ CURL Error: " . $response['error'] . "\n";
} else {
    echo "HTTP Status: " . $response['http_code'] . "\n";
    echo "Response: " . $response['body'] . "\n";

    if ($response['http_code'] === 400) {
        echo "✅ Weak password correctly rejected!\n";
    } else {
        echo "❌ Weak password should return 400 status\n";
    }
}

echo "\n" . str_repeat("=", 50) . "\n";
echo "🏁 Testing Complete!\n";
echo "\n💡 To test manually:\n";
echo "1. Update \$base_url in this script to match your WordPress site\n";
echo "2. Make sure your WordPress site is running\n";
echo "3. Check that the plugin is activated\n";
echo "4. Use tools like Postman or curl for additional testing\n";