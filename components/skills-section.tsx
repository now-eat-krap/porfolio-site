import { Badge } from "@/components/ui/badge"
import TechStackIcon from "tech-stack-icons"

const skillCategories = [
  {
    title: "주력 스택",
    caption: "매일 쓰는 프로덕션 도구",
    skills: ["React", "Tailwind", "Spring boot", "FastApi"],
  },
  {
    title: "백엔드 & 인프라",
    caption: "API · 배포 · 성능",
    skills: ["FastAPI", "Spring Boot", "PostgreSQL", "Docker"],
  },
  {
    title: "데이터/실험",
    caption: "퀀트 · 모니터링 · 실험",
    skills: ["Python", "Pandas", "NumPy"],
  },
  {
    title: "협업 & 품질",
    caption: "팀 생산성과 안정성",
    skills: ["Git/GitHub", "Jira", "Notion", "Figma"],
  },
]

const iconNameMap: Record<string, string> = {
  react: "react",
  "react/next": "react",
  next: "react",
  tailwind: "tailwindcss",
  "spring boot": "spring",
  springboot: "spring",
  spring: "spring",
  fastapi: "python", // fallback: library lacks fastapi, use python
  postgresql: "postgresql",
  docker: "docker",
  "ci/cd": "githubactions",
  cicd: "githubactions",
  python: "python",
  pandas: "python",
  numpy: "python",
  "git/github": "git",
  git: "git",
  github: "git",
  "github actions": "git",
  "ci/cd": "git",
  cicd: "git",
  jira: "jira",
  notion: "notion",
  figma: "figma",
}

const allowedIcons = new Set(Object.values(iconNameMap))

const renderIcon = (skill: string) => {
  const key = skill.trim().toLowerCase()
  const iconName = iconNameMap[key] ?? iconNameMap[key.replace(/\s+/g, " ")] ?? null
  if (!iconName || !allowedIcons.has(iconName)) return null
  try {
    return <TechStackIcon name={iconName} variant="light" className="h-4 w-4" />
  } catch {
    return null
  }
}

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-6 bg-secondary/30">
      <div className="container mx-auto">
        <div className="space-y-3 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-balance">기술 스택</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            실무에 바로 쓰는 스택 중심으로 정리했습니다. 서비스 배포·실험까지 커버합니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="space-y-3 rounded-xl border border-white/5 bg-black/40 p-5 shadow-[0_15px_40px_rgba(0,0,0,0.35)]"
            >
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-white">{category.title}</h3>
                <p className="text-sm text-white/60">{category.caption}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="text-xs bg-white/10 text-white border-white/10 hover:border-primary/60"
                  >
                    <span className="mr-1">{renderIcon(skill)}</span>
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
