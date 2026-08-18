import './globals.css';

export const metadata = {
  title: 'Erinnerungsglück – Familien-Reiseplaner',
  description: 'Planen. Erleben. Erinnern. Gemeinsam Familienzeit genießen.'
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: '#fff8ef',
  colorScheme: 'light'
};

export default function RootLayout({ children }) {
  return (
    <html lang="de" style={{ backgroundColor: '#fff8ef', colorScheme: 'light' }}>
      <head>
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
        <meta name="theme-color" content="#fff8ef" />
      </head>
      <body style={{ backgroundColor: '#fff8ef', colorScheme: 'light' }}>{children}</body>
    </html>
  );
}
