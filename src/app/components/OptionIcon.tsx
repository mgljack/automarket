import { OptionDict, OptionKey } from "@/lib/options";

export default function OptionIcon({ k }: { k: OptionKey }) {
  const item = OptionDict[k] ?? OptionDict.etc;
  const Icon = item.icon;
  return (
    <div className="flex flex-col items-center gap-2 w-24">
      <div className="grid place-items-center w-11 h-11 rounded-full bg-neutral-100">
        <Icon className="w-5 h-5 text-neutral-800" />
      </div>
      <div className="text-xs text-neutral-700 text-center leading-tight">{item.label}</div>
    </div>
  );
}
