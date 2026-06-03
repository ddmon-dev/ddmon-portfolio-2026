'use client';

import { useEffect, useId, useRef, useState } from 'react';

/**
 * 프로젝트 갤러리(그리드 + 단일 상세 시트)의 상태·타이밍을 한곳에 캡슐화한다.
 * 시트가 목록 전체를 알고 이전/다음으로 탐색하므로, 상태를 카드가 아니라
 * 목록 레벨(갤러리)에서 쥔다.
 *
 * - open: 시트 표시 여부. 스크롤 잠금/ESC 닫기의 기준.
 * - activeIndex: 현재 펼쳐진 프로젝트. placeholder 카드/닫힘 morph 타겟의 기준이 된다.
 * - backdropVisible: 흰 배경 레이어 표시 여부. 닫을 때는 카드가 그리드로 돌아온 뒤 끈다.
 * - expanded: 최초 열기 morph가 끝났는지. true면 시트 본문을 페이드인한다.
 * - sliding: 이전/다음 슬라이드 전환 중인지. true인 동안에는 시트의 layoutId를 모두 떼어
 *   슬라이드가 morph로 변질되지 않게 한다. (열기/닫기 morph는 sliding=false일 때만)
 * - direction: 슬라이드 방향(1=다음, -1=이전, 0=열기). 슬라이드 variants가 참조한다.
 */
export function useProjectGallery(count: number) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pending, setPending] = useState<number | null>(null);
  const [backdropVisible, setBackdropVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [sliding, setSliding] = useState(false);
  const [direction, setDirection] = useState(0);
  const idBase = useId();

  const openAt = (index: number) => {
    setActiveIndex(index);
    setDirection(0);
    setExpanded(false);
    setSliding(false);
    setBackdropVisible(true);
    setOpen(true);
  };

  const close = () => {
    if (sliding) {
      // 슬라이드 도중 닫기: 정착 패널(layoutId 보유)을 한 프레임 띄운 뒤 닫아야
      // 닫힘 morph가 산다. (슬라이드 캐러셀은 layoutId가 없어 그냥 사라지기 때문)
      setSliding(false);
      setPending(null);
      requestAnimationFrame(() => setOpen(false));
    } else {
      setOpen(false);
    }
  };

  // ESC 콜백이 항상 최신 close(최신 sliding 클로저)를 부르도록 ref에 담아 둔다.
  // 렌더 중 ref 쓰기는 금지라(react-hooks/refs) effect에서 갱신한다.
  const closeRef = useRef(close);
  useEffect(() => {
    closeRef.current = close;
  });

  /**
   * 이전/다음 탐색. 범위를 벗어나면(양 끝) 시트를 닫는다.
   * 슬라이드 중에는 중복 입력을 무시한다.
   */
  const navigate = (delta: number) => {
    if (sliding) return;
    const target = activeIndex + delta;
    if (target < 0 || target >= count) {
      close();
      return;
    }
    setDirection(delta);
    setSliding(true);
    setPending(target);
  };

  // 슬라이드 시작: sliding=true가 커밋된 뒤(현재 슬라이드의 layoutId가 떼어진 다음)에
  // activeIndex를 바꿔, 빠져나가는 슬라이드가 morph가 아니라 슬라이드로 사라지게 한다.
  useEffect(() => {
    if (!sliding || pending === null) return;
    const raf = requestAnimationFrame(() => {
      setActiveIndex(pending);
      setPending(null);
    });
    return () => cancelAnimationFrame(raf);
  }, [sliding, pending]);

  // 모달이 열려 있는 동안 body 스크롤 잠금 + ESC 닫기
  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeRef.current();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return {
    open,
    activeIndex,
    backdropVisible,
    expanded,
    sliding,
    direction,
    idBase,
    openAt,
    close,
    navigate,
    /** backdrop 페이드아웃이 끝난 뒤 카드 z-index를 원복한다. */
    onBackdropExitComplete: () => setBackdropVisible(false),
    /** 최초 열기 morph가 끝나면 본문 페이드인을 트리거한다. */
    onMorphComplete: () => setExpanded(true),
    /** 슬라이드(빠져나가는 슬라이드의 exit)가 끝나면 morph를 다시 켜고 방향을 리셋한다. */
    onSlideSettled: () => {
      setSliding(false);
      setDirection(0);
    },
  };
}

export type ProjectGallery = ReturnType<typeof useProjectGallery>;
