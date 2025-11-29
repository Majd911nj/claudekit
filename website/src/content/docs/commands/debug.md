---
title: /debug
description: Analyze and debug errors, exceptions, and unexpected behavior
---

# /debug - Debug Command

## Purpose

Analyze and debug errors, exceptions, or unexpected behavior with systematic investigation and root cause analysis. This is a streamlined version of `/fix` focused on diagnosis and investigation.

## Usage

```bash
/debug [error message or description]
```

## Arguments

- `[error message]` - Stack trace or error output
- `[description]` - Natural language description of unexpected behavior

## How It Works

The `/debug` command follows a systematic 3-step debugging process:

### Step 1: Analyze Error

1. **Parse Error Message and Stack Trace**
   - Extracts error type (TypeError, ValueError, etc.)
   - Identifies file and line number
   - Reads stack trace for execution path

2. **Identify Error Location**
   - Pinpoints the exact failing line
   - Examines surrounding code
   - Checks function context

3. **Understand Error Type**
   - Categorizes error (logic, runtime, type, etc.)
   - Identifies common causes for this error type
   - Notes relevant language-specific behavior

### Step 2: Investigate

1. **Trace Execution Path**
   - Follows code flow from entry to error
   - Maps variable states at each step
   - Identifies where state becomes invalid

2. **Check Related Code**
   - Examines caller functions
   - Reviews recent changes to area
   - Searches for similar patterns

3. **Form Hypotheses**
   - Lists possible root causes
   - Ranks by likelihood
   - Identifies tests to validate each hypothesis

### Step 3: Fix

1. **Implement Minimal Fix**
   - Addresses root cause
   - Keeps changes focused
   - Preserves existing behavior

2. **Verify Fix Works**
   - Tests the specific error case
   - Runs related tests
   - Checks for side effects

3. **Add Regression Test**
   - Creates test that would catch this bug
   - Documents the error scenario
   - Ensures test fails without fix

## Debug Output Format

```markdown
## Debug Report

### Error
```
TypeError: Cannot read property 'email' of undefined
  at getUserEmail (src/services/UserService.ts:45)
  at processUser (src/api/users.ts:23)
```

### Analysis
The error occurs when trying to access `user.email` but `user` is undefined.

### Location
**File**: `src/services/UserService.ts`
**Line**: 45
**Function**: `getUserEmail`

### Execution Trace
1. API receives request → `processUser()`
2. Calls `getUserEmail(userId)`
3. Inside getUserEmail:
   ```typescript
   const user = this.fetchUser(userId); // Missing await!
   return user.email; // user is a Promise, not User object
   ```

### Root Cause
**Missing `await` keyword** - `fetchUser()` is async but wasn't awaited, so `user` is a Promise object instead of a User object.

### Hypotheses Tested
1. ✅ Missing await - Confirmed by checking function signature
2. ❌ User doesn't exist - Would be null, not undefined
3. ❌ Database error - Would throw different error

### Fix
```typescript
// Before
async getUserEmail(userId: string) {
  const user = this.fetchUser(userId);
  return user.email;
}

// After
async getUserEmail(userId: string) {
  const user = await this.fetchUser(userId);
  if (!user) {
    throw new NotFoundError(`User ${userId} not found`);
  }
  return user.email;
}
```

### Verification
```bash
# Test the fix
pnpm test src/services/UserService.test.ts

# Run full suite
pnpm test
```

### Prevention
Added regression test: `test_getUserEmail_awaits_user_fetch`
```

## Common Debug Patterns

### Null/Undefined Errors

```typescript
// Symptom
Cannot read property 'X' of undefined

// Common Causes
- Missing await on async function
- Object not initialized
- API returned null
- Array/object access out of bounds

// Investigation
1. Check if value should exist
2. Trace where it's set
3. Verify async operations
```

### Type Errors

```python
# Symptom
TypeError: unsupported operand type(s) for +: 'int' and 'str'

# Common Causes
- Mixed types in operation
- Missing type conversion
- Unexpected input type

# Investigation
1. Print types at error line
2. Check input sources
3. Verify type conversions
```

### Race Conditions

```typescript
// Symptom
Intermittent failures, works sometimes

// Common Causes
- Async operations out of order
- Shared state without locking
- Component unmounted during async

// Investigation
1. Add logging to trace timing
2. Check for missing awaits
3. Look for shared mutable state
```

### Infinite Loops/Recursion

```python
# Symptom
RecursionError: maximum recursion depth exceeded

# Common Causes
- Missing base case
- Base case never reached
- Infinite loop condition

# Investigation
1. Check base/termination condition
2. Verify condition can be met
3. Add iteration counter logging
```

## Flags

| Flag | Description | Example |
|------|-------------|---------|
| `--depth=[1-5]` | Investigation depth (1=quick, 5=exhaustive) | `--depth=4` |
| `--trace` | Show detailed execution trace | `--trace` |
| `--hypothesis` | Show all hypotheses considered | `--hypothesis` |
| `--format=[fmt]` | Output format (concise/detailed) | `--format=concise` |

### Flag Examples

```bash
# Quick debug with minimal output
/debug --depth=1 --format=concise "error message"

# Deep investigation with full trace
/debug --depth=5 --trace --hypothesis "intermittent failure"

# Detailed analysis
/debug --format=detailed "TypeError in auth.ts"
```

## Examples

### Runtime Error

**Input:**
```bash
/debug IndexError: list index out of range in process_items at line 42
```

**Output:**
1. Identifies array access issue
2. Traces loop bounds
3. Finds off-by-one error
4. Suggests fix with correct range

### Unexpected Behavior

**Input:**
```bash
/debug "User authentication succeeds but session not created"
```

**Output:**
1. Traces auth flow
2. Finds session creation after response sent
3. Identifies async timing issue
4. Recommends await before response

### Intermittent Issue

**Input:**
```bash
/debug --depth=5 "Test fails randomly, passes on retry"
```

**Output:**
1. Analyzes for race conditions
2. Checks for time-dependent logic
3. Reviews shared state access
4. Identifies missing await in test setup

## When to Use

Use `/debug` when you need to:

- **Investigate an error** without immediately fixing it
- **Understand why** something breaks
- **Diagnose intermittent** issues
- **Trace execution** paths
- **Form hypotheses** about root causes

Use `/fix` instead when you want to:

- Fix the issue immediately
- Add regression tests
- Complete the full fix workflow

## Deliverables

After running `/debug`, you receive:

1. **Error Analysis** - Detailed breakdown of the error
2. **Execution Trace** - Step-by-step flow to error
3. **Root Cause** - Explanation of why it fails
4. **Hypotheses** - Tested theories about cause
5. **Fix Recommendation** - Suggested solution (optional)
6. **Prevention Strategy** - How to avoid similar issues

## Related Commands

- [/fix](/claudekit/commands/fix) - Complete fix workflow with tests
- [/test](/claudekit/commands/test) - Generate tests after debugging
- [/review](/claudekit/commands/review) - Review code for potential issues
- [/refactor](/claudekit/commands/refactor) - Improve code after fix
