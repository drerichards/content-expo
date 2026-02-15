# A3: Fix BookmarksList Horizontal Feature Coupling

## Objective

Remove the horizontal dependency where `BookmarksList` (bookmark feature) imports `ArticleCard` (article feature). Features must not import from other features.

## BBA Rules That Apply

- Features never import from other features (no horizontal coupling)
- Cross-feature rendering goes through the interface layer
- Features should accept render props or generic children for flexible rendering

## Files to Modify

| File | Layer | Change |
|------|-------|--------|
| `src/features/bookmark/components/BookmarksList/index.tsx` | Product (Feature) | Remove ArticleCard import, accept `renderItem` prop |
| Interface layer consumer (wherever BookmarksList is used) | Product (Interface) | Provide renderItem that maps bookmarks to the correct card component |

## Steps

1. Open `BookmarksList/index.tsx`
2. Remove `import ArticleCard from "@/features/article/components/ArticleCard"`
3. Add a `renderItem` prop to `BookmarksListProps`:
   ```ts
   renderItem: (bookmark: Bookmark) => React.ReactNode;
   ```
4. Replace the `ArticleCard` usage in the map with `renderItem(b)`:
   ```tsx
   bookmarks.map((b) => (
     <React.Fragment key={b.id}>
       {renderItem(b)}
     </React.Fragment>
   ))
   ```
5. Find where `BookmarksList` is consumed (likely in interface layer)
6. At the consumption site, provide a `renderItem` that renders the appropriate card:
   ```tsx
   renderItem={(bookmark) => (
     <ArticleCard
       title={bookmark.title}
       source={bookmark.source}
       isBookmarked={isBookmarked(bookmark.id)}
       onToggleBookmark={() => toggleBookmark(bookmark)}
       onClick={() => onSelectBookmark(bookmark)}
     />
   )}
   ```

## Verification

- `grep -r "from.*@/features/article" src/features/bookmark/` returns zero results
- `grep -r "from.*@/features/" src/features/ --include="*.tsx" --include="*.ts"` shows no cross-feature imports
- `npx tsc --noEmit` passes
- `npm run build` passes

## Notes / Edge Cases

- The current `BookmarksList` passes `isBookmarked`, `toggleBookmark`, and `onSelectBookmark` down to `ArticleCard`. With the `renderItem` pattern, these callbacks move to the interface layer's renderItem function — which is where they belong.
- Check whether `BookmarksList` is currently used anywhere. If it's dead code, consider deleting it entirely instead of refactoring.
