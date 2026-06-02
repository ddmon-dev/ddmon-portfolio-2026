'use client';

import { useState } from 'react';
import type { ThumbItem } from './project-thumbnail-wall.data';

/**
 * 썸네일 월 프로젝트 아카이브.
 * 실제 사이트 스크린샷을 빽빽한 그리드로 깔아 "내가 이걸 다 만들었다"를 눈으로 보여준다.
 * 로드 실패(죽은 사이트 등)는 오렌지 폴백 타일로 대체한다.
 */

function Tile({ item }: { item: ThumbItem }) {
  const [broken, setBroken] = useState(!item.thumb);

  const inner = (
    <div className="group relative aspect-[16/10] overflow-hidden rounded-sm bg-orange-500/15 ring-1 ring-black/5">
      {broken || !item.thumb ? (
        <div className="flex h-full w-full items-center justify-center bg-orange-500 px-1 text-center text-[10px] leading-tight font-medium text-white">
          {item.name}
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.thumb}
          alt={item.name}
          loading="lazy"
          onError={() => setBroken(true)}
          className="h-full w-full object-cover object-top"
        />
      )}
      <span className="pointer-events-none absolute inset-x-0 bottom-0 truncate bg-foreground/80 px-1.5 py-0.5 text-[10px] text-background opacity-0 transition-opacity duration-150 group-hover:opacity-100">
        {item.name}
      </span>
    </div>
  );

  return item.href ? (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-sm transition-[transform,box-shadow] duration-200 hover:z-10 hover:scale-110 hover:shadow-lg"
    >
      {inner}
    </a>
  ) : (
    <div>{inner}</div>
  );
}

interface ProjectThumbnailWallProps {
  items: ThumbItem[];
}

export function ProjectThumbnailWall({ items }: ProjectThumbnailWallProps) {
  return (
    <ul className="grid list-none grid-cols-[repeat(auto-fill,minmax(88px,1fr))] gap-1.5 p-0">
      {items.map((item, i) => (
        <li key={`${item.name}-${i}`}>
          <Tile item={item} />
        </li>
      ))}
    </ul>
  );
}
