import {
  MoreHorizontal,
  ClipboardPenLine,
  Lock,
  Send,
  Trash2,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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

const typeStyles = {
  CLASS_TEST: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  INTERNAL: "bg-amber-100 text-amber-700 hover:bg-amber-100",
  EXTERNAL: "bg-purple-100 text-purple-700 hover:bg-purple-100",
};

function ExamStatus({ exam }) {
  if (exam.resultPublished)
    return (
      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
        Published
      </Badge>
    );
  if (exam.locked)
    return (
      <Badge className="bg-slate-200 text-slate-700 hover:bg-slate-200">
        Locked
      </Badge>
    );
  return <Badge variant="outline">Draft</Badge>;
}

export default function ExamTable({
  exams,
  canManage,
  canDelete,
  onEnterMarks,
  onViewResults,
  onLock,
  onPublish,
  onDelete,
}) {
  if (!exams.length)
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center">
        <h3 className="text-lg font-semibold">No exams found</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Create an exam or adjust the filters.
        </p>
      </div>
    );
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow className="h-14">
            <TableHead>Exam</TableHead>
            <TableHead>Subject / Section</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-center">Max marks</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exams.map((exam) => (
            <TableRow key={exam.id}>
              <TableCell>
                <p className="font-semibold">{exam.name}</p>
              </TableCell>
              <TableCell>
                <p>{exam.subjectName}</p>
                <p className="text-xs text-muted-foreground">
                  Section {exam.sectionName}
                </p>
              </TableCell>
              <TableCell>
                <Badge className={typeStyles[exam.examType]}>
                  {exam.examType.replace("_", " ")}
                </Badge>
              </TableCell>
              <TableCell>
                {exam.examDate
                  ? new Date(`${exam.examDate}T00:00:00`).toLocaleDateString()
                  : "—"}
              </TableCell>
              <TableCell className="text-center font-semibold">
                {exam.maxMarks}
              </TableCell>
              <TableCell>
                <ExamStatus exam={exam} />
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {canManage && (
                      <DropdownMenuItem
                        disabled={exam.locked}
                        onClick={() => onEnterMarks(exam)}
                      >
                        <ClipboardPenLine className="mr-2 h-4 w-4" />
                        Enter marks
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => onViewResults(exam)}>
                      <Users className="mr-2 h-4 w-4" />
                      View results
                    </DropdownMenuItem>
                    {canManage && (
                      <>
                        <DropdownMenuSeparator />
                        {!exam.locked && (
                          <DropdownMenuItem onClick={() => onLock(exam)}>
                            <Lock className="mr-2 h-4 w-4" />
                            Lock marks
                          </DropdownMenuItem>
                        )}
                        {exam.locked && !exam.resultPublished && (
                          <DropdownMenuItem onClick={() => onPublish(exam)}>
                            <Send className="mr-2 h-4 w-4" />
                            Publish results
                          </DropdownMenuItem>
                        )}
                      </>
                    )}
                    {canDelete && !exam.locked && (
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => onDelete(exam)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete exam
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
