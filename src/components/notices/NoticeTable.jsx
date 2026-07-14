import { MoreHorizontal, Pencil, Power, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function NoticeTable({
  notices,
  canManage,
  canDelete,
  onEdit,
  onDeactivate,
  onDelete,
}) {
  if (!notices.length)
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center">
        <h3 className="text-lg font-semibold">No notices found</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Publish a notice or adjust your filters.
        </p>
      </div>
    );
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow className="h-14">
            <TableHead>Notice</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Audience</TableHead>
            <TableHead>Published by</TableHead>
            <TableHead>Expiry</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notices.map((notice) => (
            <TableRow key={notice.id}>
              <TableCell>
                <p className="font-semibold">{notice.title}</p>
                <p className="max-w-md truncate text-xs text-muted-foreground">
                  {notice.content}
                </p>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{notice.noticeType}</Badge>
              </TableCell>
              <TableCell>
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                  {notice.audience}
                </Badge>
              </TableCell>
              <TableCell>{notice.createdByName}</TableCell>
              <TableCell>
                {notice.expiryDate
                  ? new Date(
                      `${notice.expiryDate}T00:00:00`,
                    ).toLocaleDateString()
                  : "No expiry"}
              </TableCell>
              <TableCell className="text-right">
                {(canManage || canDelete) && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {canManage && (
                        <>
                          <DropdownMenuItem onClick={() => onEdit(notice)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onDeactivate(notice)}
                          >
                            <Power className="mr-2 h-4 w-4" />
                            Deactivate
                          </DropdownMenuItem>
                        </>
                      )}
                      {canDelete && (
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => onDelete(notice)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
