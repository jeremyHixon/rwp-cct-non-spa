# Design Standards

## Theme Configuration
- **Dark theme globally**: Configure Tailwind to default to dark theme
- Avoid light theme variants to maintain consistency
- Isolated styles preferred, but minor plugin/theme collisions acceptable

## Visual Requirements
- **High contrast**: Ensure all text/UI elements have sufficient contrast
- **Legibility**: Prioritize readable typography and clear visual hierarchy  
- **Standard spacing**: Use Tailwind's default spacing scale
- **Clean aesthetics**: Minimal, functional design approach

## Tailwind Configuration

### Theme Setup
- **Dark mode**: Configured with `darkMode: 'class'` for explicit control
- **Default theme**: Dark theme applied by default to all components
- **Content paths**: Watches `./src/**/*.{js,jsx,ts,tsx}` and `./templates/**/*.php`

### Custom Color Palette

#### Dark Theme Colors (`dark`)
- `dark-50` to `dark-950`: Grayscale palette for dark theme
- Primary usage: `dark-800` (form backgrounds), `dark-900` (input backgrounds), `dark-950` (page backgrounds)

#### Primary Brand (`primary`)
- `primary-50` to `primary-950`: Blue-based brand colors
- Primary usage: `primary-600` (buttons), `primary-500` (focus states), `primary-400` (links)

#### Accent Colors (`accent`)
- `accent-50` to `accent-950`: Green-based accent colors
- Usage: Success states, positive feedback, call-to-action elements

### Typography
- **Font family**: Inter as primary, falling back to system fonts
- **Font weights**: Default Tailwind scale maintained
- **Text colors**: Optimized for dark theme contrast

### Component Classes

#### Form Components
- `.rwp-cct-form`: Main form container with dark styling
- `.rwp-cct-input`: Standard input with dark theme and focus states
- `.rwp-cct-button`: Primary button with hover and focus states
- `.rwp-cct-button-secondary`: Secondary button variant
- `.rwp-cct-label`: Form label styling with proper contrast

#### Layout Components
- `.rwp-cct-container`: Full-page dark container
- `.rwp-cct-form-group`: Consistent form field spacing

#### Authentication Components
- `.rwp-cct-auth-container`: Authentication form wrapper with proper spacing
- `.rwp-cct-auth-tabs`: Tab navigation for login/register forms
- `.rwp-cct-auth-tab`: Individual tab styling with active states
- `.rwp-cct-auth-form`: Authentication-specific form styling
- `.rwp-cct-password-toggle`: Password visibility toggle button
- `.rwp-cct-auth-link`: Links within authentication flows (forgot password, sign up, etc.)
- `.rwp-cct-auth-divider`: Visual separators between form sections

### Plugins
- **@tailwindcss/forms**: Integrated for consistent form styling across browsers
- **Strategy**: Class-based forms for explicit control

## CSS Reset Strategy

### Global Reset Approach
- **Tailwind Preflight**: Full Tailwind Preflight reset is applied globally
- **Location**: Compiled into `assets/dist/css/main.css` and enqueued with `rwp-cct-auth-demo-styles` handle
- **Scope**: Affects entire page when plugin shortcodes are used
- **Philosophy**: Global normalization acceptable for consistent plugin styling

### Reset Coverage
- **Box model**: `box-sizing: border-box` applied to all elements
- **Typography**:
  - Headings (h1-h6) reset to inherit font-size and font-weight
  - Default font family set to Inter with system font fallbacks
  - Consistent line-height (1.5) across all elements
- **Spacing**: All default margins and padding removed
- **Forms**: Normalized across browsers via Tailwind forms plugin
- **Links**: Default styling removed for opt-in approach

### WordPress Integration
- **Enqueue method**: Standard `wp_enqueue_style()` with proper versioning
- **Prefix**: All handles use `rwp-cct-` prefix for WordPress compatibility
- **Conditional loading**: CSS only loads on pages containing plugin shortcodes
- **Theme compatibility**: Global reset may override theme styles (acceptable trade-off)

## Style Guide Reference

