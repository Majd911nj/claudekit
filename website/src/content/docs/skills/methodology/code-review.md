---
title: Code Review
description: Request and receive code reviews effectively
---

The Code Review skill covers both requesting reviews with clear context and processing feedback systematically.

## Overview

Effective code review involves clear communication when requesting reviews and systematic processing of feedback. This skill combines both requesting and receiving reviews into a cohesive workflow.

## Requesting Code Reviews

### When to Request

- After completing a task (before proceeding to next)
- After implementing a feature
- Before merging to main branch
- When unsure about implementation approach
- After fixing critical bugs

### Review Request Components

#### 1. Scope Definition

Clearly state what should be reviewed:

```markdown
## Review Scope

**Files changed**:
- src/services/user-service.ts (modified)
- src/services/user-service.test.ts (added)
- src/types/user.ts (modified)

**Lines changed**: ~150 additions, ~20 deletions

**Not in scope** (don't review):
- package.json changes (unrelated dependency update)
- Generated files in dist/
```

#### 2. Context

Explain why these changes were made:

```markdown
## Context

**Task**: Implement user email verification

**Requirements**:
- Users must verify email before accessing features
- Verification link expires after 24 hours
- Users can request new verification email

**Design decisions**:
- Used JWT for verification token (stateless)
- Stored verification status in existing User table
```

#### 3. Areas of Concern

Highlight where you want focused attention:

```markdown
## Areas of Concern

1. **Security**: Is the token generation secure enough?
2. **Error handling**: Are all edge cases covered?
3. **Performance**: Will the verification lookup be efficient?
```

#### 4. Test Coverage

Show what's tested:

```markdown
## Test Coverage

- Unit tests: 8 new tests in user-service.test.ts
- Integration: Manual testing of full flow
- Edge cases: Expired token, invalid token, already verified

**Not tested** (known gaps):
- Load testing with many concurrent verifications
```

### Review Request Template

```markdown
## Code Review Request

### Summary
Implemented email verification for new user registrations.

### Files Changed
- `src/services/user-service.ts` - Added verification methods
- `src/services/user-service.test.ts` - Added 8 unit tests
- `src/types/user.ts` - Added verified field

### Context
Users now receive a verification email on signup. They must click
the link within 24 hours to verify their account.

### Implementation Notes
- JWT tokens for stateless verification
- Tokens expire after 24 hours
- Idempotent verification (safe to verify twice)

### Areas for Focus
1. Token security (generation and validation)
2. Edge case handling
3. Test coverage completeness

### Testing
- [x] Unit tests added/updated
- [x] Integration tests pass
- [ ] E2E tests (not applicable)

### Checklist
- [x] Code follows project conventions
- [x] No security vulnerabilities introduced
- [x] Documentation updated if needed
```

## Receiving Code Reviews

### Feedback Categories

#### Critical Issues

**Definition**: Must fix before proceeding.

Examples:
- SQL injection vulnerability
- Unhandled null pointer
- Data corruption possibility
- Authentication bypass

**Response**: Fix immediately. Do not proceed until resolved.

#### Important Issues

**Definition**: Should fix before proceeding.

Examples:
- Missing error handling
- Inefficient algorithm
- Poor naming
- Missing tests for edge cases

**Response**: Fix before merging. May defer to follow-up if blocking.

#### Minor Issues

**Definition**: Can fix later.

Examples:
- Variable naming suggestions
- Comment improvements
- Minor refactoring opportunities
- Documentation polish

**Response**: Note for later. Can merge without addressing.

### Processing Workflow

#### Step 1: Categorize All Feedback

```markdown
## Review Feedback

### Critical (Must Fix)
1. Line 45: SQL query vulnerable to injection
2. Line 89: User data exposed in logs

### Important (Should Fix)
1. Line 23: Missing null check
2. Line 67: Test doesn't cover error path

### Minor (Can Defer)
1. Line 12: Consider renaming 'x' to 'count'
2. Line 34: Could extract to helper function
```

#### Step 2: Fix Critical Issues First

```markdown
Addressing critical issue 1:
- File: src/db/queries.ts:45
- Issue: SQL injection vulnerability
- Fix: Use parameterized query
- Verification: Tested with malicious input
```

#### Step 3: Fix Important Issues

```markdown
Addressing important issue 1:
- File: src/services/user.ts:23
- Issue: Missing null check
- Fix: Added guard clause
- Verification: Test added for null case
```

#### Step 4: Note Minor Issues

```markdown
Deferred for follow-up:
- Line 12: Variable rename (tracked in TODO)
- Line 34: Extract helper (low priority)
```

#### Step 5: Request Re-Review

After fixes applied:

```markdown
## Re-Review Request

### Fixed Issues
- [x] SQL injection (line 45) - Now uses parameterized query
- [x] Data exposure (line 89) - Removed user data from logs
- [x] Null check (line 23) - Added guard clause
- [x] Test coverage (line 67) - Added error path test

### Deferred (Minor)
- Variable rename (line 12) - Will address in cleanup PR

### Changes Since Last Review
- 4 files modified
- 2 tests added
- All previous feedback addressed
```

