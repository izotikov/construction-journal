import { AuthorType, CardType, ExecutorType } from "@pages/dashboard-page/ui/card/config/type";
import { CardBody } from "@pages/dashboard-page/ui/card/ui/content/card-body/CardBody";
import { CardFooter } from "@pages/dashboard-page/ui/card/ui/content/card-footer/CardFooter";
import { CardHeader } from "@pages/dashboard-page/ui/card/ui/content/card-header/CardHeader";
import { Separator } from "@shared/ui/shadcn/separator/Separator";


type Props = {
  author: AuthorType,
  executor: ExecutorType,
  card: CardType,
}

export const Card = ({author, executor, card}: Props) => {

  return (
    <div className="flex flex-col bg-surface gap-2 p-4">
      <CardHeader title={card.title}/>
      <CardBody card={card} executor={executor}/>
      <Separator className="bg-[#343437]"/>
      <CardFooter author={author}/> 
    </div>
    
  )
}