---
title: Creating Custom Modes
description: Learn how to create custom behavioral modes for different work contexts.
---

# Creating Custom Modes

Modes change how Claude behaves, thinks, and communicates. This guide shows you how to create custom modes for your specific work contexts.

## What Are Modes?

Modes are behavioral configurations that adjust:

- **Communication style** — Verbose vs. concise, formal vs. casual
- **Problem-solving approach** — Exploratory vs. direct, sequential vs. parallel
- **Output format** — Detailed explanations vs. code-only, structured vs. free-form

Think of modes as "personality presets" for different types of work.

## Mode File Structure

Modes are markdown files in `.claude/modes/`:

```
.claude/modes/
├── your-mode.md           # /mode your-mode
├── pair-programming.md    # /mode pair-programming
└── emergency-debug.md     # /mode emergency-debug
```

The filename (without `.md`) becomes the mode name.

## Mode Template

Here's the complete template for a mode file:

```markdown
# Mode Name

## Description

Brief description of what this mode does and when to use it.

## When to Use

- Scenario 1
- Scenario 2
- Scenario 3

---

## Behavior

### Communication
- How to communicate in this mode
- What tone to use
- Level of verbosity

### Problem Solving
- How to approach problems
- What to prioritize
- What to avoid

### Output Format
- What format to use for responses
- How to structure information
- What to include/exclude

---

## Activation

\`\`\`
Use mode: mode-name
\`\`\`

Or use command flag:
\`\`\`
/command --mode=mode-name [args]
\`\`\`

---

## Example Behaviors

### Before [Action]
\`\`\`
Example of behavior in this mode
\`\`\`

### [Another Scenario]
\`\`\`
Example of different behavior
\`\`\`

---

## Combines Well With

- Related commands or modes
- Complementary workflows
```

## Mode Anatomy

### 1. Header and Description

```markdown
# Pair Programming Mode

## Description

Interactive development mode that simulates pair programming with
continuous feedback, explanations, and collaborative problem-solving.

## When to Use

- Learning new codebase or technology
- Working through complex problems
- When you want to understand the "why" behind decisions
- Teaching or mentoring scenarios
```

Define:

- Mode name (clear and descriptive)
- What it does (2-3 sentences)
- When to activate it

### 2. Behavior Section

```markdown
## Behavior

### Communication
- Explain reasoning behind every decision
- Ask clarifying questions before implementing
- Use "we" language (collaborative tone)
- Provide alternatives when multiple approaches exist

### Problem Solving
- Think out loud while working
- Break down complex problems step-by-step
- Suggest improvements to existing code
- Point out potential issues before they become problems

### Output Format
- Show code with inline explanations
- Include "why" comments
- Provide learning opportunities
- Offer refactoring suggestions
```

This is the core of the mode — it tells Claude HOW to behave.

### 3. Activation Instructions

```markdown
## Activation

\`\`\`
Use mode: pair-programming
\`\`\`

Or use command flag:
\`\`\`
/feature --mode=pair-programming "add user auth"
/fix --mode=pair-programming "bug in payment"
\`\`\`
```

Show both ways to activate the mode.

### 4. Example Behaviors

```markdown
## Example Behaviors

### Before Writing Code
\`\`\`
Let me explain my approach before we code:

1. We'll add authentication middleware to the router
2. This will check for a valid JWT token
3. We should also handle token expiration

Does this approach make sense? Any concerns?
\`\`\`

### During Implementation
\`\`\`typescript
// Let's add the auth middleware
// We're using JWT because it's stateless and scales well
export const authMiddleware = async (req, res, next) => {
  // First, we extract the token from the Authorization header
  const token = req.headers.authorization?.split(' ')[1];

  // We should validate it exists before proceeding
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // Now let's verify it...
  // What error handling do you prefer here?
\`\`\`
\`\`\`
```

Provide concrete examples of how the mode changes behavior.

### 5. Integration Suggestions

```markdown
## Combines Well With

- `/feature` command — Collaborative feature development
- `/refactor` command — Understanding refactoring decisions
- `deep-research` mode — When learning requires research
```

