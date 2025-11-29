---
title: /refactor
description: Improve code structure, readability, and performance without changing behavior
---

# /refactor - Refactoring Command

## Purpose

Improve code structure, readability, or performance without changing external behavior. Applies proven refactoring patterns to make code more maintainable, testable, and efficient.

## Usage

```bash
/refactor [file or function] [goal: clean | extract | simplify | optimize]
```

## Arguments

- `[file or function]` - Target code to refactor
- `[goal]` - Optional refactoring objective:
  - `clean` - Remove dead code, improve naming
  - `extract` - Extract reusable functions/components
  - `simplify` - Reduce complexity and nesting
  - `optimize` - Improve performance

## How It Works

The `/refactor` command follows a safe, incremental approach:

### Step 1: Understand Current Code

1. **Read Thoroughly**
   - Analyzes what the code does
   - Identifies its purpose and responsibilities
   - Maps inputs, outputs, and side effects

2. **Note Existing Tests**
   - Finds test coverage for the code
   - Ensures tests exist before refactoring
   - If no tests exist, generates them first

3. **Identify Patterns**
   - Recognizes code smells
   - Finds refactoring opportunities
   - Notes dependencies and coupling

### Step 2: Plan Refactoring

1. **Identify Improvements**
   - Code smells to address
   - Patterns to apply
   - Metrics to improve

2. **Ensure Test Safety**
   - Verifies tests exist
   - Adds missing tests if needed
   - Ensures tests are comprehensive

3. **Plan Incremental Changes**
   - Breaks into small, safe steps
   - Orders changes by dependencies
   - Plans verification after each step

### Step 3: Execute Refactoring

1. **Make Small Changes**
   - One refactoring at a time
   - Maintains behavior at each step
   - Keeps code working continuously

2. **Run Tests After Each Change**
   ```bash
   # Python
   pytest -v

   # TypeScript
   pnpm test
   ```

3. **Commit Incrementally**
   - Commits after each successful refactoring
   - Makes rollback easy if needed
   - Documents what changed and why

## Refactoring Types

### Extract Function/Method

**When**: Code duplication or long methods

```typescript
// Before
function processUser(user: User) {
  if (!user.email || !user.email.includes('@')) {
    throw new Error('Invalid email');
  }
  if (user.name.length < 2) {
    throw new Error('Name too short');
  }
  // ... more logic
}

// After
function processUser(user: User) {
  validateUser(user);
  // ... more logic
}

function validateUser(user: User) {
  validateEmail(user.email);
  validateName(user.name);
}

function validateEmail(email: string) {
  if (!email || !email.includes('@')) {
    throw new Error('Invalid email');
  }
}

function validateName(name: string) {
  if (name.length < 2) {
    throw new Error('Name too short');
  }
}
```

### Simplify Conditionals

**When**: Complex nested if statements

```typescript
// Before
if (user) {
  if (user.isActive) {
    if (user.subscription) {
      if (user.subscription.isPaid) {
        return true;
      }
    }
  }
}
return false;

// After
return user?.isActive
  && user?.subscription?.isPaid
  ?? false;
```

### Replace Magic Numbers

**When**: Unexplained numeric literals

```python
# Before
def calculate_discount(price):
    if price > 100:
        return price * 0.9
    return price

# After
DISCOUNT_THRESHOLD = 100
DISCOUNT_RATE = 0.1

def calculate_discount(price):
    if price > DISCOUNT_THRESHOLD:
        return price * (1 - DISCOUNT_RATE)
    return price
```

### Improve Naming

**When**: Unclear variable/function names

```typescript
// Before
function calc(x: number, y: number): number {
  const z = x * y * 0.2;
  return z;
}

// After
function calculateTax(subtotal: number, quantity: number): number {
  const TAX_RATE = 0.2;
  const totalBeforeTax = subtotal * quantity;
  return totalBeforeTax * TAX_RATE;
}
```

### Remove Dead Code

**When**: Unused functions, commented code

```python
# Before
def old_function():  # Not called anywhere
    pass

def current_function():
    # result = old_way()  # Old implementation
    result = new_way()
    return result

# After
def current_function():
    result = new_way()
    return result
```

### Extract Class/Module

**When**: Too many responsibilities in one class

