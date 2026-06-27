import SearchBar from "@/components/shared/SearchBar";
import NotificationButton from "@/components/shared/NotificationButton";
import UserDropdown from "./UserDropdown";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-8 backdrop-blur">

      <SearchBar />

      <div className="flex items-center gap-5">

        <NotificationButton />

        <UserDropdown />

      </div>

    </header>
  );
}