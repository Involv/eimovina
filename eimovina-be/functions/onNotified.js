export const main = async (event, context) => {
  console.log("SUBSCRIBTION LAMBDA CALLED");
  const currentUserId = event.identity.username;
  const { userId } = event.arguments;
  if (currentUserId !== userId) throw new Error("Unauthorized");
  return context.result;
};