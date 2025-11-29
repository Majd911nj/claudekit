---
title: Testing Anti-Patterns
description: Common testing mistakes that create false confidence
---

The Testing Anti-Patterns skill helps recognize and avoid common testing mistakes that make tests pass while failing to verify actual behavior.

## Overview

Tests can provide false confidence when they verify mocks instead of real behavior, pollute production code, or are written as afterthoughts. This skill identifies these patterns and provides solutions.

## When to Use

- Writing new tests
- Reviewing test code
- Debugging flaky or unreliable tests
- When tests pass but bugs still ship

## The Five Anti-Patterns

### 1. Testing Mock Behavior Instead of Real Code

**The Problem**: Tests verify mocks work, not that actual code works.

```typescript
// ❌ BAD: Testing the mock
it('should call the database', () => {
  const mockDb = { save: jest.fn().mockResolvedValue({ id: 1 }) };
  const service = new UserService(mockDb);

  await service.createUser({ name: 'Test' });

  expect(mockDb.save).toHaveBeenCalled();  // Only proves mock was called
});
```

**The Solution**: Test actual behavior with real (or realistic) dependencies.

```typescript
// ✅ GOOD: Testing real behavior
it('should persist user to database', async () => {
  const db = await createTestDatabase();
  const service = new UserService(db);

  const result = await service.createUser({ name: 'Test' });

  const saved = await db.findById(result.id);
  expect(saved.name).toBe('Test');  // Proves data was actually saved
});
```

**Key Principle**: Test what the code does, not what the mocks do.

### 2. Polluting Production with Test-Only Methods

**The Problem**: Adding methods to production code solely for test cleanup or access.

```typescript
// ❌ BAD: Production class with test-only method
class ConnectionPool {
  private connections: Connection[] = [];

  // This method exists only for tests
  destroy(): void {  // DON'T DO THIS
    this.connections.forEach(c => c.close());
    this.connections = [];
  }
}
```

**The Solution**: Handle cleanup in test utilities, not production code.

```typescript
// ✅ GOOD: Test utility handles cleanup
// test-utils/connection-pool.ts
export async function withTestPool(fn: (pool: ConnectionPool) => Promise<void>) {
  const pool = new ConnectionPool();
  try {
    await fn(pool);
  } finally {
    // Cleanup handled by test infrastructure
    await closeAllConnections(pool);
  }
}
```

**Key Principle**: Production code should never know it's being tested.

### 3. Mocking Without Understanding Dependencies

**The Problem**: Over-mocking to "be safe" removes behavior the test actually depends on.

```typescript
// ❌ BAD: Mocking everything blindly
it('should process order', () => {
  jest.mock('./inventory');  // What does this mock?
  jest.mock('./payment');    // Did we need to mock this?
  jest.mock('./shipping');   // This might break the test logic

  const result = processOrder(order);
  expect(result.status).toBe('complete');
});
```

**The Solution**: Understand what each dependency does before mocking it.

```typescript
// ✅ GOOD: Selective, understood mocking
it('should process order when payment succeeds', () => {
  // Only mock external service (payment gateway)
  // Keep inventory and shipping real for integration test
  const paymentGateway = createMockPaymentGateway({
    chargeResult: { success: true, transactionId: 'txn-123' }
  });

  const result = processOrder(order, { paymentGateway });

  expect(result.status).toBe('complete');
  expect(result.transactionId).toBe('txn-123');
});
```

**Key Principle**: Mock at boundaries, not internally.

### 4. Creating Incomplete Mocks

**The Problem**: Partial mocks that only include known fields, hiding structural assumptions.

```typescript
// ❌ BAD: Incomplete mock
const mockApiResponse = {
  data: { users: [] }
  // Missing: status, headers, pagination, errors
};

it('should handle API response', () => {
  fetchMock.mockResolvedValue(mockApiResponse);
  const result = await getUsers();
  expect(result).toEqual([]);
});
// Test passes, but production fails when accessing response.pagination
```

**The Solution**: Create complete mocks that match real API responses.

```typescript
// ✅ GOOD: Complete mock matching real response structure
const mockApiResponse = {
  status: 200,
  headers: { 'content-type': 'application/json' },
  data: {
    users: [],
    pagination: { page: 1, total: 0, hasMore: false },
    errors: null
  }
};

it('should handle empty API response', () => {
  fetchMock.mockResolvedValue(mockApiResponse);
  const result = await getUsers();
  expect(result.users).toEqual([]);
  expect(result.hasMore).toBe(false);
});
```

**Key Principle**: Mocks should be indistinguishable from real responses.

### 5. Writing Tests as Afterthoughts

**The Problem**: Treating testing as optional follow-up work rather than integral to development.

```typescript
// ❌ BAD: Tests written after code, just verifying what exists
it('should do what the function does', () => {
  // This test was written by looking at the implementation
  // It tests the current behavior, not the intended behavior
  const result = processData(input);
  expect(result).toMatchSnapshot();  // "Whatever it does is correct"
});
```

**The Solution**: Use TDD - tests define requirements before implementation.

