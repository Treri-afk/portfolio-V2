import { technologySchema, type Technology } from '@portfolio/contracts';
import { parse } from 'yaml';
import { z } from 'zod';
import catalog from '../../../shared/content/technologies.yaml?raw';

/** Technology catalog, validated at build time. */
export function listTechnologies(): Technology[] {
  return z.array(technologySchema).parse(parse(catalog));
}
