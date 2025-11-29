---
title: Test-Driven Development (TDD)
description: Strict test-first development methodology
---

The TDD skill enforces test-driven development with the fundamental rule: "If you didn't watch the test fail, you don't know if it tests the right thing."

## Overview

Test-Driven Development is a methodology where tests are written before production code. This ensures code is designed to be testable and that tests actually verify the intended behavior.

**Non-Negotiable Rule**: NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST

## When to Use

- New feature development
- Bug fixes (write test that reproduces bug first)
- Refactoring (ensure tests exist before changing)
- Any behavior change

## When NOT to Use

Requires explicit approval:
- Throwaway prototypes
- Generated/scaffolded code
- Pure configuration changes

## The Red-Green-Refactor Cycle

### 1. RED: Write Failing Test

Write a minimal test demonstrating the desired behavior:

```typescript
describe('calculateTotal', () => {
  it('should sum item prices', () => {
    const items = [{ price: 10 }, { price: 20 }];
    expect(calculateTotal(items)).toBe(30);
  });
});
```

### 2. VERIFY RED: Confirm Test Fails

Run the test and confirm it fails **for the right reason**:

```bash
npm test -- --grep "sum item prices"
# Expected: FAIL
# Reason: calculateTotal is not defined
```

**Critical**: The failure should be because the feature doesn't exist, not because of typos or syntax errors.

### 3. GREEN: Write Minimal Code

Write the simplest code that makes the test pass:

```typescript
function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

**Don't over-engineer**. If the test passes with simple code, stop.

### 4. VERIFY GREEN: Confirm Test Passes

```bash
npm test -- --grep "sum item prices"
# Expected: PASS
```

### 5. REFACTOR: Clean Up

With green tests, refactor safely:
- Extract functions
- Rename variables
- Remove duplication
- Run tests after each change

## The Rule

**NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST**

This is not a guideline. It's a rule.

### What If I Already Wrote Code?

Delete it. Completely.

```
❌ WRONG: "I'll keep this code as reference while writing tests"
✅ RIGHT: Delete the code, write test, rewrite implementation
```

### Why So Strict?

- Code written before tests wasn't driven by tests
- Keeping it as reference leads to rationalization
- Tests written after code often just verify what was written
- True TDD produces different (usually better) designs

## Test Quality Standards

### One Behavior Per Test

```typescript
// ❌ BAD: Multiple behaviors
it('should validate and save user', () => {
  expect(validateUser(user)).toBe(true);
  expect(saveUser(user)).toBe(1);
});

// ✅ GOOD: Single behavior
it('should validate user email format', () => {
  expect(validateUser({ email: 'test@example.com' })).toBe(true);
});

it('should save valid user', () => {
  const user = createValidUser();
  expect(saveUser(user)).toBe(1);
});
```

### Clear Naming

Test names should describe the behavior:

```typescript
// ❌ BAD
it('test1', () => {});
it('calculateTotal', () => {});

// ✅ GOOD
it('should return 0 for empty cart', () => {});
it('should apply discount when coupon is valid', () => {});
```

### Real Code Over Mocks

Use real implementations when possible:

```typescript
// ✅ PREFER: Real database (test container)
const db = await startTestDatabase();
const result = await userRepo.save(user);

// ⚠️ AVOID: Excessive mocking
const mockDb = { save: jest.fn().mockResolvedValue(1) };
```

### Test Observable Behavior

Test what the code does, not how it does it:

```typescript
// ❌ BAD: Testing implementation
it('should call helper function', () => {
  calculateTotal(items);
  expect(helperFn).toHaveBeenCalled();
});

// ✅ GOOD: Testing behavior
it('should return correct total', () => {
  expect(calculateTotal(items)).toBe(30);
});
```

## Edge Cases to Test

Always include tests for:

- Empty inputs
- Null/undefined values
- Boundary conditions
- Error scenarios
- Large inputs
- Invalid inputs

```typescript
describe('calculateTotal', () => {
  it('should return 0 for empty array', () => {
    expect(calculateTotal([])).toBe(0);
  });

  it('should handle null items array', () => {
    expect(() => calculateTotal(null)).toThrow();
  });

  it('should handle negative prices', () => {
    const items = [{ price: -10 }, { price: 20 }];
    expect(calculateTotal(items)).toBe(10);
  });
});
```

## Common Rationalizations

### "I'll write tests after"

**Rejected**. Tests written after code verify what was written, not what should happen.

### "Manual testing is enough"

**Rejected**. Ad-hoc testing is not systematic, misses edge cases, and doesn't prevent regressions.

### "This code is too simple to test"

**Rejected**. Simple code breaks too. A test takes seconds and provides permanent verification.

### "I don't have time"

**Rejected**. TDD is faster in the medium term. Debugging time saved far exceeds test-writing time.

### "I already wrote it, might as well keep it"

**Rejected**. Sunk cost fallacy. Delete and rewrite properly.

## TDD Workflow Example

### Bug Fix with TDD

```typescript
// 1. RED: Write test that reproduces bug
it('should handle expired session gracefully', () => {
  const session = createExpiredSession();
  const result = processRequest(session);
  expect(result.error).toBe('SESSION_EXPIRED');
});

