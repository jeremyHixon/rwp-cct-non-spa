# Components Library

## External Libraries

### Icon Libraries
- **Lucide React**: Primary icon library for UI elements
- **React Icons**: Brand icons for social media platforms and additional icons

### UI Components
- TBD: Component library selection pending

## Custom Components

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