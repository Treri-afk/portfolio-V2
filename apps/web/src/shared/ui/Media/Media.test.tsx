// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Media } from './Media.tsx';

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

const image = { src: '/media/demo/a.jpg', alt: 'Logo de démo', width: 960, height: 960 } as const;

describe('Media', () => {
  it('renders a picture when there is no animation', () => {
    const { container } = render(<Media {...image} />);
    expect(screen.getByRole('img', { name: 'Logo de démo' }).getAttribute('src')).toBe('/media/demo/a.jpg');
    expect(container.querySelector('video')).toBeNull();
  });

  it('renders the clip with the still as poster and keeps the text alternative', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: false }));
    const { container } = render(<Media {...image} animation="/media/demo/a.mp4" />);
    const video = container.querySelector('video');
    expect(video?.getAttribute('src')).toBe('/media/demo/a.mp4');
    expect(video?.getAttribute('poster')).toBe('/media/demo/a.jpg');
    expect(video?.getAttribute('aria-hidden')).toBe('true');
    expect(screen.getByText('Logo de démo')).toBeTruthy();
  });
});
