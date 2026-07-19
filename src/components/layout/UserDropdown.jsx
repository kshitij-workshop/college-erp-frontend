import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "@/context/AuthContext";

export function useAuth() {
  return useContext(AuthContext);
}

import {
  ChevronDown,
  KeyRound,
  LogOut,
  Settings,
  User,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserDropdown() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const roleLabel = {
    ADMIN: "Administrator",
    FACULTY: "Faculty",
    STUDENT: "Student",
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-3 rounded-xl px-3 py-2 transition hover:bg-slate-100">
          <Avatar>
            <AvatarImage src={user?.profilePicture || ""} />

            <AvatarFallback>
              {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>

          <div className="text-left">
            <p className="text-sm font-semibold">
              {user?.fullName}
            </p>

            <p className="text-xs text-slate-500">
              {roleLabel[user?.role] || user?.role}
            </p>
          </div>

          <ChevronDown className="h-4 w-4 text-slate-500" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-60"
      >
        {user?.role !== "ADMIN" && (
          <DropdownMenuItem
            onClick={() => navigate("/profile")}
          >
            <User className="mr-2 h-4 w-4" />
            My Profile
          </DropdownMenuItem>
        )}

        <DropdownMenuItem
          onClick={() => navigate("/settings")}
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => navigate("/change-password")}
        >
          <KeyRound className="mr-2 h-4 w-4" />
          Change Password
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="text-red-600 focus:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}