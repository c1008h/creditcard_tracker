"use client"
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
    const [selectedCategory, setSelectedCategory] = useState<string>(''); 
    const [selectedMerchant, setSelectedMerchant] = useState<string[]>(['']); 

    const handleCategoryChange = async (e) => {
      e.preventDefault()
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/cashback?category=${selectedCategory}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('returned data: ', data)
        setSelectedMerchant(data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    console.log(selectedMerchant)
    // if (!jsonData) {
    //   return <div>Loading...</div>;
    // }

    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>Category of purchase?</h1>
        <form onSubmit={ handleCategoryChange }>
          <label htmlFor="category">Category of purchase?</label>
          <input
            type="text"
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          />
          <button type='submit'>Submit</button>  
        </form> 
      </main>
    );
}
