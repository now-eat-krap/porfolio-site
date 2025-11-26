import { Button } from "@/components/ui/button"
import { Mail, Github, Linkedin, Twitter } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6 bg-secondary/30">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-balance">함께 일하고 싶으신가요?</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              새로운 프로젝트나 협업 기회에 대해 언제든 연락 주세요. 흥미로운 아이디어를 함께 실현해 나가고 싶습니다.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild>
              <a href="mailto:taewonb916@gmail.com">
                <Mail className="h-5 w-5 mr-2" />
                이메일 보내기
              </a>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-4 pt-8">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com/now-eat-krap" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-24 pt-8 border-t border-border">
        <p className="text-center text-sm text-muted-foreground">© 2025 Developer Portfolio. All rights reserved.</p>
      </div>
    </section>
  )
}
