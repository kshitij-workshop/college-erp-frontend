import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function ProfileHeader({
  photoUrl,
  name,
  subtitle,
  description,
  status,
}) {
  return (
    <div className="rounded-3xl border bg-white p-8 shadow-sm">
      <div className="flex flex-col items-center text-center">
        <Avatar className="h-28 w-28">
          <AvatarImage src={photoUrl || ""} alt={name} />
          <AvatarFallback className="text-3xl font-semibold">
            {name?.charAt(0)?.toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <h1 className="mt-4 text-2xl font-bold">
          {name}
        </h1>

        {subtitle && (
          <p className="mt-1 text-sm font-medium text-muted-foreground">
            {subtitle}
          </p>
        )}

        {description && (
          <p className="mt-1 text-sm text-muted-foreground">
            {description}
          </p>
        )}

        <Badge className="mt-4" variant="secondary">
          {status}
        </Badge>
      </div>
    </div>
  );
}