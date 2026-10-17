import { nav } from '../../shared/content/index.ts';
import { Link, Stack } from '../../shared/ui/index.ts';
import styles from './SiteHeader.module.css';

export function MainNav() {
  return (
    <nav aria-label={nav.label} className={styles.nav}>
      <Stack as="ul" direction="row" gap="lg">
        {nav.items.map((item) => (
          <li key={item.to}>
            <Link to={item.to} variant="nav">{item.label}</Link>
          </li>
        ))}
      </Stack>
    </nav>
  );
}
