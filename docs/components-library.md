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

#### AuthModal (Production Component)
Modal-based authentication system with JWT integration and conversion-optimized forms.

**Shortcode:** `[rwp_cct_user_header]` for header integration

**Features:**
- Three streamlined authentication forms: Login, Registration, Password Reset
- Tab-based navigation with smooth transitions
- Real-time password strength indicator with 5-bar visual meter
- Functional remember me checkbox with localStorage persistence
- Simplified registration (email + password only, no confirmation fields)
- Automatic JWT token storage and user state management
- Conversion-optimized UI with minimal friction
- Mobile-responsive dark theme design
- ESC key and backdrop click handling

**Form Specifications:**

**Registration Form:**
- Fields: Email, Password (8+ characters, letter + number required)
- No first name, last name, or confirm password fields
- Auto-generated username: `user_` + MD5 hash
- Default role: Subscriber
- Immediate activation (no email verification)
- Password strength indicator with real-time feedback
- Visual progress: 5-bar strength meter with color coding
- Inline feedback: Displays specific requirements (length, letters, numbers)

**Login Form:**
- Fields: Email, Password, Remember Me checkbox
- Email-based authentication (not username)
- Remember me preference persisted in localStorage
- Forgot password link to reset tab

**Password Reset Form:**
- Field: Email only
- Back to login navigation
- Simple message delivery (no complex workflows)

**API Integration:**
- Uses `/auth/register`, `/auth/login`, `/auth/reset` endpoints
- Automatic JWT token storage in localStorage
- Success state management with modal close and header updates
- Comprehensive error handling with inline validation
- Loading states with button spinners

**Usage:**
```jsx
import AuthModal from './components/auth/AuthModal';
<AuthModal container={modalContainer} />
```

**Implementation:** `src/components/auth/AuthModal.jsx`

**Success Flow:**
1. Registration/Login → Auto JWT storage → Header update → Modal close
2. Password reset → Email sent message (no modal close)
3. All forms dispatch `rwp-cct-auth-success` events for global state sync

**Password Strength Implementation:**
```jsx
// Client-side password strength calculation (no API dependency)
const checkPasswordStrength = (password) => {
  // Use client-side password strength calculation
  const strength = getClientSidePasswordStrength(password);
  setPasswordStrength(strength);
};

const getClientSidePasswordStrength = (password) => {
  let score = 0;
  const feedback = [];

  if (password.length >= 8) score++;
  else feedback.push('Use at least 8 characters');

  if (/[a-z]/.test(password)) score++;
  else feedback.push('Include lowercase letters');

  if (/[A-Z]/.test(password)) score++;
  else feedback.push('Include uppercase letters');

  if (/[0-9]/.test(password)) score++;
  else feedback.push('Include numbers');

  if (/[^A-Za-z0-9]/.test(password)) score++;
  else feedback.push('Include special characters');

  const levels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  return { score, level: levels[Math.min(score, 4)], feedback };
};
```

**Note:** Password strength is calculated entirely on the client-side for better performance and to avoid unnecessary API calls. The original implementation included an API endpoint fallback, but this has been removed to eliminate 404 errors and simplify the authentication flow.

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

**Login Form Pattern (Simplified)**
- Email and password fields only
- Remember me checkbox with localStorage persistence
- Forgot password link to reset tab
- Sign up redirect link

**Registration Form Pattern (Conversion-Optimized)**
- Email and password fields only (no name fields)
- Real-time password strength indicator
- No password confirmation field
- Simplified terms acceptance (inline text)
- Auto-generated username on backend
- Immediate activation workflow

**Password Reset Form Pattern**
- Email field only
- Back to login navigation
- Simplified single-purpose design
- Clear success messaging without modal closure

### Component Isolation Patterns

#### Preventing Re-render Cascades

**Problem**: Parent components that manage both UI state and form state cause excessive re-renders, leading to poor performance and input focus loss.

**Solution**: Component isolation using React.memo and state separation.

**Pattern Implementation**:

```jsx
// ❌ Bad: Form state in parent component causes re-renders
const ParentModal = ({ container }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' }); // Causes re-renders

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value })); // Re-renders parent
  };

  return (
    <div>
      <input onChange={handleInputChange} value={formData.email} />
    </div>
  );
};

// ✅ Good: Isolated form components with React.memo
const LoginForm = React.memo(({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({ email: '', password: '' }); // Isolated state

  const handleInputChange = useCallback((e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value })); // Only re-renders this component
  }, []);

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData, 'login'); }}>
      <input onChange={handleInputChange} value={formData.email} />
    </form>
  );
});

const ParentModal = React.memo(({ container }) => {
  const [isVisible, setIsVisible] = useState(false); // Only UI state
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = useCallback(async (formData, formType) => {
    // Handle submission without re-rendering form components
  }, []);

  return (
    <div>
      <LoginForm onSubmit={handleFormSubmit} isLoading={isLoading} />
    </div>
  );
});
```

**Key Principles**:
1. **State Isolation**: Form data state stays within form components
2. **Callback Communication**: Use callbacks to communicate between parent and child
3. **React.memo**: Prevent unnecessary re-renders of stable components
4. **Minimal Parent State**: Parent only manages UI state (visibility, loading, errors)

