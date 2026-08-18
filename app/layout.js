import './globals.css';

export const metadata = {
  title: 'Erinnerungsglück – Familien-Reiseplaner',
  description: 'Planen. Erleben. Erinnern. Gemeinsam Familienzeit genießen.',
  colorScheme: 'only light',
  themeColor: '#fff8ef'
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  colorScheme: 'only light',
  themeColor: '#fff8ef'
};

export default function RootLayout({ children }) {
  return (
    <html lang="de" style={{ colorScheme: 'only light', backgroundColor: '#fff8ef' }}>
      <head>
        <meta name="color-scheme" content="only light" />
        <meta name="supported-color-schemes" content="light" />
        <meta name="theme-color" content="#fff8ef" />
      </head>
      <body style={{ colorScheme: 'only light', backgroundColor: '#fff8ef' }}>{children}</body>
    </html>
  );
}
