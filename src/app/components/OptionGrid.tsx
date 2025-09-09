'use client';

interface OptionGridProps {
  options?: string[];
}

export default function OptionGrid({ options }: OptionGridProps) {
  if (!options || options.length === 0) {
    return (
      <div className="text-gray-500 text-center py-4">
        등록된 옵션이 없습니다.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {options.map((option, index) => (
        <div
          key={index}
          className="px-3 py-2 bg-primary-100 text-primary-800 text-sm rounded-lg border border-primary-200"
        >
          {option}
        </div>
      ))}
    </div>
  );
}
