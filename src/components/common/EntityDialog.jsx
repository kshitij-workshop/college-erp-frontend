import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const sizes = {
  sm: "max-w-md",
  md: "max-w-2xl",
  lg: "max-w-4xl",
  xl: "max-w-5xl",
  full: "max-w-7xl",
};

export default function EntityDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  size = "lg",
}) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent
        className={`
          ${sizes[size]}
          max-w-5xl
        h-[90vh]
        p-0
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-0
          shadow-2xl
        `}
      >
        {/* Header */}

        <DialogHeader className="border-b bg-slate-50/70 px-8 py-6">

          <DialogTitle className="text-2xl font-bold tracking-tight text-slate-900">

            {title}

          </DialogTitle>

          {description && (
            <DialogDescription className="pt-1 text-sm text-slate-500">

              {description}

            </DialogDescription>
          )}

        </DialogHeader>

        {/* Body */}

        <div className="flex-1 overflow-y-auto px-8 py-8">

          {children}

        </div>

      </DialogContent>

    </Dialog>
  );
}