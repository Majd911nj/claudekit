---
title: /api-gen
description: Generate API endpoints, documentation, or client code from specifications
---

# /api-gen

## Purpose

Generate API endpoints, documentation, or client code from specifications. Accelerates API development by creating boilerplate code, OpenAPI specs, and client SDKs.

## Usage

```bash
/api-gen [resource-name-or-spec]
```

## Arguments

- **resource-name-or-spec**:
  - Resource name: `User`, `Order`, `Product` - Generate CRUD API
  - OpenAPI spec path: `openapi.yaml` - Generate from specification
  - Description: `"User management API"` - Generate from description

## Workflow

### Step 1: Define Resource

1. **Identify resource properties**
   - Field names and types
   - Required vs optional
   - Validation rules

2. **Define relationships**
   - One-to-many
   - Many-to-many
   - Foreign keys

3. **Determine operations**
   - CRUD operations needed
   - Custom endpoints
   - Business logic

### Step 2: Generate Code

1. **Create model/schema**
   - Database model
   - Validation schema
   - Type definitions

2. **Create routes/endpoints**
   - HTTP methods
   - Path parameters
   - Request/response handling

3. **Add validation**
   - Input validation
   - Type checking
   - Error handling

4. **Generate tests**
   - Endpoint tests
   - Validation tests
   - Error case tests

### Step 3: Document

1. **Create OpenAPI spec**
   - Endpoint descriptions
   - Request/response schemas
   - Authentication

2. **Add examples**
   - Request examples
   - Response examples
   - cURL commands

3. **Document errors**
   - Error codes
   - Error messages
   - Resolution steps

## Examples

### Generate CRUD API for Resource

```bash
/api-gen User
```

Creates:
- `src/models/user.ts` - Data model
- `src/routes/user.ts` - API routes
- `src/controllers/user.ts` - Business logic
- `tests/user.test.ts` - Test suite
- `docs/api/user.md` - API documentation

### Generate from OpenAPI Spec

```bash
/api-gen openapi.yaml
```

Generates code matching the specification.

### Generate with Description

```bash
/api-gen "Product catalog API with categories and tags"
```

Creates API based on natural language description.

## Output

```markdown
## API Generated: User Management

### Endpoints Created

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/users | List all users |
| POST | /api/users | Create new user |
| GET | /api/users/:id | Get user by ID |
| PUT | /api/users/:id | Update user |
| DELETE | /api/users/:id | Delete user |
| GET | /api/users/:id/posts | Get user's posts |

### Files Created

#### Model
- `src/models/user.ts`
  ```typescript
  export interface User {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  }

  export const UserSchema = z.object({
    email: z.string().email(),
    name: z.string().min(1).max(100),
  });
  ```

#### Routes
- `src/routes/user.ts`
  ```typescript
  router.get('/users', listUsers);
  router.post('/users', validateBody(UserSchema), createUser);
  router.get('/users/:id', getUser);
  router.put('/users/:id', validateBody(UserSchema), updateUser);
  router.delete('/users/:id', deleteUser);
  ```

#### Controller
- `src/controllers/user.ts`
  ```typescript
  export async function createUser(req, res) {
    const user = await db.user.create({
      data: req.body,
    });
    res.status(201).json(user);
  }
  // ... other handlers
  ```

#### Tests
- `tests/user.test.ts`
  ```typescript
  describe('User API', () => {
    it('should create user', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({ email: 'test@example.com', name: 'Test' });
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
    });
  });
  ```

#### Documentation
- `docs/api/user.md` - Full API documentation

### OpenAPI Specification

Generated `openapi.yaml`:
```yaml
openapi: 3.0.0
info:
  title: User API
  version: 1.0.0
paths:
  /api/users:
    get:
      summary: List all users
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/User'
    post:
      summary: Create new user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateUser'
      responses:
        '201':
          description: Created
