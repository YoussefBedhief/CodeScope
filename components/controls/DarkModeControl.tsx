import { useCodeStores } from "@/store/code"
import { Switch } from "../ui/Switch"

export default function DarkModeControl() {
  const darkMode = useCodeStores((state) => state.darkMode)

  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-neutral-400">
        Dark mode
      </label>
      <Switch
        checked={darkMode}
        onCheckedChange={(checked) =>
          useCodeStores.setState({ darkMode: checked })
        }
        className="my-1.5"
      />
    </div>
  )
}
