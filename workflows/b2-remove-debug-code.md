# B2: Remove Debug Console.log Statements

## Objective

Strip all `console.log` statements from component and hook code. Debug logging should not ship in production code.

## BBA Rules That Apply

- Code quality: no debug artifacts in committed code
- `console.error` for actual error handling is acceptable; `console.log` for debugging is not

## Files to Modify

| File | Lines | Statement |
|------|-------|-----------|
| `src/features/bookmark/hooks/useBookmarks.ts` | 15 | `console.log("[useBookmarks] refreshBookmarks loaded:", stored.length)` |
| `src/features/bookmark/hooks/useBookmarks.ts` | 20 | `console.log("[useBookmarks] bookmarks state updated:", bookmarks.length)` |
| `src/features/bookmark/api/bookmarkService.ts` | 20 | `console.log("[BookmarkService] Loaded bookmarks from localStorage:", parsed.length)` |

## Steps

1. Open `src/features/bookmark/hooks/useBookmarks.ts`
2. Remove line 15: `console.log("[useBookmarks] refreshBookmarks loaded:", stored.length);`
3. Remove the `useEffect` block (lines 19-21) that only exists to log bookmark count — it has no side effects beyond logging
4. Open `src/features/bookmark/api/bookmarkService.ts`
5. Remove line 20: `console.log("[BookmarkService] Loaded bookmarks from localStorage:", parsed.length);`
6. Keep `console.error` statements (lines 16 and 23) — these handle actual error conditions

## Verification

- `grep -r "console.log" src/features/ src/interface/ --include="*.ts" --include="*.tsx"` returns zero results
- `npx tsc --noEmit` passes
- `npm run build` passes

## Notes / Edge Cases

- The `useEffect` in `useBookmarks.ts` (lines 19-21) is pure debug logging. Removing it changes no behavior. If a monitoring useEffect is needed later, it should use a proper logging service, not console.log.
- Keep `console.error` — it's used for legitimate error handling in the catch block and malformed data detection.
