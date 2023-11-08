"use client"

import Image from 'next/image'
import { useEffect, useState } from 'react'; 
import axios from 'axios';

export default function Home() {
  const [apiData, setApiData] = useState(null); 
  
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>What Credit Cards Do You Have?</h1>
        {apiData && <pre>{JSON.stringify(apiData, null, 2)}</pre>} {/* Render the API data */}
      </main>
    );
}
