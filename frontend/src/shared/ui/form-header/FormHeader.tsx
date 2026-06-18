import { cn } from "@shared/model/utils";
import { ReactNode } from "react";
import { IconContainer } from "@shared/ui/icon-container/IconContainer";

type FormHeaderProps = {
  icon?: ReactNode;
  title: string;
  description?: string;
  className?: string;
};

export const FormHeader = ({
  icon,
  title,
  description,
  className
}: FormHeaderProps) => {
  return (
    <div className={cn("text-center", className)}>
      {icon && (
        <IconContainer 
          icon={icon}
          size="md"
          tone="indigo"
        />
      )}

      <h1 className="font-semibold text-text-primary">
        {title}
      </h1>

      {description && (
        <p className="text-sm text-text-secondary">
          {description}
        </p>
      )}
    </div>
  );
}