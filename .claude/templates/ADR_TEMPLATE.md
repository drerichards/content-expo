# ADR Template

**Copy this template when creating a new ADR. ADRs live in `.claude/decisions/`**

---

# ADR-{NUMBER}: {Title in Imperative Mood}

**Date**: YYYY-MM-DD  
**Status**: Proposed | Accepted | Deprecated | Superseded  
**Deciders**: {Who made this decision}  
**Related**: {Links to related ADRs, issues, or workflows}

---

## Context

**What is the issue we're facing?**

Describe the problem space:
- What architectural question are we answering?
- What constraints exist (technical, business, timeline)?
- What assumptions are we making?

Be specific. Include code snippets, file paths, or error messages if relevant.

---

## Decision

**What are we doing about it?**

State the decision clearly in one sentence:
> "We will [action] by [approach] because [reason]."

Then elaborate:
- What exactly changes?
- Which files/components are affected?
- What pattern are we adopting?

---

## Options Considered

List alternatives you evaluated (even if rejected):

### Option 1: {Name}
**Description**: What this approach would look like  
**Pros**:
- Benefit 1
- Benefit 2

**Cons**:
- Drawback 1
- Drawback 2

**Why rejected**: Specific reason(s)

### Option 2: {Name}
{Same structure}

### Option 3: {Chosen Solution}
**Description**: What this approach looks like  
**Pros**:
- Why this is better than alternatives

**Cons**:
- Known tradeoffs we're accepting

**Why chosen**: Specific reason(s)

---

## Consequences

**What becomes easier, harder, or different?**

### Positive Consequences
- ✅ What improves (performance, maintainability, developer experience)
- ✅ What new capabilities this enables
- ✅ What risks this mitigates

### Negative Consequences
- ⚠️ What becomes more complex
- ⚠️ What technical debt this introduces
- ⚠️ What we'll need to monitor

### Neutral Consequences
- ℹ️ What changes but isn't clearly better/worse
- ℹ️ What new dependencies this creates

---

## Implementation

**How do we execute this decision?**

### Files Changed
```
src/features/bookmark/api/bookmarkService.ts
src/features/bookmark/types.ts
src/types/index.ts
```

### Code Example (Before)
```typescript
// Show the OLD way
import type { Bookmark } from "@/types";
```

### Code Example (After)
```typescript
// Show the NEW way
import type { Bookmark } from "../types";
```

### Migration Plan
If this affects existing code:
1. Step 1: Update type definitions
2. Step 2: Fix import statements
3. Step 3: Run verification gates
4. Step 4: Update tests

### Verification
Commands to verify this decision is correctly implemented:
```bash
npx tsc --noEmit
grep -r "from.*@/types.*Bookmark" src/features/bookmark/
```

Expected output: Zero matches in feature files

---

## Teaching Moment

**What architectural principle does this demonstrate?**

Example:
> This decision demonstrates **dependency inversion** in BBA. Features should own their types and import from their own domain, not from shared types. This keeps features self-contained and prevents shared types from becoming a dumping ground for feature-specific contracts.

**When should this pattern be applied elsewhere?**
- Any time a feature defines a type that's only used within that feature
- When you're tempted to add feature-specific types to `src/types/index.ts`

**When should this pattern NOT be used?**
- When a type is genuinely shared across multiple features (e.g., `ContentItem`)
- When the type is part of a cross-feature contract (interface layer needs it)

---

## Links & References

**Related Documentation**:
- CLAUDE.md: {Section that governs this decision}
- Workflow: {Link to workflow if this decision was part of one}

**External References**:
- BBA Documentation: Link to authoritative source
- TypeScript Best Practices: Link if relevant
- Similar decisions in other projects: Link if helpful

---

## Metadata

**Tags**: #types #bba #architecture #imports  
**Impacts**: Features, Shared Types, Build Process  
**Affects Phase**: Phase 1 (Foundation)

---

## Example of a Complete ADR

See `.claude/decisions/ADR-001-fix-bookmark-type-import.md` for a fully filled-out example.

---

## When to Create an ADR

**Always create an ADR for**:
- BBA layer boundary decisions
- State management patterns
- API integration approaches
- Performance optimization strategies
- Security implementations
- Breaking changes to public APIs

**Don't create an ADR for**:
- Simple bug fixes
- Style/formatting changes
- Renaming without architectural impact
- One-off implementation details

**Rule of thumb**: If you find yourself explaining "why we did it this way" in a code review, you should have written an ADR.

---

## ADR Naming Convention

```
ADR-{NUMBER}-{short-kebab-case-title}.md

Examples:
ADR-001-fix-bookmark-type-import.md
ADR-002-add-error-boundaries-to-features.md
ADR-003-switch-to-zustand-for-bookmark-state.md
```

Number sequentially. Don't reuse numbers even if an ADR is deprecated.

---

## ADR Lifecycle

```
Proposed → Under discussion, not implemented yet
    ↓
Accepted → Decision made, implementation in progress or complete
    ↓
Deprecated → No longer the recommended approach (link to replacement ADR)
    ↓
Superseded → Replaced by a newer ADR (link to replacement)
```

When deprecating/superseding:
1. Update status in the old ADR
2. Add "Superseded by: ADR-XXX" at the top
3. Keep the old ADR in place (it's historical record)
