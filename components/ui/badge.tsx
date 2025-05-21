import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground",
        outline: "text-foreground",
        success: "border-transparent bg-green-500 text-white",
        demo: "border-transparent bg-orange-100 text-orange-800",
        internal: "border-transparent bg-green-100 text-green-800",
        signup: "border-transparent bg-blue-100 text-blue-800",
        content: "border-transparent bg-purple-100 text-purple-800",
        dontsend: "border-transparent bg-red-100 text-red-800",
        unread: "border-transparent bg-green-500 text-white min-w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold px-1",
        filter: "border border-green-500 bg-green-100 text-green-800 rounded-md px-3 py-1",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-1.5 py-0.5 text-xs",
        lg: "px-3 py-0.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}

export { Badge, badgeVariants }