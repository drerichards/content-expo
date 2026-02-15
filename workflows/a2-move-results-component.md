# A2: Delete Results Component (Dead Code)

## Objective

Remove `ResultsList` from the shared layer. It imports feature components (`VideoCard`, `ArticleCard`) which violates BBA's one-way dependency rule. It is also dead code — not imported anywhere in the codebase.

## BBA Rules That Apply

- Shared UI is presentational only — no feature imports
- Dead code should be deleted, not relocated

## Files to Delete

| File | Reason |
|------|--------|
| `src/shared/ui/components/Results/index.tsx` | Dead code, violates BBA (imports from features) |
| `src/shared/ui/components/Results/ResultsList.module.css` | Orphaned CSS for deleted component |

## Steps

1. Confirm `ResultsList` is not imported anywhere:
   ```
   grep -r "ResultsList\|from.*shared/ui/components/Results" src/
   ```
   Should only return self-references within the Results directory.
2. Delete the entire `src/shared/ui/components/Results/` directory
3. Check if `src/shared/ui/components/` directory has any other contents. If only `ErrorBoundary/` remains, that's fine.

## Verification

- `grep -r "from.*@/features" src/shared/` returns zero results
- `npm run build` passes (no broken imports)
- The `SearchResultsPanel` in `src/interface/search/components/SearchResultsPanel/` continues to handle result rendering (it already does)

## Notes / Edge Cases

- `SearchResultsPanel` is the active results component and lives in the interface layer where feature imports are legal
- If the `Results/` directory is referenced in any barrel exports (`index.ts`), remove those exports too
