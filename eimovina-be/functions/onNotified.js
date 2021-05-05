export const main = async (event, context) => {
  console.log("SUBSCRIBTION LAMBDA CALLED");
  const currentUserId = event.identity.username;
  const { userId } = event.arguments;
  if (currentUserId !== userId) throw new Error("Unauthorized");
  console.log(`User with id: ${currentUserId} succesfully subscribed.`)
  return context.result;
};