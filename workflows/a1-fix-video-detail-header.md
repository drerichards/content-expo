# A1: Fix VideoDetailHeader Upward Import

## Objective

Remove the upward dependency where a feature component (`VideoDetailHeader`) imports from the interface layer (`useSearchPanel`). Pass panel state as props instead.

## BBA Rules That Apply

- Features never import from interface layer (one-way dependency: Rendering → Styling → Composition → Product)
- Features receive orchestration state as props from the interface layer
- Single ownership: panel expand/collapse belongs to interface, not to the feature

## Files to Modify

| File | Layer | Change |
|------|-------|--------|
| `src/features/video/components/VideoContent/VideoDetailHeader.tsx` | Product (Feature) | Remove `useSearchPanel` import, add `isPanelExpanded` + `onToggleExpand` props |
| `src/features/video/components/VideoContent/index.tsx` | Product (Feature) | Pass new props through to `VideoDetailHeader` |
| `src/interface/search/components/SearchContentPanel/index.tsx` | Product (Interface) | Consume `useSearchPanel`, pass props to `VideoContent` |

## Steps

1. Open `VideoDetailHeader.tsx`
2. Remove `import { useSearchPanel } from "@/interface/search/context/SearchPanelContext"`
3. Add to `VideoDetailHeaderProps`:
   ```
   isPanelExpanded: boolean;
   onToggleExpand: () => void;
   ```
4. Remove `const { isPanelExpanded, togglePanelExpand } = useSearchPanel();` from the component body
5. Replace `togglePanelExpand` with `onToggleExpand` in the JSX
6. Open `VideoContent/index.tsx` — add `isPanelExpanded` and `onToggleExpand` to `VideoContentProps` and pass them to `VideoDetailHeader`
7. Open `SearchContentPanel/index.tsx` — import `useSearchPanel`, destructure `isPanelExpanded` and `togglePanelExpand`, pass them to `VideoContent`

## Verification

- `grep -r "from.*@/interface" src/features/` returns zero results
- `npx tsc --noEmit` passes
- `npm run build` passes

## Notes / Edge Cases

- `SearchContentPanel` already imports from `@/features/bookmark/context/BookmarkContext` — this is a known pattern where the interface layer consumes features (legal in BBA: interface is product-layer orchestration)
- The `SearchPanelProvider` wraps `SearchPageUI` in `src/interface/search/index.tsx`, so `useSearchPanel()` is available throughout the interface layer
