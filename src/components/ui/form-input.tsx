import { ComponentProps, forwardRef } from "react";
import { Input } from "./input";
import { Label } from "./label";
import { cn } from "@/lib/utils";
import { FieldError } from "react-hook-form";
import { LucideIcon } from "lucide-react";

interface FormInputProps extends ComponentProps<typeof Input> {
  label: string;
  error?: FieldError;
  icon?: LucideIcon;
  autoComplete?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, icon: Icon, className, autoComplete, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <Label htmlFor={props.id} className="text-sm font-medium text-gray-700">
          {label}
        </Label>
        <div className="relative">
          {Icon && (
            <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          )}
          <Input
            ref={ref}
            autoComplete={autoComplete}
            className={cn(
              "h-12 border-gray-200 focus:ring-emerald-500",
              Icon && "pl-10",
              "focus:border-emerald-500 focus:ring-emerald-500",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500",
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="text-red-500 text-sm animate-slideDown">{error.message}</p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export { FormInput }; 