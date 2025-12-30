import Navbar from "@/shared/ui/components/Navbar";
import SearchBar from "@/shared/ui/components/SearchInput";

type Props = {
  onSearch: (q: string) => void;
  onOpenBookmarks: () => void;
};

const SearchHeader = ({ onSearch, onOpenBookmarks }: Props) => {
  return (
    <>
      <Navbar onOpenBookmarks={onOpenBookmarks} />
      <SearchBar onSearch={onSearch} />
    </>
  );
};

export default SearchHeader;
