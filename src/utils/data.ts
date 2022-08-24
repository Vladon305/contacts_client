export const userQuery = (userId: number) => {
  const query = `*[_type == "user" && _id == '${userId}']`

  return query
}

export const usersQuery = () => {
  const query = `*[_type == "user"]`

  return query
}
