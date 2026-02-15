# B1: Fix Type Duplication (ContentType)

## Objective

Consolidate `ContentType` to a single source of truth. It's currently defined in both `src/types/index.ts` and `src/features/bookmark/types.ts`.

## BBA Rules That Apply

- Single ownership — one type, one definition, one location
- Shared types belong in `src/types/`
- Features import from shared types, never redefine them

## Files to Modify

| File | Change |
|------|--------|
| `src/types/index.ts` | Export `ContentType` (currently defined but not exported) |
| `src/features/bookmark/types.ts` | Remove local `ContentType`, import from `@/types` |

## Steps

1. Open `src/types/index.ts`
2. Change `type ContentType` to `export type ContentType` (line 3)
3. Open `src/features/bookmark/types.ts`
4. Remove line 14: `type ContentType = "video" | "article" | "playlist";`
5. Add import: `import type { ContentType } from "@/types";`
6. Verify the `Bookmark` type still references `ContentType` correctly

## Verification

- `npx tsc --noEmit` passes
- `grep -r "type ContentType" src/` returns only `src/types/index.ts`

## Notes / Edge Cases

- The `Bookmark` type in `features/bookmark/types.ts` uses `ContentType` for its `type` field. After this change, it will import from the shared definition — which is the same literal union, so no runtime change.
- Check if any other file defines `ContentType` locally.