**Benefits**:
- Input focus remains stable during typing
- Improved performance with fewer re-renders
- Better component separation of concerns
- Easier debugging and testing

### Input Focus Troubleshooting

#### Input Focus Loss in Forms

**Symptom**: Form inputs lose focus after typing one character, requiring users to click back into field for each character typed.

**Root Causes and Solutions**:

1. **React Component Re-rendering**
   - **Cause**: Form components defined inside parent component get recreated on every re-render
   - **Solution**: Use `useCallback` to memoize form components
   ```jsx
   const LoginForm = useCallback(() => (
     // form JSX
   ), [formData.email, formData.password, handleInputChange, showPassword, isLoading]);
   ```

2. **Missing Stable React Keys**
   - **Cause**: React recreates DOM elements without stable keys during re-renders
   - **Solution**: Add unique keys to all form inputs
   ```jsx
   <input key="login-email" type="email" name="email" />
   <input key="login-password" type="password" name="password" />
   <input key="register-email" type="email" name="email" />
   <input key="register-password" type="password" name="password" />
   <input key="reset-email" type="email" name="email" />
   ```

3. **Excessive State Updates**
   - **Cause**: Multiple state updates in onChange handlers trigger frequent re-renders
   - **Solution**: Optimize state updates and use functional setState
   ```jsx
   const handleInputChange = useCallback((e) => {
     const { name, value, type, checked } = e.target;
     const newValue = type === 'checkbox' ? checked : value;

     // Use functional setState to prevent unnecessary re-renders
     setFormData(prevData => ({
       ...prevData,
       [name]: newValue
     }));

     // Conditional state updates
     if (error) setError('');
   }, [error, activeForm]);
   ```

4. **Debounce Expensive Operations**
   - **Cause**: Real-time password strength checking triggers re-renders on every keystroke
   - **Solution**: Debounce API calls and expensive operations
   ```jsx
   // Debounced password strength check
   if (name === 'password' && activeForm === 'register') {
     if (passwordStrengthTimeoutRef.current) {
       clearTimeout(passwordStrengthTimeoutRef.current);
     }

     if (value) {
       passwordStrengthTimeoutRef.current = setTimeout(() => {
         checkPasswordStrength(value);
       }, 300);
     }
   }
   ```

**Best Practices for Stable Forms**:
- Always memoize form components with `useCallback`
- Provide stable `key` props for all form inputs
- Use functional state updates to prevent dependency issues
- Debounce expensive operations (API calls, complex calculations)
- Clean up timeouts and intervals in component cleanup

### Modal Display Troubleshooting

#### Common Issues and Solutions

**Modal Not Visible Despite DOM Creation**
- **Symptom**: Modal DOM elements are created but not visible when header buttons are clicked
- **Root Cause**: DOM structure mismatch between PHP-generated container and React component wrapper
- **Solution**: React component should manipulate parent container classes instead of creating own modal wrapper

**DOM Structure Requirements**
```html
<!-- Correct Structure -->
<div class="rwp-cct-auth-modal rwp-cct-modal-visible"> <!-- PHP container, classes controlled by React -->
  <div class="modal-content"> <!-- React content -->
    <!-- form content -->
  </div>
</div>

<!-- Incorrect Structure (causes hidden modal) -->
<div class="rwp-cct-auth-modal rwp-cct-modal-hidden"> <!-- PHP container, always hidden -->
  <div class="rwp-cct-auth-modal rwp-cct-modal-visible"> <!-- React wrapper, visible but parent is hidden -->
    <div class="modal-content">
      <!-- form content -->
    </div>
  </div>
</div>
```

**CSS Class Management**
- Use `useEffect` to toggle visibility classes on parent container:
```jsx
useEffect(() => {
  if (container) {
    if (isVisible) {
      container.classList.remove('rwp-cct-modal-hidden');
      container.classList.add('rwp-cct-modal-visible');
    } else {
      container.classList.remove('rwp-cct-modal-visible');
      container.classList.add('rwp-cct-modal-hidden');
    }
  }
}, [isVisible, container]);
```

**Key CSS Classes**
- `.rwp-cct-modal-hidden`: `display: none !important` - hides modal
- `.rwp-cct-modal-visible`: `display: flex !important` - shows modal with flexbox centering
- `.rwp-cct-auth-modal`: Fixed positioning, full viewport coverage, dark overlay

**Event Flow Debugging**
1. Header buttons dispatch `rwp-cct-open-auth-modal` custom event
2. Modal component listens for event and updates `isVisible` state
3. `useEffect` toggles CSS classes on parent container
4. CSS class changes control modal visibility

**Debugging Checklist**
- [ ] Verify custom event is dispatched from header buttons
- [ ] Check that modal component receives the event
- [ ] Confirm `isVisible` state updates correctly
- [ ] Ensure parent container classes are being toggled
- [ ] Validate CSS classes exist and have proper styles
- [ ] Test that parent container becomes visible (not just child elements)

## Component Guidelines
- Document only major/significant components
- Library components (inputs, buttons, etc.) are documented by their respective libraries
- Focus on custom components that are specific to Content Creator Tools
- Include troubleshooting notes for complex integration patterns