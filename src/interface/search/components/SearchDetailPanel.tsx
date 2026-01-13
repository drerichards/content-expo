import { SearchDetailPanelProps } from "@/types";

export const SearchDetailPanel = ({
  selectedItem,
  isSideOpen,
  isBookmarked,
  toggleBookmark,
  upNextItems,
  onSelectUpNextItem,
  toggleSide,
  onCloseMainPanel,
}: SearchDetailPanelProps) => {
  if (!selectedItem) return null;

  return (
    <aside>
      <button onClick={onCloseMainPanel}>Close</button>
      <button onClick={toggleSide}>{isSideOpen ? "Collapse" : "Expand"}</button>

      <h2>{selectedItem.title}</h2>

      <button onClick={() => toggleBookmark(selectedItem)}>
        {isBookmarked(selectedItem.id) ? "Unbookmark" : "Bookmark"}
      </button>

      <div>
        {upNextItems.map((item) => (
          <div key={item.id} onClick={() => onSelectUpNextItem(item)}>
            {item.title}
          </div>
        ))}
      </div>
    </aside>
  );
};
