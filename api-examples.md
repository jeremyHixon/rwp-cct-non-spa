# RWP Content Creator Tools - Authentication API Examples

## Overview

The RWP Content Creator Tools plugin provides JWT-based authentication via REST API endpoints. Users can register, login, and validate tokens using these endpoints.

## Base URL
```
{site_url}/wp-json/rwp-cct/v1/auth/
```

## Endpoints

### 1. User Registration

**Endpoint:** `POST /wp-json/rwp-cct/v1/auth/register`

**Description:** Creates a new user account with immediate activation (no email verification required).

**Request Body:**
```json
{
    "email": "user@example.com",
    "password": "securepass123"
}
```

**Password Requirements:**
- Minimum 8 characters
- Must contain at least one letter
- Must contain at least one number

**Success Response (201):**
```json
{
    "success": true,
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "user": {
        "id": 123,
        "email": "user@example.com",
        "role": "subscriber"
    }
}
```

**Error Responses:**
- **400 Bad Request:** Email already exists
- **400 Bad Request:** Invalid password (too short or weak)
- **429 Too Many Requests:** Rate limit exceeded
- **500 Internal Server Error:** User creation failed

**cURL Example:**
```bash
curl -X POST "https://yoursite.com/wp-json/rwp-cct/v1/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "mypassword123"
  }'
```

**Username Generation:**
- Format: `user_` + first 6 characters of MD5 hash of email
- Example: `user@example.com` → `user_c1728d`
- Handles collisions by appending counter: `user_c1728d_1`, `user_c1728d_2`, etc.

### 2. User Login

**Endpoint:** `POST /wp-json/rwp-cct/v1/auth/login`

**Description:** Authenticates existing user using email and password.

**Request Body:**
```json
{
    "email": "user@example.com",
    "password": "securepass123"
}
```

**Success Response (200):**
```json
{
    "success": true,
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "user": {
        "id": 123,
        "email": "user@example.com",
        "role": "subscriber"
    }
}
```

**Error Responses:**
- **401 Unauthorized:** Invalid email or password
- **429 Too Many Requests:** Rate limit exceeded (max 10 attempts per hour per IP)

**cURL Example:**
```bash
curl -X POST "https://yoursite.com/wp-json/rwp-cct/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "mypassword123"
  }'
```

### 3. Token Verification

**Endpoint:** `GET /wp-json/rwp-cct/v1/auth/verify`

**Description:** Validates JWT token and returns user information.

**Request Headers:**
```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
```

**Success Response (200):**
```json
{
    "valid": true,
    "user": {
        "id": 123,
        "email": "user@example.com",
        "role": "subscriber"
    }
}
```

**Error Responses:**
- **401 Unauthorized:** Missing, invalid, or expired token
- **401 Unauthorized:** User account no longer exists

**cURL Example:**
```bash
curl -X GET "https://yoursite.com/wp-json/rwp-cct/v1/auth/verify" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
```

## JWT Token Details

### Token Structure
- **Algorithm:** HS256 (HMAC SHA-256)
- **Expiration:** 24 hours from issuance
- **Claims:**
  - `user_id`: WordPress user ID
  - `email`: User email address
  - `role`: User role (typically 'subscriber')
  - `iat`: Issued at timestamp
  - `exp`: Expiration timestamp
  - `iss`: Site URL (issuer)

### Token Usage
Include the token in the Authorization header for protected requests:
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

## Security Features

### Rate Limiting
- Maximum 10 authentication attempts per IP address per hour
- Applies to both registration and login endpoints
- Uses WordPress object caching for tracking

### Password Validation
- Minimum 8 characters required
- Must contain at least one letter and one number
- Additional validation can be implemented via WordPress filters

### Input Sanitization
- All email inputs sanitized using WordPress `sanitize_email()`
- Password inputs handled securely without modification
- All user inputs validated before processing

