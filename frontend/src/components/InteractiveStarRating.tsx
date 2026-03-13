import GoodIcon from "./icons/Good";
import BedIcon from "./icons/Bed";
import AverageIcon from "./icons/Average";
import NormalIcon from "./icons/Normal";
import NiceIcon from "./icons/Nice";

export default function InteractiveStarRating({ rating, onRatingChange }: { rating: number; onRatingChange: (rating: number) => void }) {
  const getRatingColor = (star: number) => {
    if (star === 1) return '#ff0412';
    if (star === 2) return '#ff6700';
    if (star === 3) return '#ffb416';
    if (star === 4) return '#1c9af4';
    return '#00ba5c';
  };

  const getRatingLabel = (star: number) => {
    if (star === 1) return 'Bed';
    if (star === 2) return 'Average';
    if (star === 3) return 'Normal';
    if (star === 4) return 'Nice';
    return 'Good';
  };

  const getRatingIcon = (star: number) => {
    if (star === 1) return BedIcon;
    if (star === 2) return AverageIcon;
    if (star === 3) return NormalIcon;
    if (star === 4) return NiceIcon;
    return GoodIcon;
  };

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => {
        const Icon = getRatingIcon(star);
        return (
        <div key={star} className="relative">
          {star === rating ? (
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-xl"
              style={{ backgroundColor: getRatingColor(star) }}
            >
                <Icon className='text-white w-6 h-6' />
              <span className="text-white text-sm font-medium tracking-[0.14px] capitalize leading-5">
                {getRatingLabel(star)}
              </span>
            </div>
          ) : (
            <button
              onClick={() => onRatingChange(star)}
              className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
                <Icon
                className="w-6 h-6"
                style={{ color: getRatingColor(star) }}
              />
            </button>
          )}
        </div>
        );
      })}
    </div>
  );
}