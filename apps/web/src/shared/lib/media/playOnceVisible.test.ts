// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { playOnceVisible } from './playOnceVisible.ts';

type Callback = (entries: { isIntersecting: boolean }[]) => void;

function setup(motionAllowed: boolean) {
  let notify: Callback = () => undefined;
  const disconnect = vi.fn();
  vi.stubGlobal('matchMedia', () => ({ matches: motionAllowed }));
  vi.stubGlobal('IntersectionObserver', function (callback: Callback) {
    notify = callback;
    return { observe: vi.fn(), disconnect };
  });
  const video = document.createElement('video');
  const play = vi.spyOn(video, 'play').mockResolvedValue(undefined);
  return { video, play, disconnect, notify: (isIntersecting: boolean) => { notify([{ isIntersecting }]); } };
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('playOnceVisible', () => {
  it('plays once, when the clip enters the viewport', () => {
    const { video, play, disconnect, notify } = setup(true);
    playOnceVisible(video);
    notify(false);
    expect(play).not.toHaveBeenCalled();
    notify(true);
    expect(play).toHaveBeenCalledOnce();
    expect(disconnect).toHaveBeenCalled();
  });

  it('never plays with reduced motion: the poster stays', () => {
    const { video, play } = setup(false);
    expect(playOnceVisible(video)).toBeUndefined();
    expect(play).not.toHaveBeenCalled();
  });
});
