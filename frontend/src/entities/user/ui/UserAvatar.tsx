import { useImageWithFallback } from "@shared/lib/hooks/useImageWithFallbacks";
import { cva, VariantProps } from "class-variance-authority";

const avatarVariants = cva(
  // shadow - для внутренней рамки. outline - для внешней.
  "bg-white flex items-center justify-center border-2 border-surface-raised outline-[0.5px] outline-black shadow-[inset_0_0_0_0.5px_#000000] rounded-3xl",
  {
    variants: {
      size: {
        sm: "w-8 h-8",
        md: "w-10 h-10",
        lg: "w-14 h-14",
        xl: "w-20 h-20",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

type DefaultProps = {
  avatarUrl?: string | null;
  username: string;
}

type UserAvatarProps = VariantProps<typeof avatarVariants> & DefaultProps;

export const UserAvatar = ({ size, avatarUrl, username }: UserAvatarProps) => {

  const { hasError, onError } = useImageWithFallback();

  const showPlaceholder = !avatarUrl || hasError;
  const firstLetter = username.trim().charAt(0).toUpperCase();

  return (
    <div className={avatarVariants({ size })}>
      {showPlaceholder ? (
        <span className="font-medium text-black select-none">
          {firstLetter}
        </span>
      ) : (
        <img
          src={avatarUrl}
          alt={username}
          className="w-full h-full object-cover"
          onError={onError}
        />
      )}
    </div>
    
  )
}