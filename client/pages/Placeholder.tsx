import Layout from "@/components/Layout";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface PlaceholderProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export default function Placeholder({ title, description, icon }: PlaceholderProps) {
  return (
    <Layout>
      <div className="p-8">
        <Link to="/dashboard" className="flex items-center gap-2 text-primary hover:text-primary-700 font-semibold mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="flex flex-col items-center justify-center min-h-[500px] text-center">
          {icon && <div className="mb-6 text-6xl">{icon}</div>}
          <h1 className="text-3xl font-bold text-foreground mb-3">{title}</h1>
          <p className="text-lg text-muted-foreground max-w-md mb-8">{description}</p>
          
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 max-w-md">
            <p className="text-sm text-foreground mb-3">
              This page is ready for implementation. Continue prompting to fill in the content for this module.
            </p>
            <p className="text-xs text-muted-foreground">
              The navigation is fully functional and this placeholder maintains the overall system structure.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
