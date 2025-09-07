import Head from 'next/head';
import { AgeGate } from '@/components/AgeGate';
import { ContentWarning } from '@/components/ContentWarning';
import { useState } from 'react';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export default function WieBenIk() {
  const [ageConfirmed, setAgeConfirmed] = useState(false);

  return (
    <>
      <Head>
        <title>Wie ben ik? | Snelsterendier</title>
        <meta name="description" content="About Snelsterendier lore and origin. REPLACETHISABC." />
        <link rel="canonical" href="https://snelsterendier.example.com/wie-ben-ik" />
      </Head>

      {!ageConfirmed && <AgeGate onConfirm={() => setAgeConfirmed(true)} />}
      {ageConfirmed && (
        <main className="min-h-screen bg-gray-900 text-white p-6">
          <ContentWarning text="Fictional lore. REPLACETHISABC." />
          <LanguageSwitcher />

          <h1 className="text-3xl font-bold mb-4">Wie ben ik?</h1>
          <p>
            Snelsterendier is a whimsical, fictional character created to entertain with dark humor.
            Origin, mission, and adventures are purely imaginative. REPLACETHISABC.
          </p>
        </main>
      )}
    </>
  );
}
