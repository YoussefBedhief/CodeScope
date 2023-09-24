import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select"
import { MagicWandIcon } from "@radix-ui/react-icons"
import { useCodeStores } from "@/store/code"
import { languages } from "@/option"

export default function LanguageControl() {
  const language = useCodeStores((state) => state.language)
  const autoDetectLanguage = useCodeStores((state) => state.autoDetectLanguage)

  const handleChange = (language: string) => {
    if (language === "auto-detect") {
      useCodeStores.setState({
        autoDetectLanguage: true,
        language: "plaintext",
      })
    } else {
      useCodeStores.setState({ autoDetectLanguage: false, language })
    }
  }
  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-neutral-400">
        Language
      </label>
      <Select value={language} onValueChange={handleChange}>
        <SelectTrigger className="w-40">
          {autoDetectLanguage && <MagicWandIcon />}
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent className="dark max-h-[500px]">
          <SelectItem value="auto-detect">Auto Detect</SelectItem>
          {Object.entries(languages).map(([lang, name]) => (
            <SelectItem key={lang} value={lang}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
