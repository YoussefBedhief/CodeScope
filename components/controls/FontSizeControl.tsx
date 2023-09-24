import { useCodeStores } from "@/store/code"
import { Input } from "../ui/Input"

export default function FontSizeControl() {
  const fontSize = useCodeStores((state) => state.fontSize)

  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-neutral-400">
        Font Size
      </label>
      <Input
        type="number"
        className="!dark w-16 bg-transparent"
        min={6}
        value={fontSize}
        onChange={(e) =>
          useCodeStores.setState({ fontSize: Number(e.target.value) })
        }
      />
    </div>
  )
}
