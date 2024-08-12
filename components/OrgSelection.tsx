import { api } from '@/trpc/react';
import { Select } from './ui/select';

const OrgSelection = ({
  value,
  size = 'sm',
  width = '15rem',
  placeholder = 'All orgs',
  onChange
}: {
  value?: string;
  placeholder?: string;
  size?: string;
  width?: string;
  onChange: (org: string) => void;
}) => {
  const queryUsers = api.orgs.getAll.useQuery({
    search: '',
    status: 'active',
    count: 100,
    page: 1
  });
  if (queryUsers.isFetching) {
    return (
      <Select defaultValue={value}>
        <option>Loading</option>
      </Select>
    );
  }

  if (queryUsers.error) {
    return (
      <Select defaultValue={value}>
        <option>Error</option>
      </Select>
    );
  }
  const orgs = queryUsers.data?.data;
  return (
    <Select
      onValueChange={(event) => {
        onChange(event);
      }}
    >
      {orgs!.map((org) => (
        <option key={org._id} value={org._id}>
          {org.name}
        </option>
      ))}
    </Select>
  );
};

export default OrgSelection;
