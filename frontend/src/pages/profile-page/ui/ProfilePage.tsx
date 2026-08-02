import { useMe } from "@entities/user/model/hooks/useMe";

export function ProfilePage() {
  const {data: user, isLoading, isError} = useMe();

  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <div>
        Profile page
      </div>
      <div>
        Username: {user?.name}
      </div>
      <div>
        Email: {user?.email}
      </div>
    </div>
  )
}