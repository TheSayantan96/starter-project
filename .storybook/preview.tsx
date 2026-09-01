import type { Preview } from "@storybook/nextjs-vite"
import * as React from "react"
import { Geist_Mono, Inter } from "next/font/google"
import { withThemeByClassName } from "@storybook/addon-themes"

import "../app/globals.css"
import { TooltipProvider } from "../components/ui/tooltip"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

// Overlay components (dialog, dropdown-menu, popover, etc.) render their
// content in a portal appended directly to `document.body`, outside any
// wrapper div in the React tree. Applying the font classes there (instead
// of on a wrapper) makes them inherit the same CSS vars as the rest of app.
const fontBodyClasses = [
  "antialiased",
  "font-sans",
  fontMono.variable,
  inter.variable,
]

const preview: Preview = {
  decorators: [
    (Story) => {
      React.useEffect(() => {
        document.body.classList.add(...fontBodyClasses)
        return () => {
          document.body.classList.remove(...fontBodyClasses)
        }
      }, [])

      return (
        <TooltipProvider>
          <Story />
        </TooltipProvider>
      )
    },
    withThemeByClassName({
      themes: {
        light: "",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "error",
    },
  },
}

export default preview
