---
title: Implementation Mode
description: Code-focused execution mode for clear, well-defined tasks
---

# Implementation Mode

## Overview

Implementation mode is optimized for executing clear plans with minimal discussion. It focuses on code generation, progress updates, and rapid iteration when the design is already decided.

This mode produces mostly code with brief status updates, making it ideal for translating plans into working software efficiently.

## When to Use

Implementation mode is ideal for:

- **Executing approved plans** - When design is complete and it's time to build
- **Clear, well-defined tasks** - Requirements are unambiguous
- **Repetitive code generation** - Similar files/components
- **Following established patterns** - Using existing code style
- **Batch file operations** - Creating many similar files

## Behavior Changes

### Communication Style

**Action-oriented:**
- Minimal prose and explanations
- Progress indicators and status updates
- Skip discussion unless blocked
- Flag issues immediately and continue

**Standard Mode Example:**
```markdown
I'll implement the user profile feature. This will involve creating
a new ProfileService, adding API endpoints, and creating the frontend
component. Let me walk you through each part:

First, I'll create the service layer that handles profile data...

[code with detailed explanations]

This service encapsulates all profile-related business logic and
provides a clean interface for the API layer to consume...
```

**Implementation Mode Example:**
```markdown
Creating user profile feature:

[1/4] ProfileService
[2/4] API endpoints
[3/4] Frontend component
[4/4] Tests

Files created:
- src/services/profile-service.ts
- src/api/profile.ts
- src/components/Profile.tsx
- src/services/profile-service.test.ts

✓ All tests passing
```

### Problem-Solving Approach

- **Execute, don't deliberate** - Make it work, don't discuss it
- **Follow established patterns** - Use existing code style
- **Make reasonable defaults** - Don't ask about minor decisions
- **Flag blockers immediately** - Stop for critical issues only

### Output Format

- Code blocks with minimal wrapping text
- File paths clearly marked
- Progress indicators (`[1/5]`, `[2/5]`, etc.)
- Checkmarks for completion (`✓`)
- Minimal inline comments (code should be self-documenting)

## Examples

### Feature Implementation

**Request:**
```bash
/feature --mode=implementation "add user avatar upload"
```

**Implementation Mode Response:**
```markdown
[1/5] Creating upload service

`src/services/upload-service.ts`:
```typescript
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';

export class UploadService {
  private s3: S3Client;

  constructor() {
    this.s3 = new S3Client({ region: process.env.AWS_REGION });
  }

  async uploadAvatar(file: Express.Multer.File, userId: string): Promise<string> {
    const key = `avatars/${userId}/${randomUUID()}.${file.mimetype.split('/')[1]}`;

    await this.s3.send(new PutObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    }));

    return `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${key}`;
  }
}
```

[2/5] Adding upload middleware

`src/middleware/upload.ts`:
```typescript
import multer from 'multer';

export const avatarUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Images only'));
    }
  },
});
```

[3/5] Creating API endpoint

`src/api/users.ts` (added):
```typescript
router.post(
  '/avatar',
  authenticate,
  avatarUpload.single('avatar'),
  async (req, res) => {
    const url = await uploadService.uploadAvatar(req.file!, req.user.id);
    await userService.updateAvatar(req.user.id, url);
    res.json({ avatarUrl: url });
  }
);
```

[4/5] Updating user service

`src/services/user-service.ts` (added method):
```typescript
async updateAvatar(userId: string, avatarUrl: string): Promise<void> {
  await db.users.update({ id: userId }, { avatarUrl });
}
```

[5/5] Adding tests

`src/services/upload-service.test.ts`:
```typescript
describe('UploadService', () => {
  it('uploads avatar to S3', async () => {
    const file = createMockFile('test.jpg');
    const url = await uploadService.uploadAvatar(file, 'user-123');
    expect(url).toMatch(/avatars\/user-123\/.*\.jpg/);
  });
});
```

Running tests... ✓ 5 passing

Done. Test with:
```bash
curl -F "avatar=@profile.jpg" http://localhost:3000/api/users/avatar
```
```

### Plan Execution

**Request:**
```bash
/execute-plan --mode=implementation plans/auth-refactor.md
```

**Implementation Mode Response:**
```markdown
Executing auth refactor plan...

[1/8] Extract JWT config → src/config/jwt.ts ✓
[2/8] Create TokenService → src/services/token-service.ts ✓
[3/8] Update AuthService to use TokenService ✓
[4/8] Add refresh token support ✓
[5/8] Update login endpoint ✓
[6/8] Add token refresh endpoint ✓
[7/8] Update tests ✓
[8/8] Update documentation ✓

Changed files:
- src/config/jwt.ts (new)
- src/services/token-service.ts (new)
- src/services/auth-service.ts (modified)
- src/api/auth.ts (modified)
- docs/auth.md (updated)

Tests: 24 passing
Lint: Clean

Ready to commit:
```bash
git add .
git commit -m "refactor(auth): extract token handling to service"
```
```

### Batch File Generation

**Request:**
```bash
/test --mode=implementation src/services/*.ts
```

**Implementation Mode Response:**
```markdown
Generating tests for 12 services...

[1/12] user-service.test.ts ✓
[2/12] auth-service.test.ts ✓
[3/12] payment-service.test.ts ✓
[4/12] email-service.test.ts ✓
[5/12] notification-service.test.ts ✓
[6/12] profile-service.test.ts ✓
[7/12] upload-service.test.ts ✓
[8/12] analytics-service.test.ts ✓
[9/12] webhook-service.test.ts ✓
[10/12] cache-service.test.ts ✓
[11/12] queue-service.test.ts ✓
[12/12] search-service.test.ts ✓

Created 12 test files, 87 tests total.

Run: `npm test`
```

