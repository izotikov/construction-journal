import { UserAvatar } from "@entities/user/ui/UserAvatar";
import { ExecutorType } from "@pages/dashboard-page/ui/card/config/type";
import { LuWrench } from "react-icons/lu";

type Props = {
  executor: ExecutorType;
}

export const ExecutorBlock = ({executor}: Props) => {

  return (
    <div className="flex justify-between bg-bg-executor-field shadow-xs shadow-neutral-800 outline-[0.25px] text-text-tertiary text-xs gap-2 px-3 py-1 rounded-md">
      <div className="flex gap-2 items-center">
        <LuWrench color="lightBlue" />
        Исполнитель
      </div>
      <div className="flex gap-2 items-center">
        <UserAvatar size="sm" username={executor.username} />
        <span className="text-text-primary">{executor.username}</span>
      </div>
    </div>
  )
}