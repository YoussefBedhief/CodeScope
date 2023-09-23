"use client"
import { fonts, themes } from "@/option"
import { useCodeStores } from "@/store/code"
import CodeEditor from "./CodeEditor"
import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"
import { Card, CardContent } from "./ui/Card"
import ExportControl from "./controls/ExportControl"
import ThemesControl from "./controls/ThemesControl"

const Main = () => {
  const theme = useCodeStores((state) => state.theme)
  const fontStyle = useCodeStores((state) => state.fontStyle)
  const showBg = useCodeStores((state) => state.showBg)
  const padding = useCodeStores((state) => state.padding)
  const editorRef = useRef(null)
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    if (queryParams.size === 0) return
    const state = Object.fromEntries(queryParams)

    useCodeStores.setState({
      ...state,
      code: state.code ? atob(state.code) : "",
      autoDetectLanguage: state.autoDetectLanguage === "true",
      darkMode: state.darkMode === "true",
      fontSize: Number(state.fontSize || 18),
      padding: Number(state.padding || 64),
    })
  }, [])
  return (
    <main className="min-h-screen flex justify-center items-center bg-neutral-950 text-white">
      <link
        rel="stylesheet"
        href={themes[theme].theme}
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href={fonts[fontStyle]?.src}
        crossOrigin="anonymous"
      />
      <div
        className={cn(
          "overflow-hidden mb-2 transition-all ease-out",
          showBg ? themes[theme].background : "ring ring-neutral-900"
        )}
        style={{ padding }}
        ref={editorRef}
      >
        <div className={`h-3`}></div>
        <CodeEditor />
      </div>
      <Card className="rounded-xl border text-card-foreground shadow fixed bottom-16 py-6 px-8 mx-6 bg-neutral-900/90 backdrop-blur">
        <CardContent className="flex flex-wrap p-0 gap-6 items-center">
          <ThemesControl />
          <ExportControl targetRef={editorRef} />
        </CardContent>
      </Card>
    </main>
  )
}

export default Main
