import type { Metadata } from "next";
import UnderDevelopment from "@/components/shared/UnderDevelopment";

export const metadata: Metadata = {
  title: "Manage Auctions",
  description: "Monitor active bids, finalize auction winners, and track silver payouts.",
};

export default function page () {
  return(
    <div>

      {/* heading */}
      <div>
        <h2>Manage Auction</h2>
      </div>

      {/* content */}
      <UnderDevelopment progress={45} />


    </div>
  )
}