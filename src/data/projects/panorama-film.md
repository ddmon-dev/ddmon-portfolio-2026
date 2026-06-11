## Overview

프리미엄 자동차 필름 브랜드 사이트와 시공점 발주·보증서 발급 시스템, 관리자 어드민으로 구성된 **B2B 웹 서비스**입니다.

## Role

브랜드 사이트 반응형 구현부터 발주·어드민 화면 설계, DB 설계, 비즈니스 로직, 배포, 고객사 커뮤니케이션까지 **단독으로** 담당했습니다.

## Problem

- 지역거점회원과 시공점회원으로 나뉘는 권한 구조와 발주·보증서 플로우를 데이터 모델로 풀어내야 했습니다.
- 카카오 알림톡 연동 이슈로 Vercel에서 self-hosting 환경으로 배포를 전환해야 했습니다.

## Solution

상품 발주, 장바구니, 발주 관리, 보증서 발급 및 PDF 출력, 브랜드 사이트 내 보증서 조회, 게시판, 매출 통계를 구현했습니다.

### Deployment

가비아 클라우드 서버에 Nginx 기반 self-hosting 환경을 구성해 운영했습니다.

## Tech Stack

Next.js 14, React, Supabase(Auth/DB/Storage/RPC), Tailwind CSS, Gabia Cloud, Nginx, Kakao Alimtalk
