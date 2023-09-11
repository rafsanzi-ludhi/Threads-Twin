// Inspired by react-hot-toast library
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

// Constants for toast limit and toast removal delay

// const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

// Define the type for ToasterToast, extends ToastProps and adds custom fields

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

// Define action types

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0  // Counter for generating unique toast IDs

// Function to generate a unique ID

function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

type ActionType = typeof actionTypes

// Define the Action type


type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }
  
    // Define the state interface

  interface State {
  toasts: ToasterToast[]
}

// Map to keep track of toast timeouts

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

// Reducer to manage the state of the toast system

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
      }

       // When a toast is updated, map over the existing toasts
       // and update the one that matches the ID
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

        // When a toast is dismissed, set its "open" status to false
        // and add it to the remove queue
    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
      
      // When a toast is removed, filter it out from the state

    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

// Listener array and initial state

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

// Dispatch function to send actions and update state

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

// Type for a toast (omits 'id' from ToasterToast)

type Toast = Omit<ToasterToast, "id">

// Function to create and manage a new toast

function toast({ ...props }: Toast) {
  const id = genId()

    // Function to update a specific toast

const update = (props: ToasterToast) =>
  dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props, id }, // `id` is already shorthand here
  });

  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

    // Function to dismiss a specific toast

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id,
    dismiss,
    update,
  }

}

// Hook to use the toast functionality

function useToast() {
    // State to hold the toasts

  const [state, setState] = React.useState<State>(memoryState)

    // Register and unregister listeners for the toast state


  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

    // Expose state and functions to create and dismiss toasts


  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}


// Export the hook and toast function for usage in other components

export { useToast, toast }
