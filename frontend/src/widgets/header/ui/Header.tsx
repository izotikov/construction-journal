import { OrganizationSelect } from "@features/organization-switcher/ui/OrganizationSelect";
import { ProjectSelect } from "@features/project-switcher.tsx/ui/ProjectSelect";

export function Header() {

  return (
    <div className="flex p-4 gap-2">
      <OrganizationSelect />
      <ProjectSelect />
    </div>
  );
}