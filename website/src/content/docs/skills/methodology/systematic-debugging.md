---
title: Systematic Debugging
description: Four-phase debugging methodology for finding root causes
---

The Systematic Debugging skill uses a structured four-phase process centered on finding root causes before implementing fixes.

**Foundational Principle**: NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST

## Overview

Systematic debugging prevents "whack-a-mole" bug fixing by requiring thorough investigation before any code changes. This approach saves time by fixing the actual problem, not symptoms.

## When to Use

- Bug reports with unclear cause
- Errors appearing in production
- Tests failing unexpectedly
- Intermittent/flaky issues
- Complex multi-component failures

## The Four Phases

### Phase 1: Root Cause Investigation

**Goal**: Understand what's happening before attempting to fix.

**Steps**:

1. **Read error messages carefully**
   - What is the exact error message?
   - What is the stack trace?
   - What line numbers are mentioned?
   - What values are shown?

2. **Reproduce consistently**
   - Can you trigger the bug reliably?
   - What exact steps reproduce it?
   - What environment is required?
   - Document the reproduction steps

3. **Track recent changes**
   - What changed recently?
   - `git log --oneline -20`
   - When did it last work?
   - What was deployed?

4. **Gather evidence**
   - Collect logs
   - Check monitoring/metrics
   - Review related code
   - Note any patterns

5. **Add instrumentation** (for multi-component systems)
   ```typescript
   // Add diagnostic logging at each boundary
   console.error('[DEBUG] Input received:', JSON.stringify(input));
   console.error('[DEBUG] After validation:', JSON.stringify(validated));
   console.error('[DEBUG] Before database call:', JSON.stringify(query));
   console.error('[DEBUG] Database result:', JSON.stringify(result));
   ```

### Phase 2: Pattern Analysis

**Goal**: Find comparable working code to identify differences.

**Steps**:

1. **Find working code**
   - Is there similar functionality that works?
   - What did this code look like before?
   - Are there reference implementations?

2. **Study reference thoroughly**
   - How does the working version handle this case?
   - What dependencies does it use?
   - What assumptions does it make?

3. **Identify differences**
   - What's different between working and broken?
   - Configuration differences?
   - Data differences?
   - Environment differences?

4. **Understand dependencies**
   - What does this code depend on?
   - What depends on this code?
   - Are dependencies behaving correctly?

### Phase 3: Hypothesis and Testing

**Goal**: Form and test a specific theory about the cause.

**Steps**:

1. **Form specific hypothesis**
   ```markdown
   Write it down explicitly:
   "The bug occurs because [X] causes [Y] when [Z]"

   Example:
   "The bug occurs because the cache returns stale data
    when the user's session expires during an active request"
   ```

2. **Test with minimal changes**
   - Change ONE variable at a time
   - Don't combine multiple fixes
   - Verify results after each change

3. **Validate hypothesis**
   - Does the fix address the hypothesis?
   - Can you explain WHY it works?
   - Does it make the bug impossible, not just unlikely?

### Phase 4: Implementation

**Goal**: Fix properly with verification.

**Steps**:

1. **Write failing test first**
   ```typescript
   it('should handle expired session during request', () => {
     // Reproduce the bug scenario
     const session = createExpiredSession();
     const result = processRequest(session);

     // This should fail before the fix
     expect(result.error).toBe('SESSION_EXPIRED');
   });
   ```

2. **Implement single targeted fix**
   ```typescript
   // Fix addresses root cause, not symptom
   function processRequest(session: Session) {
     if (session.isExpired()) {
       return { error: 'SESSION_EXPIRED' };
     }
     // ... rest of logic
   }
   ```

3. **Verify fix works**
   ```bash
   npm test -- --grep "expired session"
   # Should pass
   ```

4. **Verify no regressions**
   ```bash
   npm test
   # All tests should pass
   ```

## The Three-Fix Rule

**If three or more fixes fail consecutively, STOP.**

This signals an architectural problem, not a simple bug:

```markdown
Fix attempt 1: Failed
Fix attempt 2: Failed
Fix attempt 3: Failed

STOP: This is not a bug - this is a design problem.

Action: Discuss with user/team before proceeding
- Explain what's been tried
- Explain why it's not working
- Propose architectural changes
```

## Key Principles

### Never Skip Error Details

