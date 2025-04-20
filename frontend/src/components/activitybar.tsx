import { Files, Search, GitBranch, Blocks, Play, Settings } from "lucide-react"

const ActivityBar = () => {
  return (
    <div className="w-12 bg-[#0C1D2B] flex flex-col items-center py-2 space-y-4 text-white">
      <Files width={20} height={20} />
      <Search width={20} height={20} />
      <div className="relative">
        <GitBranch width={20} height={20} />
        <span className="absolute -top-1 -right-2 text-[10px] bg-[#3794FF] rounded-full px-1">21</span>
      </div>
      <Blocks width={20} height={20} />
      <Play width={20} height={20} />
      <Settings width={20} height={20} />
    </div>
  );
};

export default ActivityBar;