export type Organization = {
  id: number,
  name: string,
  createdAt: Date,
  updatedAt: Date,
}

export type GetOrganizationsResponse = {
  organizations: Organization[];
};