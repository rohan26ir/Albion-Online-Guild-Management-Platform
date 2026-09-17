import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Buy / Sell Profit Calculator',
  description: 'Calculate flip margins, Albion Online order setup fees, 4% vs 8% sales taxes, and break-even sell prices in Silver.',
};

export default function TradeProfitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