// 2. VERIFY RED: Confirm test fails
// npm test → FAIL (current code crashes or returns wrong error)

// 3. GREEN: Fix the bug
function processRequest(session: Session) {
  if (session.isExpired()) {
    return { error: 'SESSION_EXPIRED' };
  }
  // ... rest of logic
}

// 4. VERIFY GREEN: Confirm test passes
// npm test → PASS

// 5. Commit with test
// git commit -m "fix: handle expired session gracefully"
```

### New Feature with TDD

```typescript
// 1. RED: Write test for feature
it('should calculate discount for premium users', () => {
  const user = { type: 'premium' };
  const price = 100;
  expect(calculatePrice(user, price)).toBe(90); // 10% off
});

// 2. VERIFY RED
// npm test → FAIL (calculatePrice doesn't consider user type)

// 3. GREEN: Implement feature
function calculatePrice(user: User, price: number): number {
  if (user.type === 'premium') {
    return price * 0.9;
  }
  return price;
}

// 4. VERIFY GREEN
// npm test → PASS

// 5. REFACTOR: Extract discount logic
function getDiscount(user: User): number {
  return user.type === 'premium' ? 0.1 : 0;
}

function calculatePrice(user: User, price: number): number {
  const discount = getDiscount(user);
  return price * (1 - discount);
}

// 6. VERIFY still GREEN
// npm test → PASS
```

## Activation

### Via Command

```bash
/tdd "add user authentication"
/feature --methodology=tdd "payment processing"
```

### Automatic in Plans

When using [Writing Plans](/claudekit/skills/methodology/writing-plans), every task follows TDD automatically.

### During Execution

[Executing Plans](/claudekit/skills/methodology/executing-plans) enforces TDD for each task.

## Integration with Other Skills

### With Writing Plans

Plans include TDD steps for every task:

```markdown
1. Write failing test
2. Verify test fails
3. Implement minimally
4. Verify test passes
5. Commit
```

### With Verification

[Verification](/claudekit/skills/methodology/verification) ensures:
- Tests actually fail before implementation
- Tests pass after implementation
- Full suite remains green

### With Testing Anti-Patterns

[Testing Anti-Patterns](/claudekit/skills/methodology/testing-anti-patterns) prevents:
- Testing mocks instead of real code
- Incomplete mocks
- Over-mocking
- Afterthought tests

## Benefits

### TDD Catches Bugs Early

- Writing test first forces you to think about edge cases
- Seeing test fail proves it can catch failures
- Green bar confirms the fix works
- Test prevents regression forever

### TDD Improves Design

- Forces consideration of interfaces before implementation
- Encourages small, focused functions
- Makes dependencies explicit
- Results in more testable code

### TDD Saves Time

Prevents this cycle:
1. Write code
2. Manual test (miss edge case)
3. Ship
4. Bug reported
5. Debug
6. Fix
7. Ship again

With TDD:
1. Write test
2. See it fail
3. Implement
4. See it pass
5. Ship confidently

## Best Practices

### Keep Tests Fast

```typescript
// ✅ Fast tests
it('should validate email format', () => {
  expect(validateEmail('test@example.com')).toBe(true);
});

// ⚠️ Slow tests (when avoidable)
it('should validate email', async () => {
  await db.connect();
  await db.query('SELECT ...');
  // Use test doubles for unit tests
});
```

### Test Behavior, Not Implementation

```typescript
// ❌ BAD: Brittle implementation test
it('should call emailService.send', () => {
  registerUser(data);
  expect(emailService.send).toHaveBeenCalled();
});

// ✅ GOOD: Behavior test
it('should send welcome email to new user', async () => {
  await registerUser({ email: 'test@example.com' });
  const emails = await getTestEmails();
  expect(emails).toContainEqual(
    expect.objectContaining({
      to: 'test@example.com',
      subject: 'Welcome'
    })
  );
});
```

### Arrange-Act-Assert Pattern

```typescript
it('should calculate total with tax', () => {
  // Arrange
  const items = [{ price: 100 }];
  const taxRate = 0.1;

  // Act
  const total = calculateTotalWithTax(items, taxRate);

  // Assert
  expect(total).toBe(110);
});
```

## Next Steps

- Use with [Writing Plans](/claudekit/skills/methodology/writing-plans) for structured TDD
- Combine with [Code Review](/claudekit/skills/methodology/code-review) for quality
- Avoid [Testing Anti-Patterns](/claudekit/skills/methodology/testing-anti-patterns)
- Enforce with [Verification](/claudekit/skills/methodology/verification)

## Related Skills

- [Writing Plans](/claudekit/skills/methodology/writing-plans) - Plans include TDD steps
- [Executing Plans](/claudekit/skills/methodology/executing-plans) - Enforces TDD per task
- [Testing Anti-Patterns](/claudekit/skills/methodology/testing-anti-patterns) - Avoid mistakes
- [Verification](/claudekit/skills/methodology/verification) - Prove tests work
