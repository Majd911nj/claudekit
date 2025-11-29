---
title: Brainstorm Mode
description: Creative exploration mode for design and ideation
---

# Brainstorm Mode

## Overview

Brainstorm mode optimizes for creative exploration, divergent thinking, and design discussions. It emphasizes asking questions, presenting alternatives, and thoroughly exploring possibilities before committing to solutions.

Use this mode when the path forward isn't clear and you need to explore the problem space.

## When to Use

Brainstorm mode is ideal for:

- **Initial feature exploration** - Understanding requirements and possibilities
- **Architecture decisions** - Evaluating different structural approaches
- **Problem definition** - Clarifying what you're actually trying to solve
- **Design sessions** - Creating mockups, APIs, data models
- **When stuck** - Getting unstuck by exploring new angles

## Behavior Changes

### Communication Style

**Question-first approach:**
- Ask clarifying questions before concluding
- Present multiple alternatives with trade-offs
- Explore edge cases verbally
- Use "what if" scenarios to probe possibilities

**Example:**
```
Before we implement authentication, I have some questions to help
us choose the best approach:

1. User base: Are you expecting 100 users or 100,000?
2. Auth methods: Just email/password, or OAuth (Google, GitHub)?
3. Sessions: Stateful server sessions or stateless JWT?
4. MFA: Is two-factor authentication needed now or later?
5. Password reset: Email-based reset flow needed?

Based on your answers, I can recommend the most suitable approach.
```

### Problem-Solving Approach

- **Divergent thinking first** - Generate many options before narrowing
- **Delay convergence** - Don't jump to solutions immediately
- **Question assumptions** - Challenge requirements to find better solutions
- **Map trade-offs explicitly** - Show pros/cons of each option

### Output Format

- Structured comparisons and decision matrices
- Pro/con lists for alternatives
- Visual diagrams (ASCII art, Mermaid)
- Open questions sections
- Recommendation with reasoning

## Examples

### Feature Design

**Request:**
```bash
/brainstorm "notification system"
```

**Brainstorm Mode Response:**
```markdown
Let me explore different approaches for a notification system.

## Clarifying Questions

Before we design this, I need to understand:

1. **Delivery channels**: Email only, or also push/SMS/in-app?
2. **Volume**: How many notifications per day/user?
3. **Real-time needs**: Must they arrive instantly or is eventual delivery OK?
4. **User preferences**: Can users customize what notifications they receive?
5. **Priority levels**: Do some notifications need to override "do not disturb"?

## Architectural Options

### Option A: Simple Database Polling
```
User requests → API checks DB → Returns unread notifications
```
**Pros:**
- Simple to implement
- No infrastructure complexity
- Easy to debug

**Cons:**
- Not real-time
- Doesn't scale to high volumes
- Inefficient for many concurrent users

**Best for:** Low volume, non-real-time needs

---

### Option B: Queue-Based System
```
Event → Queue → Worker → Notification Service → User
```
**Pros:**
- Handles high volume
- Retries on failure
- Decoupled components

**Cons:**
- More infrastructure (queue system)
- Higher complexity
- Delayed delivery possible

**Best for:** High volume, reliability critical

---

### Option C: WebSocket Real-Time
```
Event → Notification Service → WebSocket → User
```
**Pros:**
- Instant delivery
- Great UX
- Efficient for active users

**Cons:**
- Complex client code
- Requires persistent connections
- More server resources

**Best for:** Real-time requirements, active users

---

## Hybrid Recommendation

For most applications, I'd suggest **combining approaches**:

1. **WebSocket** for users actively online (instant)
2. **Queue-based** for background processing (reliable)
3. **Database polling** as fallback (simple)

This gives you:
- Real-time when possible
- Reliability when needed
- Simplicity as baseline

## Trade-off Matrix

| Requirement | Option A | Option B | Option C | Hybrid |
|-------------|----------|----------|----------|--------|
| Real-time | ❌ | ⚠️ | ✅ | ✅ |
| High volume | ❌ | ✅ | ⚠️ | ✅ |
| Simplicity | ✅ | ❌ | ❌ | ⚠️ |
| Reliability | ⚠️ | ✅ | ⚠️ | ✅ |
| Cost | $ | $$ | $$$ | $$ |

## Next Steps

Which approach resonates with your needs? Or should we explore:
- Notification content templates?
- User preference management?
- Delivery failure handling?
- Analytics and tracking?
```

### API Design

**Request:**
```bash
/brainstorm "REST API for blog posts"
```

**Brainstorm Mode Response:**
```markdown
Let's design the blog post API. A few questions first:

**Access control:**
- Public read access, or authentication required?
- Who can create/edit/delete posts?

**Features:**
- Just CRUD, or also drafts/publishing workflow?
- Comments on posts?
- Tags/categories?

## Design Options

### Option 1: Simple RESTful
```
GET    /posts           # List all posts
GET    /posts/:id       # Get single post
POST   /posts           # Create post
PUT    /posts/:id       # Update post
DELETE /posts/:id       # Delete post
```

**Pros:**
- Standard REST conventions
- Easy to understand
- Widely supported

**Cons:**
- No draft/publish workflow
- Limited filtering

---

### Option 2: Rich Resource Model
```
GET    /posts?status=published&tag=tech
GET    /posts/:id
POST   /posts
PATCH  /posts/:id
DELETE /posts/:id
POST   /posts/:id/publish
POST   /posts/:id/unpublish
GET    /posts/:id/revisions
```

**Pros:**
- Supports workflow
- Rich filtering
- Version history

**Cons:**
- More complex
- More endpoints to maintain

---

### Option 3: GraphQL Alternative
```
query {
  posts(status: PUBLISHED, tag: "tech") {
    id, title, content, author { name }
  }
}

