---
title: Brainstorming
description: Interactive design refinement through collaborative dialogue
---

The Brainstorming skill transforms rough ideas into fully-formed designs through structured questioning and incremental validation.

## Overview

Brainstorming is an interactive design methodology that uses sequential questioning to clarify requirements, explore alternatives, and validate design decisions before implementation begins.

**Core Principle**: One question at a time produces better designs than dumping everything at once.

## When to Use

Use brainstorming for:

- Designing new features with unclear requirements
- Exploring architecture decisions
- Refining user requirements
- Breaking down complex problems
- When multiple valid approaches exist

## When NOT to Use

Skip brainstorming for:

- Clear "mechanical" processes with known implementation
- Simple bug fixes with obvious solutions
- Tasks with explicit requirements already defined

## The Three-Phase Process

### Phase 1: Understanding

**Goal**: Clarify requirements through sequential questioning.

**Rules**:
- Ask only ONE question per message
- Break complex topics into multiple questions
- Prefer multiple-choice over open-ended questions
- Wait for user response before next question

**Example**:

```
❌ BAD: "What authentication method do you want, and should we support SSO,
        and what about password requirements?"

✅ GOOD: "Which authentication method should we use?
         a) Username/password only
         b) OAuth (Google, GitHub)
         c) Both options"
```

### Phase 2: Exploration

**Goal**: Present alternatives with clear trade-offs.

**Process**:
1. Present 2-3 different approaches
2. Lead with the recommended option
3. Explain trade-offs for each
4. Let user choose direction

**Format**:

```markdown
## Approach 1: JWT-Based Auth (Recommended)
Stateless tokens stored in HTTP-only cookies.

- **Pros**: Scalable, no server-side session storage, works across services
- **Cons**: Cannot revoke tokens before expiry, larger cookie size

## Approach 2: Session-Based Auth
Server-side sessions with session IDs.

- **Pros**: Easy revocation, smaller cookie size, familiar pattern
- **Cons**: Requires session store (Redis), harder to scale horizontally

Which approach aligns better with your goals?
```

### Phase 3: Design Presentation

**Goal**: Present validated design in digestible chunks.

**Rules**:
- Break design into 200-300 word sections
- Validate incrementally after each section
- Be flexible - allow clarification or changes

**Sections to Cover**:
1. Architecture overview
2. Component breakdown
3. Data flow
4. Error handling
5. Testing considerations

## Core Principles

### YAGNI Ruthlessly

Remove unnecessary features aggressively:

- Question every "nice to have"
- Start with minimal viable design
- Add complexity only when justified
- "We might need this later" = remove it

**Example**:

```
User: "Let's add user roles, permissions, and audit logging"

Brainstorming: "Do you need all of those now, or can we start with
                basic roles and add permissions/audit later when
                you have real requirements?"
```

### One Question at a Time

Sequential questioning produces better results:

- Gives user time to think deeply
- Prevents overwhelming with choices
- Creates natural conversation flow
- Allows follow-up on unclear points

### Multiple-Choice Preference

When possible, provide structured options:

```
Instead of: "How should we handle errors?"

Ask: "How should we handle validation errors?
      a) Return 400 with error details in JSON
      b) Return 422 with field-specific errors
      c) Return 400 with generic error message"
```

Benefits:
- Reduces cognitive load
- Surfaces your understanding
- Makes decisions concrete
- Still allow "Other" option

## Output Format

After design validation, document to timestamped markdown:

```markdown
# Design: User Email Verification
Date: 2025-01-29

## Summary
Add email verification to registration flow. Users receive verification
email on signup, click link to verify, and are marked as verified in database.

## Architecture
- Verification token: JWT with 24-hour expiry
- Storage: Add `verified` boolean to User table
- Email: SendGrid API for delivery

## Components
### UserService
- `createUser()`: Create user, send verification email
- `verifyEmail()`: Validate token, mark user verified

### EmailService
- `sendVerificationEmail()`: Generate token, send email

## Data Flow
1. User registers → User created with verified=false
2. System generates JWT token with user email
3. Email sent with verification link
4. User clicks link → Token validated
5. User marked verified=true

## Error Handling
- Expired token: Return error, offer resend
- Invalid token: Return 400 error
- Already verified: Return success (idempotent)

## Testing Strategy
- Unit: Token generation, validation logic
- Integration: Full registration → verification flow
- Manual: Test email delivery in staging

## Open Questions
- Should unverified users have limited access? (Deferred to v2)
```

