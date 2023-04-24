import Image from "next/image";
import { TopAllMemes, TopDayMemes, TopWeekMemes } from "src/backend/trpc";

const MemeListing: React.FC<{
  meme: TopAllMemes & TopDayMemes & TopWeekMemes;
  rank: number;
}> = ({ meme, rank }) => {
  return (
    <div className="flex flex-wrap p-3 justify-between" key={meme?.id}>
      <div className="inline-flex text-white self-center px-2">
        {rank === 1 && (
          <Image
            src="/gold_medal.svg"
            width="24"
            height="24"
            alt="Gold medal"
          />
        )}
        {rank === 2 && (
          <Image
            src="/silver_medal.svg"
            width="24"
            height="24"
            alt="Silver medal"
          />
        )}
        {rank === 3 && (
          <Image
            src="/bronze_medal.svg"
            width="24"
            height="24"
            alt="Bronze medal"
          />
        )}
        {rank > 3 && <span style={{ width: "24px", height: "24px" }} />}
        <span className="px-1">{rank}</span>
      </div>
      <div className="w-24 h-24 sm:w-48 sm:h-48 relative">
        <Image
          className="rounded-md"
          fill
          src={meme?.url}
          sizes="(max-width: 640px) 12rem,
                  6rem"
          alt=""
          priority
        />
      </div>
      <span className="bg-mina/75 text-white font-semibold self-center rounded-md px-2 pb-px text-center w-16 flex-none">
        {meme._count?.VotesFor || meme.VotesFor?.length || 0}
      </span>
    </div>
  );
};

export default MemeListing;
