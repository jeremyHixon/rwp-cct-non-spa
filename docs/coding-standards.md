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

## File Organization
- PHP: WordPress plugin structure with includes/ directory
- React: Dedicated src/ structure separate from PHP
- Clear separation between WordPress integration and React application code

## General Principles
- Accurate and concise code comments
- Consistent naming conventions throughout
- Prioritize readability and maintainability