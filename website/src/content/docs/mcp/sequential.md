---
title: Sequential Thinking
description: Structured problem-solving with step-by-step reasoning.
---

# Sequential Thinking

Sequential Thinking provides structured reasoning tools for complex problem-solving, enabling step-by-step analysis with confidence tracking and revision capabilities.

## Configuration

```json
{
  "mcpServers": {
    "sequential": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
    }
  }
}
```

## Available Tools

### sequentialthinking

Dynamic problem-solving through structured thought sequences.

**Parameters:**

| Parameter | Description |
|-----------|-------------|
| `thought` | Current thinking step |
| `thoughtNumber` | Current step number (1, 2, 3...) |
| `totalThoughts` | Estimated total steps needed |
| `nextThoughtNeeded` | Whether more steps are needed |
| `isRevision` | If this revises previous thinking |
| `revisesThought` | Which thought is being reconsidered |
| `branchFromThought` | Branching point for alternative paths |
| `needsMoreThoughts` | If more analysis is needed |

## Use Cases

### Complex Debugging

```
/fix Intermittent authentication failures
```
Sequential Thinking:
1. Defines the question clearly
2. Gathers evidence systematically
3. Forms hypotheses with probabilities
4. Tests most likely cause first
5. Documents conclusion with confidence

### Architecture Decisions

```
/brainstorm Database migration strategy
```
Sequential Thinking:
1. Explores options step-by-step
2. Tracks trade-offs for each approach
3. Revises conclusions based on feedback
4. Builds confidence incrementally

### Root Cause Analysis

```
/research Why is the build slow?
```
Sequential Thinking:
1. Breaks problem into investigation steps
2. Documents evidence at each step
3. Adjusts hypothesis as facts emerge
4. Provides confidence-scored conclusion

## Command Integration

| Command | How Sequential Thinking Helps |
|---------|------------------------------|
| `/fix` | Systematic root cause analysis |
| `/plan` | Structured task decomposition |
| `/brainstorm` | Organized design exploration |
| `/research` | Step-by-step investigation |

## Mode Integration

| Mode | Integration |
|------|-------------|
| `deep-research` | Primary tool for thorough analysis |
| `brainstorm` | Structures creative exploration |
| `review` | Systematic code examination |

## Example Workflow

### Debugging Session

**Thought 1:** Define the problem
```
"What is causing authentication to fail intermittently for some users?"
→ Confidence: N/A (question definition)
```

**Thought 2:** Gather evidence
```
"Checking logs shows failures occur during peak hours,
primarily for users with special characters in passwords."
→ Confidence: 7/10
```

**Thought 3:** Form hypothesis
```
"Hypothesis A: URL encoding issue with special characters.
Evidence: Failure pattern matches special char passwords.
Probability: 80%"
→ Confidence: 8/10
```

**Thought 4:** Test hypothesis
```
"Tested with password 'test@123' - fails.
Tested with 'test123' - works.
Hypothesis confirmed."
→ Confidence: 9/10
```

**Thought 5:** Conclusion
```
"Root cause: URL encoding mangles special characters.
Fix: Use base64 encoding instead.
Confidence: 9/10"
→ nextThoughtNeeded: false
```

## Best Practices

### Start with Clear Questions

Define what you're investigating before gathering evidence.

### Track Confidence

Explicitly state confidence levels to identify when more investigation is needed.

### Allow Revisions

Use `isRevision` and `revisesThought` to refine understanding as new information emerges.

### Branch When Needed

Use `branchFromThought` to explore alternative hypotheses without losing the main thread.

## Resources

- [MCP Sequential Thinking](https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking)
- [Sequential Thinking Skill](/claudekit/skills/methodology/sequential-thinking/)
