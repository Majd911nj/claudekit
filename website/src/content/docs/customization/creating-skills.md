---
title: Creating Custom Skills
description: Learn how to create custom skill modules to extend Claude's knowledge for your tech stack.
---

# Creating Custom Skills

Skills are knowledge modules that give Claude expertise in specific technologies, frameworks, methodologies, or your project-specific patterns. This guide shows you how to create custom skills.

## What Are Skills?

Skills are focused knowledge modules that provide:

- **Best practices** for languages, frameworks, tools
- **Code patterns** and examples
- **Common pitfalls** to avoid
- **Project-specific conventions** and APIs

Skills are automatically loaded based on context and can be referenced explicitly in commands.

## Skill File Structure

Skills are `SKILL.md` files organized by category:

```
.claude/skills/
├── languages/
│   ├── python/SKILL.md
│   └── rust/SKILL.md
├── frameworks/
│   ├── react/SKILL.md
│   └── svelte/SKILL.md
├── databases/
│   └── mysql/SKILL.md
├── testing/
│   └── rspec/SKILL.md
├── methodology/
│   └── your-workflow/SKILL.md
└── custom/
    ├── your-api/SKILL.md
    └── internal-tools/SKILL.md
```

## Skill Categories

Organize skills into these standard categories:

| Category | What Goes Here | Examples |
|----------|----------------|----------|
| `languages/` | Programming language best practices | python, rust, go |
| `frameworks/` | Web frameworks and libraries | svelte, rails, vue |
| `databases/` | Database-specific patterns | mysql, cassandra |
| `testing/` | Testing frameworks | rspec, mocha |
| `devops/` | Infrastructure and deployment | kubernetes, terraform |
| `frontend/` | Frontend tools and libraries | tailwind, alpine |
| `security/` | Security frameworks | owasp, security-headers |
| `api/` | API design and documentation | graphql, grpc |
| `methodology/` | Development methodologies | your-tdd, your-review-process |
| `custom/` | Project-specific knowledge | internal-api, company-standards |

## Skill Template

Here's the complete template for a skill file:

```markdown
# Skill Name

## Description

Brief description of what this skill covers and when it's relevant.

## When to Use

- Context 1 where this skill applies
- Context 2 where this skill applies
- Context 3 where this skill applies

---

## Core Patterns

### Pattern 1 Name

Description of the pattern.

\`\`\`[language]
// Code example showing the pattern
\`\`\`

**When to use:**
- Scenario A
- Scenario B

**Avoid:**
- Anti-pattern A
- Anti-pattern B

### Pattern 2 Name

Another pattern with examples.

## Best Practices

1. **Practice Name**
   - What to do
   - Why it matters
   - Example

2. **Another Practice**
   - Details
   - Examples

## Common Pitfalls

- **Pitfall 1**: Description
  - **Why it's bad**: Explanation
  - **Solution**: How to avoid

- **Pitfall 2**: Description
  - **Why it's bad**: Explanation
  - **Solution**: How to avoid

---
```

## Skill Anatomy

### 1. Header and Description

```markdown
# Svelte

## Description

Modern reactive framework for building web applications. Focuses on
compile-time optimization, minimal runtime, and reactive declarations.

## When to Use

- Building modern web applications
- Writing component-based UIs
- When Svelte is in the project's tech stack
```

Clear, concise overview of what the skill covers.

### 2. Core Patterns

```markdown
## Core Patterns

### Reactive Declarations

Svelte automatically tracks dependencies and re-runs reactive statements.

\`\`\`svelte
<script>
  let count = 0;

  // Reactive declaration - runs when count changes
  $: doubled = count * 2;

  // Reactive statement - runs when count changes
  $: {
    console.log(`Count is ${count}`);
    console.log(`Doubled is ${doubled}`);
  }
</script>

<button on:click={() => count++}>
  Count: {count}, Doubled: {doubled}
</button>
\`\`\`

**When to use:**
- Derived values that depend on reactive state
- Side effects that should run on state changes
- Complex computed values

**Avoid:**
- Over-using reactive statements for simple transformations
- Creating circular dependencies between reactive declarations
\`\`\`
```

