import { UserAvatar } from "@entities/user/ui/UserAvatar";
import { Author } from "@pages/dashboard-page/ui/card/config/type"

type Props = {
  author: Author;
}

export const AuthorBlock = ({author}: Props) => {

  return (
    <div className="flex gap-2">
      <UserAvatar username={author.username} />
      <div className="flex flex-col text-sm text-text-tertiary font-light">
        АВТОР
        <span className="text-text-primary">{author.username}</span>
      </div>
    </div>
  )
}