## Activation

### Via Command

```bash
/brainstorm "user authentication system"
/brainstorm --interactive "payment processing"
```

### Via Mode

```bash
/mode brainstorm
# Now in brainstorming mode for the session
```

### Implicit Activation

Brainstorming activates automatically when:
- `/feature` command encounters unclear requirements
- Design discussion is needed before planning
- Multiple approaches are possible

## Integration with Other Skills

### Flows to Writing Plans

After brainstorming completes:

```bash
# 1. Brainstorm the design
/brainstorm "email verification"

# 2. Convert design to implementation plan
/plan designs/email-verification.md
```

### Combines with Sequential Thinking

For complex decisions:

```bash
# Use sequential thinking during brainstorming
/brainstorm --use-skill=sequential-thinking "database architecture"
```

## Examples

### Example 1: Authentication Design

```
User: I need authentication

Claude: What type of users will authenticate?
        a) End users (customers)
        b) Administrators only
        c) Both end users and admins

User: Both

Claude: Should end users and admins use the same auth system?
        a) Yes, same system with role differentiation
        b) No, separate systems (admin has higher security)

User: Same system

Claude: Which authentication method?
        a) Email/password
        b) OAuth (Google, GitHub, etc.)
        c) Both options

User: Both

Claude: [Presents 2-3 architecture approaches with trade-offs]
```

### Example 2: API Design

```
User: Design a REST API for products

Claude: What operations do you need?
        a) Read-only (GET products, search)
        b) Full CRUD (create, read, update, delete)
        c) Read + Create only

User: Full CRUD

Claude: Who can create/update/delete products?
        a) Anyone (public API)
        b) Authenticated users
        c) Admins only

User: Admins only

Claude: [Presents API design with endpoints and auth requirements]
```

## Best Practices

### Ask Better Questions

```
❌ "What do you want?"
✅ "Should new users start with limited access or full access?"

❌ "How should this work?"
✅ "When a user clicks 'delete', should we:
   a) Delete immediately
   b) Soft delete (mark as deleted)
   c) Require confirmation first"
```

### Validate Incrementally

```
After presenting architecture:
"Does this architecture make sense so far, or should I clarify anything?"

After data flow:
"Is this the flow you envisioned, or should we adjust?"
```

### Push Back on Complexity

```
User: "Let's add caching, rate limiting, and API versioning"

Claude: "Those are all valuable features. Which one solves your
         immediate problem? We can add the others later when needed."
```

## Common Patterns

### The "Why" Question

Always understand motivation:

```
User: "Add pagination to the API"
Claude: "What problem does pagination solve for you?
         a) Performance (large datasets)
         b) UX (easier navigation)
         c) Both"
```

### The Scope Question

Define boundaries early:

```
User: "Build a notification system"
Claude: "What types of notifications?
         a) Email only
         b) Email + SMS
         c) Email + SMS + Push"
```

### The Constraint Question

Identify limitations:

```
User: "Design file upload"
Claude: "What's the maximum file size you need to support?
         a) < 10 MB (standard)
         b) 10-100 MB (medium)
         c) > 100 MB (large, needs chunking)"
```

## Next Steps

After brainstorming:

1. **Save the design**: Commit design doc to version control
2. **Create plan**: Use [Writing Plans](/claudekit/skills/methodology/writing-plans) skill
3. **Implement**: Use [Executing Plans](/claudekit/skills/methodology/executing-plans) skill
4. **Review**: Use [Code Review](/claudekit/skills/methodology/code-review) skill

## Related Skills

- [Writing Plans](/claudekit/skills/methodology/writing-plans) - Convert designs to tasks
- [Sequential Thinking](/claudekit/skills/methodology/sequential-thinking) - Deep analysis
- [Executing Plans](/claudekit/skills/methodology/executing-plans) - Implement designs
