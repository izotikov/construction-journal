
type Props = {
  description: string;
}

export const DescriptionBlock = ({description}: Props) => {

  return (
    <p className="text-text-secondary text-sm">
      {description}
    </p>
  )
}