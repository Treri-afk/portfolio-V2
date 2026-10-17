import { VisuallyHidden } from '../../../shared/ui/index.ts';

/** Field invisible to everyone, assistive tech included; bots fill it and the contract rejects them (max length 0). */
export function Honeypot({ label }: { label: string }) {
  return (
    <div aria-hidden="true">
      <VisuallyHidden>
        <label>
          {label}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </VisuallyHidden>
    </div>
  );
}
