# B3: Resolve TODO/FIX Comments

## Objective

Address or remove the FIX comments in the interface/search layer. These indicate incomplete refactoring that should be resolved.

## BBA Rules That Apply

- No architectural TODOs left dangling (phase2.md definition of done)
- Fix issues at the source, not with workarounds

## Files to Modify

| File | Line | Comment | Resolution |
|------|------|---------|------------|
| `src/interface/search/hooks/useSearchPage.ts` | 2 | `// FIX: adapt toggleBookmark so its signature matches SearchDetailPanelProps` | Investigate and resolve |
| `src/interface/search/index.tsx` | 2 | `// FIX: remove any reference to videos` | Investigate and resolve |

## Steps

### FIX 1: useSearchPage.ts — toggleBookmark signature

1. Open `src/interface/search/hooks/useSearchPage.ts`
2. Check `SearchDetailPanelProps` in `src/types/index.ts` — it has `onCloseContentPanel` and `onSelectUpNextItem`, no `toggleBookmark` prop
3. `toggleBookmark` is consumed in `SearchContentPanel` via `useBookmarkContext()` — not via `SearchDetailPanelProps`
4. The FIX comment is stale — the bookmark toggle is handled correctly through context, not through props
5. Remove the comment on line 2

### FIX 2: index.tsx — remove video references

1. Open `src/interface/search/index.tsx`
2. Check for `video`-specific references:
   - `videoSearchResults` is used in `resultsPanelProps` — this is the actual search results from the video API
   - This is currently the only content type with real search implementation
3. The comment suggests genericizing to `searchResults` instead of `videoSearchResults`
4. Decision: either rename now or remove the comment and defer genericizing until other content types have real search implementations
5. Recommended: remove the comment. Renaming is a scope expansion that doesn't fix a bug. When article/playlist search is implemented, the interface can be generalized then.

## Verification

- `grep -r "// FIX\|// TODO" src/interface/` returns zero results
- `npx tsc --noEmit` passes
- No behavioral changes

## Notes / Edge Cases

- There may be TODO comments in other files (e.g., `bookmarkService.ts` line 5: `// todo: consider private and protected methods`). These are in feature code and are lower priority. Address them if encountered but don't scope-creep this workflow.
- The `bookmarkService.ts` TODO is about class design — not a bug or architectural issue. It can stay.
