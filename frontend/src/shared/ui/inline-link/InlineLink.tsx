import { cn } from "@shared/model/utils";
import { Link } from "@tanstack/react-router";
import { FileRoutesByTo } from "../../../routeTree.gen";

type Props = {
  text: string,
  linkText: string,
  to: keyof FileRoutesByTo,
  className?: string;
}

export const InlineLink = ({text, linkText, to, className}: Props) => {
  return (
    <p className={cn("text-center text-sm text-text-secondary", className)}>
      {text}{" "}
      <Link
        to={to}
        className="text-text-link hover:text-text-link-hover active:text-text-link-active transition-colors font-medium"
      >
        {linkText}
      </Link>
    </p>
  )
}