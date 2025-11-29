---
title: JavaScript
description: Modern JavaScript (ES6+) patterns and best practices
---

The JavaScript skill provides expertise in modern JavaScript (ES6+) for Node.js and browser environments.

## When Activated

- Working with JavaScript files (`.js`, `.mjs`)
- Browser scripting
- Node.js applications without TypeScript

## Core Patterns

### Modern Syntax

```javascript
// Destructuring
const { name, email } = user;
const [first, ...rest] = items;

// Spread operator
const merged = { ...defaults, ...options };
const combined = [...array1, ...array2];

// Template literals
const message = `Hello, ${name}!`;

// Optional chaining and nullish coalescing
const city = user?.address?.city ?? 'Unknown';
```

### Async Patterns

```javascript
// Async/await
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Fetch failed');
  return response.json();
}

// Promise.all for parallel
const results = await Promise.all([
  fetchData(url1),
  fetchData(url2),
]);

// Error handling
try {
  const data = await fetchData(url);
} catch (error) {
  console.error('Failed:', error.message);
}
```

### Array Methods

```javascript
// Map, filter, reduce
const names = users.map(u => u.name);
const active = users.filter(u => u.active);
const total = items.reduce((sum, i) => sum + i.price, 0);

// Find and includes
const user = users.find(u => u.id === id);
const hasAdmin = users.some(u => u.role === 'admin');
```

### Classes

```javascript
class UserService {
  #db; // Private field

  constructor(database) {
    this.#db = database;
  }

  async findById(id) {
    return this.#db.users.find(u => u.id === id);
  }
}
```

## Best Practices

1. **Use `const` by default, `let` when needed**
2. **Avoid `var` - use block-scoped declarations**
3. **Use arrow functions for callbacks**
4. **Handle all promise rejections**
5. **Use ESLint for consistent style**

## Common Pitfalls

### Implicit Type Coercion

```javascript
// ❌ BAD: Uses ==
if (value == null) { }

// ✅ GOOD: Uses ===
if (value === null || value === undefined) { }
// Or better:
if (value == null) { }  // Only for null/undefined check
```

### Callback Hell

```javascript
// ❌ BAD: Nested callbacks
getData(function(a) {
  getMoreData(a, function(b) {
    getMoreData(b, function(c) {
      // ...
    });
  });
});

// ✅ GOOD: Async/await
const a = await getData();
const b = await getMoreData(a);
const c = await getMoreData(b);
```

### Mutating Objects

```javascript
// ❌ BAD: Mutates original
function addProperty(obj) {
  obj.newProp = 'value';
  return obj;
}

// ✅ GOOD: Creates new object
function addProperty(obj) {
  return { ...obj, newProp: 'value' };
}
```

### Not Handling Errors

```javascript
// ❌ BAD: Unhandled rejection
async function loadData() {
  const data = await fetch(url);
  return data.json();
}

// ✅ GOOD: Handle errors
async function loadData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Load failed:', error);
    throw error;
  }
}
```

## Related Skills

- [TypeScript](/claudekit/skills/languages/typescript) - Typed JavaScript
- [React](/claudekit/skills/frameworks/react) - UI components
- [Next.js](/claudekit/skills/frameworks/nextjs) - Full-stack framework
