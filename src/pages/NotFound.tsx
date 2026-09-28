import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
          <h2 className="text-2xl font-semibold">Page Not Found</h2>
        </div>
        <p className="mx-auto max-w-md text-lg text-muted-foreground">This page does not exist.</p>
        <div className="pt-4">
          <Button asChild className="rounded-[30px]">
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
