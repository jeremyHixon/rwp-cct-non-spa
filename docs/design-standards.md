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

### Login/Register Form Design
- **Container**: Centered form with maximum 400px width for optimal readability
- **Tab navigation**: Clear visual distinction between login and registration modes
- **Form fields**: Consistent spacing (mb-4) between form groups
- **Input styling**: Dark theme with focus ring using primary colors
- **Button hierarchy**: Primary button for main action, secondary for alternatives
- **Password fields**: Include visibility toggle with eye icon

### Error Message Display
- **Color scheme**: Use red-400 for error text against dark backgrounds
- **Positioning**: Display errors directly below relevant form fields
- **Animation**: Subtle fade-in animation for error appearance
- **Icon usage**: Include warning icon for visual emphasis
- **Message tone**: Clear, actionable language without technical jargon

### Loading States
- **Button loading**: Replace button text with spinner during authentication
- **Form disabling**: Disable all form inputs during submission
- **Visual feedback**: Use primary color for loading spinners
- **Timing**: Show loading state immediately on form submission
- **Accessibility**: Include screen reader text for loading states

### Success/Confirmation Messaging
- **Color scheme**: Use accent colors (green-400) for success states
- **Positioning**: Replace form content or display as overlay
- **Icons**: Checkmark icon for successful operations
- **Auto-redirect**: Brief success message before redirecting (2-3 seconds)
- **User feedback**: Clear indication of what happened and next steps

### Password Strength Indicators
- **Visual design**: Horizontal bar with color-coded strength levels
- **Color progression**: Red (weak) → Yellow (fair) → Green (strong)
- **Real-time feedback**: Update strength indicator as user types
- **Requirements list**: Show specific requirements with check/x indicators
- **Positioning**: Below password field, above submit button

### Authentication States
- **Unauthenticated**: Show login/register options
- **Loading**: Display spinner and disable interactions
- **Authenticated**: Show user info and logout option
- **Error**: Display error message with retry option
- **Expired session**: Prompt for re-authentication with context

## UI Principles
- Functional over decorative
- Consistent component spacing
- Clear visual hierarchy
- Accessibility through contrast and legibility