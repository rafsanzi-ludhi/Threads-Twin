// Enables the "client" database context (Assumed based on the directive)
"use client"

// Import the required components from the Toast UI library
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

// Import the custom hook for toast management
import { useToast } from "@/components/ui/use-toast";

// Define the Toaster component
export function Toaster() {
  // Use the `useToast` hook to get an array of toasts
  const { toasts } = useToast();

  return (
    // Wrap the toasts in a ToastProvider for context management
    <ToastProvider>
      {/* Map through each toast to render them */}
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          // Use the `Toast` component for each toast
          <Toast key={id} {...props}>
            {/* Arrange the title and description in a grid */}
            <div className="grid gap-1">
              {/* Render the title if it exists */}
              {title && <ToastTitle>{title}</ToastTitle>}
              
              {/* Render the description if it exists */}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            
            {/* If an action is specified, render it */}
            {action}
            
            {/* Add a close button to the toast */}
            <ToastClose />
          </Toast>
        )
      })}
      
      {/* Add the ToastViewport for managing toast display */}
      <ToastViewport />
    </ToastProvider>
  )
}
