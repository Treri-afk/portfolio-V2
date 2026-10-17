import type { ReactNode } from 'react';
import { ui } from '../../shared/content/index.ts';
import { SkipLink } from '../../shared/ui/index.ts';
import { SiteFooter } from '../../widgets/site-footer/index.ts';
import { SiteHeader } from '../../widgets/site-header/index.ts';
import styles from './AppShell.module.css';

const MAIN_ID = 'contenu';

/** Page frame: also the size container used by slanted cuts (cqi), and it clips horizontal overflow. */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className={styles.page}>
      <SkipLink target={MAIN_ID} label={ui.skipLink} />
      <SiteHeader />
      <main id={MAIN_ID} tabIndex={-1} className={styles.main}>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