## Review Types

### Quick Review

For small, low-risk changes:

```markdown
## Quick Review: Fix typo in error message

**File**: src/errors.ts
**Change**: Fixed "recieved" → "received" in error message
**Risk**: None
```

### Standard Review

For typical feature work:

```markdown
## Review: Add user preferences

**Files**: 3 files, ~200 lines
**Context**: Users can now save display preferences
**Focus**: Data validation, storage approach
```

### Critical Review

For high-risk changes:

```markdown
## CRITICAL REVIEW: Authentication refactor

**Files**: 12 files, ~800 lines
**Risk**: HIGH - Authentication system changes
**Required reviewers**: Security team
**Focus**: Token handling, session management, encryption
```

## Handling Disagreements

### When You Disagree

1. Don't dismiss immediately
2. Consider the reviewer's perspective
3. Explain your reasoning
4. Provide evidence (code, tests, docs)
5. Be open to being wrong
6. Escalate if needed (tech lead, team discussion)

### Disagreement Response Template

```markdown
## Re: Token expiration approach

I considered this feedback carefully. Here's my perspective:

**Reviewer's concern**: Token should expire after 1 hour
**My reasoning**: 24 hours allows users to verify later
**Evidence**: User research shows 40% verify after 6+ hours
**Proposed resolution**: Keep 24 hours, add configurable option
```

## Common Feedback Types

### Security Issues

Always fix immediately:

```typescript
// Before (vulnerable)
const query = `SELECT * FROM users WHERE id = '${userId}'`;

// After (secure)
const query = 'SELECT * FROM users WHERE id = $1';
const result = await db.query(query, [userId]);
```

### Error Handling

Add comprehensive handling:

```typescript
// Before
const user = await getUser(id);
return user.name;

// After
const user = await getUser(id);
if (!user) {
  throw new NotFoundError(`User ${id} not found`);
}
return user.name;
```

### Test Coverage

Add missing tests:

```typescript
// Before: Only happy path tested
it('should return user', async () => {
  const user = await getUser('valid-id');
  expect(user).toBeDefined();
});

// After: Edge cases covered
it('should return user', async () => { /* ... */ });
it('should throw NotFoundError for missing user', async () => { /* ... */ });
it('should throw ValidationError for invalid id', async () => { /* ... */ });
```

## Re-Review Checklist

Before requesting re-review:

- [ ] All Critical issues fixed
- [ ] All Important issues fixed (or explicitly deferred with reason)
- [ ] Minor issues noted for follow-up
- [ ] Tests added/updated for fixes
- [ ] Full test suite passes
- [ ] Changes summarized for reviewer

## Iteration Limits

If review requires 3+ cycles:

1. STOP
2. Schedule discussion with reviewer
3. Identify root cause of misalignment
4. May need design discussion
5. Don't keep iterating endlessly

## Activation

### Requesting Reviews

```bash
/review src/services/user-service.ts
/review --persona=security src/auth/
/ship --review "implement email verification"
```

### After Executing Plans

Automatic code review between tasks when using [Executing Plans](/claudekit/skills/methodology/executing-plans).

## Integration with Other Skills

### With Executing Plans

[Executing Plans](/claudekit/skills/methodology/executing-plans) includes automatic code review:
- Review after each task
- Categorize issues (Critical/Important/Minor)
- Fix before proceeding

### With TDD

Code reviews check:
- Tests exist for new code
- Tests follow TDD pattern (written first)
- Tests cover edge cases

### With Verification

Reviews verify:
- Claims are backed by evidence
- Tests actually pass
- No unverified assertions

## Best Practices

### Keep Reviews Focused

```
✅ "Review the user verification feature (3 files)"
❌ "Review my last week of work"
```

### Provide Runnable Context

```markdown
## To test locally
1. git checkout feature/email-verification
2. npm install
3. npm test -- --grep "email verification"
```

### Be Specific About Concerns

```
✅ "I'm unsure about the error handling in lines 45-60"
❌ "Let me know if anything looks wrong"
```

### Respond to All Feedback

```markdown
✅ Issue 1: Fixed
✅ Issue 2: Fixed
✅ Issue 3: Disagree, here's why (with evidence)
✅ Issue 4: Deferred to follow-up PR #123
```

## Next Steps

After review approval:

1. **Merge code**: If all issues resolved
2. **Follow-up tasks**: Create tickets for deferred issues
3. **Documentation**: Update if needed
4. **Deployment**: Use [deploy command](/claudekit/commands/deploy)

## Related Skills

- [Executing Plans](/claudekit/skills/methodology/executing-plans) - Automated reviews
- [TDD](/claudekit/skills/methodology/tdd) - Test coverage checks
- [Verification](/claudekit/skills/methodology/verification) - Evidence-based claims
- [Security (OWASP)](/claudekit/skills/security/owasp) - Security review focus
