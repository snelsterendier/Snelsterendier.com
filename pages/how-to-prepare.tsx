import Head from 'next/head';
import { AgeGate } from '@/components/AgeGate';
import { ContentWarning } from '@/components/ContentWarning';
import { useState } from 'react';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export default function HowToPrepare() {
  const [ageConfirmed, setAgeConfirmed] = useState(false);

  const steps = [
    "Step 1: REPLACETHISABC",
    "Step 2: REPLACETHISABC",
    "Step 3: Use cookies or stage props instead of anything dangerous.",
  ];

  return (
    <>
      <Head>
        <title>How to Prepare | Snelsterendier</title>
        <meta name="description" content="Fictional preparation guide. REPLACETHISABC." />
        <link rel="canonical" href="https://snelsterendier.example.com/how-to-prepare" />
      </Head>

      {!ageConfirmed && <AgeGate onConfirm={() => setAgeConfirmed(true)} />}
      {ageConfirmed && (
        <main className="min-h-screen bg-gray-900 text-white p-6">
          <ContentWarning text="All instructions are fictional. REPLACETHISABC." />
          <LanguageSwitcher />

          <h1 className="text-3xl font-bold mb-4">How to Prepare</h1>
          <ol className="list-decimal pl-6">
            {steps.map((s, i) => <li key={i}>{s}</li>)}
          </ol>
        </main>
      )}
    </>
  );
}
