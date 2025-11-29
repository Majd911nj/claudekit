---
title: Writing Plans
description: Generate detailed implementation plans with bite-sized tasks
---

The Writing Plans skill creates comprehensive, step-by-step implementation plans that bridge design and execution with 2-5 minute tasks.

## Overview

Writing Plans transforms completed designs into executable roadmaps. Each task includes exact file paths, complete code samples, and expected outcomes - enabling anyone to implement the plan successfully.

**Core Principle**: Tasks so small and clear that implementation becomes mechanical.

## When to Use

- After brainstorming/design is complete
- Before starting implementation
- When handing off work to another developer
- For complex features requiring structured approach

## Plan Structure

### Header Section

```markdown
# Plan: Add Email Verification

**Required Skill**: executing-plans

## Goal
Add email verification to user registration flow.

## Architecture Overview
Send verification email on registration, validate token on click,
mark user as verified in database.

## Tech Stack
- Node.js, TypeScript
- PostgreSQL
- SendGrid for email
```

### Task Format

Each task follows this structure:

```markdown
## Task 1: Add verified flag to User model

**Files**:
- Modify: `src/models/user.ts`
- Create: `src/migrations/add-verified-flag.ts`
- Test: `src/models/user.test.ts`

**Steps**:

1. Write failing test
   ```typescript
   describe('User model', () => {
     it('should have verified flag defaulting to false', () => {
       const user = new User({ email: 'test@example.com' });
       expect(user.verified).toBe(false);
     });
   });
   ```

2. Verify test fails
   ```bash
   npm test -- --grep "verified flag"
   # Expected: 1 failing (verified is undefined)
   ```

3. Add verified field to User model
   ```typescript
   // src/models/user.ts
   export class User {
     email: string;
     verified: boolean = false;  // Add this line
     // ...
   }
   ```

4. Verify test passes
   ```bash
   npm test -- --grep "verified flag"
   # Expected: 1 passing
   ```

5. Commit
   ```bash
   git add src/models/user.ts src/models/user.test.ts
   git commit -m "feat(user): add verified flag with false default"
   ```
```

## Task Granularity

### The 2-5 Minute Rule

Each task should take 2-5 minutes of focused work:

- Write one test
- Implement one function
- Add one validation
- Create one component

### Why So Small?

- Easier to verify correctness
- Natural commit points
- Reduces context switching
- Enables parallel work
- Clearer progress tracking

### Bad vs Good Breakdown

```
❌ BAD: "Implement user authentication"
   (Too large - could take hours)

✅ GOOD:
   - Task 1: Create User model with email field (3 min)
   - Task 2: Add password hashing to User model (4 min)
   - Task 3: Create login endpoint (5 min)
   - Task 4: Add JWT token generation (4 min)
   - Task 5: Create auth middleware (5 min)
   - Task 6: Add token refresh endpoint (4 min)
```

## Core Requirements

### Exact File Paths Always

Never use vague references:

```
❌ BAD: "Update the user service"
✅ GOOD: "Modify `src/services/user-service.ts`"
```

### Complete Code Samples

Include exact code, not descriptions:

```
❌ BAD: "Add a function that validates email"

✅ GOOD:
```typescript
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
```
```

### Expected Output Specifications

Always specify expected command results:

```bash
npm test
# Expected output:
# PASS src/services/user.test.ts
#   User validation
#     ✓ validates correct email format (3ms)
#     ✓ rejects invalid email format (1ms)
# 2 passing
```

## Guiding Principles

### DRY (Don't Repeat Yourself)

- Identify patterns before implementation
- Plan for reusable components
- Note shared utilities needed

### YAGNI (You Aren't Gonna Need It)

- Only plan what's required now
- Remove speculative features
- Add complexity when justified

### TDD (Test-Driven Development)

Every task follows the cycle:
1. Write failing test
2. Verify it fails
3. Implement minimally
4. Verify it passes
5. Refactor if needed
6. Commit

### Frequent Commits

- Commit after each task
- Clear, descriptive messages
- Atomic changes only

## Activation

### Via Command

```bash
/plan "add email verification"
/plan --detailed "user authentication"  # Extra detailed (30+ tasks)
/plan designs/feature-x.md              # Plan from design doc
```

### Automatic from Brainstorming

```bash
/brainstorm "payment processing"
# After design completes...
"Would you like me to create an implementation plan?"
```

## Example Plan