Show actual code patterns users will write.

### 3. Best Practices

```markdown
## Best Practices

1. **Keep Components Small**
   - Aim for < 200 lines per component
   - Extract reusable logic into modules
   - Use composition over inheritance

   \`\`\`svelte
   <!-- Good: Small, focused component -->
   <UserCard {user} />

   <!-- Avoid: Massive component doing everything -->
   <UserDashboard {user} {posts} {comments} {settings} />
   \`\`\`

2. **Use Stores for Shared State**
   - Don't prop-drill through multiple levels
   - Use writable stores for app-wide state
   - Use derived stores for computed values

   \`\`\`javascript
   // stores.js
   import { writable, derived } from 'svelte/store';

   export const users = writable([]);
   export const activeUsers = derived(
     users,
     $users => $users.filter(u => u.active)
   );
   \`\`\`
```

Actionable advice with examples.

### 4. Common Pitfalls

```markdown
## Common Pitfalls

- **Mutating Arrays/Objects Directly**
  - **Why it's bad**: Svelte can't detect mutations
  - **Solution**: Use assignment to trigger reactivity

  \`\`\`javascript
  // ❌ Wrong - won't trigger reactivity
  items.push(newItem);

  // ✅ Right - triggers reactivity
  items = [...items, newItem];
  \`\`\`

- **Memory Leaks with Subscriptions**
  - **Why it's bad**: Unsubscribed stores leak memory
  - **Solution**: Use $ auto-subscription or onDestroy

  \`\`\`svelte
  <script>
    import { onDestroy } from 'svelte';
    import { myStore } from './stores';

    // ✅ Auto-unsubscribes
    $: value = $myStore;

    // ✅ Manual cleanup
    const unsubscribe = myStore.subscribe(value => {
      // ...
    });
    onDestroy(unsubscribe);
  </script>
  \`\`\`
```

Real issues developers face with solutions.

## Complete Example: Internal API Skill

Here's a project-specific skill example:

