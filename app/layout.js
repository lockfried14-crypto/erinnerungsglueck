import './globals.css';

export const metadata = {
  title: 'Erinnerungsglück – Familien-Reiseplaner',
  description: 'Planen. Erleben. Erinnern. Gemeinsam Familienzeit genießen.'
};

export default function RootLayout({ children }) {
  return <html lang="de"><body>{children}</body></html>;
}
