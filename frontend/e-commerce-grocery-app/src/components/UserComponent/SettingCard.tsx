import type { ReactNode } from "react";
import { FiChevronRight } from "react-icons/fi";

interface SettingCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  onClick: () => void;
}

const SettingCard = ({
  title,
  description,
  icon,
  onClick,
}: SettingCardProps) => {
  return (
    <div
      onClick={onClick}
      className="w-full bg-[#111827] border border-gray-800 rounded-xl p-5 flex items-center justify-between cursor-pointer hover:border-violet-500 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400 text-2xl">
          {icon}
        </div>

        <div>
          <h2 className="text-white text-lg font-semibold">
            {title}
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            {description}
          </p>
        </div>
      </div>

      <FiChevronRight
        size={22}
        className="text-gray-500"
      />
    </div>
  );
};

export default SettingCard;