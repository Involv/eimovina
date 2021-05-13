export const main = async (event) => {
  if (event.triggerSource === "CustomMessage_SignUp") {
    console.log("EVENT", JSON.stringify(event, null, 8));
    event.response.emailSubject = "Welcome to the EImovina";
    const { codeParameter } = event.request;
    event.response.emailMessage =
      "Thank you for signing up. Your verification code is " +
      codeParameter +
      ".";
  }
  return event;
};