mutation {
  createPost(input: {...}) { id }
  publishPost(id: "123") { publishedAt }
}
```

**Pros:**
- Flexible querying
- No over-fetching
- Strong typing

**Cons:**
- Different paradigm
- More upfront setup
- Caching more complex

## Recommendation

For a blog, I'd suggest **Option 2** (Rich REST) because:

1. **Workflow support** - Drafts vs published is common need
2. **Filtering** - Users expect to filter by tag/category
3. **Familiarity** - REST is well-understood
4. **Incremental** - Can start simple and add endpoints

## Sample Implementation

Would you like me to:
1. Implement Option 2?
2. Explore the data model?
3. Design the authentication layer?
4. Something else?
```

### Problem Definition

**Request:**
```bash
/brainstorm "users complain app is slow"
```

**Brainstorm Mode Response:**
```markdown
Let's break down this performance issue systematically.

## Clarifying Questions

To narrow down the problem:

**When:**
- Slow all the time or at specific times?
- Started recently or always been slow?
- After a specific deployment?

**Where:**
- Which pages/features feel slow?
- Mobile app, web app, or both?
- Specific user segments affected?

**What:**
- What feels slow: page load, interactions, or data fetching?
- Error messages shown?
- How slow (seconds)?

## Potential Root Causes

### 1. Frontend Performance
- Large JavaScript bundles
- Unoptimized images
- Too many network requests
- No caching strategy

### 2. Backend Performance
- Slow database queries (N+1 problems)
- No pagination on large datasets
- Blocking API calls
- Memory leaks

### 3. Network Issues
- Large payload sizes
- No CDN usage
- Poor geographical distribution
- HTTP/1.1 instead of HTTP/2

### 4. Scaling Issues
- Single server under load
- Database connection pool exhausted
- No caching layer
- Synchronous processing

## Investigation Approaches

### Approach A: User-Centric
1. Identify most common user flows
2. Measure each step with timing
3. Find slowest step
4. Optimize that first

**Best for:** Clear user complaints about specific features

---

### Approach B: Data-Driven
1. Add performance monitoring (New Relic, DataDog)
2. Collect metrics for 24 hours
3. Analyze slow transactions
4. Prioritize by frequency × impact

**Best for:** Unclear where slowness occurs

---

### Approach C: Bottom-Up Audit
1. Profile database queries
2. Check API response times
3. Analyze bundle sizes
4. Review server metrics

**Best for:** Suspected technical debt

## Quick Wins to Try First

Before deep investigation:

1. **Enable caching**
   - Browser caching headers
   - CDN for static assets
   - Redis for API responses

2. **Optimize queries**
   - Add indexes for common queries
   - Implement pagination
   - Use query explain plans

3. **Reduce payload**
   - Compress responses (gzip)
   - Remove unused fields
   - Lazy load images

## My Recommendation

I'd suggest a **hybrid approach**:

1. Add basic performance monitoring (1 hour)
2. Measure top 3 user flows (2 hours)
3. Quick win optimizations (4 hours)
4. Review data and decide next steps

This gives you:
- Quick improvements for users
- Data to make informed decisions
- Foundation for ongoing monitoring

What additional context can you share to help narrow this down?
```

## Tips for Using Brainstorm Mode

### Get the Most Value

1. **Start with brainstorm, end with implementation**
   ```bash
   /mode brainstorm
   /brainstorm "authentication approach"
   # Make decisions based on exploration

   /mode implementation
   /feature "implement OAuth2 with JWT"
   # Execute the chosen approach
   ```

2. **Use for unfamiliar territory**
   - New technologies
   - Complex domains
   - Architecture decisions

3. **Share context progressively**
   - Answer questions one by one
   - Add constraints as you think of them
   - Claude will refine recommendations

### When to Switch Out

Switch from brainstorm mode when:
- You've made your decision
- Alternatives are clear
- Ready to implement
- Need faster responses

### Combining with Other Modes

```bash
# Brainstorm architecture, then research deeply
/brainstorm --mode=brainstorm "microservices vs monolith"
/research --mode=deep-research "microservices implementation patterns"

# Brainstorm design, then implement efficiently
/brainstorm --mode=brainstorm "database schema"
/feature --mode=implementation "create schema from design"
```

## Interactive Brainstorming

For interactive sessions with follow-up questions:

```bash
/brainstorm "feature name"
```

Claude will ask one question at a time, validate your response, and progressively refine the exploration.

## Mode Activation

```bash
# Session-wide brainstorm mode
/mode brainstorm

# Single command with brainstorm
/plan --mode=brainstorm "complex feature"
/feature --mode=brainstorm "new system"
```

## Comparison with Other Modes

| Aspect | Brainstorm | Default | Deep Research |
|--------|------------|---------|---------------|
| Questions asked | Many | Some | Some |
| Alternatives shown | Always | Sometimes | Multiple with evidence |
| Decision timing | Delayed | Normal | After thorough analysis |
| Code output | Minimal | Balanced | Minimal |
| Best for | Design | Implementation | Investigation |

## Configuration

Brainstorm mode can be customized in `.claude/modes/brainstorm.md`:

- Number of alternatives to show
- Question verbosity
- When to converge on solution
- Output format preferences

## Related Modes

- **Deep Research Mode**: For evidence-based exploration
- **Default Mode**: For balanced exploration + implementation
- **Review Mode**: For critical analysis of existing designs

## Related Documentation

- [Modes Overview](/claudekit/modes/overview)
- [Planning Workflow](/claudekit/guides/planning)
- [Decision Making](/claudekit/guides/decisions)
