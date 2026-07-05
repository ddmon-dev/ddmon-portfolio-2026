import { useEffect } from 'react';

const SCALE_EASE = 'cubic-bezier(0.32, 0.72, 0, 1)';
const SCALE_TRANSITION = `transform 0.5s ${SCALE_EASE}, clip-path 0.5s ${SCALE_EASE}, filter 0.5s ${SCALE_EASE}`;
const EDGE_GAP = 26;
const CARD_BREAKPOINT = 768;
const CARD_BLUR = 8;

function getCardStyle() {
  const style = getComputedStyle(document.documentElement);
  return {
    sheetRadius: parseFloat(style.getPropertyValue('--sheet-radius')),
    sheetTopOffset: parseFloat(style.getPropertyValue('--sheet-top-gap')),
  };
}

function getScale() {
  const { innerWidth } = window;
  if (innerWidth >= CARD_BREAKPOINT) {
    return innerWidth >= 1536 ? 0.8 : 0.92;
  }
  return (innerWidth - EDGE_GAP) / innerWidth;
}

function getWrapper() {
  return document.querySelector<HTMLElement>('[data-vaul-drawer-wrapper]');
}

function getViewportClip(wrapper: HTMLElement, radius: number) {
  const top = window.scrollY;
  const bottom = Math.max(wrapper.offsetHeight - top - window.innerHeight, 0);
  return `inset(${top}px 0 ${bottom}px 0 round ${radius}px)`;
}

function applyOpenStyles(wrapper: HTMLElement) {
  const scale = getScale();
  const asCard = window.innerWidth < CARD_BREAKPOINT;
  const { sheetRadius, sheetTopOffset } = getCardStyle();
  const topGap = sheetTopOffset * 0.6;

  if (asCard && !wrapper.style.clipPath) {
    wrapper.style.clipPath = getViewportClip(wrapper, 0);
    wrapper.getBoundingClientRect();
  }
  document.body.style.background = asCard ? 'black' : '';
  wrapper.style.willChange = 'transform';
  wrapper.style.transformOrigin = asCard
    ? `50% ${window.scrollY + topGap / (1 - scale)}px`
    : `50% ${window.scrollY + window.innerHeight / 2}px`;
  wrapper.style.transition = SCALE_TRANSITION;
  wrapper.style.transform = `scale(${scale})`;
  if (asCard) {
    wrapper.style.clipPath = getViewportClip(wrapper, sheetRadius);
    wrapper.style.filter = `blur(${CARD_BLUR}px)`;
  } else {
    wrapper.style.clipPath = '';
    wrapper.style.filter = '';
  }
}

function applyClosedStyles(wrapper: HTMLElement) {
  wrapper.style.transition = SCALE_TRANSITION;
  wrapper.style.transform = 'scale(1)';
  if (wrapper.style.clipPath) {
    wrapper.style.clipPath = getViewportClip(wrapper, 0);
    wrapper.style.filter = 'blur(0px)';
  }
}

function applyDragStyles(wrapper: HTMLElement, progress: number) {
  const scale = getScale();
  const asCard = window.innerWidth < CARD_BREAKPOINT;
  const { sheetRadius } = getCardStyle();

  wrapper.style.transition = 'none';
  wrapper.style.transform = `scale(${scale + (1 - scale) * progress})`;
  if (asCard) {
    wrapper.style.clipPath = getViewportClip(
      wrapper,
      sheetRadius * (1 - progress)
    );
    wrapper.style.filter = `blur(${CARD_BLUR * (1 - progress)}px)`;
  }
}

export function useBackgroundScale(open: boolean) {
  useEffect(() => {
    const wrapper = getWrapper();
    if (!wrapper) return;

    if (!open) {
      applyClosedStyles(wrapper);
      return;
    }

    const onResize = () => applyOpenStyles(wrapper);
    applyOpenStyles(wrapper);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [open]);

  const onDrag = (_event: unknown, progress: number) => {
    const wrapper = getWrapper();
    if (!wrapper) return;
    applyDragStyles(wrapper, Math.min(Math.max(progress, 0), 1));
  };

  const onRelease = (_event: unknown, stayOpen: boolean) => {
    const wrapper = getWrapper();
    if (!wrapper) return;
    if (stayOpen) applyOpenStyles(wrapper);
    else applyClosedStyles(wrapper);
  };

  useEffect(() => {
    return () => {
      document.body.style.background = '';
      const wrapper = getWrapper();
      if (!wrapper) return;
      wrapper.style.willChange = '';
      wrapper.style.transformOrigin = '';
      wrapper.style.transition = '';
      wrapper.style.transform = '';
      wrapper.style.clipPath = '';
      wrapper.style.filter = '';
    };
  }, []);

  return { onDrag, onRelease };
}
