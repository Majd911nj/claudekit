---
title: /research
description: Research technologies, libraries, or approaches with comprehensive analysis
---

# /research

Research a technology, library, or approach with comprehensive analysis, comparisons, and recommendations.

## Purpose

The `/research` command helps you make informed technology decisions by gathering information, analyzing trade-offs, comparing alternatives, and providing clear recommendations.

## Usage

```bash
/research [topic or technology]
```

## Arguments

- **topic**: The technology, library, pattern, or approach you want to research

## How It Works

### 1. Gather Information

The assistant collects information from:
- Official documentation
- Community resources and discussions
- Best practices and patterns
- Known issues and gotchas

### 2. Analyze

Thorough analysis includes:
- Pros and cons
- Performance characteristics
- Learning curve and complexity
- Ecosystem and community support
- Maintenance and longevity
- Best practices

### 3. Recommend

Clear recommendations with:
- Summary of findings
- Specific recommendation
- Rationale for recommendation
- Next steps for implementation
- Alternatives if recommendation doesn't fit

## Output Format

Research results are presented in a structured format:

```markdown
## Research: [Topic]

### Summary
[High-level overview of the technology]

### Pros
- [Advantage 1]
- [Advantage 2]
- [Advantage 3]

### Cons
- [Limitation 1]
- [Limitation 2]

### Use Cases
- Best for: [Scenarios]
- Avoid when: [Scenarios]

### Alternatives
[Comparison table with alternatives]

### Best Practices
- [Practice 1]
- [Practice 2]

### Recommendation
[Clear recommendation with rationale]

### Next Steps
1. [Action item 1]
2. [Action item 2]
```

## Flags

| Flag | Description | Example |
|------|-------------|---------|
| `--mode=[mode]` | Use specific behavioral mode | `--mode=deep-research` |
| `--depth=[1-5]` | Research thoroughness level | `--depth=5` |
| `--format=[fmt]` | Output format (concise/detailed/json) | `--format=detailed` |
| `--save=[path]` | Save research to file | `--save=docs/research.md` |
| `--compare` | Focus on comparing alternatives | `--compare` |
| `--sequential` | Use sequential thinking methodology | `--sequential` |

### Depth Levels

| Level | Behavior | Best For |
|-------|----------|----------|
| 1 | Quick overview, key points only | Quick validation |
| 2 | Standard analysis | General research |
| 3 | Thorough with examples | Technology evaluation |
| 4 | Comprehensive with trade-offs | Important decisions |
| 5 | Exhaustive with citations | Critical architecture choices |

## Examples

### Basic Technology Research

```bash
/research "Redis for session storage"
```

Standard research on using Redis for sessions.

### Deep Technology Comparison

```bash
/research --compare "React vs Vue vs Svelte"
```

Comprehensive comparison of frontend frameworks with trade-off analysis.

### Thorough Investigation

```bash
/research --depth=5 "authentication libraries for Node.js"
```

Exhaustive research with detailed analysis and citations.

### Sequential Problem Solving

```bash
/research --sequential "root cause of memory leak"
```

Uses step-by-step sequential thinking for complex debugging.

### Save Research Results

```bash
/research --save=docs/orm-research.md "TypeORM vs Prisma vs Drizzle"
```

Researches ORM options and saves results to file.

### Quick Overview

```bash
/research --depth=1 "GraphQL subscriptions"
```

Quick overview for validation without deep analysis.

### Deep Research Mode

```bash
/research --mode=deep-research "distributed tracing approaches"
```

Uses deep-research mode for thorough analysis with citations.

## Research Types

### Technology Selection

Compare libraries, frameworks, or tools:
```bash
/research --compare "state management libraries for React"
```

### Pattern Exploration

Research design patterns and architectures:
```bash
/research "event sourcing patterns"
```

### Best Practices

Investigate recommended approaches:
```bash
/research "API versioning strategies"
```

### Problem Investigation

Debug or understand complex issues:
```bash
/research --sequential "solving N+1 query problems"
```

### Integration Research

Research how to integrate technologies:
```bash
/research "integrating Next.js with Strapi CMS"
```

## Workflow Integration

### Research → Brainstorm → Plan

1. **Research options:**
   ```bash
   /research --compare "authentication approaches"
   ```

2. **Design solution:**
   ```bash
   /brainstorm "authentication system design"
   ```

3. **Plan implementation:**
   ```bash
   /plan --detailed "implement chosen auth approach"
   ```

### Research → Direct Implementation

For simple integrations:
```bash
# Research the library
/research "Stripe payment integration"

# Implement directly
/feature "integrate Stripe payments"
```

### Pre-Planning Research

Before creating detailed plans:
```bash
# Research unfamiliar technology
/research --depth=4 "WebSocket scaling strategies"

# Plan with research insights
/plan "implement scalable WebSocket server"
```

## Best Practices

### Be Specific

```bash
# Too vague
/research "databases"

# Better
/research "time-series databases for IoT data"

# Even better
/research --compare "InfluxDB vs TimescaleDB vs QuestDB for IoT sensor data"
```

### Include Context

```bash
/research "caching strategies for a high-traffic API with 100k+ requests/minute"
```

### State Constraints

```bash
/research "frontend frameworks compatible with SSR and supporting TypeScript"
```

### Save Important Research

```bash
/research --save=docs/decisions/cache-strategy.md --depth=5 "caching architecture"
```

### Use Appropriate Depth

- **Depth 1-2**: Validation, quick checks
- **Depth 3**: Standard technology evaluation
- **Depth 4-5**: Critical architecture decisions

## When to Use

**Good use cases:**
- Evaluating technology options
- Understanding new libraries or frameworks
- Investigating architectural patterns
- Comparing competing solutions
- Debugging complex issues
- Learning best practices

**Less useful for:**
- Technologies you're already familiar with
- Simple implementation questions
- Project-specific code (use `/review` instead)

## Tips for Better Research

1. **Be specific** about your use case and constraints
2. **Include scale** if performance matters (users, requests, data size)
3. **Mention existing stack** for compatibility analysis
4. **State priorities** (speed vs reliability vs cost)
5. **Ask for comparisons** when evaluating options
6. **Use --sequential** for complex debugging or investigations
7. **Save research** for future reference and team sharing

## Related Commands

- [/brainstorm](/claudekit/commands/brainstorm) - Design solutions after research
- [/plan](/claudekit/commands/plan) - Plan implementation after research
- [/review](/claudekit/commands/review) - Review existing code or implementations
- [/compare](/claudekit/commands/compare) - Side-by-side comparison (alternative)

## Customization

Research behavior can be customized via `CLAUDE.md`:
- Default depth level
- Output format preferences
- Comparison criteria
- Citation requirements

See the [Configuration Guide](/claudekit/configuration) for details.