```typescript
// ✅ GOOD: Test written first, defines requirement
it('should filter inactive users from report', () => {
  const users = [
    { id: 1, name: 'Alice', active: true },
    { id: 2, name: 'Bob', active: false }
  ];

  const report = generateReport(users);

  expect(report.users).toHaveLength(1);
  expect(report.users[0].name).toBe('Alice');
});
// Now implement generateReport to make this pass
```

**Key Principle**: TDD prevents all these anti-patterns naturally.

## Recognition Guide

| Symptom | Likely Anti-Pattern |
|---------|---------------------|
| Tests pass but bugs ship | #1 Testing mocks |
| `destroy()` or `reset()` in production | #2 Test pollution |
| "I mocked that to be safe" | #3 Blind mocking |
| TypeError in production, not tests | #4 Incomplete mocks |
| Tests feel like documentation | #5 Afterthought tests |

## Prevention Checklist

Before committing tests, verify:

- [ ] Tests use real dependencies where possible
- [ ] Mocks are for external boundaries only
- [ ] No production code exists solely for tests
- [ ] Mock structures match real API responses
- [ ] Tests were written before implementation (TDD)
- [ ] Tests verify behavior, not implementation details

## Core Principle

**"Mocks are tools to isolate, not things to test."**

Mocks help you:
- Isolate unit under test
- Control external dependencies
- Speed up slow operations (network, disk)

Mocks should never:
- Be the thing you're verifying
- Hide bugs in dependencies
- Create false confidence

## Good Mocking Practices

### Mock External Services Only

```typescript
// ✅ GOOD: Mock external API
const mockStripeApi = {
  charges: {
    create: jest.fn().mockResolvedValue({ id: 'ch_123' })
  }
};

// ✅ GOOD: Keep business logic real
const paymentService = new PaymentService(mockStripeApi);
const result = await paymentService.processPayment(order);
```

### Use Test Containers for Databases

```typescript
// ✅ BETTER: Use real database (in Docker)
import { PostgreSqlContainer } from 'testcontainers';

let container: PostgreSqlContainer;
let db: Database;

beforeAll(async () => {
  container = await new PostgreSqlContainer().start();
  db = await createDatabase(container.getConnectionString());
});

it('should save user', async () => {
  const user = await db.users.create({ name: 'Test' });
  expect(user.id).toBeDefined();
});
```

### Create Mock Factories

```typescript
// ✅ GOOD: Centralized, complete mocks
function createMockUser(overrides: Partial<User> = {}): User {
  return {
    id: '123',
    email: 'test@example.com',
    name: 'Test User',
    role: 'user',
    active: true,
    createdAt: new Date(),
    ...overrides
  };
}

// Tests use complete, consistent mocks
it('should greet admin', () => {
  const admin = createMockUser({ role: 'admin' });
  expect(greet(admin)).toBe('Hello Admin!');
});
```

## Integration with Other Skills

### With TDD

[TDD](/claudekit/skills/methodology/tdd) naturally prevents anti-patterns:
- Tests written first define real requirements
- Can't test mocks when no mocks exist yet
- Forces thinking about actual behavior

### With Verification

[Verification](/claudekit/skills/methodology/verification) ensures:
- Tests actually run (not just mocked)
- Tests verify real behavior
- Evidence of actual execution

### With Code Review

[Code Review](/claudekit/skills/methodology/code-review) should catch:
- Over-mocking in tests
- Test pollution in production
- Incomplete mock structures

## Examples of Good Tests

### Integration Test (Preferred)

```typescript
it('should create user and send welcome email', async () => {
  const db = await createTestDatabase();
  const emailService = new TestEmailService();
  const userService = new UserService(db, emailService);

  const user = await userService.create({
    email: 'new@example.com',
    name: 'New User'
  });

  // Verify database persistence
  const saved = await db.users.findById(user.id);
  expect(saved.email).toBe('new@example.com');

  // Verify email sent
  const emails = emailService.getSentEmails();
  expect(emails).toHaveLength(1);
  expect(emails[0].to).toBe('new@example.com');
});
```

### Unit Test with Minimal Mocking

```typescript
it('should calculate total with tax', () => {
  const items = [
    { price: 100, taxable: true },
    { price: 50, taxable: false }
  ];

  const total = calculateTotal(items, 0.1); // 10% tax

  expect(total).toBe(160); // 100 + 10 (tax) + 50
});
```

## Next Steps

To improve test quality:

1. **Review existing tests** for these anti-patterns
2. **Use TDD** for new features
3. **Prefer integration tests** over heavily mocked unit tests
4. **Mock only at boundaries** (external APIs, file system)
5. **Create complete mocks** matching real structures

## Related Skills

- [TDD](/claudekit/skills/methodology/tdd) - Prevents afterthought tests
- [Verification](/claudekit/skills/methodology/verification) - Ensures tests run
- [Code Review](/claudekit/skills/methodology/code-review) - Catches anti-patterns
- [Systematic Debugging](/claudekit/skills/methodology/systematic-debugging) - Investigates test failures
