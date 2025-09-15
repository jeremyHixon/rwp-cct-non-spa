# Coding Standards

## PHP Standards
- Follow WordPress Coding Standards for ALL PHP code
- Use `rwp_cct_` prefix for all WordPress integration points (hooks, functions, database tables)
- Maintain consistency across all PHP files, not just WordPress-specific code
- Plugin class names: Use `RWP_CCT_` prefix (e.g., `RWP_CCT_Plugin`)
- Constants: Use `RWP_CCT_` prefix (e.g., `RWP_CCT_VERSION`)
- Hook names: Use `rwp_cct_` prefix (e.g., `rwp_cct_init`)
- Database tables: Use `rwp_cct_` prefix (e.g., `{$wpdb->prefix}rwp_cct_analytics`)

## REST API Standards
- **Namespace**: Use `rwp-cct/v1` for all REST API endpoints
- **Authentication endpoints**: Follow pattern `/wp-json/rwp-cct/v1/auth/{endpoint}`
- **Endpoint naming**: Use kebab-case for URL segments (e.g., `/auth/register`, `/auth/verify`)
- **HTTP methods**: Use appropriate REST verbs (POST for creation/authentication, GET for retrieval)
- **Response format**: Consistent JSON structure with `success` boolean and descriptive error codes
- **Security**: Implement proper input validation, sanitization, and rate limiting
- **Documentation**: Maintain comprehensive API documentation with examples in `api-examples.md`

## JWT Implementation Standards
- **Token structure**: Use HS256 algorithm with WordPress-generated secret key
- **Claims**: Include `user_id`, `email`, `role`, `iat`, `exp`, and `iss` in all tokens
- **Expiration**: Standard 24-hour token lifetime
- **Storage**: Store JWT secret in WordPress options table with `rwp_cct_jwt_secret` key
- **Validation**: Verify signature, expiration, and issuer on all protected endpoints
- **Headers**: Use standard `Authorization: Bearer {token}` format for token transmission

## Security Guidelines
- **Rate limiting**: Implement IP-based rate limiting for authentication endpoints (10 attempts/hour)
- **Password validation**: Minimum 8 characters with letters and numbers requirement
- **Input sanitization**: Use WordPress sanitization functions (`sanitize_email()`, etc.)
- **Error handling**: Generic error messages to prevent user enumeration attacks
- **Logging**: Comprehensive error logging for debugging while protecting sensitive data
- **WordPress integration**: Follow WordPress security practices and nonce validation where applicable

## React/JavaScript Standards
- Use functional components only
- ES6+ syntax
- Keep React and PHP files completely separate for navigation clarity
- File organization: PHP files in plugin root/includes, React components in separate src/components structure

### Wizard Component Patterns
- **Multi-step wizards**: Use centralized state management with step routing
- **Step validation**: Implement per-step validation functions for navigation control
- **Data persistence**: Maintain form data across all steps in parent component state
- **Navigation control**: Enable/disable navigation buttons based on validation state
- **Progress indicators**: Use visual step indicators with active, completed, and pending states

### File Upload Patterns
- **Drag-and-drop interface**: Implement visual feedback with hover states
- **File validation**: Client-side validation for file size (10MB) and format restrictions
- **Preview functionality**: Generate object URLs for image previews with cleanup
- **Error handling**: User-friendly error messages for invalid files
- **File storage**: Store File objects in component state for later processing

### Form Validation Patterns
- **Real-time validation**: Validate fields on change events with debouncing for expensive operations
- **URL validation**: Use browser URL constructor for format validation
- **Required field tracking**: Enable/disable submit buttons based on required field completion
- **Error state display**: Show validation errors inline with appropriate styling
- **Character counting**: Display character counts for text fields with limits

### Multi-Select Component Patterns
- **Array-based selection**: Store selected items as arrays in component state
- **Toggle functionality**: Implement add/remove logic for multi-select behavior
- **Selection validation**: Require minimum selection count for form completion
- **Visual feedback**: Use checkboxes, borders, and background colors to indicate selection state
- **Selection summary**: Display selected items count and badges for user feedback
- **Click handling**: Support both checkbox clicks and card clicks for selection

**Multi-select Toggle Pattern:**
```jsx
const handleToggle = (itemId) => {
  const isSelected = selectedItems.includes(itemId);
  let newSelection;

  if (isSelected) {
    newSelection = selectedItems.filter(id => id !== itemId);
  } else {
    newSelection = [...selectedItems, itemId];
  }

  onUpdate({ selectedItems: newSelection });
};
```

### Brand Icon Integration Patterns
- **Icon library organization**: Import from specific React Icons families (fa, fa6, si)
- **Platform data structure**: Include icon component references in data objects
- **Uniform icon styling**: Use consistent white color (#ffffff) and sizing for brand icons regardless of platform colors
- **Dynamic icon rendering**: Use component references to render icons dynamically
- **Icon accessibility**: Ensure icons have appropriate sizes and contrast ratios

**Brand Icon Styling Standard:**
- **Color uniformity**: All platform icons display in white (#ffffff) for consistency
- **Size consistency**: Use standardized sizing (1.25rem for main displays, 1rem for compact displays)
- **Brand data retention**: Keep original brand colors in data structure for potential future use

**Brand Icon Data Pattern:**
```jsx
const platforms = [
  {
    id: 'platform-id',
    name: 'Platform Name',
    icon: IconComponent, // React Icons component reference
    color: '#BrandColor', // Retained for data compatibility, not used in visual display
    // other platform-specific data
  }
];

// Updated Usage in JSX - Uniform white styling
const IconComponent = platform.icon;
<IconComponent
  className="icon-class"
  style={{
    color: '#ffffff',
    fontSize: '1.25rem',
    width: '1.25rem',
    height: '1.25rem'
  }}
/>
```

**React Icons Import Pattern:**
```jsx
// Group imports by icon family for organization
import { FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SiTiktok } from 'react-icons/si';
```

### Responsive Grid Layout Patterns
- **Grid container**: Use CSS Grid with `repeat(auto-fit, minmax())` for responsive columns
- **Breakpoint adaptation**: Implement specific column counts at different screen sizes
- **Card-based layouts**: Design components as cards for consistent grid item appearance
- **Mobile optimization**: Ensure grid layouts work effectively on mobile devices

**Responsive Grid CSS Pattern:**
```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

@media (min-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

## File Organization
- PHP: WordPress plugin structure with includes/ directory
- React: Dedicated src/ structure separate from PHP
- Clear separation between WordPress integration and React application code

### Component Directory Structure
- **Feature-based organization**: Group related components by feature (`src/components/caption-generator/`)
- **Sub-directory patterns**: Use `steps/` for wizard steps, `components/` for reusable UI elements
- **Naming conventions**: Use PascalCase for component files (`ContentStep.jsx`, `StepNavigation.jsx`)
- **Entry point files**: Create feature-specific initialization files (`caption-generator-init.js`)
- **Component exports**: Maintain centralized exports in `src/components/index.js`

### Shortcode Integration Patterns
- **PHP shortcode classes**: Use `includes/shortcodes/class-rwp-cct-{feature}-shortcode.php` naming
- **Asset enqueuing**: Implement shortcode detection and conditional asset loading
- **Webpack entry points**: Add feature-specific entries for independent asset compilation
- **Script registration**: Follow WordPress script/style registration with proper dependencies
- **Container generation**: Create unique container IDs for multiple shortcode instances

## General Principles
- Accurate and concise code comments
- Consistent naming conventions throughout
- Prioritize readability and maintainability