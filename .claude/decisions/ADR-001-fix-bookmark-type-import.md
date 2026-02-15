# ADR-001: Fix Bookmark Type Import in Feature Layer

**Date**: 2026-02-14  
**Status**: Accepted  
**Deciders**: Andre Richards, Claude Code  
**Related**: HANDOFF.md (Error #1), CLAUDE.md (BBA Layer Rules)

---

## Context

**What is the issue we're facing?**

TypeScript compilation fails with this error:
```
src/features/bookmark/api/bookmarkService.ts(1,15): error TS2305: 
Module '"@/types"' has no exported member 'Bookmark'.
```

**Root cause**: `bookmarkService.ts` (inside the bookmark feature) imports `Bookmark` from `@/types`, but `Bookmark` is defined in `src/features/bookmark/types.ts`, not exported from `src/types/index.ts`.

**Constraints**:
- This is a BBA violation: features should not import feature-specific types from shared types
- The `Bookmark` type is only used within the bookmark feature (not shared across features)
- Must maintain TypeScript strict mode compliance

**Assumptions**:
- `Bookmark` type is feature-specific and doesn't need to be in shared types
- No other features currently depend on the `Bookmark` type
- The bookmark feature owns its domain types

---

## Decision

**What are we doing about it?**

> We will **fix the import path** in `bookmarkService.ts` by **importing `Bookmark` from its own feature's types file** (`../types`) instead of from shared types (`@/types`) because this enforces BBA's principle of feature-local type ownership.

**What exactly changes**:
- Update import statement in `src/features/bookmark/api/bookmarkService.ts`
- Change from: `import type { Bookmark } from "@/types"`
- Change to: `import type { Bookmark } from "../types"`

**Which files are affected**:
- `src/features/bookmark/api/bookmarkService.ts` (import statement)

**What pattern are we adopting**:
- **Feature-local type ownership**: Features import their own types from their own `types.ts` file, not from shared types

---

## Options Considered

### Option 1: Export Bookmark from src/types/index.ts
**Description**: Add `export type { Bookmark } from "@/features/bookmark/types"` to `src/types/index.ts`

**Pros**:
- Quick fix, no need to change import statements
- Makes the type "available" from shared location

**Cons**:
- Violates BBA: shared types shouldn't re-export feature-specific types
- Creates upward dependency (shared → features)
- Shared types file becomes a dumping ground for all feature types
- Hides the true ownership of the type

**Why rejected**: This is an architectural violation. Shared types should only contain truly cross-feature contracts, not convenience re-exports of feature-specific types.

### Option 2: Move Bookmark type to src/types/index.ts
**Description**: Move the `Bookmark` type definition from `src/features/bookmark/types.ts` to `src/types/index.ts`

**Pros**:
- Type becomes truly shared
- Import from `@/types` would work

**Cons**:
- `Bookmark` is not used outside the bookmark feature (yet)
- Shared types file grows with feature-specific contracts
- Violates "move code to shared only when needed by 3+ features" rule
- Makes the bookmark feature less self-contained

**Why rejected**: Premature generalization. The type isn't shared, so it shouldn't be in shared types.

### Option 3: Fix Import Path (Chosen)
**Description**: Change the import in `bookmarkService.ts` to import from `../types` instead of `@/types`

**Pros**:
- Follows BBA layer rules (features import from their own domain)
- Keeps feature self-contained
- Explicit about type ownership
- No architectural violations
- If `Bookmark` is needed elsewhere later, we can promote it to shared types then

**Cons**:
- Requires changing import statements (minimal effort)
- Relative imports are slightly less "clean" than alias imports (debatable)

**Why chosen**: This is the architecturally correct solution. It respects feature boundaries, keeps types local to their domain, and prevents shared types from becoming a dumping ground.

---

## Consequences

### Positive Consequences
- ✅ BBA compliance: Features now properly import their own types
- ✅ Clearer ownership: `Bookmark` type clearly belongs to bookmark feature
- ✅ TypeScript compilation succeeds
- ✅ Pattern established: Other features will follow this model
- ✅ Self-contained features: bookmark/ can be moved/extracted more easily

### Negative Consequences
- ⚠️ Relative imports instead of alias imports (minor: only within same feature)
- ⚠️ If `Bookmark` becomes shared later, we'll need to move it and update imports (acceptable: wait for actual need)

### Neutral Consequences
- ℹ️ Sets precedent: All feature-specific types should use relative imports within their feature
- ℹ️ Future pattern: When adding new features, keep types local until proven shared

---

## Implementation

### Files Changed
```
src/features/bookmark/api/bookmarkService.ts
```

### Code Example (Before)
```typescript
import type { Bookmark } from "@/types";

export const bookmarkService = {
  getBookmarks(): Bookmark[] {
    // ...
  }
};
```

### Code Example (After)
```typescript
import type { Bookmark } from "../types";

export const bookmarkService = {
  getBookmarks(): Bookmark[] {
    // ...
  }
};
```

### Migration Plan
1. Update import statement in `bookmarkService.ts`
2. Run TypeScript compiler to verify no errors
3. Run build to ensure no breaking changes
4. Commit with descriptive message

### Verification
Commands to verify this decision is correctly implemented:
```bash
# Should pass with no errors
npx tsc --noEmit

# Should return zero matches (no feature files importing Bookmark from @/types)
grep -r 'from "@/types".*Bookmark' src/features/bookmark/

# Build should succeed
npm run build
```

Expected output: 
- TypeScript: No errors
- Grep: No matches
- Build: Success

---

## Teaching Moment

**What architectural principle does this demonstrate?**

This decision demonstrates **vertical slice ownership** in BBA. Each feature owns its complete vertical slice including:
- Types (`types.ts`)
- API services (`api/`)
- Components (`components/`)
- State (`context/`, `hooks/`)

Features should be self-contained. They import from:
- ✅ Their own files (relative imports: `../types`, `./helpers`)
- ✅ Shared layer (downward: `@/shared/ui`, `@/shared/styles`)
- ✅ Truly shared types (cross-feature contracts: `@/types`)
- ❌ NOT from other features (horizontal: `@/features/video/types`)
- ❌ NOT from interface layer (upward: `@/interface/search`)

**When should this pattern be applied elsewhere?**
- Any time you're tempted to add a feature-specific type to `src/types/index.ts`
- When creating a new feature domain (article, snippet, etc.)
- When extracting code from one feature (keep types with the feature)

**When should this pattern NOT be used?**
- When a type is genuinely used by 3+ features (then it belongs in `src/types/`)
- When a type defines a cross-feature contract (interface layer orchestration)
- When a type is a truly universal concept (`ContentItem`, `ContentType`)

**Real-world parallel**: This is like organizing a company where each department (feature) has its own budget and resources (types, services). You don't put every department's forms in the central office (shared types). You only centralize truly cross-department resources.

---

## Links & References

**Related Documentation**:
- CLAUDE.md: THE LAYERS → Layer 4: Product
- CLAUDE.md: THE CONTRACT → Ownership Rules
- HANDOFF.md: Remaining TypeScript Errors → Error 1

**Related ADRs**:
- None yet (this is ADR-001)
- Will be referenced by ADR-002 when fixing search mappers import

**External References**:
- [BBA Authoritative Source](../../refs/kernel_bba_canon_markdown.md)

---

## Metadata

**Tags**: #types #bba #architecture #imports #feature-ownership  
**Impacts**: Features, Type System, Build Process  
**Affects Phase**: Phase 1 (Foundation)  
**Pattern**: Feature-local type ownership

---

## Follow-up Actions

- [ ] Apply same pattern to fix Error #2 (search mappers importing Bookmark)
- [ ] Document this pattern in `.claude/patterns/feature-type-ownership.md`
- [ ] Update WORKFLOW for "Fix TypeScript Import Error" to reference this ADR
- [ ] Check all other features for similar violations
