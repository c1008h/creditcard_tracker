"use client"

import Image from 'next/image'
import { useEffect, useState } from 'react'; 

interface CardData {
  Card: string;
  'Annual-Fee': string;
  'Foreign-Transaction': string;
  'CashBack': {
    [category: string]: {
      amount: string;
      details: string;
      excludes?: string;
    }[];
  };
}

export default function Home() {
    const [jsonData, setJsonData] = useState<CardData[] | null>(null);

    useEffect(() => {
      fetch('/data.json') 
      .then((response) => response.json())
      .then((data: CardData[]) => setJsonData(data));
    }, []);

    // function setCashBack() {
    //   if (jsonData){
    //     const cashbackArray = jsonData.map((item) => item.CashBack);
    //     setCashbackData(cashbackArray);
    //   }
    //   console.log("Cashback data: ", cashbackData)
    // }

    console.log('jsonData: ', jsonData)

    if (!jsonData) {
      return <div>Loading...</div>;
    }

    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>What Credit Cards Do You Have?</h1>
        {jsonData.map((card, index) => (
        <div key={index}>
          <h2>{card.Card}</h2>
          <ul>
            {Object.keys(card.CashBack).map((category) => (
              <li key={category}>
                <strong>{category}:</strong>
                <ul>
                  {card.CashBack[category].map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <strong>Amount: {item.amount}</strong>
                      <p>{item.details}</p>
                      {item.excludes && <p>Excludes: {item.excludes}</p>}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ))}
      </main>
    );
}
