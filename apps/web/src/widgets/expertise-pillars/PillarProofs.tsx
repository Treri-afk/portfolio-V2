import { projectPath } from '../../entities/project/index.ts';
import { pillars } from '../../shared/content/index.ts';
import { Eyebrow, Link, Stack, Text } from '../../shared/ui/index.ts';

/** Projects that prove the pillar, linked to their case studies. */
export function PillarProofs({ proofs }: { proofs: readonly { slug: string; title: string }[] }) {
  return (
    <>
      <Eyebrow>{pillars.proofLabel}</Eyebrow>
      <Stack as="ul" direction="row" gap="md" wrap>
        {proofs.map((proof) => (
          <li key={proof.slug}>
            <Text as="span" variant="mono"><Link to={projectPath(proof.slug)}>{proof.title}</Link></Text>
          </li>
        ))}
      </Stack>
    </>
  );
}
