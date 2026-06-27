import { useNavigate } from "react-router-dom";

import {
  LogOut,
  Settings,
  User,
  KeyRound,
  ChevronDown,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
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

  const logout = () => {

    localStorage.clear();

    navigate("/login");

  };

  return (
    <DropdownMenu>

      <DropdownMenuTrigger asChild>

        <button className="flex items-center gap-3 rounded-xl px-3 py-2 transition hover:bg-slate-100">

          <Avatar>

            <AvatarFallback>

              KK

            </AvatarFallback>

          </Avatar>

          <div className="text-left">

            <p className="text-sm font-semibold">

              Kshitij

            </p>

            <p className="text-xs text-slate-500">

              Administrator

            </p>

          </div>

          <ChevronDown className="h-4 w-4 text-slate-500" />

        </button>

      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-60">

        <DropdownMenuItem>

          <User className="mr-2 h-4 w-4" />

          My Profile

        </DropdownMenuItem>

        <DropdownMenuItem>

          <Settings className="mr-2 h-4 w-4" />

          Settings

        </DropdownMenuItem>

        <DropdownMenuItem>

          <KeyRound className="mr-2 h-4 w-4" />

          Change Password

        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={logout}
          className="text-red-600"
        >

          <LogOut className="mr-2 h-4 w-4" />

          Logout

        </DropdownMenuItem>

      </DropdownMenuContent>

    </DropdownMenu>
  );
}