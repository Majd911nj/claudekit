---
title: /fix
description: Smart debugging and bug fixing workflow with root cause analysis and regression tests
---

# /fix - Bug Fix Workflow

## Purpose

Intelligent debugging and bug fixing workflow that analyzes errors, identifies root causes, implements fixes, and adds regression tests to prevent recurrence.

## Usage

```bash
/fix [error message, bug description, or issue reference]
```

## Arguments

- `[error message]` - Stack trace or error output from your application
- `[bug description]` - Natural language description of unexpected behavior
- `[issue reference]` - GitHub issue number or bug ticket ID

## How It Works

The `/fix` command executes a systematic 6-phase debugging workflow:

### Phase 1: Error Analysis

1. **Parse Error Information**
   - Extracts error type and message
   - Parses stack trace if available
   - Identifies the failing location

2. **Gather Context**
   - When does this error occur?
   - What triggers it?
   - Is it reproducible?
   - When did it start happening?

3. **Check for Known Patterns**
   - Common error patterns
   - Similar issues in codebase
   - Recent changes that might have caused it

### Phase 2: Root Cause Investigation

1. **Trace Execution**
   - Follows the code path to the error
   - Identifies state at each step
   - Finds where expectations diverge

2. **Form Hypotheses**
   - Lists possible causes ranked by likelihood
   - Identifies minimal tests to validate each

3. **Validate Hypothesis**
   - Tests the most likely cause first
   - Confirms root cause before fixing
   - Doesn't fix symptoms only

### Phase 3: Search Related Code

1. **Find Similar Code**
   - Searches for similar patterns
   - Checks if same bug exists elsewhere
   - Identifies shared code that might be affected

2. **Review Recent Changes**
   ```bash
   git log --oneline -20
   git blame [file]
   ```

### Phase 4: Implement Fix

1. **Develop Minimal Fix**
   - Fixes the root cause, not symptoms
   - Keeps changes minimal and focused
   - Considers edge cases

2. **Add Defensive Code** (if appropriate)
   - Input validation
   - Null checks
   - Error handling

3. **Update Related Code** (if needed)
   - Fixes same issue in similar code
   - Updates shared utilities

### Phase 5: Verification

1. **Test the Fix**
   - Verifies original error is resolved
   - Checks related functionality
   - Runs existing test suite

2. **Add Regression Test**
   - Writes test that would have caught this bug
   - Includes edge cases discovered
   - Ensures test fails without fix

3. **Run Full Test Suite**
   ```bash
   # Python
   pytest -v

   # TypeScript
   pnpm test
   ```

### Phase 6: Documentation

1. **Document the Fix**
   - What was the issue
   - What caused it
   - How it was fixed

2. **Update Comments** (if needed)
   - Adds clarifying comments
   - Documents non-obvious behavior

## Common Fix Patterns

### Null/Undefined Access

```typescript
// Before - Crashes on null
const name = user.profile.name;

// After - Safe with optional chaining
const name = user?.profile?.name ?? 'Unknown';
```

### Missing Error Handling

```python
# Before - Crashes on invalid JSON
data = json.loads(response.text)

# After - Handles errors gracefully
try:
    data = json.loads(response.text)
except json.JSONDecodeError as e:
    logger.error(f"Invalid JSON response: {e}")
    raise InvalidResponseError("Failed to parse response")
```

### Race Condition

```typescript
// Before - May update unmounted component
const data = await fetchData();
setState(data);

// After - Checks if still mounted
useEffect(() => {
  let cancelled = false;
  fetchData().then(data => {
    if (!cancelled) setState(data);
  });
  return () => { cancelled = true; };
}, []);
```

### Off-by-One Error

```python
# Before - IndexError on last iteration
for i in range(len(items) + 1):
    process(items[i])

# After - Correct range
for i in range(len(items)):
    process(items[i])
# Or better: use iteration
for item in items:
    process(item)
```

## Flags

| Flag | Description | Example |
|------|-------------|---------|
| `--mode=[mode]` | Use specific behavioral mode | `--mode=deep-research` |
| `--persona=[type]` | Apply persona expertise | `--persona=security` |
| `--depth=[1-5]` | Investigation thoroughness (1=quick, 5=exhaustive) | `--depth=4` |
| `--format=[fmt]` | Output format (concise/detailed) | `--format=concise` |
| `--skip-regression` | Skip regression test creation | `--skip-regression` |
| `--checkpoint` | Create checkpoint before fixing | `--checkpoint` |

### Persona Options

| Persona | Focus Area |
|---------|------------|
| `security` | Security vulnerabilities, OWASP top 10 |
| `performance` | Speed, memory usage, efficiency |
| `reliability` | Error handling, edge cases, resilience |

### Flag Examples

```bash
# Deep investigation for intermittent issues
/fix --mode=deep-research "intermittent timeout error"

# Security-focused fix
/fix --persona=security "SQL injection vulnerability"

# Thorough race condition analysis
/fix --depth=5 "race condition in auth flow"

# Quick typo fix with minimal output
/fix --format=concise "typo in error message"
```

## Examples

### Runtime Error

**Input:**
```bash
/fix TypeError: Cannot read property 'email' of undefined in UserService.ts:45
```

**Output:**
1. Analysis: User object is undefined when accessed
2. Root cause: async fetch didn't await, user not loaded yet
3. Fix: Add null check and proper async handling
4. Regression test: Test for case when user is not loaded
5. Verification: All tests passing

### Bug Description

**Input:**
```bash
/fix Users can see deleted posts in their feed
```

**Output:**
1. Investigation: Traces feed generation logic
2. Root cause: Soft-delete flag not checked in feed query
3. Fix: Add WHERE clause filtering deleted posts
4. Tests: Verify deleted posts don't appear
5. Check: Scans for similar issues in other queries

## Deliverables

After running `/fix`, you receive:

```markdown
## Bug Fix Complete

### Issue
TypeError: Cannot read property 'email' of undefined

### Root Cause
User object is undefined because async fetch wasn't awaited

### Location
`src/services/UserService.ts:45` - getUserEmail method

### Fix Applied

**Before:**
```typescript
async getUserEmail(userId: string) {
  const user = this.fetchUser(userId); // Missing await
  return user.email; // Crashes if user is undefined
}
```

**After:**
```typescript
async getUserEmail(userId: string) {
  const user = await this.fetchUser(userId);
  if (!user) {
    throw new NotFoundError(`User ${userId} not found`);
  }
  return user.email;
}
```

### Regression Test Added
`src/services/UserService.test.ts` - `test_getUserEmail_with_nonexistent_user_throws_error`

### Verification
- [x] Original error no longer occurs
- [x] Existing tests pass
- [x] New regression test passes
- [x] No new issues introduced
```

## Related Commands

- [/debug](/claudekit/commands/debug) - Deep debugging analysis
- [/test](/claudekit/commands/test) - Generate additional tests
- [/review](/claudekit/commands/review) - Code review for fixes
- [/refactor](/claudekit/commands/refactor) - Improve code after fix
