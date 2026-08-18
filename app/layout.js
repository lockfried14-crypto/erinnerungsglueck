import './globals.css';
import './brand-fix.css';

export const metadata = {
  title: 'Erinnerungsglück – Familien-Reiseplaner',
  description: 'Planen. Erleben. Erinnern. Gemeinsam Familienzeit genießen.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="de" style={{ colorScheme: 'light' }}>
      <head>
        <meta name="color-scheme" content="light only" />
        <meta name="theme-color" content="#fff9f1" />
      </head>
      <body style={{ colorScheme: 'light', backgroundColor: '#fff9f1' }}>{children}</body>
    </html>
  );
}
