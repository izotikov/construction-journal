import { cn } from "@shared/model/utils";
import { cva, VariantProps } from "class-variance-authority";
import { ReactNode } from "react";

const iconContainerVariants = cva(
  "inline-flex items-center justify-center rounded-2xl",
  {
    variants: {
      size: {
        sm: "w-8 h-8",
        md: "w-12 h-12",
        lg: "w-16 h-16",
      },
      tone: {
        indigo: "bg-brand text-text-primary",
        dark: "bg-surface text-text-primary",
      },
    },
    defaultVariants: {
      size: "md",
      tone: "indigo",
    },
  }
);

type Props = {
  icon: ReactNode;
} & VariantProps<typeof iconContainerVariants>;

export const IconContainer = (
  {
    icon,
    size,
    tone,
  }: Props) => {
  return (
    <div
      className={cn(iconContainerVariants({ size, tone }))}
    >
      {icon}
    </div>
  )
}