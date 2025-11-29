---
title: /doc
description: Generate or update documentation including API docs, README files, and code comments
---

# /doc

## Purpose

Generate or update documentation including API docs, README files, code comments, and technical specifications. Creates comprehensive, accurate documentation that helps developers understand and use the codebase effectively.

## Usage

```bash
/doc [target]
```

## Arguments

- **target**: What to document
  - File/function path: `src/services/auth.ts` - Document specific code
  - `api` - Generate API documentation
  - `readme` - Update README file
  - `changelog` - Generate changelog from commits
  - `all` - Document everything

## Workflow

### For Code Documentation

#### 1. Analyze Code
- Read the code thoroughly
- Understand purpose and behavior
- Identify inputs and outputs
- Note side effects and edge cases

#### 2. Generate Documentation
- Add docstrings/JSDoc
- Include examples
- Document edge cases
- Add type annotations

### For API Documentation

#### 1. Find All Endpoints
- Scan route definitions
- Identify HTTP methods
- Note authentication requirements

#### 2. Document Each Endpoint
- Request format
- Response format
- Error responses
- Examples

### For README

#### 1. Analyze Project
- Purpose and features
- Installation steps
- Usage examples
- Configuration

#### 2. Generate/Update
- Clear structure
- Working examples
- Up-to-date information

### For Changelog

#### 1. Analyze Commits
```bash
git log --oneline --since="last release"
```

#### 2. Categorize Changes
- Added
- Changed
- Fixed
- Removed

## Examples

```bash
# Document a specific file
/doc src/services/auth.ts

# Generate API documentation
/doc api

# Update README
/doc readme

# Generate changelog
/doc changelog

# Document all API endpoints
/doc api/

# Add docstrings to all functions in a module
/doc src/utils/
```

## Documentation Templates

### Python Docstring

```python
def calculate_discount(price: float, percentage: float) -> float:
    """
    Calculate discounted price.

    Args:
        price: Original price in dollars.
        percentage: Discount percentage (0-100).

    Returns:
        The discounted price.

    Raises:
        ValueError: If percentage is not between 0 and 100.

    Example:
        >>> calculate_discount(100.0, 20)
        80.0
    """
```

### TypeScript JSDoc

```typescript
/**
 * Calculate discounted price.
 *
 * @param price - Original price in dollars
 * @param percentage - Discount percentage (0-100)
 * @returns The discounted price
 * @throws {RangeError} If percentage is not between 0 and 100
 *
 * @example
 * calculateDiscount(100, 20); // returns 80
 */
function calculateDiscount(price: number, percentage: number): number {
```

### API Endpoint Documentation

```markdown
## POST /api/orders

Create a new order.

### Authentication
Requires Bearer token.

### Request Body

\`\`\`json
{
  "items": [
    { "productId": "123", "quantity": 2 }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "zip": "10001"
  }
}
\`\`\`

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| items | array | Yes | Array of order items |
| items[].productId | string | Yes | Product identifier |
| items[].quantity | number | Yes | Quantity to order |
| shippingAddress | object | Yes | Delivery address |

### Response (201 Created)

\`\`\`json
{
  "id": "order_456",
  "status": "pending",
  "total": 99.99,
  "createdAt": "2024-01-15T10:00:00Z"
}
\`\`\`

### Error Responses

| Status | Code | Description |
|--------|------|-------------|
| 400 | INVALID_ITEMS | Items array is empty or invalid |
| 401 | UNAUTHORIZED | Invalid or missing token |
| 422 | OUT_OF_STOCK | One or more items unavailable |
```

### README Section

```markdown
## Installation

\`\`\`bash
npm install my-package
\`\`\`

## Quick Start

\`\`\`typescript
import { Client } from 'my-package';

const client = new Client({ apiKey: 'your-key' });
const result = await client.fetch();
\`\`\`

## Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| apiKey | string | required | Your API key |
| timeout | number | 5000 | Request timeout in ms |
| retries | number | 3 | Number of retry attempts |
```

### Changelog Entry

```markdown
## [1.2.0] - 2024-01-15

### Added
- Password reset functionality (#123)
- Email verification for new accounts
- Two-factor authentication support

### Changed
- Improved error messages for validation failures
- Updated dependencies to latest versions
- Enhanced logging for debugging

### Fixed
- Race condition in session handling (#456)
- Incorrect timezone in date displays
- Memory leak in WebSocket connections

### Security
- Patched XSS vulnerability in user input
- Updated authentication token expiry
```

## Output

```markdown
## Documentation Updated

### Files Modified
- `src/services/auth.ts` - Added JSDoc comments
- `docs/api/auth.md` - New API documentation
- `README.md` - Updated configuration section

### Documentation Added

#### Code Comments
- `AuthService.login()` - Full JSDoc with examples
- `AuthService.logout()` - Parameter documentation
- `validateToken()` - Return type and exceptions
- `refreshToken()` - Error scenarios

#### API Documentation
- POST /api/auth/login
- POST /api/auth/logout
- POST /api/auth/refresh
- POST /api/auth/verify

#### README Sections
- Installation instructions
- Quick start guide
- Configuration options
- Environment variables

### Coverage

- Functions documented: 15/18 (83%)
- Endpoints documented: 12/12 (100%)
- README completeness: 90%

### Quality Checks

✅ All examples tested and working
✅ Type annotations complete
✅ Error cases documented
✅ Links verified

### Next Steps

1. Add examples to remaining 3 functions
2. Create getting started tutorial
3. Add architecture diagram
4. Document deployment process
```

## Flags

| Flag | Description |
|------|-------------|
| `--format=[md\|html\|openapi]` | Documentation format |
| `--update` | Update existing docs only |
| `--examples` | Include code examples |
| `--comprehensive` | Maximum detail level |

## Documentation Types

### Code Documentation
- Function/method docstrings
- Class documentation
- Module-level documentation
- Inline comments for complex logic

### API Documentation
- Endpoint descriptions
- Request/response formats
- Authentication requirements
- Error codes and handling

### User Documentation
- README files
- Getting started guides
- Configuration guides
- Troubleshooting guides

### Technical Documentation
- Architecture diagrams
- Design decisions
- Database schemas
- Deployment guides

## Best Practices

1. **Keep It Current**: Update docs with code changes
2. **Include Examples**: Real, working code examples
3. **Document Edge Cases**: Error scenarios and limitations
4. **Clear Language**: Write for your audience
5. **Test Examples**: Ensure all code examples work
6. **Version Docs**: Match documentation to code versions

## Use Cases

### Onboarding New Developers

```bash
# Generate comprehensive project documentation
/doc all
```

### Before Release

```bash
# Update changelog and README
/doc changelog
/doc readme
```

### API Development

```bash
# Document all API endpoints
/doc api
```

### Code Maintainability

```bash
# Add docstrings to service layer
/doc src/services/
```

## Related Commands

- [/api-gen](/claudekit/commands/api-gen) - Generate API code and docs
- [/review](/claudekit/core-commands/review) - Review documentation quality
- [/help](/claudekit/commands/help) - Command help
