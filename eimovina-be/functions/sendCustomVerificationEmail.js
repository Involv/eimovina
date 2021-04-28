export const main = async (event) => {
  if (event.triggerSource === "CustomMessage_SignUp") {
    console.log("EVENT", JSON.stringify(event, null, 8));
    event.response.emailSubject = "Welcome to the EImovina";
    const { codeParameter } = event.request;
    const { userName, region } = event;
    const { clientId } = event.callerContext;
    const { email } = event.request.userAttributes;
    const url = 'http://eimovina-fe.s3-website.eu-central-1.amazonaws.com';
    const link = `<a href="${url}?code=${codeParameter}&username=${userName}&clientId=${clientId}&region=${region}&email=${email}" target="_blank">here</a>`;
    event.response.emailMessage = "Thank you for signing up. Please click " + link + ". <h1>test</h1>";

  }
  return event;
};