### External Tool Integration
- **Style guide availability**: Use `[rwp_cct_style_guide]` shortcode for comprehensive design reference
- **Elementor integration**: Style guide provides exact hex codes and CSS values for matching
- **Brand consistency**: Reference guide ensures external tools match plugin styling
- **Color codes**: Primary blues (#3B82F6, #2563EB, #60A5FA), Dark backgrounds (#111827, #1F2937, #374151)
- **Typography specs**: Font sizes, weights, and spacing values for external tool configuration

### Implementation
- **Location**: Style guide accessible via shortcode on any WordPress page
- **Format options**: Full guide, compact view, or quick reference format
- **Print-friendly**: Organized layout suitable for reference documentation
- **Developer tool**: Enables consistent styling across plugin and external page builders

## Authentication UI Patterns

### Conversion-Optimized Form Design
- **Container**: Centered modal with maximum 400px width for optimal readability
- **Tab navigation**: Three-tab system (Login, Register, Reset) with clear visual distinction
- **Form fields**: Minimal field requirements to reduce registration friction
- **Input styling**: Dark theme with focus ring using primary colors
- **Button hierarchy**: Primary button for main action, secondary for alternatives
- **Messaging**: Value proposition messaging to encourage conversion

### Simplified Registration Pattern
- **Field requirements**: Email and password only (no name fields, no password confirmation)
- **Password validation**: 8+ characters with letter + number requirement
- **Username generation**: Auto-generated `user_` + MD5 hash on backend
- **User role**: Default subscriber role with immediate activation
- **Terms acceptance**: Inline text below form (no required checkbox)
- **Value proposition**: "Start creating amazing content today" messaging

### Streamlined Login Pattern
- **Field requirements**: Email and password only (email-based authentication)
- **Remember me**: Functional checkbox with localStorage persistence
- **Forgot password**: Direct link to reset tab (no separate page)
- **Cross-form navigation**: Easy switching between login and registration

### Password Reset Pattern
- **Field requirements**: Email only for maximum simplicity
- **Navigation**: Back to login button for easy return
- **Success handling**: Clear message without modal closure (user reads confirmation)
- **No complexity**: Simple email-based reset without multi-step workflows

### Real-Time Password Strength System
- **Visual design**: 5-bar horizontal strength meter with color coding
- **Color progression**:
  - Gray (no input) → Red (very weak/weak) → Yellow (fair) → Blue (good) → Green (strong)
- **Real-time feedback**: Updates as user types with immediate visual response
- **Requirement feedback**: Displays specific missing requirements inline
- **Implementation**: Client-side calculation only for better performance and reliability
- **Positioning**: Below password field with clear visual hierarchy
- **Performance**: No API calls - all calculations handled in browser for instant feedback

### Enhanced Loading States
- **Button loading**: Spinner with contextual text ("Creating Account...", "Signing In...", "Sending Email...")
- **Form disabling**: All inputs disabled during submission to prevent double-submission
- **Visual feedback**: Primary blue color for loading spinners
- **State management**: Loading state maintained until API response received
- **Accessibility**: Screen reader announcements for state changes

### Success Flow Optimization
- **Registration success**: Automatic login + JWT storage + modal close + header update
- **Login success**: JWT storage + modal close + header update (no redirect)
- **Reset success**: Email confirmation message (modal stays open for user to read)
- **Auto-redirect timing**: 1.5 seconds for account creation/login success
- **Global state sync**: `rwp-cct-auth-success` events for cross-component updates

### Error Handling Patterns
- **Inline validation**: Errors appear below relevant fields with red-400 color
- **API error display**: Server errors shown in prominent error box with alert icon
- **Network errors**: Fallback messages for connection issues
- **Validation feedback**: Real-time clearing of errors when user starts typing
- **User-friendly language**: Clear, actionable messages without technical jargon

### JWT Token Management
- **Storage strategy**: localStorage for token persistence across sessions
- **Remember me implementation**: Separate localStorage flag for user preference
- **Auto-loading**: Remember me preference loaded on modal open
- **Security considerations**: Tokens handled securely with proper expiration
- **Cross-session sync**: Token availability updates global authentication state

### Authentication States
- **Unauthenticated**: Login/register modal accessible via header buttons
- **Loading**: Form submission with disabled inputs and loading feedback
- **Authenticated**: Header shows user info with logout option, modal closes
- **Error**: Inline error messages with clear recovery paths
- **Token verification**: Background verification for persistent authentication

## React Component Stability Patterns

### Component Isolation for Performance
**Critical principle**: Prevent re-render cascades by isolating component responsibilities and state management.

#### State Isolation Pattern
**Problem**: Parent components managing both UI state and form state cause excessive re-renders.

**Solution**: Use React.memo and separate form state into individual components.

```jsx
// ❌ Anti-pattern: Form state in parent causes re-render cascade
const AuthModal = ({ container }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' }); // Triggers re-renders

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value })); // Re-renders entire modal
  };

  return (
    <div>
      <input onChange={handleInputChange} value={formData.email} />
    </div>
  );
};

// ✅ Correct pattern: Isolated form components with React.memo
const LoginForm = React.memo(({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({ email: '', password: '' }); // Isolated state

  const handleInputChange = useCallback((e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value })); // Only re-renders this component
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onSubmit(formData, 'login'); // Callback to parent
  }, [formData, onSubmit]);

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleInputChange} value={formData.email} />
    </form>
  );
});

const AuthModal = React.memo(({ container }) => {
  const [isVisible, setIsVisible] = useState(false); // Only UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFormSubmit = useCallback(async (formData, formType) => {
    // Handle submission without affecting form components
    setIsLoading(true);
    // API call logic
    setIsLoading(false);
  }, []);

  return (
    <div>
      <LoginForm onSubmit={handleFormSubmit} isLoading={isLoading} />
    </div>
  );
});
```

#### Key Principles for Component Isolation
1. **State Separation**: Form data state belongs in form components, UI state in parent
2. **React.memo**: Apply to all form components to prevent unnecessary re-renders
3. **Callback Communication**: Use callbacks for parent-child communication
4. **Minimal Parent State**: Parent only manages visibility, loading, error states

#### Benefits of Component Isolation
- **Performance**: Eliminates excessive re-renders during form input
- **Focus Stability**: Input focus remains stable during typing
- **Maintainability**: Clear separation of concerns between components
- **Testability**: Individual form components can be tested in isolation

### Input Focus Stability Guidelines
**Critical requirement**: Form inputs must maintain focus during typing to ensure usable authentication.

#### React Component Patterns for Stable Forms
1. **Memoized Form Components**
   ```jsx
   // Correct: Form component memoized to prevent recreation
   const LoginForm = useCallback(() => (
     <form>
       {/* form content */}
     </form>
   ), [formData.email, formData.password, handleInputChange, showPassword, isLoading]);

   // Incorrect: Form component recreated on every render
   const LoginForm = () => (
     <form>
       {/* form content */}
     </form>
   );
   ```

2. **Stable Input Keys**
   ```jsx
   // Correct: Unique keys prevent React from recreating DOM elements
   <input key="login-email" type="email" name="email" />
   <input key="register-password" type="password" name="password" />

   // Incorrect: No keys allow React to recreate inputs during re-renders
   <input type="email" name="email" />
   ```

3. **Optimized State Updates**
   ```jsx
   // Correct: Functional setState prevents dependency issues
   const handleInputChange = useCallback((e) => {
     const { name, value } = e.target;
     setFormData(prevData => ({
       ...prevData,
       [name]: value
     }));
   }, []);

   // Incorrect: Direct state updates can cause excessive re-renders
   const handleInputChange = (e) => {
     setFormData({
       ...formData,
       [e.target.name]: e.target.value
     });
   };
   ```

4. **Debounced Expensive Operations**
   ```jsx
   // Correct: Debounce API calls and expensive calculations
   if (name === 'password' && activeForm === 'register') {
     if (timeoutRef.current) clearTimeout(timeoutRef.current);
     timeoutRef.current = setTimeout(() => {
       checkPasswordStrength(value);
     }, 300);
   }

   // Incorrect: Immediate API calls on every keystroke
   if (name === 'password') {
     checkPasswordStrength(value);
   }
   ```

#### Input Focus Anti-Patterns (Avoid)
- Defining form components inside parent component render
- Missing React keys on form inputs
- Multiple state updates in single onChange handler
- Immediate API calls without debouncing
- Direct formData object mutations

#### Focus Stability Checklist
- [ ] Form components use `useCallback` with proper dependencies
- [ ] All inputs have unique, stable `key` attributes
- [ ] State updates use functional setState pattern
- [ ] Expensive operations (API calls) are debounced
- [ ] Timeout cleanup in component unmount
- [ ] No unnecessary re-renders during typing

## UI Principles
- Functional over decorative
- Consistent component spacing
- Clear visual hierarchy
- Accessibility through contrast and legibility
- **Input focus stability** - Forms must be usable for typing