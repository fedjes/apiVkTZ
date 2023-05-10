export const cutPassword = (user) => {
  const clonedUser = { ...user };
  delete clonedUser.password;

  return { ...clonedUser }
}
