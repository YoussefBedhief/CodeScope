"use client"

import { codeSnippets, fonts } from "@/lib/option"
import { cn } from "@/lib/utils"
import React from "react"
import Editor from "react-simple-code-editor"
import hljs from "highlight.js"
import flourite from "flourite"
import { useCodeStores } from "@/store/code"
import { useEffect } from "react"
import dynamic from "next/dynamic"

const CodeEditor = () => {
  dynamic({ ssr: false })

  const store = useCodeStores()

  useEffect(() => {
    const randomSnippet =
      codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
    useCodeStores.setState(randomSnippet)
  }, [])
  useEffect(() => {
    if (store.autoDetectLanguage) {
      const { language } = flourite(store.code, { noUnknown: true })
      useCodeStores.setState({
        language: language.toLowerCase() || "plaintext",
      })
    }
  }, [store.autoDetectLanguage, store.code])
  return (
    <div
      className={cn(
        "min-w-[400px] border-2 rounded-xl shadow-2xl",
        store.darkMode
          ? "bg-black/75 border-gray-600/40"
          : "bg-white/75 border-gray-200/20"
      )}
    >
      <header className="grid grid-cols-6 gap-3 items-center px-4 py-3">
        <div className="flex gap-1.5">
          <div className="rounded-full h-3 w-3 bg-red-600"></div>
          <div className="rounded-full h-3 w-3 bg-yellow-600"></div>
          <div className="rounded-full h-3 w-3 bg-green-600"></div>
        </div>
        <div className="col-span-4 flex justify-center">
          <input
            type="text"
            value={store.title}
            onChange={(e) => useCodeStores.setState({ title: e.target.value })}
            spellCheck={false}
            className={cn(
              "bg-transparent text-center text-sm font-medium focus:outline-none",
              store.darkMode ? "text-gray-400" : "text-gray-800"
            )}
          />
        </div>
        <div
          className={cn("bg-black/50 text-center rounded-md text-sm px-2 py-1")}
        >
          {store.language}
        </div>
      </header>
      <div
        className={cn(
          "px-4 pb-4",
          store.darkMode
            ? "brightness-110"
            : "text-gray-800 brightness-50 saturate-200 contrast-200"
        )}
      >
        <Editor
          value={store.code}
          onValueChange={(code) => useCodeStores.setState({ code })}
          highlight={(code) =>
            hljs.highlight(code, {
              language: codeSnippets[0].language || "plaintext",
            }).value
          }
          style={{
            fontStyle: fonts[store.fontStyle].name,
            fontSize: store.fontSize,
          }}
        />
      </div>
    </div>
  )
}

export default CodeEditor
