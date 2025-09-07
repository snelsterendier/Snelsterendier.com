import Head from 'next/head';
import { AgeGate } from '@/components/AgeGate';
import { ContentWarning } from '@/components/ContentWarning';
import { useState } from 'react';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

const hallOfFame = [
  { name: 'SnelFan1', achievement: 'REPLACETHISABC' },
  { name: 'SnelFan2', achievement: 'REPLACETHISABC' },
];

export default function HallOfFame() {
  const [ageConfirmed, setAgeConfirmed] = useState(false);

  return (
    <>
      <Head>
        <title>Hall of Fame | Snelsterendier</title>
        <meta name="description" content="Top contributors and fictional achievements. REPLACETHISABC." />
        <link rel="canonical" href="https://snelsterendier.example.com/hall-of-fame" />
      </Head>

      {!ageConfirmed && <AgeGate onConfirm={() => setAgeConfirmed(true)} />}
      {ageConfirmed && (
        <main className="min-h-screen bg-gray-900 text-white p-6">
          <ContentWarning text="All achievements are fictional. REPLACETHISABC." />
          <LanguageSwitcher />

          <h1 className="text-3xl font-bold mb-4">Hall of Fame</h1>
          <ul className="list-disc pl-6">
            {hallOfFame.map((h, i) => (
              <li key={i}>{h.name}: {h.achievement}</li>
            ))}
          </ul>
        </main>
      )}
    </>
  );
}