Suggest complementary commands and modes.

## Complete Example: Emergency Debug Mode

Here's a real-world example:

```markdown
# Emergency Debug Mode

## Description

Fast, focused debugging mode for production issues. Prioritizes speed,
minimal output, and getting systems operational over perfect solutions.

## When to Use

- Production is down
- Critical bug affecting users
- Time-sensitive issues
- Emergency hotfixes
- When you need to ship a fix NOW

---

## Behavior

### Communication
- No pleasantries or explanations
- Direct commands and code only
- Skip "why" unless asked
- Use short, imperative sentences

### Problem Solving
- Jump straight to most likely cause
- Apply quick fixes over perfect solutions
- Defer refactoring to later
- Focus on symptom relief first
- Add TODO comments for proper fixes

### Output Format
- Code blocks without surrounding prose
- Bullet points over paragraphs
- Commands to run, not explanations
- Immediate actionable steps

### Speed Over Perfection
- Quick fixes are acceptable
- Technical debt is acceptable
- Tests can be added later
- Documentation can wait
- Focus: Get it working NOW

---

## Activation

\`\`\`
Use mode: emergency-debug
\`\`\`

Or use command flag:
\`\`\`
/fix --mode=emergency-debug "production API down"
/deploy --mode=emergency-debug "hotfix-123"
\`\`\`

---

## Example Behaviors

### Problem Report
**User**: "Production API returning 500 errors"

**Response**:
\`\`\`bash
# Check logs
tail -f /var/log/api/error.log

# Common causes:
1. Database connection
2. Memory leak
3. External API timeout

# Quick check:
curl -v https://api.example.com/health
\`\`\`

### Immediate Fix
\`\`\`typescript
// Quick fix: Add timeout to prevent hanging
const response = await fetch(url, {
  signal: AbortSignal.timeout(5000)  // 5s timeout
});

// TODO: Investigate why external API is slow
// TODO: Add proper retry logic
// TODO: Add monitoring for this endpoint
\`\`\`

### Deployment
\`\`\`bash
# Skip tests for emergency deploy
git add .
git commit -m "hotfix: add API timeout"
git push origin hotfix/api-timeout

# Deploy immediately
./deploy.sh production --skip-tests --force

# Monitor for errors
watch -n 2 'curl -s https://api.example.com/health'
\`\`\`

---

## Post-Emergency Checklist

After crisis is resolved, create follow-up tasks:

\`\`\`markdown
## TODO: Clean up emergency fix

- [ ] Add tests for timeout handling
- [ ] Investigate root cause of slow API
- [ ] Implement proper retry logic
- [ ] Add monitoring/alerts
- [ ] Document incident
- [ ] Schedule post-mortem
\`\`\`

---

## Combines Well With

- `/fix` command — Emergency bug fixes
- `/deploy` command — Rapid deployment
- `token-efficient` mode — Fast, minimal output
- `--format=ultra` flag — Code-only responses

---

## When NOT to Use

- Feature development
- Refactoring work
- Code review
- Learning new patterns
- Non-urgent bugs
```

## Best Practices

### 1. Define Clear Boundaries

```markdown
## When to Use
- Specific scenario A
- Specific scenario B

## When NOT to Use
- Different scenario X
- Different scenario Y
```

Help users know when to activate the mode.

### 2. Show Behavior Changes with Examples

```markdown
## Example Behaviors

### Standard Mode
\`\`\`
Let me implement the user authentication feature. First, I'll
explain the architecture I'm proposing...
\`\`\`

### This Mode
\`\`\`typescript
// Auth middleware
export const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send();
  // ...
}
\`\`\`
```

Contrast with default behavior to show the difference.

### 3. Be Specific About Communication Style

```markdown
### Communication
- Use active voice: "Run this command" not "You could run this command"
- No hedging: "This fixes it" not "This should probably fix it"
- Short sentences: Average 10 words
- No adjectives unless critical
```

Precise instructions produce consistent behavior.

### 4. Address Multiple Dimensions

Cover all three behavioral dimensions:

```markdown
### Communication
[How to talk]

### Problem Solving
[How to think]

### Output Format
[How to structure responses]
```

