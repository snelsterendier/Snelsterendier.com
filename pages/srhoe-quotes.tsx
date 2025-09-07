import Head from 'next/head';
import { QuoteWall } from '@/components/QuoteWall';
import { ContentWarning } from '@/components/ContentWarning';
import { AgeGate } from '@/components/AgeGate';
import { useState } from 'react';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export default function SrhoeQuotes() {
  const [ageConfirmed, setAgeConfirmed] = useState(false);

  return (
    <>
      <Head>
        <title>Srhoe Quotes | Snelsterendier</title>
        <meta name="description" content="User-submitted Srhoe quotes. REPLACETHISABC." />
        <meta property="og:title" content="Srhoe Quotes" />
        <meta property="og:description" content="All content fictional. REPLACETHISABC." />
        <link rel="canonical" href="https://snelsterendier.example.com/Srhoe-quotes" />
      </Head>

      {!ageConfirmed && <AgeGate onConfirm={() => setAgeConfirmed(true)} />}
      {ageConfirmed && (
        <main className="min-h-screen bg-gray-900 text-white p-6">
          <ContentWarning text="I'm Snelsterendier, I eat humans." />
          <LanguageSwitcher />

          <h1 className="text-3xl font-bold mb-4">Srhoe Quotes</h1>
          <QuoteWall />
        </main>
      )}
    </>
  );
}
