---
title: Token-Efficient Mode
description: Cost optimization mode with minimal prose and maximum code
---

# Token-Efficient Mode

## Overview

Token-efficient mode optimizes for cost savings by reducing output verbosity while maintaining accuracy. It can reduce token usage by 30-70% depending on the task type.

This mode produces compressed, concise outputs with minimal explanation - perfect for high-volume sessions, simple tasks, or when cost is a primary concern.

## When to Use

Token-efficient mode is ideal for:

- **High-volume sessions** - Many similar tasks in one session
- **Simple, clear tasks** - Well-defined work that doesn't need explanation
- **Cost-sensitive projects** - When minimizing API costs matters
- **Repeated operations** - Batch file generation, similar edits
- **Quick iterations** - Fast back-and-forth during development

## Behavior Changes

### Communication Style

**Minimal explanations:**
- No conversational filler or preambles
- Direct answers only
- Skip obvious context
- Assume developer competence

**Standard Mode Example:**
```
I'll help you fix this bug. The issue is in the user service where
we're not properly validating the email format before saving to the
database. Here's the fix:

[code block with detailed comments]

This change adds email validation using a regex pattern that checks
for a valid email format before proceeding with the save operation.
```

**Token-Efficient Mode Example:**
```
Fix: Add email validation

[code block with minimal comments]
```

### Problem-Solving Approach

- Jump directly to solutions
- Assume competence - no hand-holding
- Skip basic explanations
- Reference documentation instead of explaining
- Make reasonable defaults without discussion

### Output Format

- Code blocks without surrounding prose
- Abbreviated inline comments
- Terse commit messages
- Bullet points instead of paragraphs
- No "I'll help you" preambles

## Token Savings Breakdown

| Technique | Token Savings | Trade-off |
|-----------|---------------|-----------|
| Skip preambles | 20-30% | Less context setting |
| Code-only responses | 40-50% | No explanation |
| Abbreviated comments | 10-15% | Less documentation |
| Reference over explain | 30-40% | Requires looking up docs |
| Combined (Ultra mode) | 60-70% | Minimal guidance |

## Examples

### Bug Fix

**Request:**
```bash
/fix --format=concise "null pointer in user.ts line 42"
```

**Token-Efficient Response:**
```typescript
// user.ts:42
if (!user) return null;
// Before: user.name (crashes when null)
// After: user?.name ?? 'Unknown'
```

Test: `npm test -- --grep "null user"`

---

**Compare to Standard Mode:**
```markdown
I found the null pointer issue. When user is null, we're trying to
access the name property which causes a crash. Here's the fix:

```typescript
// user.ts:42
if (!user) {
  return null;
}

// Use optional chaining to safely access name
const userName = user?.name ?? 'Unknown';
```

This uses TypeScript's optional chaining operator (?.) which safely
accesses properties on potentially null objects. If user is null,
it returns undefined instead of crashing. The nullish coalescing
operator (??) provides a fallback value of 'Unknown'.

To test this fix, run:
```bash
npm test -- --grep "null user"
```
```

Token savings: ~65%

### Feature Implementation

**Request:**
```bash
/feature --format=ultra "add user avatar upload"
```

**Token-Efficient Response:**
```typescript
// src/api/user.ts
router.post('/avatar', upload.single('avatar'), async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: 'No file' });

  const url = await s3.upload(file);
  await db.users.update(req.user.id, { avatarUrl: url });

  res.json({ avatarUrl: url });
});

// src/middleware/upload.ts
import multer from 'multer';
export const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Images only'));
    }
    cb(null, true);
  }
});
```

Test: `curl -F "avatar=@test.jpg" http://localhost:3000/api/avatar`

---

**Compare to Standard Mode:**
```markdown
I'll implement avatar upload functionality with file size limits and
type validation.

## Implementation Plan
1. Add multer middleware for file uploads
2. Create upload endpoint
3. Validate file type and size
4. Upload to S3
5. Update user record

Let me create the necessary files:

**src/api/user.ts**
```typescript
import { Router } from 'express';
import { upload } from '../middleware/upload';
import { s3Service } from '../services/s3';
import { db } from '../db';

