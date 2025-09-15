# Components Library

## External Libraries

### Icon Libraries
- **Lucide React**: Primary icon library for UI elements
- **React Icons**: Brand icons for social media platforms and additional icons

### UI Components
- TBD: Component library selection pending

## Custom Components

### Authentication System

#### JWT Authentication API
Complete REST API system for user authentication with JWT tokens.

**Endpoints:**
- `POST /wp-json/rwp-cct/v1/auth/register` - User registration
- `POST /wp-json/rwp-cct/v1/auth/login` - User authentication
- `GET /wp-json/rwp-cct/v1/auth/verify` - Token verification

**Features:**
- JWT token generation with 24-hour expiration
- Username generation: `user_` + MD5 hash of email
- Password validation (8+ chars, letters + numbers)
- Rate limiting (10 attempts/hour per IP)
- Comprehensive error handling and security

**Implementation:** `includes/api/class-rwp-cct-auth-api.php`, `includes/api/class-rwp-cct-jwt-handler.php`

**Documentation:** `api-examples.md` - Complete usage examples and integration patterns

#### AuthProvider (React Context)
*[Planned Component]* Authentication context provider for React applications.

**Features:**
- Global authentication state management
- JWT token handling and persistence
- Automatic token verification and refresh
- User data caching and updates

**Props:**
- `children`: React nodes to wrap with auth context

**Usage:**
```jsx
import AuthProvider from './contexts/AuthProvider';
<AuthProvider>
  <App />
</AuthProvider>
```

**State Management:**
- `user`: Current user object or null
- `token`: JWT token string
- `loading`: Authentication loading state
- `isAuthenticated`: Boolean authentication status

#### LoginForm (React Component)
*[Planned Component]* Standalone login form component.

**Features:**
- Email and password authentication
- Integration with JWT API endpoints
- Form validation and error handling
- Loading states and success feedback

**Props:**
- `onSuccess`: Callback function for successful login
- `redirectTo`: URL to redirect after login
- `className`: Additional CSS classes

**Usage:**
```jsx
import LoginForm from './components/auth/LoginForm';
<LoginForm onSuccess={handleLogin} redirectTo="/dashboard" />
```

#### RegisterForm (React Component)
*[Planned Component]* User registration form component.

**Features:**
- Email and password registration
- Password strength validation
- Terms of service acceptance
- Automatic login after registration

**Props:**
- `onSuccess`: Callback function for successful registration
- `requireTerms`: Boolean to require terms acceptance
- `className`: Additional CSS classes

**Usage:**
```jsx
import RegisterForm from './components/auth/RegisterForm';
<RegisterForm onSuccess={handleRegister} requireTerms={true} />
```

#### AuthGate (React Component)
*[Planned Component]* Wrapper component for protected content.

**Features:**
- Conditional rendering based on authentication
- Role-based access control
- Fallback content for unauthenticated users
- Automatic redirection to login

**Props:**
- `children`: Protected content to render
- `fallback`: Component to show when not authenticated
- `requireRole`: Required user role for access
- `redirectTo`: Login page URL

**Usage:**
```jsx
import AuthGate from './components/auth/AuthGate';
<AuthGate requireRole="subscriber" fallback={<LoginPrompt />}>
  <ProtectedContent />
</AuthGate>
```

#### ProtectedContent (React Component)
*[Planned Component]* Higher-order component for content protection.

**Features:**
- Content hiding based on authentication status
- Role-based content display
- Premium content gates
- Subscription status checking

**Props:**
- `children`: Content to protect
- `requireAuth`: Boolean to require authentication
- `requiredRole`: Minimum user role required
- `fallbackMessage`: Message for unauthorized users

**Usage:**
```jsx
import ProtectedContent from './components/auth/ProtectedContent';
<ProtectedContent requireAuth={true} requiredRole="subscriber">
  <PremiumFeature />
</ProtectedContent>
```

### JWT Token Management Utilities

#### useAuth Hook
*[Planned Utility]* React hook for authentication management.

**Returns:**
- `user`: Current user object
- `login(email, password)`: Login function
- `register(email, password)`: Registration function
- `logout()`: Logout function
- `verifyToken()`: Token verification function
- `isAuthenticated`: Boolean status
- `loading`: Loading state

**Usage:**
```jsx
import { useAuth } from './hooks/useAuth';

function MyComponent() {
  const { user, login, logout, isAuthenticated } = useAuth();
  // Component logic
}
```

#### tokenStorage Utility
*[Planned Utility]* JWT token storage and management.

**Functions:**
- `getToken()`: Retrieve stored token
- `setToken(token)`: Store JWT token
- `clearToken()`: Remove stored token
- `isTokenExpired(token)`: Check token expiration

**Usage:**
```javascript
import tokenStorage from './utils/tokenStorage';

const token = tokenStorage.getToken();
if (tokenStorage.isTokenExpired(token)) {
  tokenStorage.clearToken();
}
```

### Major Components

#### StyleGuide (WordPress Shortcode)
Comprehensive dark theme style guide for Elementor and external tool reference.

**Shortcode:** `[rwp_cct_style_guide]`

**Features:**
- Complete color palette with hex values (#111827, #3B82F6, etc.)
- Typography specimens with CSS class references
- Interactive component examples (buttons, inputs, cards)
- Spacing and layout reference with pixel values
- Quick reference section for Elementor integration
- Print-friendly and organized layout

**Attributes:**
- `theme`: Display theme (default: 'dark')
- `format`: Display format - 'full', 'compact', 'reference' (default: 'full')

**Usage:**
```
[rwp_cct_style_guide]
[rwp_cct_style_guide theme="dark" format="compact"]
```

**Implementation:** `includes/frontend/class-shortcodes.php:rwp_cct_style_guide_shortcode()`

#### AuthDemo (`src/components/auth/AuthDemo.jsx`)
Multi-form authentication demo component with tab switching.

**Features:**
- Three authentication forms: Login, Registration, Password Reset
- Tab-based navigation between forms
- Password visibility toggle
- Responsive design with dark theme
- Form state management with React hooks

**Props:**
- None (uses internal state management)

**Usage:**
```jsx
import AuthDemo from './components/auth/AuthDemo';
<AuthDemo />
```

**CSS Classes:**
- `.rwp-cct-container`: Main dark theme container
- `.rwp-cct-form`: Form wrapper with styling
- `.rwp-cct-input`: Standard input field styling
- `.rwp-cct-button`: Primary button styling
- `.rwp-cct-button-secondary`: Secondary button styling

#### Form Components (Reusable Patterns)

**Login Form**
- Email and password fields
- Remember me checkbox
- Forgot password link
- Sign up redirect

**Registration Form**
- First name and last name fields
- Email and password confirmation
- Terms of service acceptance
- Grid layout for name fields

**Password Reset Form**
- Email field for reset instructions
- Back to login navigation
- Simplified single-purpose design

## Component Guidelines
- Document only major/significant components
- Library components (inputs, buttons, etc.) are documented by their respective libraries
- Focus on custom components that are specific to Content Creator Tools