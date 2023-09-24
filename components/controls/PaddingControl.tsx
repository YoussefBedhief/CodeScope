import { useCodeStores } from "@/store/code"
import { Slider } from "../ui/Slider"

export default function PaddingControl() {
  const padding = useCodeStores((state) => state.padding)

  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-neutral-400">
        Padding
      </label>
      <Slider
        className="w-44 my-5"
        value={[padding]}
        onValueChange={([padding]) => useCodeStores.setState({ padding })}
        max={128}
        step={8}
      />
    </div>
  )
}
