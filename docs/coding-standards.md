# Coding Standards

## PHP Standards
- Follow WordPress Coding Standards for ALL PHP code
- Use `rwp_cct_` prefix for all WordPress integration points (hooks, functions, database tables)
- Maintain consistency across all PHP files, not just WordPress-specific code
- Plugin class names: Use `RWP_CCT_` prefix (e.g., `RWP_CCT_Plugin`)
- Constants: Use `RWP_CCT_` prefix (e.g., `RWP_CCT_VERSION`)
- Hook names: Use `rwp_cct_` prefix (e.g., `rwp_cct_init`)
- Database tables: Use `rwp_cct_` prefix (e.g., `{$wpdb->prefix}rwp_cct_analytics`)

## React/JavaScript Standards
- Use functional components only
- ES6+ syntax
- Keep React and PHP files completely separate for navigation clarity
- File organization: PHP files in plugin root/includes, React components in separate src/components structure

## File Organization
- PHP: WordPress plugin structure with includes/ directory
- React: Dedicated src/ structure separate from PHP
- Clear separation between WordPress integration and React application code

## General Principles
- Accurate and concise code comments
- Consistent naming conventions throughout
- Prioritize readability and maintainability