const router = Router();

// Avatar upload endpoint
// Accepts: multipart/form-data with 'avatar' field
// Returns: { avatarUrl: string }
router.post('/avatar', upload.single('avatar'), async (req, res) => {
  const file = req.file;

  // Validate file exists
  if (!file) {
    return res.status(400).json({ error: 'No file provided' });
  }

  // Upload to S3 and get URL
  const url = await s3Service.upload(file);

  // Update user's avatar URL in database
  await db.users.update(req.user.id, { avatarUrl: url });

  res.json({ avatarUrl: url });
});

export default router;
```

**src/middleware/upload.ts**
```typescript
import multer from 'multer';

// Configure multer with size and type restrictions
export const upload = multer({
  // Limit file size to 5MB
  limits: {
    fileSize: 5 * 1024 * 1024
  },

  // Only allow image files
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files allowed'));
    }
    cb(null, true);
  }
});
```

This implementation:
- Uses multer for handling multipart form data
- Restricts uploads to images only (JPEG, PNG, etc.)
- Enforces a 5MB file size limit
- Uploads to S3 for persistent storage
- Updates the user's database record with the new avatar URL

To test the endpoint:
```bash
curl -F "avatar=@test.jpg" http://localhost:3000/api/avatar
```
```

Token savings: ~70%

### Code Review

**Request:**
```bash
/review --format=concise src/services/payment.ts
```

**Token-Efficient Response:**
```markdown
## payment.ts

**Critical:**
- Line 45: API key in logs → Remove from error message
- Line 78: No timeout → Add 30s timeout

**Important:**
- Line 12: Magic number 3 → Extract constant `MAX_RETRIES`
- Line 56: No retry backoff → Add exponential backoff

**Minor:**
- Inconsistent error handling
- Missing JSDoc on public methods

Tests pass. Fix critical before merge.
```

---

**Compare to Standard Mode:**
```markdown
## Code Review: payment-service.ts

I've reviewed the payment service code. Here's what I found:

### Critical Issues 🔴

**Issue 1: API Key Exposure in Logs (Line 45)**
- **Problem**: The error handler logs the full API key when payment
  fails, which exposes sensitive credentials in application logs.
- **Risk**: Anyone with log access can see the API key
- **Fix**: Remove the API key from the error message:
  ```typescript
  // Before
  logger.error(`Payment failed with key ${apiKey}`, error);

  // After
  logger.error('Payment failed', { error: error.message });
  ```

**Issue 2: No Timeout on API Calls (Line 78)**
- **Problem**: The payment API call has no timeout, which means it
  could hang indefinitely if the payment provider is down.
- **Risk**: Could cause your entire application to hang
- **Fix**: Add a 30-second timeout:
  ```typescript
  const response = await axios.post(url, data, {
    timeout: 30000 // 30 seconds
  });
  ```

### Important Issues 🟠

**Issue 3: Magic Number for Retries (Line 12)**
- **Problem**: The number 3 is hardcoded for retry attempts
- **Fix**: Extract to a named constant for clarity:
  ```typescript
  const MAX_RETRIES = 3;
  ```

... [more detailed explanations]

### Positive Notes ✅
- Good error handling structure overall
- Tests cover the main payment flows
- Clear function names and organization

### Recommendation
This code needs changes before merging. The critical issues must be
fixed, and I recommend addressing the important issues as well for
better reliability.
```

Token savings: ~75%

## Format Levels

Token-efficient mode has two levels:

### Concise (`--format=concise`)

**Token savings: 30-40%**

- Reduced explanations but still present
- Standard code with fewer comments
- Brief context setting
- Short examples

**Use when:**
- You still want some explanation
- Working on moderately complex tasks
- Collaborating with others who need context

### Ultra (`--format=ultra`)

**Token savings: 60-70%**

- Code-only responses
- Minimal to no explanations
- Terse comments only
- No examples unless critical

