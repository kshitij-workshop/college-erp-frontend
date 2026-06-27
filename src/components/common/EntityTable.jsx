import { MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react";

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

export default function EntityTable({
  columns = [],
  data = [],
  actions = {},
  loading = false,
}) {
  if (!loading && data.length === 0) {
    return (
      <div className="rounded-xl border border-dashed bg-white py-16 text-center shadow-sm">
        <h3 className="text-lg font-semibold">No Records Found</h3>

        <p className="mt-2 text-sm text-muted-foreground">
          There are no records available.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key}>{column.label}</TableHead>
            ))}

            <TableHead className="w-20 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {column.render ? (
                    column.render(row)
                  ) : column.type === "badge" ? (
                    <Badge
                      variant={
                        row[column.key] === "ACTIVE" ? "default" : "secondary"
                      }
                    >
                      {row[column.key]}
                    </Badge>
                  ) : (
                    row[column.key]
                  )}
                </TableCell>
              ))}

              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    {actions.view && (
                      <DropdownMenuItem onClick={() => actions.view(row)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                    )}

                    {actions.edit && (
                      <DropdownMenuItem onClick={() => actions.edit(row)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                    )}

                    {actions.delete && (
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => actions.delete(row)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
