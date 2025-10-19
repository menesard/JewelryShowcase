// kuyum-vitrin/frontend/client/src/app/layout.js
import './globals.css';

export const metadata = {
  title: 'KuyumVitrin - Altının Modern Yüzü',
  description: 'Kuyumcular için B2B ve B2C e-ticaret platformu.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        {/* We will add a Header component here later */}
        <main>{children}</main>
        {/* We will add a Footer component here later */}
      </body>
    </html>
  );
}
