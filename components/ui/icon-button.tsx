import * as React from "react"
import { cn } from "@/lib/utils"
import { ButtonHTMLAttributes } from "react"

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "outline" | "secondary" | "primary" | "link"
  size?: "sm" | "md" | "lg" | "icon"
  isActive?: boolean
  children: React.ReactNode
}

export const IconButton = React.forwardRef<
  HTMLButtonElement,
  IconButtonProps
>(({ className, variant = "ghost", size = "icon", isActive = false, children, ...props }, ref) => {
  const variantStyles = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    primary: "bg-green-500 text-white hover:bg-green-600",
    link: "text-primary underline-offset-4 hover:underline",
  }

  const sizeStyles = {
    sm: "h-8 w-8 rounded-full p-0",
    md: "h-9 w-9 rounded-full p-0",
    lg: "h-10 w-10 rounded-full p-0",
    icon: "h-10 w-10 rounded-full p-0",
  }

  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variantStyles[variant],
        sizeStyles[size],
        isActive && "bg-accent text-accent-foreground",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
})

IconButton.displayName = "IconButton"