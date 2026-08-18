import './globals.css';

export const metadata = {
  title: 'Erinnerungsglück – Familien-Reiseplaner',
  description: 'Planen. Erleben. Erinnern. Gemeinsam Familienzeit genießen.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="de" style={{ colorScheme: 'only light' }}>
      <head>
        <meta name="color-scheme" content="only light" />
        <meta name="theme-color" content="#f8f0e8" />
      </head>
      <body style={{ colorScheme: 'only light' }}>{children}</body>
    </html>
  );
}
