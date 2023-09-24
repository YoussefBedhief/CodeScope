"use client"
import { fonts, themes } from "@/option"
import { useCodeStores } from "@/store/code"
import CodeEditor from "./CodeEditor"
import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"
import { Card, CardContent } from "./ui/Card"
import ExportControl from "./controls/ExportControl"
import ThemesControl from "./controls/ThemesControl"
import LanguageControl from "./controls/LanguageControl"
import FontControl from "./controls/FontControl"
import FontSizeControl from "./controls/FontSizeControl"
import PaddingControl from "./controls/PaddingControl"
import BackgroundControl from "./controls/BagroundControl"
import DarkModeControl from "./controls/DarkModeControl"
import { Resizable } from "re-resizable"
import { Separator } from "./ui/Separator"

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
    <main className="min-h-screen flex justify-center bg-neutral-950 text-white">
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
      <Resizable
        enable={{ left: true, right: true }}
        minWidth={padding * 2 + 400}
      >
        <div
          className={cn(
            "overflow-hidden mb-2 mt-20 transition-all ease-out",
            showBg ? themes[theme].background : "ring ring-neutral-900"
          )}
          style={{ padding }}
          ref={editorRef}
        >
          <CodeEditor />
        </div>
      </Resizable>
      <Card className="rounded-xl border text-card-foreground shadow fixed bottom-16 py-6 px-8 mx-6 bg-neutral-900/90 backdrop-blur">
        <CardContent className="flex flex-wrap p-0 gap-6 items-center text-white">
          <ThemesControl />
          <LanguageControl />
          <FontControl />
          <FontSizeControl />
          <PaddingControl />
          <BackgroundControl />
          <DarkModeControl />
          <Separator orientation="vertical" color="gray" />
          <ExportControl targetRef={editorRef} />
        </CardContent>
      </Card>
    </main>
  )
}

export default Main
