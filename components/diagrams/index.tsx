import { ObservabilityDiagram, observabilityDiagramCaption } from "./observability-diagram"
import { VoiceCloningDiagram, voiceCloningDiagramCaption } from "./voice-cloning-diagram"
import type { Project } from "@/lib/projects-data"

type DiagramKey = NonNullable<Project["diagram"]>

export const diagrams: Record<DiagramKey, { Component: (p: { className?: string }) => React.JSX.Element; caption: string }> = {
  observability: { Component: ObservabilityDiagram, caption: observabilityDiagramCaption },
  "voice-cloning": { Component: VoiceCloningDiagram, caption: voiceCloningDiagramCaption },
}
