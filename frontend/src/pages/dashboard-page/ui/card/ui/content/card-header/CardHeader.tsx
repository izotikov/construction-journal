
type Props = {
  title: string;
}

export const CardHeader = ({title}: Props) => {

  return (
    <h3 className="text-text-primary font-bold">
      {title}
    </h3> 
  )
}