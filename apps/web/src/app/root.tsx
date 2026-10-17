import faviconUrl from '@portfolio/tokens/favicon.svg?url';
import { Outlet } from 'react-router';
import { AppShell } from './layout/AppShell.tsx';
import { Document } from './layout/Document.tsx';
import { RootError } from './layout/RootError.tsx';
import './styles/global.css';
import type { Route } from './+types/root';

export const links: Route.LinksFunction = () => [{ rel: 'icon', type: 'image/svg+xml', href: faviconUrl }];

export { Document as Layout };

export default function App() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  return <AppShell><RootError error={error} /></AppShell>;
}
