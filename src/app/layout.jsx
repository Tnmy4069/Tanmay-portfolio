import '../index.css';
import { prisma } from '../lib/prisma';

export const metadata = {
  title: 'Tanmay Hirodkar — Zero-G Portfolio',
  description: 'Tanmay Hirodkar — Project Manager, Software Developer, and Tech Lead. Building scalable systems with AI, Cloud, and Full-Stack technologies.',
};

export default async function RootLayout({ children }) {
  const about = await prisma.about.findFirst();
  const currentTheme = about?.theme || 'cyan';

  return (
    <html lang="en" data-theme={currentTheme}>
      <head>
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='80' font-size='80'>⬡</text></svg>" />
      </head>
      <body>{children}</body>
    </html>
  );
}
