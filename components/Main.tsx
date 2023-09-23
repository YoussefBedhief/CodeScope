"use client"
import { fonts, themes } from "@/lib/option"
import { useCodeStores } from "@/store/code"
import React from "react"
import CodeEditor from "./CodeEditor"
import { cn } from "@/lib/utils"
import { useRef } from "react"

const Main = () => {
  const theme = useCodeStores((state) => state.theme)
  const fontStyle = useCodeStores((state) => state.fontStyle)
  const showBg = useCodeStores((state) => state.showBg)
  const padding = useCodeStores((state) => state.padding)

  const editorRef = useRef(null)
  return (
    <main>
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
        <CodeEditor />
      </div>
    </main>
  )
}

export default Main
