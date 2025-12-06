---
title: Command Integration
description: How MCP servers enhance Claude Kit commands and modes.
---

# Command Integration

MCP servers are automatically used by Claude Kit commands and modes. This guide shows which servers enhance each command and how they work together.

## Commands + MCP Servers

### Development Commands

| Command | MCP Servers | Enhancement |
|---------|-------------|-------------|
| `/feature` | Context7, Sequential, Memory, Filesystem, Playwright | Full development workflow with docs, planning, persistence |
| `/fix` | Sequential, Memory, Playwright, Context7, Filesystem | Systematic debugging with browser testing |
| `/test` | Playwright, Filesystem, Context7, Memory | E2E tests, file management, testing patterns |
| `/review` | Playwright, Memory, Sequential, Filesystem | Visual review, consistent standards |

### Planning Commands

| Command | MCP Servers | Enhancement |
|---------|-------------|-------------|
| `/plan` | Sequential, Memory, Context7, Filesystem | Structured breakdown, persistent decisions |
| `/brainstorm` | Sequential, Memory, Context7 | Organized exploration, design persistence |
| `/research` | Context7, Sequential, Memory | Real-time docs, thorough analysis |

### Utility Commands

| Command | MCP Servers | Enhancement |
|---------|-------------|-------------|
| `/index` | Filesystem, Memory | Project scanning, structure persistence |

## Modes + MCP Servers

| Mode | Primary MCP | Best For |
|------|-------------|----------|
| **brainstorm** | Sequential + Memory | Design sessions with persistent ideas |
| **deep-research** | Sequential + Context7 | Thorough technical investigation |
| **implementation** | Filesystem + Context7 | Focused coding with accurate docs |
| **review** | Playwright + Memory | UI review with consistent standards |
| **orchestration** | All 5 | Complex multi-step parallel work |

## Example Workflows

### Full Feature Development

```bash
/feature Add user profile with avatar upload
```

**MCP Flow:**
1. **Context7** — Fetches React file upload documentation
2. **Sequential** — Plans component structure step-by-step
3. **Memory** — Recalls UI patterns from previous features
4. **Filesystem** — Creates files in correct locations
5. **Playwright** — Tests upload flow in browser

### Complex Debugging

```bash
/fix Authentication fails intermittently on mobile
```

**MCP Flow:**
1. **Memory** — Recalls auth architecture from previous sessions
2. **Sequential** — Analyzes race conditions systematically
3. **Playwright** — Tests on mobile device emulation
4. **Context7** — Checks session handling best practices

### Research & Planning

```bash
/research --mode=deep-research JWT vs Session authentication
```

**MCP Flow:**
1. **Sequential** — Structures comparison step-by-step
2. **Context7** — Fetches current JWT and session library docs
3. **Memory** — Stores findings for future reference

### Project Indexing

```bash
/index
```

**MCP Flow:**
1. **Filesystem** — Scans project with `directory_tree`
2. **Memory** — Stores structure as knowledge graph

## Server Synergy

### Context7 + Memory

**Pattern:** Research → Store → Recall

```
Session 1: /research React Server Components
→ Context7 fetches RSC documentation
→ Memory stores key patterns

Session 2: /feature Add data fetching
→ Memory recalls RSC patterns
→ Implementation uses correct approach
```

### Sequential + Memory

**Pattern:** Analyze → Decide → Remember

```
/brainstorm Database migration strategy
→ Sequential explores options step-by-step
→ Memory stores final decision
→ Future sessions recall the decision
```

### Playwright + Context7

**Pattern:** Test → Verify → Document

```
/test E2E checkout flow
→ Playwright automates browser testing
→ Context7 provides testing library docs
→ Tests use correct assertions
```

### Filesystem + Memory

**Pattern:** Scan → Store → Navigate

```
/index
→ Filesystem scans project structure
→ Memory creates project knowledge graph
→ Future commands know where files are
```

## Configuration Tips

### Platform Note

Configuration differs by platform:
- **Linux/macOS**: Use `"command": "npx"` directly
- **Windows**: Use `"command": "cmd"` with `"/c", "npx"` in args

Examples below show Linux/macOS syntax. For Windows, see [MCP Overview](/claudekit/mcp/overview/).

### Minimal Setup

For basic usage, Context7 and Sequential are most impactful:

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    },
    "sequential": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
    }
  }
}
```

### Full Setup

For complete Claude Kit integration, use all 5 servers:

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    },
    "sequential": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp"]
    },
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "."]
    }
  }
}
```

## Performance Notes

### First Run

First run downloads npm packages (one-time). Subsequent starts are faster.

### Startup Order

Servers start in parallel. All should be ready within seconds.

### Resource Usage

Each server runs as a separate process. Total overhead is minimal but consider disabling unused servers for resource-constrained environments.

## Next Steps

- [MCP Overview](/claudekit/mcp/overview/) — Setup and configuration
- [Commands Overview](/claudekit/commands/overview/) — All available commands
- [Modes Overview](/claudekit/modes/overview/) — Behavioral modes
