import { LabelElem } from "@pages/dashboard-page/ui/card/content/LabelElem"


export const Card = () => {

  return (
    <div className="flex flex-col bg-surface">
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
      <div>
        Executor
      </div>
      <div>
        <div>
          Author
        </div>
        <div>
          <div>
            Time
          </div>
          <div>
            Creation date
          </div>
        </div>
      </div>
    </div>
    
  )
}