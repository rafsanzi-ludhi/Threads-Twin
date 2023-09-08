// Import React library
import * as React from "react";

// Import utility function for class names
import { cn } from "@/lib/utils";

// Define the type for Textarea props, extending the native attributes
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

// Create the Textarea component with forwarded Ref
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  // Apply Tailwind CSS styling and enable className prop for customization
  ({ className, ...props }, ref) => {
    return (
      <textarea
        // Utilize utility function `cn` to apply class names, allowing for overrides via className prop
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-slate-200 border-slate-200 bg-transparent px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:border-slate-800 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-800",
          className
        )}
        // Forward the ref
        ref={ref}
        // Spread any remaining props
        {...props}
      />
    )
  }
);

// Set the displayName for easier debugging
Textarea.displayName = "Textarea";

// Export the Textarea component
export { Textarea };

