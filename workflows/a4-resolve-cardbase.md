# A4: Resolve CardBase (Implement or Remove Dead Code)

## Objective

Four feature components import `CardBase` from `@/shared/ui/components/CardBase` — but this component doesn't exist. Either implement it or delete the broken features.

## BBA Rules That Apply

- Shared UI components are presentational only — no state, no feature logic
- Shared components live at the Composition layer (L3)
- Features compose shared components, not the other way around

## Files Affected

| File | Status | Action |
|------|--------|--------|
| `src/features/playlist/components/ThreadCard/index.tsx` | Broken import | Fix or delete |
| `src/features/snippet/components/SnippetCard/index.tsx` | Broken import | Fix or delete |
| `src/features/stack/components/StackCard/index.tsx` | Broken import | Fix or delete |
| `src/features/thread/components/ThreadCard/index.tsx` | Broken import | Fix or delete |
| `src/shared/ui/components/CardBase/index.tsx` | Missing | Create or skip |

## Decision Required

**Option A: Delete broken features** (recommended if these are stubs with no active usage)
- These features use `function` declarations (violates teaching contract: const arrow functions only)
- They import from `@/app/fakeTypes.ts` (not the canonical `@/types`)
- They have TODO comments and no real content
- They are not imported or used anywhere in the app

**Option B: Implement CardBase** (if these features are planned for near-term use)
- Create `CardBase` in `src/shared/ui/block/components/CardBase/index.tsx`
- It should be a presentational wrapper: title + subtitle + children slot
- No state, no feature logic
- Uses `BlockCard` or `Base` underneath

## Steps (Option A — Delete)

1. Verify none of the 4 components are imported anywhere:
   ```
   grep -r "SnippetCard\|StackCard\|ThreadCard" src/ --include="*.tsx" --include="*.ts"
   ```
   Should only return self-references within each feature directory.
2. Delete `src/features/playlist/` directory
3. Delete `src/features/snippet/` directory
4. Delete `src/features/stack/` directory
5. Delete `src/features/thread/` directory
6. Check if `@/app/fakeTypes.ts` is used elsewhere. If only by deleted features, delete it too.

## Steps (Option B — Implement)

1. Create `src/shared/ui/block/components/CardBase/index.tsx`:
   ```tsx
   import { Card } from "@/shared/ui/block";
   import { Text } from "@/shared/ui/block";

   type CardBaseProps = {
     title: string;
     subtitle?: string;
     children?: React.ReactNode;
   };

   export const CardBase = ({ title, subtitle, children }: CardBaseProps) => (
     <Card>
       <Text variant="title">{title}</Text>
       {subtitle && <Text variant="meta">{subtitle}</Text>}
       {children}
     </Card>
   );
   ```
2. Update the import path in all 4 features from `@/shared/ui/components/CardBase` to `@/shared/ui/block/components/CardBase`
3. Fix function declarations to const arrow functions in all 4 files

## Verification

- `npm run build` passes
- No broken imports remain
- If Option A: `grep -r "CardBase" src/` returns zero
- If Option B: `grep -r "CardBase" src/` returns only valid imports

## Notes / Edge Cases

- `@/app/fakeTypes.ts` defines types like `SnippetItem`, `StackItem`, etc. These are only used by the stub features. If deleting, check for other consumers first.
- The existing `BlockCard` in `src/shared/ui/block/components/BlockCard/` already provides card semantics. `CardBase` would be a lightweight wrapper on top of it.
