import { ThemeToggle } from '../../features/toggle-theme/index.ts';
import { site } from '../../shared/content/index.ts';
import { Container, Link } from '../../shared/ui/index.ts';
import { MainNav } from './MainNav.tsx';
import styles from './SiteHeader.module.css';

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <Container size="wide" className={styles.inner}>
        <Link to="/" variant="standalone" className={styles.brand}>{site.name}</Link>
        <MainNav />
        <div className={styles.toggle}>
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}
