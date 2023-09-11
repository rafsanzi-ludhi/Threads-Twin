import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Define label variants for styling
const labelVariants = cva(
  "font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

// Define the Label component using forwardRef for better React interop
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(
  // Destructure and pass in className and any other props
  ({ className, ...props }, ref) => (
    // Use LabelPrimitive.Root as the base component
    <LabelPrimitive.Root
      // Attach the ref, useful for parent components that may need to interact with the DOM element
      ref={ref}
      // Combine default variant classes and any additional classes provided
      className={cn(labelVariants(), className)}
      // Spread any other props onto the Root component
      {...props}
    />
  )
);

// Explicitly set displayName for debugging purposes
Label.displayName = LabelPrimitive.Root.displayName;

// Export the Label component
export { Label };

