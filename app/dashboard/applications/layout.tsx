import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guild Applications',
  description: 'Review incoming player recruitment applications, questionnaire responses, and applicant profiles.',
};

export default function ApplicationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
