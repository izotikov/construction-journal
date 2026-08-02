import { useProjectsForUser } from "@entities/projects/model/hooks/useProjectsForUser";
import SelectField from "@shared/ui/select-field/SelectField";

export function ProjectSelect() {
    const {
        data: projects,
        isLoading,
        isError,
    } = useProjectsForUser();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !projects) {
        return <div>Error in organizations</div>;
    }

    return (
        <SelectField
            label="Projects"
            placeholder="Pick project"
            items={projects}
            valueKey="id"
            labelKey="name"
        />
    );
}