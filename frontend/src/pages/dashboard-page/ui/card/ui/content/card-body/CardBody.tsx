import { CardType, ExecutorType } from "@pages/dashboard-page/ui/card/config/type";
import { DescriptionBlock } from "@pages/dashboard-page/ui/card/ui/content/card-body/content/DescriptionBlock";
import { ExecutorBlock } from "@pages/dashboard-page/ui/card/ui/content/card-body/content/ExecutorBlock";
import { LabelElem } from "@pages/dashboard-page/ui/card/ui/content/card-body/content/LabelElem";

type Props = {
  executor: ExecutorType;
  card: CardType;
}

export const CardBody = ({executor, card}: Props) => {

  return (
    <>
      <DescriptionBlock description={card.description}/>
      <ul className="flex gap-1">
        <LabelElem text='Фундамент'/>
        <LabelElem text='Арматура'/>
        <LabelElem variant="priority" level="high"/>
      </ul>
      <ExecutorBlock executor={executor} />
    </>
  )
}