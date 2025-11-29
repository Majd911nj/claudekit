---
title: Default Mode
description: Standard balanced mode for general development tasks
---

# Default Mode

## Overview

Default mode provides balanced behavior that works well for most development tasks. It offers a good mix of thoroughness and efficiency without optimizing for any specific use case.

This is the baseline mode that Claude uses unless you explicitly specify another mode. All other modes modify this standard behavior in specific ways.

## When to Use

Default mode is suitable for:

- General development tasks
- When you're unsure which mode to use
- Mixed-complexity work
- Learning the system
- Balanced code + explanation needs

## Behavior Changes

### Communication Style

**Standard responses:**
- Clear and concise without being terse
- Explanations where helpful, not excessive
- Balanced between action and discussion
- Standard code comments

**Example:**
```
I'll help you implement user authentication. This will involve creating
a service for handling login/logout and integrating with your existing
user model.

Here's the authentication service:

[code with standard comments]

This implementation uses JWT tokens for stateless authentication.
The tokens expire after 24 hours and include the user ID in the payload.
```

### Problem-Solving Approach

- Balanced analysis depth
- Standard verification steps
- Normal iteration cycles
- Ask clarifying questions when needed
- Make reasonable defaults for minor decisions

### Output Format

- Full code blocks with context
- Helpful explanations (not exhaustive)
- Standard documentation level
- File paths clearly marked
- Test output when relevant

## Examples

### Feature Implementation

**Request:**
```bash
/feature "add password reset functionality"
```

**Default Mode Response:**
```markdown
I'll implement password reset functionality with email verification.

## Implementation Plan
1. Create password reset token model
2. Add reset request endpoint
3. Send reset email
4. Create password update endpoint
5. Add tests

## Files to Create/Modify
- `src/models/password-reset-token.ts` (new)
- `src/services/auth-service.ts` (modify)
- `src/api/auth.ts` (modify)
- `src/services/email-service.ts` (modify)
- Tests for each component

Let me start with the token model:

[code]

This model stores password reset tokens with a 1-hour expiration.
The token is hashed for security.

Next, the auth service methods:

[code]
```

### Bug Fix

**Request:**
```bash
/fix "users can't upload images > 5MB"
```

**Default Mode Response:**
```markdown
The issue is in the file upload middleware. The default limit is set
to 5MB. I'll increase it to 50MB and add proper error handling.

Here's the fix:

[code]

This change:
1. Increases the limit to 50MB
2. Adds validation for file type
3. Returns a clear error message if limit exceeded

Test with: `curl -F "file=@large-image.jpg" http://localhost:3000/upload`
```

### Code Review

**Request:**
```bash
/review src/services/payment-service.ts
```

**Default Mode Response:**
```markdown
## Code Review: payment-service.ts

### Issues Found

**Critical:**
1. Line 45: API key is logged in error handler
   - Risk: Exposes sensitive data in logs
   - Fix: Remove API key from error message

**Important:**
2. Line 78: No timeout on payment API call
   - Risk: Can hang indefinitely
   - Fix: Add 30-second timeout

**Minor:**
3. Line 12: Magic number for retry attempts
   - Fix: Extract to constant `MAX_RETRIES = 3`

### Positive Notes
- Good error handling overall
- Tests cover main flows
- Clear function names

### Recommendation
Fix critical issue before merge. Consider addressing important issue.
```

## Tips for Using Default Mode

### When It Works Best

Default mode shines when:
- You want a single mode for everything
- Task complexity is medium
- You prefer consistency over optimization
- You're collaborating with others who expect standard responses

### When to Switch

Consider switching from default mode when:
- **To Brainstorm**: You need to explore alternatives
- **To Token-Efficient**: You're doing repetitive tasks
- **To Implementation**: You have a clear plan to execute
- **To Deep Research**: You need thorough investigation
- **To Review**: You're doing code review specifically

### Combining with Flags

Even in default mode, you can use flags for specific behaviors:

```bash
# Default mode but with security focus
/review --persona=security src/auth/

# Default mode but save output
/plan --save=plans/feature.md "new feature"

# Default mode but more thorough
/fix --depth=4 "complex error"
```

## Mode Activation

Default mode is active automatically. You don't need to activate it.

To explicitly return to default mode after using another:

```bash
/mode default
```

Or use it for a single command:

```bash
/feature --mode=default "description"
```

## Comparison with Other Modes

| Aspect | Default | vs Brainstorm | vs Token-Efficient | vs Implementation |
|--------|---------|---------------|-------------------|-------------------|
| Explanation level | Moderate | High | Minimal | Low |
| Code output | Balanced | Less code, more discussion | Mostly code | Mostly code |
| Questions asked | When needed | Frequently | Rarely | Rarely |
| Decision making | Balanced | Presents options | Makes defaults | Makes defaults |
| Best for | General use | Exploration | High volume | Execution |

## Configuration

Default mode behavior is defined in `.claude/modes/default.md`. You can customize:

- Response verbosity
- Comment density
- When to ask questions
- Output formatting

## Related Modes

- **Brainstorm Mode**: Use when you need more exploration
- **Implementation Mode**: Use when you need less discussion
- **Token-Efficient Mode**: Use when you need faster responses

## Related Documentation

- [Modes Overview](/claudekit/modes/overview)
- [Commands Reference](/claudekit/commands/overview)
- [Switching Modes](/claudekit/guides/workflow)
