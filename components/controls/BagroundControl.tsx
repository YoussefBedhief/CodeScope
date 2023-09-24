import { useCodeStores } from "@/store/code"
import { Switch } from "../ui/Switch"

export default function BackgroundControl() {
  const showBg = useCodeStores((state) => state.showBg)

  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-neutral-400">
        Background
      </label>
      <Switch
        checked={showBg}
        onCheckedChange={(checked) =>
          useCodeStores.setState({ showBg: checked })
        }
        className="my-1.5"
      />
    </div>
  )
}
