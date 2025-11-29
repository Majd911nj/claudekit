---
title: TypeScript
description: TypeScript development with strict typing and modern patterns
---

The TypeScript skill provides expertise in strict typing, advanced type utilities, and modern TypeScript patterns.

## When Activated

- Working with TypeScript files (`.ts`, `.tsx`)
- Building typed JavaScript applications
- React/Next.js development
- Node.js backend development

## Core Patterns

### Type Definitions

```typescript
// Interfaces for objects
interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

// Types for unions and utilities
type Status = 'pending' | 'active' | 'inactive';
type UserWithStatus = User & { status: Status };

// Generic types
type ApiResponse<T> = {
  data: T;
  error?: string;
  status: number;
};
```

### Utility Types

```typescript
// Partial - all properties optional
type UserUpdate = Partial<User>;

// Pick - select properties
type UserPreview = Pick<User, 'id' | 'name'>;

// Omit - exclude properties
type UserWithoutId = Omit<User, 'id'>;

// Record - dictionary type
type UserMap = Record<string, User>;
```

### Async Patterns

```typescript
async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.status}`);
  }
  return response.json();
}

// Error handling
async function safeOperation<T>(
  operation: () => Promise<T>
): Promise<[T, null] | [null, Error]> {
  try {
    const result = await operation();
    return [result, null];
  } catch (error) {
    return [null, error as Error];
  }
}
```

### Class Patterns

```typescript
class UserService {
  constructor(private readonly db: Database) {}

  async findById(id: string): Promise<User | null> {
    return this.db.users.findUnique({ where: { id } });
  }

  async create(data: UserCreate): Promise<User> {
    return this.db.users.create({ data });
  }
}
```

### Zod Validation

```typescript
import { z } from 'zod';

const UserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  password: z.string().min(8),
});

type UserInput = z.infer<typeof UserSchema>;

function validateUser(data: unknown): UserInput {
  return UserSchema.parse(data);
}
```

## Best Practices

1. **Enable strict mode in tsconfig.json**
2. **Avoid `any` - use `unknown` and type guards**
3. **Use interfaces for object shapes, types for unions**
4. **Prefer `const` assertions for literal types**
5. **Use discriminated unions for state**

## Common Pitfalls

### Using `any`

```typescript
// ❌ BAD: Defeats type safety
function process(data: any) {
  return data.value;
}

// ✅ GOOD: Use unknown and type guards
function process(data: unknown) {
  if (typeof data === 'object' && data !== null && 'value' in data) {
    return (data as { value: string }).value;
  }
  throw new Error('Invalid data');
}
```

### Not Handling Null/Undefined

```typescript
// ❌ BAD: Assumes user exists
function getUserName(id: string): string {
  const user = findUser(id);
  return user.name;  // Might crash
}

// ✅ GOOD: Handle null case
function getUserName(id: string): string | null {
  const user = findUser(id);
  return user?.name ?? null;
}
```

### Type Assertions Over Guards

```typescript
// ❌ BAD: Unsafe type assertion
const user = data as User;

// ✅ GOOD: Type guard
function isUser(data: unknown): data is User {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'email' in data
  );
}

if (isUser(data)) {
  // data is safely typed as User here
}
```

### Ignoring Errors

```typescript
// ❌ BAD: Unhandled rejection
async function loadData() {
  const data = await fetchData();
  return data;
}

// ✅ GOOD: Handle errors
async function loadData() {
  try {
    const data = await fetchData();
    return data;
  } catch (error) {
    console.error('Failed to load data:', error);
    throw error;
  }
}
```

## Integration with Frameworks

### With React

See [React skill](/claudekit/skills/frameworks/react) for component patterns.

### With Next.js

See [Next.js skill](/claudekit/skills/frameworks/nextjs) for full-stack patterns.

## Related Skills

- [JavaScript](/claudekit/skills/languages/javascript) - Parent language
- [React](/claudekit/skills/frameworks/react) - UI components
- [Next.js](/claudekit/skills/frameworks/nextjs) - Full-stack framework
- [vitest](/claudekit/skills/testing/vitest) - Testing framework
