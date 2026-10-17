import { ui } from '../../../shared/content/index.ts';
import { Button, Icon } from '../../../shared/ui/index.ts';
import { useTheme } from '../model/useTheme.ts';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const label = theme === 'dark' ? ui.theme.light : ui.theme.dark;
  return (
    <Button variant="ghost" onPress={toggle} aria-label={label}>
      <Icon name={theme === 'dark' ? 'sun' : 'moon'} size="md" />
    </Button>
  );
}
