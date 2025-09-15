# RWP Content Creator Tools

**Version:** 4.0.0
**Author:** Jeremy Hixon
**Requires WordPress:** 5.0+
**Tested up to:** 6.3
**Requires PHP:** 7.4+

Advanced content creation and management tools for WordPress creators featuring JWT-based authentication, React components, and dark theme design.

## Features

### ✅ JWT Authentication System
- **Complete REST API:** Secure user registration, login, and token verification
- **JWT Token Management:** 24-hour expiration with WordPress integration
- **Security Features:** Rate limiting, password validation, input sanitization
- **Username Generation:** Automatic username creation with collision handling

### ✅ React Component Framework
- **Modern Build System:** Webpack, Babel, Tailwind CSS integration
- **Authentication Demo:** Multi-form authentication interface with tab switching
- **Dark Theme:** Custom color palette optimized for creators
- **Responsive Design:** Mobile-first approach with clean aesthetics

### ✅ WordPress Integration
- **Shortcode System:** Easy deployment of React components
- **Style Guide:** Comprehensive design reference for external tools
- **Plugin Architecture:** Clean separation of concerns with modular structure

## Authentication System

### API Endpoints

The plugin provides three REST API endpoints for user authentication:

#### User Registration
```
POST /wp-json/rwp-cct/v1/auth/register
```
**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepass123"
}
```
**Response:**
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

#### User Login
```
POST /wp-json/rwp-cct/v1/auth/login
```
**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepass123"
}
```

#### Token Verification
```
GET /wp-json/rwp-cct/v1/auth/verify
Authorization: Bearer {token}
```

### Security Features

- **JWT Tokens:** HS256 algorithm with WordPress-generated secret
- **Rate Limiting:** 10 authentication attempts per hour per IP
- **Password Validation:** Minimum 8 characters with letters and numbers
- **Username Generation:** Format: `user_` + MD5 hash with collision handling
- **Input Sanitization:** WordPress security standards throughout

### User Roles and Permissions

- **Default Role:** New registrations assigned 'subscriber' role
- **Immediate Activation:** No email verification required
- **WordPress Integration:** Full compatibility with WordPress user system

## Installation

1. **Download/Clone** the plugin to your WordPress plugins directory
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Build Assets:**
   ```bash
   npm run build
   ```
4. **Activate Plugin** in WordPress admin
5. **Automatic Setup:** JWT secret key generated on activation

## Development

### Build Commands
```bash
# Development build with watch
npm run dev

# Production build
npm run build

# Development build (no watch)
npm run build:dev
```

### Project Structure
```
rwp-cct/
├── includes/
│   ├── api/                 # REST API classes
│   │   ├── class-rwp-cct-auth-api.php
│   │   └── class-rwp-cct-jwt-handler.php
│   └── frontend/            # WordPress integration
│       └── class-shortcodes.php
├── src/                     # React source files
│   └── components/
│       └── auth/
├── assets/dist/             # Compiled assets
├── docs/                    # Project documentation
├── api-examples.md         # Complete API documentation
└── rwp-cct.php             # Main plugin file
```

### Available Shortcodes

#### Authentication Demo
```
[rwp_cct_auth_demo]
```
Displays the complete authentication interface with login, registration, and password reset forms.

#### Style Guide
```
[rwp_cct_style_guide]
[rwp_cct_style_guide theme="dark" format="compact"]
```
Comprehensive design reference with color palette, typography, and component examples.

## Testing

### API Testing
Use the included test script:
```bash
php test-endpoints.php
```

### Manual Testing with cURL
```bash
# Register new user
curl -X POST "https://yoursite.com/wp-json/rwp-cct/v1/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass123"}'

# Login existing user
curl -X POST "https://yoursite.com/wp-json/rwp-cct/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass123"}'

# Verify token
curl -X GET "https://yoursite.com/wp-json/rwp-cct/v1/auth/verify" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Documentation

- **`docs/backlog.md`** - Project roadmap and completed features
- **`docs/components-library.md`** - Component documentation and planned features
- **`docs/coding-standards.md`** - Development standards and conventions
- **`docs/design-standards.md`** - UI/UX guidelines and authentication patterns
- **`api-examples.md`** - Complete API documentation with integration examples

## Frontend Integration

### React Hook Example
```javascript
import { useAuth } from './hooks/useAuth';

function MyComponent() {
  const { user, login, logout, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <div>Welcome, {user.email}!</div>;
  }

  return <LoginForm onSuccess={login} />;
}
```

### Authentication Context
```javascript
import AuthProvider from './contexts/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <YourAppComponents />
    </AuthProvider>
  );
}
```

## Requirements

- **WordPress:** 5.0 or higher
- **PHP:** 7.4 or higher
- **Node.js:** For development and building assets
- **Modern Browser:** ES6+ support for frontend features

## Support

For issues, feature requests, or questions:
- Review the documentation in the `docs/` directory
- Check `api-examples.md` for implementation examples
- Test endpoints using the provided test scripts

## License

GPL-2.0+ - GNU General Public License v2 or later

## Changelog

### Version 4.0.0
- **✅ JWT Authentication System:** Complete REST API with secure token management
- **✅ React Authentication Demo:** Multi-form interface with dark theme
- **✅ WordPress Integration:** Shortcode system and plugin architecture
- **✅ Security Implementation:** Rate limiting, validation, and sanitization
- **✅ Comprehensive Documentation:** API examples and development guides

---

*Content Creator Tools v4 - Empowering creators with advanced WordPress functionality*
