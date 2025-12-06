---
title: Context7
description: Real-time library documentation lookup with Context7 MCP server.
---

# Context7

Context7 provides up-to-date documentation for libraries and frameworks, ensuring Claude has accurate API references instead of outdated training data.

## Configuration

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    }
  }
}
```

## Available Tools

### resolve-library-id

Finds the Context7-compatible library ID for documentation lookup.

**Parameters:**
- `libraryName` — Library name to search for

**Example:**
```
resolve-library-id("react")
→ Returns: "/facebook/react"
```

### get-library-docs

Fetches documentation for a specific library.

**Parameters:**
- `context7CompatibleLibraryID` — Library ID from resolve-library-id
- `topic` (optional) — Focus area (e.g., "hooks", "routing")
- `mode` — `code` for API references, `info` for concepts
- `page` — Pagination (1-10)

**Example:**
```
get-library-docs("/facebook/react", topic="hooks", mode="code")
→ Returns: Current React hooks documentation with examples
```

## Use Cases

### Research Libraries

```
/research Next.js App Router
```
Context7 fetches current Next.js documentation for accurate analysis.

### Feature Development

```
/feature Add authentication with NextAuth
```
Context7 provides current NextAuth API for correct implementation.

### Debugging Library Issues

```
/fix "useEffect cleanup not working"
```
Context7 retrieves correct useEffect patterns from React docs.

## Command Integration

| Command | How Context7 Helps |
|---------|-------------------|
| `/feature` | Accurate library APIs for implementation |
| `/research` | Current documentation for analysis |
| `/fix` | Correct patterns for debugging library issues |
| `/plan` | Accurate estimates based on real API complexity |

## Best Practices

### Specify Topics

For focused results, use the `topic` parameter:
```
get-library-docs("/vercel/next.js", topic="app-router")
```

### Use Correct Mode

- `mode="code"` — API references, code examples
- `mode="info"` — Conceptual guides, architecture

### Handle Pagination

If context is insufficient, try additional pages:
```
get-library-docs(..., page=2)
```

## Troubleshooting

### Library Not Found

If `resolve-library-id` returns no results:
- Check spelling
- Try alternative names (e.g., "nextjs" vs "next.js")
- Some libraries may not be indexed

### Outdated Results

Context7 indexes popular libraries. Less common libraries may have delayed updates.

## Resources

- [Context7 Documentation](https://context7.com)
- [Upstash Context7 MCP](https://github.com/upstash/context7-mcp)