```markdown
# Internal API Standards

## Description

Best practices and conventions for working with our internal REST API.
Covers authentication, error handling, pagination, and response formats.

## When to Use

- Making API requests to internal services
- Building new API endpoints
- Reviewing API-related code

---

## Core Patterns

### Authentication

All API requests require JWT authentication.

\`\`\`typescript
import { apiClient } from '@/lib/api';

// Client automatically includes auth token
const response = await apiClient.get('/users');

// Manual auth header (if needed)
const response = await fetch('/api/users', {
  headers: {
    'Authorization': `Bearer ${getAuthToken()}`,
    'Content-Type': 'application/json'
  }
});
\`\`\`

**Required headers:**
- `Authorization: Bearer {token}`
- `Content-Type: application/json`

### Error Handling

API returns structured errors following this format:

\`\`\`typescript
interface APIError {
  error: {
    code: string;        // Machine-readable error code
    message: string;     // Human-readable message
    details?: object;    // Additional context
    field?: string;      // Field that caused error (validation)
  }
}

// Example error response
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is required",
    "field": "email"
  }
}
\`\`\`

**Handle errors consistently:**

\`\`\`typescript
try {
  const user = await apiClient.post('/users', data);
} catch (error) {
  if (error.code === 'VALIDATION_ERROR') {
    // Show field error
    setFieldError(error.field, error.message);
  } else {
    // Show generic error
    showNotification(error.message, 'error');
  }
}
\`\`\`

### Pagination

List endpoints support cursor-based pagination.

\`\`\`typescript
interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    next_cursor: string | null;
    has_more: boolean;
  }
}

// First page
const response = await apiClient.get('/users?limit=20');

// Next page
const response = await apiClient.get(
  `/users?limit=20&cursor=${response.pagination.next_cursor}`
);
\`\`\`

**Pagination parameters:**
- `limit`: Number of items (max: 100, default: 20)
- `cursor`: Cursor from previous response

### Filtering and Sorting

Use query parameters for filtering and sorting.

\`\`\`typescript
// Filter by status
GET /users?status=active

// Sort by field
GET /users?sort=created_at&order=desc

// Multiple filters
GET /users?status=active&role=admin&sort=name

// Search
GET /users?q=search+term
\`\`\`

**Standard query parameters:**
- `status`: Filter by status field
- `q`: Full-text search
- `sort`: Field to sort by
- `order`: Sort direction (`asc` or `desc`)

---

## Best Practices

1. **Use the API Client**
   - Don't make raw fetch calls
   - API client handles auth, retries, errors
   - Provides TypeScript types

   \`\`\`typescript
   // ✅ Good
   import { apiClient } from '@/lib/api';
   const users = await apiClient.get('/users');

   // ❌ Avoid
   const response = await fetch('/api/users');
   const users = await response.json();
   \`\`\`

2. **Handle Loading States**
   - Show loading indicators for async operations
   - Handle errors gracefully
   - Provide feedback on success

   \`\`\`typescript
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   async function loadUsers() {
     setLoading(true);
     setError(null);
     try {
       const users = await apiClient.get('/users');
       setUsers(users.data);
     } catch (err) {
       setError(err.message);
     } finally {
       setLoading(false);
     }
   }
   \`\`\`

3. **Validate Before Sending**
   - Validate data client-side before API call
   - Reduces unnecessary API requests
   - Provides immediate feedback

   \`\`\`typescript
   async function createUser(data) {
     // Client-side validation
     if (!data.email || !data.name) {
       throw new Error('Email and name are required');
     }

     if (!isValidEmail(data.email)) {
       throw new Error('Invalid email format');
     }

     // API call only if validation passes
     return apiClient.post('/users', data);
   }
   \`\`\`

4. **Use TypeScript Types**
   - Import types from `@/types/api`
   - Type your API responses
   - Catch type errors at compile time

   \`\`\`typescript
   import type { User, PaginatedResponse } from '@/types/api';

   const response = await apiClient.get<PaginatedResponse<User>>('/users');
   // response.data is typed as User[]
   \`\`\`

---

## Common Pitfalls

- **Not Handling 401 Responses**
  - **Why it's bad**: Users get stuck with expired tokens
  - **Solution**: API client auto-redirects to login on 401

  \`\`\`typescript
  // API client handles this automatically
  // No manual 401 handling needed
  \`\`\`

- **Forgetting to Paginate**
  - **Why it's bad**: Large responses slow down the app
  - **Solution**: Always use pagination for list endpoints

  \`\`\`typescript
  // ❌ Wrong - loads all users
  const users = await apiClient.get('/users');

  // ✅ Right - loads 20 users with pagination
  const response = await apiClient.get('/users?limit=20');
  \`\`\`

- **Hardcoding API URLs**
  - **Why it's bad**: Breaks when environment changes
  - **Solution**: Use environment-specific config

  \`\`\`typescript
  // ❌ Wrong
  fetch('https://api.example.com/users');

  // ✅ Right - uses env-specific base URL
  apiClient.get('/users');
  \`\`\`

- **Not Handling Rate Limits**
  - **Why it's bad**: Can hit rate limits on bulk operations
  - **Solution**: API client includes retry with exponential backoff

  \`\`\`typescript
  // API client handles 429 automatically
  // Retries with exponential backoff
  const users = await apiClient.get('/users');
  \`\`\`

---

## Error Codes Reference

| Code | Meaning | Action |
|------|---------|--------|
| `VALIDATION_ERROR` | Invalid input | Show field error |
| `NOT_FOUND` | Resource doesn't exist | Show 404 message |
| `UNAUTHORIZED` | Not authenticated | Redirect to login |
| `FORBIDDEN` | Insufficient permissions | Show permission error |
| `RATE_LIMITED` | Too many requests | Retry after delay |
| `SERVER_ERROR` | Internal error | Show generic error |

---

## Quick Reference

### Making Requests

\`\`\`typescript
// GET
const users = await apiClient.get('/users');

// POST
const user = await apiClient.post('/users', { name: 'John' });

// PUT
const user = await apiClient.put('/users/123', { name: 'Jane' });

// PATCH
const user = await apiClient.patch('/users/123', { status: 'active' });

// DELETE
await apiClient.delete('/users/123');
\`\`\`

### With Query Parameters

\`\`\`typescript
const users = await apiClient.get('/users', {
  params: {
    status: 'active',
    limit: 20,
    sort: 'name'
  }
});
\`\`\`

### With Custom Headers

\`\`\`typescript
const data = await apiClient.get('/export', {
  headers: {
    'Accept': 'text/csv'
  }
});
\`\`\`
```