### Error Handling
- Standardized error response format
- Generic error messages to prevent user enumeration
- Comprehensive logging for debugging

## Frontend Integration Examples

### JavaScript (Fetch API)

**Registration:**
```javascript
async function registerUser(email, password) {
    try {
        const response = await fetch('/wp-json/rwp-cct/v1/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.success) {
            // Store token for future requests
            localStorage.setItem('authToken', data.token);
            return data;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error('Registration failed:', error);
        throw error;
    }
}
```

**Login:**
```javascript
async function loginUser(email, password) {
    try {
        const response = await fetch('/wp-json/rwp-cct/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.success) {
            localStorage.setItem('authToken', data.token);
            return data;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
}
```

**Token Verification:**
```javascript
async function verifyToken() {
    const token = localStorage.getItem('authToken');

    if (!token) {
        return false;
    }

    try {
        const response = await fetch('/wp-json/rwp-cct/v1/auth/verify', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data.user;
        } else {
            // Token invalid, remove from storage
            localStorage.removeItem('authToken');
            return false;
        }
    } catch (error) {
        console.error('Token verification failed:', error);
        localStorage.removeItem('authToken');
        return false;
    }
}
```

### React Hook Example

```javascript
import { useState, useEffect } from 'react';

function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('authToken'));

    useEffect(() => {
        if (token) {
            verifyToken().then(userData => {
                setUser(userData);
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [token]);

    const login = async (email, password) => {
        const data = await loginUser(email, password);
        setToken(data.token);
        setUser(data.user);
        return data;
    };

    const register = async (email, password) => {
        const data = await registerUser(email, password);
        setToken(data.token);
        setUser(data.user);
        return data;
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setToken(null);
        setUser(null);
    };

    return {
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout
    };
}
```

## Testing Checklist

### Registration Testing
- [ ] Valid email and password creates user successfully
- [ ] Duplicate email returns appropriate error
- [ ] Weak password (< 8 chars) returns validation error
- [ ] Password without letters/numbers returns validation error
- [ ] Invalid email format returns validation error
- [ ] Rate limiting triggers after multiple attempts
- [ ] Username generation handles collisions correctly
- [ ] User is assigned 'subscriber' role
- [ ] JWT token is valid and properly formatted

### Login Testing
- [ ] Valid credentials return success with token
- [ ] Invalid email returns generic error
- [ ] Invalid password returns generic error
- [ ] Non-existent user returns generic error
- [ ] Rate limiting triggers after failed attempts
- [ ] Successful login resets rate limiting counter

### Token Verification Testing
- [ ] Valid token returns user data
- [ ] Expired token returns 401 error
- [ ] Invalid signature returns 401 error
- [ ] Malformed token returns 401 error
- [ ] Missing Authorization header returns 401 error
- [ ] Token for deleted user returns 401 error

### Security Testing
- [ ] Passwords are properly hashed in database
- [ ] JWT secret is generated on activation
- [ ] Rate limiting cache works correctly
- [ ] No sensitive data in error messages
- [ ] CSRF protection via WordPress nonces (if applicable)
- [ ] Input sanitization prevents XSS

## Troubleshooting

### Common Issues

**"Authorization token is required" error:**
- Ensure the Authorization header is included
- Check that the header format is: `Authorization: Bearer TOKEN`
- Verify the token is not empty or malformed

**"Rate limit exceeded" error:**
- Wait one hour before trying again
- Check if multiple IPs are making requests
- Consider implementing user-specific rate limiting

**"Failed to create user account" error:**
- Check WordPress user creation permissions
- Verify database connection and permissions
- Check for plugin conflicts

**Token expiration issues:**
- Tokens expire after 24 hours
- Implement token refresh logic in frontend
- Store expiration time and check before making requests

### Debug Mode

Enable WordPress debug logging to see detailed error messages:

```php
// wp-config.php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
```

Check logs at: `/wp-content/debug.log`