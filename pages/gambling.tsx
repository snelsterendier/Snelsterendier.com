import Head from 'next/head';
import { useEffect, useState } from 'react';
import { AgeGate } from '@/components/AgeGate';
import { ContentWarning } from '@/components/ContentWarning';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

type Bet = { user: string; amount: number; choice: string };

export default function Gambling() {
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [bets, setBets] = useState<Bet[]>([]);
  const [userBet, setUserBet] = useState({ user: '', amount: 0, choice: '' });

  useEffect(() => {
    fetch('/api/bets')
      .then(res => res.json())
      .then(setBets);
  }, []);

  const placeBet = async () => {
    await fetch('/api/bets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userBet),
    });
    setBets([...bets, userBet]);
    setUserBet({ user: '', amount: 0, choice: '' });
  };

  return (
    <>
      <Head>
        <title>Gambling | Snelsterendier</title>
        <meta name="description" content="Play with SnelCoins. REPLACETHISABC." />
        <link rel="canonical" href="https://snelsterendier.example.com/gambling" />
      </Head>

      {!ageConfirmed && <AgeGate onConfirm={() => setAgeConfirmed(true)} />}
      {ageConfirmed && (
        <main className="min-h-screen bg-gray-900 text-white p-6">
          <ContentWarning text="Fictional gambling only. No real money. REPLACETHISABC." />
          <LanguageSwitcher />
          <h1 className="text-3xl font-bold mb-4">SnelCoins Gambling</h1>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Username"
              value={userBet.user}
              onChange={e => setUserBet({ ...userBet, user: e.target.value })}
              className="p-2 m-1 rounded text-black"
            />
            <input
              type="number"
              placeholder="Amount"
              value={userBet.amount}
              onChange={e => setUserBet({ ...userBet, amount: Number(e.target.value) })}
              className="p-2 m-1 rounded text-black"
            />
            <input
              type="text"
              placeholder="Choice (e.g., cookies)"
              value={userBet.choice}
              onChange={e => setUserBet({ ...userBet, choice: e.target.value })}
              className="p-2 m-1 rounded text-black"
            />
            <button
              onClick={placeBet}
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
            >
              Place Bet
            </button>
          </div>

          <h2 className="text-2xl mb-2">Current Bets</h2>
          <ul>
            {bets.map((b, i) => (
              <li key={i}>{b.user} bet {b.amount} SnelCoins on {b.choice}</li>
            ))}
          </ul>
        </main>
      )}
    </>
  );
}
