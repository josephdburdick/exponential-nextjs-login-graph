import { buttonVariants } from "@/components/ui/button"
import ROUTES from "@/lib/constants/routes"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center p-24">
      <div className="mx-auto max-w-md space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Coming Soon
          </h1>
          <p className="text-muted-foreground">
            We&apos;re working hard to bring you something amazing. <br />
            Login below to view Dashboard.
          </p>
        </div>

        <Link
          href={ROUTES.login.path}
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          {ROUTES.login.label}
        </Link>
      </div>
    </main>
  )
}
