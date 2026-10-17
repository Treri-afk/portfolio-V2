import { ThemeToggle } from '../../features/toggle-theme/index.ts';
import { nav, site } from '../../shared/content/index.ts';
import { Container, Link } from '../../shared/ui/index.ts';
import styles from './SiteHeader.module.css';

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <Container size="wide" className={styles.inner}>
        <Link to="/" variant="standalone" className={styles.brand}>{site.name}</Link>
        <nav aria-label={nav.label} className={styles.nav}>
          <ul className={styles.list}>
            {nav.items.map((item) => (
              <li key={item.to}>
                <Link to={item.to} variant="nav">{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.toggle}>
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}
