import { cn } from "@shared/model/utils";
import { ReactNode } from "react";

interface AppearanceAnimationProps {
  show: boolean;
  children: ReactNode;
  className?: string;
}

export const AppearanceAnimation = ({ show, children, className }: AppearanceAnimationProps) => {
  return (
    <div
      aria-live="polite"
      className={cn(
        "grid transition-all duration-200 ease-out",
        show ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        className
      )}
    >
      <div className="overflow-hidden">
        {children}
      </div>
    </div>
  );
};