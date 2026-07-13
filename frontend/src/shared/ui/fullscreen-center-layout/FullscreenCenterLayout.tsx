import { ReactNode } from "react";;

type Props = {
  children: ReactNode;
};

export const FullscreenCenterLayout = ({ children }: Props) => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-surface text-primary'>
      {children}
    </div>
  );
}