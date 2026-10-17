import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

/** A token read straight from the DTCG sources: tier, dotted path, raw value and dark-theme value. */
export interface SourceToken {
  tier: 'primitive' | 'semantic' | 'component';
  path: string;
  value: string;
  dark: string | undefined;
}

const SRC = fileURLToPath(new URL('../src/', import.meta.url));
const REFERENCE = /\{([^}]+)\}/g;

const isGroup = (node: unknown): node is Record<string, unknown> => typeof node === 'object' && node !== null;

function flatten(tier: SourceToken['tier'], node: Record<string, unknown>, prefix: string[] = []): SourceToken[] {
  if ('$value' in node) {
    const dark = isGroup(node.$extensions) ? node.$extensions['portfolio.dark'] : undefined;
    return [{ tier, path: prefix.join('.'), value: String(node.$value), dark: typeof dark === 'string' ? dark : undefined }];
  }
  return Object.entries(node).flatMap(([key, child]) => (isGroup(child) ? flatten(tier, child, [...prefix, key]) : []));
}

const readFile = (tier: SourceToken['tier'], file: string): SourceToken[] => {
  const json: unknown = JSON.parse(readFileSync(join(SRC, tier, file), 'utf8'));
  return isGroup(json) ? flatten(tier, json) : [];
};

export function readTokens(): SourceToken[] {
  return (['primitive', 'semantic', 'component'] as const).flatMap((tier) => readdirSync(join(SRC, tier)).map((file) => readFile(tier, file)).flat());
}

/** Follows {references} down to a raw primitive value. */
export function resolve(value: string, tokens: readonly SourceToken[]): string {
  return value.replace(REFERENCE, (_, path: string) => {
    const target = tokens.find((token) => token.path === path);
    if (!target) throw new Error(`Unknown reference {${path}}`);
    return resolve(target.value, tokens);
  });
}

export const withoutReferences = (value: string): string => value.replace(REFERENCE, '');
