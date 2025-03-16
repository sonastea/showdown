import Image from "next/image";
import { cn } from "@/lib/utils";

type AvatarProps = {
  src: string | null;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

export default function Avatar({
  src,
  alt,
  size = "md",
  className,
}: AvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-14 w-14",
  };

  return (
    <div
      className={cn(
        "relative rounded-full overflow-hidden bg-slate-200",
        sizeClasses[size],
        className
      )}
    >
      {src && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 32px, (max-width: 1024px) 40px, 56px"
          className="object-cover"
        />
      )}
    </div>
  );
}
