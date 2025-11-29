---
title: Verification Before Completion
description: Mandatory verification before claiming task completion
---

The Verification Before Completion skill enforces evidence-based completion rather than assumption-based claims.

**Core Rule**: Never claim completion without proof

## Overview

This skill prevents premature completion claims by requiring actual verification for every assertion. Tests must run, builds must complete, and evidence must exist before declaring success.

## When to Use

- Before claiming tests pass
- Before claiming build succeeds
- Before claiming bug is fixed
- Before marking any task complete
- Before declaring success to user

## The 5-Step Verification Process

### Step 1: IDENTIFY

Determine the command that proves your assertion:

```markdown
Claim: "Tests pass"
Verification command: npm test

Claim: "Build succeeds"
Verification command: npm run build

Claim: "Linting passes"
Verification command: npm run lint
```

### Step 2: EXECUTE

Run the command fully and freshly:

```bash
# Don't rely on cached results
# Don't assume previous run is still valid
npm test
```

### Step 3: READ

Read the complete output and exit codes:

```bash
# Check output carefully
# Don't skim - read every line
# Note exit code (0 = success)
```

### Step 4: VERIFY

Confirm the output matches your claim:

```markdown
Claim: "All tests pass"
Output shows: "42 passing, 0 failing"
Verification: ✓ Claim is accurate
```

### Step 5: CLAIM

Only now make the claim, with evidence:

```markdown
✓ All tests pass (42 passing, verified at 2025-01-29 14:30)
```

## Required Validations by Category

### Testing

```bash
# Run test command
npm test

# Verify in output:
# - Zero failures
# - Expected test count
# - No skipped tests (unless intentional)
```

**Not valid**: "Tests should pass" without running them

### Linting

```bash
# Run linter completely
npm run lint

# Verify in output:
# - Zero errors
# - Zero warnings (or acceptable known warnings)
```

**Not valid**: Using lint as proxy for build success

### Building

```bash
# Run build command
npm run build

# Verify:
# - Exit code 0
# - Build artifacts created
# - No errors in output
```

**Not valid**: Assuming lint passing means build passes

### Bug Fixes

```bash
# Step 1: Reproduce original bug
npm test -- --grep "failing test"
# Should fail

# Step 2: Apply fix

# Step 3: Verify fix works
npm test -- --grep "failing test"
# Should pass
```

**Not valid**: Claiming fix works without reproducing original failure

### Regression Tests

Complete red-green cycle required:

```bash
# 1. Write test, run it
npm test  # Should PASS with new test

# 2. Revert the fix
git stash

# 3. Run test again
npm test  # Should FAIL (proves test catches the bug)

# 4. Restore fix
git stash pop

# 5. Run test again
npm test  # Should PASS
```

## Forbidden Language

Never use these phrases without verification:

| Forbidden | Why |
|-----------|-----|
| "should work" | Implies uncertainty |
| "probably fixed" | Not verified |
| "seems to pass" | Didn't read output |
| "I think it's done" | Guessing |
| "Great!" (before checking) | Premature celebration |
| "Done!" (before verification) | Unverified claim |

### Replace With

| Instead Say | After |
|-------------|-------|
| "Tests pass" | Running tests, seeing 0 failures |
| "Build succeeds" | Running build, exit code 0 |
| "Bug is fixed" | Reproducing bug, verifying fix |

## Anti-Patterns

### Partial Verification

```
❌ BAD: "I ran one test and it passed"
✅ GOOD: "Full test suite passes (42/42)"
```

### Relying on Prior Runs

```
❌ BAD: "Tests passed earlier"
✅ GOOD: "Tests pass now (just ran)"
```

### Skipping Verification

```
❌ BAD: "This is a small change, no need to verify"
✅ GOOD: "Small change, but verified: tests pass, lint clean"
```

### Trusting Without Checking

```
❌ BAD: "Agent said it's fixed, so it's fixed"
✅ GOOD: "Agent said it's fixed, I verified by running tests"
```

## Verification Checklist Template

Use before claiming completion:

