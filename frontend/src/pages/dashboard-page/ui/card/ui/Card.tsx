import { Author, Executor } from "@pages/dashboard-page/ui/card/config/type";
import { CardFooter } from "@pages/dashboard-page/ui/card/ui/content/CardFooter";
import { ExecutorBlock } from "@pages/dashboard-page/ui/card/ui/content/ExecutorBlock";
import { LabelElem } from "@pages/dashboard-page/ui/card/ui/content/LabelElem";
import { Separator } from "@shared/ui/shadcn/separator/Separator";


type Props = {
  author: Author,
  executor: Executor,
}

export const Card = ({author, executor}: Props) => {

  return (
    <div className="flex flex-col bg-surface gap-2 p-4">
      <h3 className="text-text-primary font-bold">
        Армирование фундамента — секция B
      </h3>
      <p className="text-text-secondary text-sm">
        Укладка арматурного каркаса по проектным чертежам. Контроль диаметра прутьев и шага вязки согласно СП 63.13330.
      </p>
      <ul className="flex gap-1">
        <LabelElem text='Фундамент'/>
        <LabelElem text='Арматура'/>
        <LabelElem variant="priority" level="high"/>
      </ul>
      <ExecutorBlock executor={executor} />
      <Separator className="bg-[#343437]"/>
      <CardFooter author={author}/> 
    </div>
    
  )
}