```typescript
// Before
class User {
  name: string;
  email: string;

  validateEmail() { /* ... */ }
  sendEmail(subject: string, body: string) { /* ... */ }
  formatEmailTemplate(template: string) { /* ... */ }
}

// After
class User {
  name: string;
  email: string;

  validateEmail() { /* ... */ }
}

class EmailService {
  sendEmail(to: string, subject: string, body: string) { /* ... */ }
  formatTemplate(template: string, data: any) { /* ... */ }
}
```

## Flags

| Flag | Description | Example |
|------|-------------|---------|
| `--goal=[goal]` | Refactoring objective | `--goal=simplify` |
| `--safe` | Extra cautious, more test verification | `--safe` |
| `--aggressive` | Larger refactoring steps | `--aggressive` |
| `--format=[fmt]` | Output format (concise/detailed) | `--format=concise` |
| `--test-first` | Generate tests before refactoring | `--test-first` |

### Goal Options

| Goal | Focus |
|------|-------|
| `clean` | Remove clutter, improve naming |
| `extract` | Pull out reusable code |
| `simplify` | Reduce complexity |
| `optimize` | Improve performance |
| `patterns` | Apply design patterns |

### Flag Examples

```bash
# Simplify complex function
/refactor --goal=simplify src/utils/validation.ts

# Extract with extra safety checks
/refactor --safe --goal=extract src/services/user.ts

# Performance optimization
/refactor --goal=optimize src/api/heavy-query.ts

# Clean up with tests first
/refactor --test-first --goal=clean src/legacy/
```

## Examples

### Simplify Complex Logic

**Input:**
```bash
/refactor --goal=simplify src/services/auth.ts
```

**Output:**
```markdown
## Refactoring Complete: src/services/auth.ts

### Changes Made
1. Extracted `validateCredentials()` function
2. Simplified nested conditionals using early returns
3. Replaced magic numbers with named constants
4. Improved variable names for clarity

### Before
```typescript
function login(email, pwd) {
  if (email) {
    if (pwd) {
      if (pwd.length >= 8) {
        const u = db.find(email);
        if (u) {
          if (bcrypt.compare(pwd, u.pwd)) {
            return generateToken(u);
          }
        }
      }
    }
  }
  throw new Error('Invalid');
}
```

### After
```typescript
const MIN_PASSWORD_LENGTH = 8;

function login(email: string, password: string): string {
  validateCredentials(email, password);

  const user = db.findByEmail(email);
  if (!user) {
    throw new AuthError('Invalid credentials');
  }

  const passwordMatches = bcrypt.compare(password, user.hashedPassword);
  if (!passwordMatches) {
    throw new AuthError('Invalid credentials');
  }

  return generateToken(user);
}

function validateCredentials(email: string, password: string) {
  if (!email) {
    throw new ValidationError('Email required');
  }
  if (!password || password.length < MIN_PASSWORD_LENGTH) {
    throw new ValidationError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`);
  }
}
```

### Metrics
- Cyclomatic complexity: 8 → 3
- Function length: 18 lines → 12 lines
- Nesting depth: 5 → 2

### Tests
- All 12 existing tests passing
- No behavior changes
```

### Extract Reusable Code

**Input:**
```bash
/refactor --goal=extract src/components/UserList.tsx
```

**Output:**
1. Identifies repeated patterns
2. Extracts into reusable hooks/components
3. Updates all usage sites
4. Verifies tests still pass

## Deliverables

After running `/refactor`, you receive:

1. **Refactored Code** - Improved implementation
2. **Before/After Comparison** - Clear visual diff
3. **Metrics** - Complexity, length, nesting improvements
4. **Test Results** - Confirmation of unchanged behavior
5. **Commit Message** - Describing the refactoring

## Best Practices

1. **Always Have Tests First** - Never refactor untested code
2. **Small Steps** - Make one change at a time
3. **Run Tests Frequently** - After each change
4. **Commit Often** - Easy rollback if something breaks
5. **Preserve Behavior** - Never change what the code does, only how

## Related Commands

- [/test](/claudekit/commands/test) - Generate tests before refactoring
- [/review](/claudekit/commands/review) - Review code quality
- [/feature](/claudekit/commands/feature) - Build features with good structure
- [/fix](/claudekit/commands/fix) - Fix bugs, then refactor