```markdown
# Plan: Add Password Reset

**Required Skill**: executing-plans

## Goal
Allow users to reset forgotten passwords via email link.

## Architecture Overview
User requests reset, receives email with token link, submits new password,
password updated if token valid.

## Tech Stack
- TypeScript, Express
- PostgreSQL
- SendGrid

---

## Task 1: Add resetToken field to User model

**Files**:
- Modify: `src/models/user.ts`
- Test: `src/models/user.test.ts`

**Steps**:

1. Write test for reset token
   ```typescript
   it('should store password reset token', () => {
     const user = new User({ email: 'test@example.com' });
     user.resetToken = 'abc123';
     user.resetTokenExpiry = new Date(Date.now() + 3600000);
     expect(user.resetToken).toBe('abc123');
   });
   ```

2. Verify test fails
   ```bash
   npm test -- --grep "reset token"
   # Expected: 1 failing
   ```

3. Add fields to User model
   ```typescript
   export class User {
     email: string;
     passwordHash: string;
     resetToken?: string;
     resetTokenExpiry?: Date;
   }
   ```

4. Verify test passes
   ```bash
   npm test
   # Expected: All passing
   ```

5. Commit
   ```bash
   git add .
   git commit -m "feat(user): add reset token fields"
   ```

## Task 2: Create password reset request endpoint

**Files**:
- Create: `src/routes/auth.ts` (if not exists)
- Modify: `src/routes/auth.ts`
- Test: `src/routes/auth.test.ts`

**Steps**:

1. Write test for POST /auth/reset-request
   ```typescript
   it('should generate reset token for valid email', async () => {
     await createUser({ email: 'test@example.com' });

     const res = await request(app)
       .post('/auth/reset-request')
       .send({ email: 'test@example.com' });

     expect(res.status).toBe(200);
     expect(res.body.message).toContain('sent');
   });
   ```

2. Verify test fails
   ```bash
   npm test -- --grep "reset-request"
   # Expected: 404 (route doesn't exist)
   ```

3. Implement endpoint
   ```typescript
   router.post('/reset-request', async (req, res) => {
     const { email } = req.body;
     const user = await User.findByEmail(email);

     if (!user) {
       return res.status(200).json({ message: 'Reset email sent' });
     }

     user.resetToken = crypto.randomBytes(32).toString('hex');
     user.resetTokenExpiry = new Date(Date.now() + 3600000);
     await user.save();

     await sendResetEmail(user.email, user.resetToken);

     res.json({ message: 'Reset email sent' });
   });
   ```

4. Verify test passes
   ```bash
   npm test -- --grep "reset-request"
   # Expected: 1 passing
   ```

5. Commit
   ```bash
   git add .
   git commit -m "feat(auth): add password reset request endpoint"
   ```

## Task 3: ... (continue for remaining tasks)
```

## Execution Handoff

After plan is complete, offer implementation pathways:

### Option 1: Subagent-Driven (Current Session)

```
Use the executing-plans skill for automated execution with:
- Fresh agent per task
- Code review between tasks
- Quality gates
```

### Option 2: Manual Execution

```
Developer executes in current or separate session:
- Read plan file
- Follow tasks sequentially
- Commit after each task
```

## Integration with Other Skills

### From Brainstorming

```bash
/brainstorm "feature X"
# → Design created
/plan designs/feature-x.md
# → Plan created
```

### To Executing Plans

```bash
/plan "feature Y"
# → Plan created in plans/feature-y.md
/execute-plan plans/feature-y.md
# → Automated execution begins
```

### With TDD

Every task in the plan follows TDD:
1. Write failing test
2. Verify failure
3. Implement
4. Verify success
5. Commit

See [TDD skill](/claudekit/skills/methodology/tdd) for details.

## Best Practices

### Start with File List

Before writing tasks, list all files:

```markdown
## Files Involved
- `src/models/user.ts` - Add fields
- `src/services/user-service.ts` - Add methods
- `src/routes/auth.ts` - Add endpoints
- `src/utils/email.ts` - Email helpers
- Tests for each of above
```

### Group Related Tasks

```markdown
## Phase 1: Database Layer (Tasks 1-3)
## Phase 2: Business Logic (Tasks 4-6)
## Phase 3: API Layer (Tasks 7-9)
## Phase 4: Integration (Tasks 10-12)
```

### Include Verification Steps

Every task must verify:
- Test fails before implementation
- Test passes after implementation
- Full suite still passes

## Common Pitfalls

### Tasks Too Large

```
❌ "Implement authentication system" (hours)
✅ "Add password field to User model" (3 minutes)
```

### Missing Expected Output

```
❌ "Run npm test"
✅ "Run npm test (expect: 42 passing, 0 failing)"
```

### Vague File References

```
❌ "Update the service"
✅ "Modify src/services/user-service.ts line 45"
```

### No TDD Cycle

```
❌ "Add the feature and test it"
✅ "1. Write failing test, 2. Verify fails, 3. Implement, 4. Verify passes"
```

## Next Steps

After creating a plan:

1. **Review the plan**: Ensure it's complete and detailed
2. **Execute manually**: Follow tasks yourself, or
3. **Execute with agent**: Use [Executing Plans](/claudekit/skills/methodology/executing-plans)
4. **Review code**: Use [Code Review](/claudekit/skills/methodology/code-review)

## Related Skills

- [Brainstorming](/claudekit/skills/methodology/brainstorming) - Design before planning
- [Executing Plans](/claudekit/skills/methodology/executing-plans) - Automated execution
- [TDD](/claudekit/skills/methodology/tdd) - Test-driven development
- [Code Review](/claudekit/skills/methodology/code-review) - Quality gates
