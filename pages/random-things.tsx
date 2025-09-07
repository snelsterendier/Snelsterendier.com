import Head from 'next/head';
import { AgeGate } from '@/components/AgeGate';
import { ContentWarning } from '@/components/ContentWarning';
import { useState } from 'react';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export default function RandomDingen() {
  const [ageConfirmed, setAgeConfirmed] = useState(false);

  const quotes = ["Quote 1: REPLACETHISABC", "Quote 2: REPLACETHISABC", "Quote 3: REPLACETHISABC"];
  const avatars = ["Avatar1.webp", "Avatar2.webp", "Avatar3.webp"];
  const [randomQuote, setRandomQuote] = useState(quotes[0]);
  const [randomAvatar, setRandomAvatar] = useState(avatars[0]);

  const generateRandom = () => {
    setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    setRandomAvatar(avatars[Math.floor(Math.random() * avatars.length)]);
  };

  return (
    <>
      <Head>
        <title>Random Dingen | Snelsterendier</title>
        <meta name="description" content="Random generators for quotes, avatars, and horoscopes. REPLACETHISABC." />
        <link rel="canonical" href="https://snelsterendier.example.com/random-dingen" />
      </Head>

      {!ageConfirmed && <AgeGate onConfirm={() => setAgeConfirmed(true)} />}
      {ageConfirmed && (
        <main className="min-h-screen bg-gray-900 text-white p-6">
          <ContentWarning text="All generated content is fictional. REPLACETHISABC." />
          <LanguageSwitcher />

          <h1 className="text-3xl font-bold mb-4">Random Dingen</h1>

          <div className="mb-4">
            <button onClick={generateRandom} className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700">
              Generate Random
            </button>
          </div>

          <div className="mb-2">
            <h2 className="text-xl font-semibold">Quote:</h2>
            <p>{randomQuote}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Avatar:</h2>
            <img src={`/images/${randomAvatar}`} alt="Random avatar" className="w-32 h-32 rounded" />
          </div>
        </main>
      )}
    </>
  );
}