```

### Next Steps

1. ✅ API endpoints generated
2. 🔧 Add authentication middleware
3. 🔧 Implement business validation
4. 🔧 Add pagination to list endpoint
5. 📝 Review and customize as needed
```

## Generation Modes

### CRUD Generation
```bash
/api-gen Product
```
Full Create, Read, Update, Delete operations

### Spec-Based Generation
```bash
/api-gen swagger.json
```
Generate from existing OpenAPI/Swagger spec

### Client Generation
```bash
/api-gen --client openapi.yaml
```
Generate TypeScript/Python client SDK

### Documentation Only
```bash
/api-gen --docs-only api/
```
Generate documentation for existing endpoints

## Flags

| Flag | Description |
|------|-------------|
| `--framework=[express\|fastapi\|nestjs]` | Target framework |
| `--db=[postgres\|mongodb\|prisma]` | Database/ORM |
| `--auth` | Include authentication |
| `--client` | Generate client SDK |
| `--docs-only` | Documentation only |
| `--test-framework=[jest\|vitest\|pytest]` | Testing framework |

## Advanced Examples

### Express + PostgreSQL + Auth

```bash
/api-gen Order \
  --framework=express \
  --db=postgres \
  --auth
```

### FastAPI + MongoDB

```bash
/api-gen Product \
  --framework=fastapi \
  --db=mongodb
```

### Generate Client SDK

```bash
/api-gen --client openapi.yaml
```

Creates TypeScript client:
```typescript
import { UserAPI } from './generated/client';

const api = new UserAPI({ baseUrl: 'http://localhost:3000' });
const users = await api.getUsers();
const user = await api.createUser({
  email: 'test@example.com',
  name: 'Test User'
});
```

## Resource Definition

When generating from resource name, you'll be asked:

```markdown
### Define Resource: User

**Fields:**
1. email (string, required, unique)
2. name (string, required)
3. role (enum: user|admin, optional, default: user)
4. createdAt (datetime, auto)

**Relationships:**
- Has many: Post
- Belongs to: Organization (optional)

**Custom Endpoints:**
- POST /users/:id/verify-email
- POST /users/:id/reset-password

**Validation:**
- Email must be valid format
- Name: 1-100 characters
- Password: min 8 characters

Proceed with generation? (y/n)
```

## OpenAPI Templates

### Complete Endpoint

```yaml
/api/orders:
  post:
    summary: Create new order
    tags:
      - Orders
    security:
      - bearerAuth: []
    requestBody:
      required: true
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/CreateOrder'
          examples:
            basic:
              value:
                items:
                  - productId: "123"
                    quantity: 2
                shippingAddress:
                  street: "123 Main St"
                  city: "New York"
    responses:
      '201':
        description: Order created
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Order'
      '400':
        description: Invalid input
      '401':
        description: Unauthorized
```

## Best Practices

1. **Start with Design**: Define API before generating
2. **Review Generated Code**: Don't blindly accept all generated code
3. **Customize**: Generated code is a starting point
4. **Add Business Logic**: Implement domain-specific validation
5. **Security**: Add authentication and authorization
6. **Testing**: Extend generated tests with edge cases

## Use Cases

### Rapid Prototyping

```bash
# Quickly scaffold multiple resources
/api-gen User
/api-gen Post
/api-gen Comment
```

### API-First Development

```bash
# Design spec, then generate
# 1. Create openapi.yaml
# 2. Generate code
/api-gen openapi.yaml
```

### Client SDK Distribution

```bash
# Generate client for API consumers
/api-gen --client openapi.yaml
```

### Documentation Generation

```bash
# Document existing API
/api-gen --docs-only src/api/
```

## Related Commands

- [/doc](/claudekit/commands/doc) - Generate documentation
- [/feature](/claudekit/core-commands/feature) - Full feature development
- [/test](/claudekit/core-commands/test) - Generate tests
- [/review](/claudekit/core-commands/review) - Review generated code