## Decision Making in Implementation Mode

When encountering choices during implementation:

| Situation | Behavior | Example |
|-----------|----------|---------|
| **Style choice** | Follow existing patterns | Use same naming as other files |
| **Missing detail** | Use reasonable default | Default to camelCase if unclear |
| **Ambiguity** | Flag and continue with assumption | ⚠️ Assumed JSON format, confirm if needed |
| **Blocker** | Stop and report immediately | 🛑 Missing API credentials required |

### Flagging Format

When making assumptions:

```markdown
⚠️ Assumed: User avatars stored in S3 bucket 'app-avatars'
Continuing with this assumption. Update S3_BUCKET env var if different.
```

When blocked:

```markdown
🛑 Blocked: Missing Stripe API key
Required for payment integration. Add STRIPE_SECRET_KEY to .env
Cannot proceed with payment service without this.
```

## Progress Tracking Patterns

### Simple Task
```markdown
Creating auth middleware...
✓ Done

Test: curl -H "Authorization: Bearer token" /api/protected
```

### Multi-Step Task
```markdown
[1/3] Database migration
[2/3] Service layer
[3/3] API endpoints

✓ Complete
```

### Complex Feature
```markdown
User dashboard feature:

Backend:
  [1/4] Database schema ✓
  [2/4] Services ✓
  [3/4] API endpoints ✓
  [4/4] Tests ✓

Frontend:
  [1/3] Components ✓
  [2/3] State management ✓
  [3/3] Integration ✓

✓ All done. Run: npm run dev
```

## Tips for Using Implementation Mode

### When It Works Best

1. **After planning/brainstorming**
   ```bash
   /mode brainstorm
   /brainstorm "dashboard layout"
   # Make decisions

   /mode implementation
   /feature "implement dashboard with sidebar and cards"
   # Execute quickly
   ```

2. **With clear specifications**
   - Detailed requirements
   - Approved designs
   - Existing patterns to follow

3. **For experienced developers**
   - You know the codebase
   - Understand the tech stack
   - Don't need explanations

### When to Switch Out

Switch from implementation mode when:
- **Blocked or confused** → Switch to Default or Brainstorm
- **Need explanation** → Switch to Default
- **Complex decision needed** → Switch to Brainstorm
- **Review needed** → Switch to Review mode

### Combining with Other Modes

```bash
# Brainstorm → Implement → Review
/mode brainstorm
/brainstorm "feature design"

/mode implementation
/feature "implement design"

/mode review
/review src/new-feature/
```

### Maximum Efficiency

Combine with token-efficient format:

```bash
/execute-plan --mode=implementation --format=ultra plan.md
```

This gives you:
- Fast execution (implementation mode)
- Minimal tokens (ultra format)
- Maximum speed for clear plans

## Typical Workflows

### TDD Workflow

```bash
/mode implementation

/test "user login endpoint"
# Generates failing tests

# Implement until tests pass
/fix "make login tests pass"

✓ Tests passing
```

### Migration/Refactor

```bash
/mode implementation

# Execute refactor plan step by step
[1/10] Extract function ✓
[2/10] Update imports ✓
[3/10] Rename variables ✓
...
[10/10] Update tests ✓

✓ Refactor complete
```

### Feature Branch

```bash
/mode implementation

/feature "user settings page"
# Implement feature

/test "user settings"
# Add tests

/review "src/settings/"
# Quick review

/ship "feat: add user settings page"
# Commit and push
```

## Mode Activation

```bash
# Session-wide implementation mode
/mode implementation

# All commands now execute without discussion
/feature "feature 1"
/feature "feature 2"
/fix "bug 1"

# Single command override
/feature --mode=implementation "specific feature"
```

## Output Examples

### Minimal (Standard)
```markdown
Created UserService
Created UserController
Created tests

✓ Done
```

### With Progress (Multi-step)
```markdown
[1/5] Model
[2/5] Service
[3/5] Controller
[4/5] Routes
[5/5] Tests

✓ Complete - 5 files created
```

### With Assumptions (Ambiguous case)
```markdown
[1/3] Database schema
⚠️ Assumed: PostgreSQL (saw pg in package.json)

[2/3] Repository
[3/3] Tests

✓ Done
```

### With Blocker (Stopped)
```markdown
[1/4] Config
[2/4] Service

🛑 Blocked: Missing API_KEY environment variable
Add to .env file and rerun.
```

## Comparison with Other Modes

| Aspect | Implementation | Token-Efficient | Default |
|--------|---------------|-----------------|---------|
| Explanation | Minimal | None | Moderate |
| Progress updates | Yes | No | Sometimes |
| Code output | High | Highest | Balanced |
| Decision making | Auto (reasonable defaults) | Auto (fastest path) | Asks when unclear |
| Best for | Executing plans | High volume | General use |

## Configuration

Implementation mode behavior is defined in `.claude/modes/implementation.md`:

- Progress indicator format
- Comment verbosity
- When to flag assumptions
- Default choices for common decisions

## Related Modes

- **Token-Efficient Mode**: Even more concise output
- **Default Mode**: More explanation and discussion
- **Review Mode**: Switch to this after implementation

## Related Documentation

- [Execute Plan Command](/claudekit/commands/execute-plan)
- [TDD Workflow](/claudekit/guides/tdd)
- [Batch Operations](/claudekit/guides/batch)
