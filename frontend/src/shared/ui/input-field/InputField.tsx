import { cn } from "@shared/model/utils";
import { Field, FieldLabel } from "@shared/ui/shadcn/field/Field";
import { Input } from "@shared/ui/shadcn/input/Input";
import { InputHTMLAttributes } from "react";
import { ErrorField } from "@shared/ui/error-field/ErrorField";
import { AppearanceAnimation } from "@shared/ui/appearance-animation/AppearanceAnimation";

interface InputFieldProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  link?: {href: string, text: string};
}

export const InputField = ({id, label, className, link, error, ...props}: InputFieldProps) => {
  return (
    <Field className="space-y-1.5">
      <div className="flex items-center justify-between">
        <FieldLabel
          htmlFor={id}
          className="text-sm font-medium text-text-secondary"
        >
          {label}
        </FieldLabel>
        {link && (
          <a
            href={link.href}
            className="text-xs text-text-link hover:text-text-link-hover active:text-text-link-active transition-colors"
          >
            {link.text}
          </a>
        )}
        
      </div>
      <Input
        id={id}
        className={cn("w-full bg-surface border border-surface-hover text-text-primary placeholder:text-text-tertiary rounded-lg px-3.5 py-2.5 text-sm hover:border-surface-raised transition-colors", className)}
        {...props}
      />
      <AppearanceAnimation show={!!error}>
        <ErrorField errorDescription={error ?? ""}/>
      </AppearanceAnimation>
    </Field>
    
  )
}