### 5. Provide Output Format Examples

```markdown
### Output Format

\`\`\`markdown
## Problem: [Issue]

### Root Cause
[One sentence]

### Fix
\`\`\`[code]\`\`\`

### Test
\`\`\`[command]\`\`\`
\`\`\`
```

## Common Mode Patterns

### Pattern 1: Verbosity Spectrum

```markdown
# Ultra-Verbose Mode

### Communication
- Explain every decision in detail
- Provide historical context
- Include multiple examples
- Add learning resources

# Ultra-Concise Mode

### Communication
- Code only, no prose
- One-line comments max
- Assume expert knowledge
- Skip obvious steps
```

### Pattern 2: Interaction Style

```markdown
# Interactive Mode

### Communication
- Ask questions before proceeding
- Validate each step
- Present options for user choice
- Collaborative decision-making

# Autonomous Mode

### Communication
- Make decisions independently
- Move through phases without stopping
- Report results at end
- Minimal back-and-forth
```

### Pattern 3: Focus Area

```markdown
# Security-First Mode

### Problem Solving
- Security is top priority
- Flag any potential vulnerability
- Suggest secure alternatives
- Reference OWASP guidelines

# Performance-First Mode

### Problem Solving
- Optimize for speed
- Minimize resource usage
- Benchmark all changes
- Profile before/after
```

### Pattern 4: Workflow Style

```markdown
# Exploratory Mode

### Problem Solving
- Generate multiple alternatives
- Discuss trade-offs
- Delay final decisions
- Map solution space

# Execution Mode

### Problem Solving
- Follow established patterns
- Use proven solutions
- Move quickly to implementation
- Avoid bikeshedding
```

## Advanced Mode Features

### Combining Modes

Modes can reference other modes:

```markdown
# Deep Security Audit Mode

Combines:
- `security-first` mode — Security focus
- `deep-research` mode — Thorough analysis
- `review` mode — Critical perspective

With modifications:
- Even more thorough than base modes
- Document every finding
- Include remediation steps
```

### Conditional Behavior

```markdown
### Problem Solving

**If problem is well-defined:**
- Jump straight to solution
- Implement immediately

**If problem is vague:**
- Ask clarifying questions
- Propose multiple approaches
- Wait for direction
```

### Time-Based Behavior

```markdown
### Communication

**First message:**
- Explain mode activation
- Set expectations
- Confirm approach

**Subsequent messages:**
- Follow mode strictly
- Minimal meta-commentary
```

## Testing Your Mode

After creating a mode, test it:

1. **Activate it**: `/mode your-mode`
2. **Try various commands**: `/feature`, `/fix`, `/review`
3. **Verify behavior changes**: Check communication style, output format
4. **Test edge cases**: Complex problems, simple problems
5. **Compare to default**: Is the difference clear?

## Common Use Cases

### Documentation Mode

```markdown
# Documentation Mode

## When to Use
- Writing docs
- Explaining code
- Creating tutorials

### Communication
- Clear, simple language
- Define all terms
- Assume beginner audience
- Include examples for everything
```

### Code Review Mode

```markdown
# Code Review Mode

## When to Use
- Reviewing PRs
- Security audits
- Quality checks

### Problem Solving
- Critical analysis
- Look for issues
- Suggest improvements
- Flag anti-patterns
```

### Teaching Mode

```markdown
# Teaching Mode

## When to Use
- Learning new tech
- Understanding patterns
- Mentoring

### Communication
- Explain "why" not just "how"
- Provide context
- Use analogies
- Check understanding
```

## Next Steps

- [Create Custom Commands](/claudekit/customization/creating-commands/) — Build workflow automation
- [Create Custom Skills](/claudekit/customization/creating-skills/) — Add knowledge modules
- [Configure CLAUDE.md](/claudekit/customization/claude-md/) — Set project standards

## Examples to Study

Check these built-in modes for inspiration:

- `brainstorm` — Exploratory, question-driven
- `token-efficient` — Minimal output for cost savings
- `deep-research` — Thorough analysis with citations
- `implementation` — Code-focused execution
