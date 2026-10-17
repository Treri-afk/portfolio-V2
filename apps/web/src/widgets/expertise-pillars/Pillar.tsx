import clsx from 'clsx';
import { Heading, Stack, Text, accentBarClass } from '../../shared/ui/index.ts';
import styles from './ExpertisePillars.module.css';
import { PillarProofs } from './PillarProofs.tsx';

interface PillarProps {
  title: string;
  text: string;
  proofs: readonly { slug: string; title: string }[];
}

export function Pillar({ title, text, proofs }: PillarProps) {
  return (
    <li className={clsx(styles.pillar, accentBarClass)}>
      <Stack gap="md">
        <Heading level={3} size="heading-l">{title}</Heading>
        <Text tone="secondary">{text}</Text>
        <PillarProofs proofs={proofs} />
      </Stack>
    </li>
  );
}
