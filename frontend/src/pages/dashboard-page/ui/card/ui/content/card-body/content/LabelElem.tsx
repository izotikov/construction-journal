import { cva } from "class-variance-authority";

const labelVariants = cva(
  "rounded-md inline-flex items-center gap-1 px-1 py-0.75 text-xs",
  {
    variants: {
      variant: {
        default: "text-text-tertiary bg-bg-dashboard-card",
        low: "text-text-low-priority bg-bg-low-priority",
        medium: "text-text-medium-priority bg-bg-medium-priority",
        high: "text-text-high-priority bg-bg-high-priority",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const labelText = {
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий'
}

const dotVariants = cva("inline-block w-1.5 h-1.5 rounded-full shrink-0", {
  variants: {
    level: {
      low: "bg-text-low-priority",
      medium: "bg-text-medium-priority",
      high: "bg-text-high-priority",
    },
  }
});


type DefaultProps = {
  text: string;
  variant?: "default";
};

type PriorityProps = {
  variant: "priority";
  level: "low" | "medium" | "high";
};

type Props = DefaultProps | PriorityProps;

export const LabelElem = (props: Props) => {

  if (props.variant === "priority") {
    const { level } = props;
    const text = labelText[level];
    return (
      <li className={labelVariants({ variant: level })}>
        <span className={dotVariants({ level })} />
        {text}
      </li>
    );
  }

  const { text } = props;
  return <li className={labelVariants({ variant: "default" })}>{text}</li>;
}