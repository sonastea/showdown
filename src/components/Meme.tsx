import { CldImage } from "next-cloudinary";
import { useState } from "react";
import type { Meme } from "src/lib/drizzle";

const Meme: React.FC<{
  meme: Meme;
  number: number;
  vote: () => void;
  disabled: boolean;
}> = ({ meme, number, vote, disabled }) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const name = meme.name.split("/")[1];

  return (
    <div className="flex flex-col items-center" key={meme.id}>
      <div className="relative w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96">
        {!isLoaded && (
          <div className="object-fill bg-slate-500/50 w-full h-full animate-pulse" />
        )}
        <CldImage
          aria-label={`meme ${number}`}
          className="object-contain"
          alt={name}
          src={meme.url}
          fill
          priority
          sizes="(max-width: 768px) 18rem,
                  (max-width: 1280px) 24rem,
                  12rem
          "
          onLoad={() => setIsLoaded(true)}
        />
      </div>
      <button
        className="font-medium shadow-[0_1px_3px_0_hsla(0,0%,0%,.5)] m-4 p-2 px-6 text-xl md:text-3xl bg-mina-200 text-mina-900 hover:bg-mina-300 disabled:bg-mina-200/70 disabled:cursor-not-allowed rounded-md focus:outline-none focus:ring-mina focus:ring-2 focus:ring-offset-2"
        onClick={vote}
        disabled={disabled}
      >
        <span role="img" aria-label={`Vote for meme ${number}`}>
          😂
        </span>
      </button>
    </div>
  );
};

export default Meme;
