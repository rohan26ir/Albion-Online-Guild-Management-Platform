import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Public Application Link',
  description: 'Generate and configure custom public guild recruitment application links and forms.',
};

export default function PublicUrlLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
