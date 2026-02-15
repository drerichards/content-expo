# B4: Standardize Export Pattern (Named Exports)

## Objective

Adopt named exports consistently across the codebase. Block components use named exports; feature components use default exports. Standardize on named exports everywhere.

## BBA Rules That Apply

- Consistency over cleverness
- One convention across all layers
- Named exports improve tree-shaking, refactoring, and import discoverability

## Files to Modify

Feature components currently using `export default`:

| File | Current | Target |
|------|---------|--------|
| `src/features/video/components/VideoCard/index.tsx` | `export default VideoCard` | `export const VideoCard` |
| `src/features/video/components/VideoContent/index.tsx` | `export default VideoContent` | `export const VideoContent` |
| `src/features/video/components/VideoContent/VideoDetailHeader.tsx` | `export default VideoDetailHeader` | `export const VideoDetailHeader` |
| `src/features/video/components/VideoContent/VideoDetailBody.tsx` | `export default VideoDetailBody` (check) | `export const VideoDetailBody` |
| `src/features/article/components/ArticleCard/index.tsx` | `export default ArticleCard` | `export const ArticleCard` |
| `src/features/bookmark/components/BookmarksList/index.tsx` | `export default BookmarksList` | `export const BookmarksList` |
| `src/interface/search/index.tsx` | `export default SearchPageUI` | `export const SearchPageUI` |
| `src/shared/ui/components/Results/index.tsx` | Should be deleted in A2 | Skip if already deleted |

Plus all import sites that use default import syntax.

## Steps

1. For each file listed above:
   a. Change `export default ComponentName` to remove the default and add `export` to the const declaration
   b. Find all files that import it: `grep -r "import ComponentName from" src/`
   c. Update each import from `import ComponentName from "..."` to `import { ComponentName } from "..."`
2. Do one component at a time. Verify build after each.
3. Check barrel exports (`index.ts` files) — update any `export { default as X }` to `export { X }`

## Verification

- `grep -r "export default" src/features/ src/interface/ --include="*.tsx"` returns zero results
- `npx tsc --noEmit` passes
- `npm run build` passes

## Notes / Edge Cases

- Next.js page components (`app/page.tsx`, `app/(routes)/search/page.tsx`) may require default exports for the App Router. Check if these use default exports — if so, leave them as-is. Only Next.js route files need default exports.
- `layout.tsx` and `providers.tsx` may also need default exports for Next.js. Leave those alone.
- The `SearchPageUI` component is used in the search page route — verify it's imported correctly after conversion.
- Do this task LAST — it touches many files and benefits from all other fixes being done first so there are fewer moving targets.