```
❌ BAD: "There's an error somewhere"
✅ GOOD: "TypeError: Cannot read property 'id' of undefined
         at UserService.getUser (user-service.ts:42)"
```

### Reproduce Before Investigating

```
❌ BAD: "I think I know what's wrong" (starts coding)
✅ GOOD: "Let me reproduce this first" (writes repro steps)
```

### Trace Backward to Origin

```
❌ BAD: Fix where error appears
✅ GOOD: Trace data backward to find where it became invalid
```

### One Change Per Test

```
❌ BAD: "I changed A, B, and C - now it works!"
        (Which one fixed it? Are the others safe?)

✅ GOOD: "I changed A - still broken.
         I reverted A and changed B - now it works.
         B was the fix."
```

## Debugging Checklist

Before attempting any fix:

- [ ] Error message fully read and understood
- [ ] Bug reproduced consistently
- [ ] Recent changes reviewed
- [ ] Evidence gathered (logs, traces)
- [ ] Hypothesis written down
- [ ] Similar working code identified
- [ ] Root cause identified (not just symptom)

Before declaring fixed:

- [ ] Failing test written
- [ ] Fix implemented
- [ ] Test passes
- [ ] No regressions (full test suite passes)
- [ ] Fix explained (can articulate why it works)

## Activation

```bash
/fix "timeout error in auth service"
/debug --systematic "flaky test"
/feature --debug-mode "fix login bug"
```

## Integration with Other Skills

### With TDD

1. Reproduce bug with failing test (TDD red)
2. Investigate root cause (Debugging)
3. Fix root cause (TDD green)
4. Verify test passes (TDD verify)

### With Sequential Thinking

For complex bugs, combine with [sequential thinking](/claudekit/skills/methodology/sequential-thinking):
- Document evidence systematically
- Form hypotheses with confidence scores
- Test hypotheses methodically

### With Verification

Always verify fix with [verification before completion](/claudekit/skills/methodology/verification):
- Run test before fix (must fail)
- Run test after fix (must pass)
- Run full suite (must pass)

## Example Debugging Session

```markdown
## Bug: Users logged out randomly

### Phase 1: Investigation
- Error: "Session not found" in production logs
- Reproduces: Yes, after 30-45 minutes of inactivity
- Recent changes: Session timeout increased to 1 hour (commit abc123)
- Evidence: Session exists in Redis, but app can't find it

### Phase 2: Pattern Analysis
- Working code: Login endpoint creates sessions correctly
- Difference: Session keys use different format after timeout change
- Key format before: `sess:user-id`
- Key format after: `session:user-id`

### Phase 3: Hypothesis
"The timeout change introduced a key format mismatch. Old sessions use
 'sess:' prefix, new code looks for 'session:' prefix."

Test: Check Redis for both key formats
Result: Confirmed - old keys exist with 'sess:' prefix

### Phase 4: Implementation
1. Test: Verify session lookup handles both formats
2. Fix: Update lookup to check both prefixes
3. Verify: Test passes, no more random logouts
4. Full suite: All tests pass

## Root Cause
Key prefix changed in commit abc123 without migration of existing sessions.

## Fix
Check both 'sess:' and 'session:' prefixes during lookup until old sessions expire.
```

## Common Pitfalls

### Fixing Symptoms

```
❌ "Error happens at line 42, I'll add a try-catch"
✅ "Why does line 42 error? What's the invalid data?"
```

### Shotgun Debugging

```
❌ "Let me try changing A, B, C, D and see what happens"
✅ "I hypothesize A is the cause. Let me test only A."
```

### Assuming vs. Verifying

```
❌ "The cache is probably stale"
✅ "Let me check the cache: console.log(cache.get(key))"
```

## Next Steps

After successful debugging:

1. **Add regression test**: Ensure bug can't return
2. **Document root cause**: Help future debugging
3. **Review related code**: Are there similar issues?
4. **Update monitoring**: Catch this class of bug earlier

## Related Skills

- [TDD](/claudekit/skills/methodology/tdd) - Write failing test first
- [Sequential Thinking](/claudekit/skills/methodology/sequential-thinking) - Evidence-based analysis
- [Verification](/claudekit/skills/methodology/verification) - Prove the fix works
- [Root Cause Tracing](/claudekit/skills/methodology/root-cause-tracing) - Deep investigation
