import './globals.css';

export const metadata = {
  title: 'Erinnerungsglück – Familien-Reiseplaner',
  description: 'Planen. Erleben. Erinnern. Gemeinsam Familienzeit genießen.',
  themeColor: '#fff8ef'
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: '#fff8ef'
};

export default function RootLayout({ children }) {
  return (
    <html lang="de" style={{ backgroundColor: '#fff8ef' }}>
      <head>
        <meta name="color-scheme" content="light dark" />
        <meta name="supported-color-schemes" content="light dark" />
        <meta name="theme-color" content="#fff8ef" />
      </head>
      <body>{children}</body>
    </html>
  );
}
