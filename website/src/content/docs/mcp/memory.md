---
title: Memory
description: Persistent knowledge graph for context across sessions.
---

# Memory

Memory MCP maintains a persistent knowledge graph across sessions, enabling Claude to remember decisions, patterns, and preferences over time.

## Configuration

```json
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    }
  }
}
```

## Core Concepts

### Entities

Named items in the knowledge graph (e.g., "AuthService", "UserModel").

### Observations

Facts about entities (e.g., "uses JWT tokens", "requires database").

### Relations

Connections between entities (e.g., "AuthService" → "uses" → "UserRepository").

## Available Tools

### Entity Management

| Tool | Description |
|------|-------------|
| `create_entities` | Create new entities |
| `delete_entities` | Remove entities |
| `open_nodes` | Open specific entities by name |
| `search_nodes` | Search for entities |

### Observations

| Tool | Description |
|------|-------------|
| `add_observations` | Add facts to entities |
| `delete_observations` | Remove observations |

### Relations

| Tool | Description |
|------|-------------|
| `create_relations` | Link entities together |
| `delete_relations` | Remove links |

### Graph Operations

| Tool | Description |
|------|-------------|
| `read_graph` | Read entire knowledge graph |

## Use Cases

### Project Architecture

```
/index
```
Memory stores:
- Entity: "src/api" — "Contains REST endpoints"
- Entity: "src/services" — "Business logic layer"
- Relation: "api" → "depends on" → "services"

### Design Decisions

```
/brainstorm Authentication strategy
```
Memory stores:
- Entity: "AuthDecision"
- Observation: "Chose JWT over sessions for scalability"
- Observation: "User prefers stateless auth"

### Bug Patterns

```
/fix Race condition in checkout
```
Memory stores:
- Entity: "CheckoutBug"
- Observation: "Caused by async state update"
- Observation: "Fixed with mutex lock"

## Command Integration

| Command | How Memory Helps |
|---------|-----------------|
| `/brainstorm` | Remembers design decisions |
| `/plan` | Recalls previous task patterns |
| `/fix` | Stores bug patterns for future reference |
| `/index` | Persists project structure |

## Example Workflow

### Storing Design Decisions

**Session 1:**
```
/brainstorm Authentication for mobile app
→ Decision: Use OAuth with refresh tokens
→ Memory stores this decision
```

**Session 2:**
```
/feature Add logout functionality
→ Memory recalls: "Uses OAuth with refresh tokens"
→ Claude knows to invalidate refresh token
```

### Building Project Knowledge

**Over time:**
```
create_entities(["AuthService", "UserRepository", "TokenManager"])

add_observations("AuthService", [
  "Handles OAuth flow",
  "Uses refresh tokens",
  "Integrates with Google/GitHub"
])

create_relations([
  {"from": "AuthService", "to": "TokenManager", "type": "uses"},
  {"from": "AuthService", "to": "UserRepository", "type": "queries"}
])
```

**Later query:**
```
search_nodes("auth")
→ Returns full context about authentication architecture
```

## Best Practices

### Use Descriptive Names

Entity names should be clear and consistent:
- "AuthService" not "AS"
- "PaymentFlow" not "pmt"

### Add Context to Observations

Include why, not just what:
- "Uses JWT because stateless scales better"
- "Chose Postgres for ACID compliance"

### Create Meaningful Relations

Relations should express real dependencies:
- "depends on", "uses", "calls", "creates"

### Review Regularly

Use `read_graph` periodically to review stored knowledge and prune outdated information.

## Data Persistence

Memory data is stored locally and persists between sessions. The knowledge graph grows over time as you work with Claude Kit.

## Troubleshooting

### Graph Getting Large

If the graph becomes unwieldy:
1. Use `search_nodes` to find specific entities
2. Delete outdated entities with `delete_entities`
3. Remove stale observations

### Missing Context

If Claude doesn't recall something:
- Check if entity exists with `search_nodes`
- Observations may not have been stored
- Entity names may differ

## Resources

- [MCP Memory Server](https://github.com/modelcontextprotocol/servers/tree/main/src/memory)
- [Knowledge Graph Concepts](https://en.wikipedia.org/wiki/Knowledge_graph)
