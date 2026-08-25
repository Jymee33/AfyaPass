import { Hero } from "@/components/Hero";
import { FeatureGrid } from "@/components/FeatureGrid";
import { PortalSelector } from "@/components/PortalSelector";
import { SecurityNotice } from "@/components/SecurityNotice";

export default function Home() {
  return (
    <div className="space-y-0">
      <Hero />
      <FeatureGrid />
      <PortalSelector />
      <SecurityNotice />
    </div>
  );
}
