import { Button } from "@/components/ui/button";

export default function PageHeader({
  title,
  description,
  buttonText,
  buttonIcon: Icon,
  onButtonClick,
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

      <div>

        <h1 className="text-3xl font-bold tracking-tight">
          {title}
        </h1>

        <p className="text-muted-foreground mt-1">
          {description}
        </p>

      </div>

      {buttonText && (
        <Button onClick={onButtonClick}>

          {Icon && <Icon className="mr-2 h-4 w-4" />}

          {buttonText}

        </Button>
      )}

    </div>
  );
}