```markdown
## Task: Add Email Verification

### Verification Steps
- [ ] Tests run: `npm test`
  - Result: 45 passing, 0 failing
- [ ] Lint passes: `npm run lint`
  - Result: No errors, no warnings
- [ ] Build succeeds: `npm run build`
  - Result: Exit code 0, dist/ created
- [ ] Requirements met:
  - [ ] Users receive verification email (tested manually)
  - [ ] Token expires after 24 hours (unit test added)
  - [ ] Invalid tokens rejected (unit test added)

### Evidence
```
Test output:
PASS src/services/email.test.ts
PASS src/services/user.test.ts
Test Suites: 2 passed, 2 total
Tests: 45 passed, 45 total
```

### Conclusion
✓ Task complete, all verifications passed
```

## Integration with Other Skills

### With TDD

[TDD](/claudekit/skills/methodology/tdd) naturally includes verification:
1. Write test - verify it fails (red)
2. Implement - verify it passes (green)
3. Refactor - verify it still passes

### With Systematic Debugging

[Debugging](/claudekit/skills/methodology/systematic-debugging) requires verification:
1. Reproduce bug - verify it fails
2. Fix bug - verify it passes
3. Check regressions - verify full suite passes

### With Executing Plans

[Plan execution](/claudekit/skills/methodology/executing-plans) includes verification gates:
- After each task - verify tests pass
- After code review - verify issues fixed
- Before completion - verify all requirements met

## Example Verification

### Before Claiming "Tests Pass"

```bash
$ npm test

> project@1.0.0 test
> vitest run

 ✓ src/models/user.test.ts (12 tests)
 ✓ src/services/auth.test.ts (18 tests)
 ✓ src/api/users.test.ts (15 tests)

Test Files  3 passed (3)
     Tests  45 passed (45)
  Start at  14:23:10
  Duration  2.34s
```

**Now you can claim**: "All tests pass (45/45, verified at 14:23)"

### Before Claiming "Build Succeeds"

```bash
$ npm run build

> project@1.0.0 build
> tsc && vite build

vite v4.3.9 building for production...
✓ 145 modules transformed.
dist/index.html                   0.42 kB
dist/assets/index-a1b2c3d4.js    87.23 kB │ gzip: 28.42 kB

✓ built in 3.45s

$ echo $?
0
```

**Now you can claim**: "Build succeeds (exit code 0, dist/ created)"

### Before Claiming "Bug Fixed"

```bash
# 1. Verify bug exists
$ npm test -- --grep "login with expired session"
FAIL src/auth.test.ts
  ✕ login with expired session (45ms)
    Expected error, got success

# 2. Apply fix

# 3. Verify fix works
$ npm test -- --grep "login with expired session"
PASS src/auth.test.ts
  ✓ login with expired session (12ms)

# 4. Verify no regressions
$ npm test
Test Files  3 passed (3)
     Tests  45 passed (45)
```

**Now you can claim**: "Bug fixed, all tests pass including regression test"

## Activation

This skill is always active, but particularly enforced:

- During [Executing Plans](/claudekit/skills/methodology/executing-plans)
- After [TDD](/claudekit/skills/methodology/tdd) implementation
- Before [Code Review](/claudekit/skills/methodology/code-review)
- In quality-critical contexts

## Best Practices

### Verify Immediately

Don't wait to verify - do it right after implementation:

```
Implement → Verify → Claim
NOT: Implement → Claim → Verify later
```

### Include Output in Claims

```
✅ "Tests pass (45/45)"
✅ "Build succeeds (exit 0, 87KB bundle)"
✅ "Lint clean (0 errors, 0 warnings)"
```

### Re-verify After Changes

```
After changing code:
1. Re-run tests (don't trust old results)
2. Verify they still pass
3. Update verification timestamp
```

### Document Failed Attempts

```markdown
## Verification Attempts

Attempt 1: FAILED (test 12 failing)
- Fixed null check in user.ts:45
- Re-verified

Attempt 2: PASSED (45/45 tests)
- Verification complete
```

## Next Steps

After successful verification:

1. **Document the evidence**: Keep verification output
2. **Commit with confidence**: You know it works
3. **Report completion**: With evidence attached
4. **Move to next task**: Previous task is proven complete

## Related Skills

- [TDD](/claudekit/skills/methodology/tdd) - Includes verification in cycle
- [Systematic Debugging](/claudekit/skills/methodology/systematic-debugging) - Verify fixes work
- [Executing Plans](/claudekit/skills/methodology/executing-plans) - Verification gates
- [Code Review](/claudekit/skills/methodology/code-review) - Verify review feedback addressed
