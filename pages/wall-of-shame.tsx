import Head from 'next/head';
import { ContentWarning } from '@/components/ContentWarning';
import { AgeGate } from '@/components/AgeGate';
import { useState } from 'react';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

const offenders = [
  { name: 'User123', reason: 'REPLACETHISABC' },
  { name: 'BugHater42', reason: 'REPLACETHISABC' },
];

export default function WallOfShame() {
  const [ageConfirmed, setAgeConfirmed] = useState(false);

  return (
    <>
      <Head>
        <title>Wall of Shame | Snelsterendier</title>
        <meta name="description" content="Playful list of fictional rule-breakers. REPLACETHISABC." />
        <link rel="canonical" href="https://snelsterendier.example.com/wall-of-shame" />
      </Head>

      {!ageConfirmed && <AgeGate onConfirm={() => setAgeConfirmed(true)} />}
      {ageConfirmed && (
        <main className="min-h-screen bg-gray-900 text-white p-6">
          <ContentWarning text="Fictional offenders only. REPLACETHISABC." />
          <LanguageSwitcher />

          <h1 className="text-3xl font-bold mb-4">Wall of Shame</h1>
          <ul className="list-disc pl-6">
            {offenders.map((o, i) => (
              <li key={i}>{o.name}: {o.reason}</li>
            ))}
          </ul>
        </main>
      )}
    </>
  );
}
