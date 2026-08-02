import { useOrganizationsForUser } from "@entities/organizations/model/hooks/useOrganizationsForUser";
import SelectField from "@shared/ui/select-field/SelectField";

export function OrganizationSelect() {
    const {
        data: organizations,
        isLoading,
        isError,
    } = useOrganizationsForUser();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !organizations) {
        return <div>Error in organizations</div>;
    }

    return (
        <SelectField
            label="Organizations"
            placeholder="Pick organization"
            items={organizations}
            valueKey="id"
            labelKey="name"
        />
    );
}