## Best Practices for Writing Skills

### 1. Keep Skills Focused

Each skill should cover ONE topic thoroughly:

```markdown
# Good: Focused skills
- languages/python/SKILL.md
- testing/pytest/SKILL.md
- security/owasp/SKILL.md

# Bad: Too broad
- everything-python/SKILL.md
```

### 2. Use Real Code Examples

```markdown
# Good: Real, runnable code
\`\`\`python
@pytest.fixture
def user():
    return User(id=1, name="Test")

def test_user_creation(user):
    assert user.id == 1
\`\`\`

# Bad: Pseudo-code
\`\`\`
create a fixture
use the fixture in a test
\`\`\`
```

### 3. Show What NOT to Do

```markdown
## Common Pitfalls

- **Using == for null checks**
  \`\`\`python
  # ❌ Wrong
  if value == None:

  # ✅ Right
  if value is None:
  \`\`\`
```

### 4. Link to Official Documentation

```markdown
## Further Reading

- [Official Svelte Tutorial](https://svelte.dev/tutorial)
- [Svelte API Reference](https://svelte.dev/docs)
- [Svelte Society Recipes](https://sveltesociety.dev/recipes)
```

### 5. Keep It Scannable

Use clear headings, bullet points, and code blocks:

```markdown
## Best Practices

1. **Clear Heading**
   - Bullet point
   - Another point

2. **Another Practice**
   \`\`\`code
   example
   \`\`\`
```

## Skill Size Guidelines

| Skill Complexity | Lines | Sections |
|------------------|-------|----------|
| Simple | 50-100 | 2-3 core patterns |
| Standard | 100-200 | 3-5 patterns + pitfalls |
| Comprehensive | 200-400 | 5+ patterns + examples |

Aim for **100-200 lines** for most skills.

## Testing Your Skill

After creating a skill, test it:

1. **Reference it**: Mention the technology in a command
2. **Verify knowledge**: Check that Claude applies the patterns
3. **Test edge cases**: See if pitfalls are avoided
4. **Check examples**: Ensure code examples are used

## Common Skill Types

### Language Skills

Focus on syntax, idioms, and best practices:

```markdown
# Go

## Core Patterns

### Error Handling
### Goroutines and Channels
### Interfaces
### Defer, Panic, Recover

## Best Practices
## Common Pitfalls
```

### Framework Skills

Focus on framework-specific patterns:

```markdown
# Rails

## Core Patterns

### Models and ActiveRecord
### Controllers and RESTful Routes
### Views and Partials
### Background Jobs

## Best Practices
## Common Pitfalls
```

### Methodology Skills

Focus on processes and workflows:

```markdown
# Code Review Process

## Description
Our team's code review standards and checklist.

## Core Patterns

### Review Checklist
### Giving Feedback
### Receiving Feedback

## Best Practices
```

## Organizing Custom Skills

For project-specific knowledge, use `custom/`:

```
.claude/skills/custom/
├── api-standards/SKILL.md      # Your API conventions
├── deployment/SKILL.md          # Deployment procedures
├── testing-standards/SKILL.md   # Testing requirements
└── security-checklist/SKILL.md  # Security review items
```

## Next Steps

- [Create Custom Commands](/claudekit/customization/creating-commands/) — Build workflow automation
- [Create Custom Modes](/claudekit/customization/creating-modes/) — Define behavioral patterns
- [Configure CLAUDE.md](/claudekit/customization/claude-md/) — Set project standards

## Examples to Study

Check these built-in skills for inspiration:

- `languages/python/SKILL.md` — Language best practices
- `testing/pytest/SKILL.md` — Testing framework patterns
- `methodology/test-driven-development/SKILL.md` — Development process
- `security/owasp/SKILL.md` — Security guidelines
