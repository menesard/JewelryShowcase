// kuyum-vitrin/frontend/client/src/app/page.js

export const dynamic = 'force-dynamic'; // Ensures the page is always server-rendered

import styles from './page.module.css';

// This is a Server Component, so we can fetch data directly.
async function getLivePrices() {
  try {
    // We need to use the full URL when fetching on the server-side.
    // In a real-world scenario, this would be an environment variable.
    const res = await fetch('http://localhost:5000/api/prices', {
      cache: 'no-store' // This ensures we always get the latest data.
    });

    if (!res.ok) {
      // If the response is not ok, we return an error state.
      console.error(`Failed to fetch prices: ${res.status} ${res.statusText}`);
      return { error: `Veriler alınamadı. Durum: ${res.status}` };
    }

    return res.json();
  } catch (error) {
    console.error('An error occurred while fetching prices:', error);
    return { error: 'Fiyatlar yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.' };
  }
}

export default async function HomePage() {
  const prices = await getLivePrices();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>KuyumVitrin</h1>
        <p>Anlık Fiyatlar</p>
      </header>

      <section className={styles.priceList}>
        {prices.error ? (
          <div className={styles.error}>
            <p>{prices.error}</p>
          </div>
        ) : (
          prices.map((price) => (
            <div key={price.assetCode} className={styles.priceCard}>
              <h2>{price.assetCode.replace('_', ' ')}</h2>
              <div className={styles.priceDetails}>
                <p>Alış: <span>{price.buyPrice.toFixed(2)} TL</span></p>
                <p>Satış: <span>{price.sellPrice.toFixed(2)} TL</span></p>
              </div>
              <small>Kaynak: {price.source}</small>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
