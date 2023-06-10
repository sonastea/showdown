import { Meme } from "src/lib/drizzle";
import { CldImage } from "next-cloudinary";

const Meme: React.FC<{
  meme: Meme;
  vote: () => void;
  disabled: boolean;
}> = ({ meme, vote, disabled }) => {
  return (
    <div className="flex flex-col items-center" key={meme.id}>
      <div className="relative w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96">
        <CldImage
          className="object-contain"
          alt={meme.name.split("/")[1]}
          src={meme.url}
          fill
          priority
          sizes="(max-width: 768px) 18rem,
                  (max-width: 1280px) 24rem,
                  12rem
          "
        />
      </div>
      <button
        className="font-medium shadow-[0_1px_3px_0_hsla(0,0%,0%,.5)] m-4 p-2 px-6 text-xl md:text-3xl bg-mina-200 text-mina-900 hover:bg-mina-300 disabled:bg-mina-200/70 disabled:cursor-not-allowed rounded-md focus:outline-none focus:ring-mina focus:ring-2 focus:ring-offset-2"
        onClick={vote}
        disabled={disabled}
      >
        😂
      </button>
    </div>
  );
};
export default Meme;
