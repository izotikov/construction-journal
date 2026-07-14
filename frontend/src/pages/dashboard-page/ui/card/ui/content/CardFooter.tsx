import { Author } from "@pages/dashboard-page/ui/card/config/type";
import { AuthorBlock } from "@pages/dashboard-page/ui/card/ui/content/AuthorBlock";
import { LuCalendarClock, LuClock5 } from "react-icons/lu";

type Props = {
  author: Author;
}

// TODO: вынести цвет в переменную в main.css, придумать как что красиво сделать
export const CardFooter = ({author}: Props) => {

  return (
    <div className="flex justify-between mt-2">
      <AuthorBlock author={author}/>
      <div className="flex flex-col justify-between">
        <div className="flex gap-1 items-center justify-end">
          <LuClock5 size={12} color="#4e50ab"/>
          <span className="text-[#b6b6dd] text-xs">3д 4ч</span>
        </div>
        <div className="flex gap-3 items-center text-text-tertiary font-light">
          <LuCalendarClock size={12} className="text-text-tertiary"/>
          <span className="text-xs">18 июл 2026</span>
        </div>
      </div>
    </div>
  )
}