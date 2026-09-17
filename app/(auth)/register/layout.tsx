import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register',
  description: 'Create an Albion Online Guild Management account.',
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
