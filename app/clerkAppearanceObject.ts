import type { Appearance } from "@clerk/ui";

/**
 * This object can be customized to change Clerk's built-in appearance. To learn more: https://clerk.com/docs/customization/overview
 */
export const clerkAppearanceObject = {
  cssLayerName: "clerk",
  elements: {
    card: "bg-card text-card-foreground shadow-sm border border-border rounded-xl",
    headerTitle: "text-foreground",
    headerSubtitle: "text-muted-foreground",
    socialButtonsBlockButton:
      "border-border bg-background text-foreground hover:bg-muted rounded-lg text-sm font-medium transition-all",
    socialButtonsBlockButtonText: "font-medium text-foreground",
    formButtonPrimary:
      "bg-primary text-primary-foreground hover:bg-primary/80 rounded-lg h-9 px-3 text-sm font-medium transition-all",
    formButtonReset:
      "text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg text-sm font-medium transition-all",
    formFieldLabel: "text-foreground text-sm font-medium",
    formFieldInput:
      "border-input bg-background text-foreground rounded-lg text-sm ring-ring/50 focus:border-ring focus:ring-2 transition-all",
    footerActionLink: "text-primary hover:text-primary/80 font-medium",
    membersPageInviteButton:
      "bg-primary text-primary-foreground hover:bg-primary/80 border border-transparent rounded-lg text-sm font-medium transition-all",
    userButtonPopoverCard:
      "bg-popover text-popover-foreground border-border shadow-md rounded-xl",
    userButtonPopoverActionButton:
      "text-foreground hover:bg-muted rounded-md transition-all",
    userButtonPopoverActionButtonText: "text-sm text-foreground",
    userButtonPopoverFooter: "border-border",
    badge:
      "bg-secondary text-secondary-foreground rounded-md text-xs font-medium px-2 py-0.5",
    dividerLine: "bg-border",
    dividerText: "text-muted-foreground text-xs",
    formFieldSuccessText: "text-emerald-600 text-sm",
    formFieldErrorText: "text-destructive text-sm",
    alertText: "text-destructive text-sm",
    identityPreview: "border-border bg-muted/50 rounded-lg",
    identityPreviewText: "text-foreground text-sm",
    identityPreviewEditButton: "text-primary hover:text-primary/80",
  },
} satisfies Appearance;
