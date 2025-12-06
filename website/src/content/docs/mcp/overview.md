---
title: MCP Integrations
description: Extend Claude Kit with Model Context Protocol servers for enhanced capabilities.
---

# MCP Integrations

Model Context Protocol (MCP) servers extend Claude Kit with powerful capabilities like real-time documentation, persistent memory, and browser automation.

## What is MCP?

MCP (Model Context Protocol) is an open standard that allows AI assistants to connect with external tools and data sources. Claude Kit includes pre-configured MCP servers that enhance your development workflow.

## Available Servers

| Server | Package | Purpose |
|--------|---------|---------|
| **Context7** | `@upstash/context7-mcp` | Real-time library documentation |
| **Sequential** | `@modelcontextprotocol/server-sequential-thinking` | Structured problem-solving |
| **Playwright** | `@playwright/mcp` | Browser automation |
| **Memory** | `@modelcontextprotocol/server-memory` | Persistent knowledge graph |
| **Filesystem** | `@modelcontextprotocol/server-filesystem` | Secure file operations |

## Quick Setup

### 1. Create Configuration

Create a `.mcp.json` file in your project root. Choose your platform:

#### Linux / macOS

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

#### Windows

Windows requires the `cmd /c` wrapper:

```json
{
  "mcpServers": {
    "context7": {
      "command": "cmd",
      "args": ["/c", "npx", "-y", "@upstash/context7-mcp"]
    },
    "sequential": {
      "command": "cmd",
      "args": ["/c", "npx", "-y", "@modelcontextprotocol/server-sequential-thinking"]
    },
    "playwright": {
      "command": "cmd",
      "args": ["/c", "npx", "-y", "@playwright/mcp"]
    },
    "memory": {
      "command": "cmd",
      "args": ["/c", "npx", "-y", "@modelcontextprotocol/server-memory"]
    },
    "filesystem": {
      "command": "cmd",
      "args": ["/c", "npx", "-y", "@modelcontextprotocol/server-filesystem", "."]
    }
  }
}
```

### 2. Prerequisites

- Node.js 18+
- npx available in PATH

### 3. Verify Installation

Start a new Claude Code session. MCP servers will load automatically. Test with:

```
Ask Claude about React hooks using Context7
```

## Benefits

### Real-Time Documentation
Context7 fetches current library documentation, eliminating outdated API references from training data.

### Structured Reasoning
Sequential Thinking enables step-by-step analysis with confidence tracking for complex debugging and planning.

### Browser Testing
Playwright provides cross-browser automation for E2E testing without separate test infrastructure.

### Persistent Context
Memory server maintains knowledge across sessions, remembering your patterns and preferences.

### Safe File Operations
Filesystem server provides controlled file access with security boundaries.

## How It Works

MCP servers are **automatically used** when configured. Claude Kit commands and modes include explicit guidance for optimal MCP usage.

For example, when you run `/research react hooks`:
1. Context7 fetches current React documentation
2. Sequential Thinking structures the analysis
3. Memory stores findings for future reference

## Next Steps

- [Context7](/claudekit/mcp/context7/) — Library documentation lookup
- [Sequential Thinking](/claudekit/mcp/sequential/) — Structured reasoning
- [Playwright](/claudekit/mcp/playwright/) — Browser automation
- [Memory](/claudekit/mcp/memory/) — Persistent knowledge
- [Filesystem](/claudekit/mcp/filesystem/) — File operations
- [Command Integration](/claudekit/mcp/integration/) — How MCP enhances commands
