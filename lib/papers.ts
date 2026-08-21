export interface Paper {
  slug: string
  /** 눈썹 라벨 */
  kicker: string
  title: string
  description: string
  /** 왼쪽/오른쪽 문서 (좌: 한국어판, 우: 일본어 원문) */
  docs: [{ key: string; label: string; file: string }, { key: string; label: string; file: string }]
  /** 원문 공개 링크 (있으면 상단에 표시) */
  sourceUrl?: string
}

export const papers: Paper[] = [
  {
    slug: "graduation-thesis",
    kicker: "졸업논문 · 가고시마 대학교 기계공학과 · 기계제어연구실",
    title: "유치원생의 운동과 집중력의 관계를 해석하기 위한 시스템 개발",
    description:
      "유치원 현장에서 매일 이루어지는 측정 데이터의 수집부터 표시까지 자동화하는 시스템 전반을 설계·구현한 학부 졸업논문입니다.",
    docs: [
      { key: "ko", label: "한국어판", file: "/thesis/thesis-ko.pdf" },
      { key: "ja", label: "日本語版 (원문)", file: "/thesis/thesis-ja.pdf" },
    ],
  },
  {
    slug: "pc-conference-2023",
    kicker: "학회 발표 논문 · PC Conference 2023",
    title: "그림책 읽어주기 시간에 아동의 머리 움직임을 시각화하는 시스템",
    description:
      "그림책 읽어주기 시간 동안 아동의 머리 움직임을 측정·시각화해 집중 상태를 파악하는 시스템에 대한 학회 발표 논문입니다.",
    docs: [
      { key: "ko", label: "한국어판", file: "/thesis/paper-ko.pdf" },
      { key: "ja", label: "日本語版 (원문)", file: "/thesis/paper-ja.pdf" },
    ],
    sourceUrl: "https://conference.ciec.or.jp/pdf/2023pcc/pcc060.pdf",
  },
]

export function findPaper(slug: string) {
  return papers.find((p) => p.slug === slug)
}