**Use when:**
- Task is very clear
- You're experienced with the codebase
- Doing repetitive operations
- Maximum cost savings needed

## Mode Activation

### Session-Wide

```bash
# Enable for entire session
/mode token-efficient

# All commands now use token-efficient mode
/fix "error message"
/feature "new feature"
/review "file.ts"
```

### Single Command

```bash
# Concise format for one command
/fix --format=concise "error message"

# Ultra format for maximum savings
/feature --format=ultra "simple feature"
```

### Combining with Other Modes

```bash
# Token-efficient implementation (very fast)
/execute-plan --mode=implementation --format=ultra plan.md

# Concise deep research (save tokens on output)
/research --mode=deep-research --format=concise "topic"
```

## When NOT to Use

Avoid token-efficient mode for:

- **Complex architectural decisions** - Need thorough discussion
- **Code reviews** - Need detailed analysis and explanations
- **Documentation tasks** - Literally requires verbose output
- **Teaching/explanation requests** - Defeats the purpose
- **Debugging complex issues** - Need thorough investigation
- **First time with unfamiliar tech** - Need learning context

## Best Practices

### Progressive Refinement

Start verbose, then compress:

```bash
# First iteration - understand the problem
/fix "complex error"

# Subsequent iterations - just make it work
/mode token-efficient
/fix "similar error"
/fix "another similar error"
```

### Batch Operations

Perfect for repetitive tasks:

```bash
/mode token-efficient

# Generate tests for multiple files
/test src/services/user-service.ts
/test src/services/auth-service.ts
/test src/services/payment-service.ts
# ...repeat for all services

/mode default  # Switch back when done
```

### Know Your Codebase

Token-efficient mode assumes you:
- Know the file structure
- Understand the tech stack
- Can read code without extensive comments
- Know where to find documentation

If any of these are false, use default mode instead.

## Token Usage Comparison

Real example from a feature implementation:

| Mode | Input Tokens | Output Tokens | Total | Cost (Sonnet) |
|------|--------------|---------------|-------|---------------|
| Default | 1,200 | 3,500 | 4,700 | $0.014 |
| Concise | 1,200 | 2,100 | 3,300 | $0.010 |
| Ultra | 1,200 | 1,200 | 2,400 | $0.007 |

**Savings over 100 similar tasks:**
- Concise: $0.40 saved (~30%)
- Ultra: $0.70 saved (~50%)

## Tips for Maximum Efficiency

### 1. Be Specific in Requests

**Less efficient:**
```bash
/fix "there's a bug in the user service"
```

**More efficient:**
```bash
/fix "null pointer at user-service.ts:42"
```

Saves tokens on both input and output.

### 2. Use File Paths

**Less efficient:**
```bash
/feature "add login endpoint"
```

**More efficient:**
```bash
/feature "add POST /auth/login to src/api/auth.ts"
```

Claude spends fewer tokens figuring out where code goes.

### 3. Batch Similar Tasks

**Less efficient:**
```bash
/test "user service"
[wait for response]
/test "auth service"
[wait for response]
```

**More efficient:**
```bash
/mode token-efficient
/test src/services/*.ts --format=ultra
```

### 4. Reference Previous Work

**Less efficient:**
```bash
/feature "add logout endpoint similar to login"
```

**More efficient:**
```bash
/feature "add logout to auth.ts, same pattern as login"
```

Claude reuses context instead of regenerating it.

## Configuration

Customize token-efficient behavior in `.claude/modes/token-efficient.md`:

- Default compression level
- When to skip explanations
- Comment verbosity
- Auto-activation conditions

## Related Modes

- **Implementation Mode**: Similar code-focus, for execution
- **Default Mode**: When you need more explanation
- **Brainstorm Mode**: Complete opposite - verbose exploration

## Related Documentation

- [Token Optimization Guide](/claudekit/optimization/token-efficient)
- [Cost Management](/claudekit/advanced/cost)
- [Batch Operations](/claudekit/guides/batch)
