function client<T>(endpoint: string, options: any): Promise<T> {
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "da2-ml6lpfp5wfefxm6tni6rqwtqt4",
    },
    ...options,
  };
  return window
    .fetch(`${process.env.GRAPHQL_API_URL}/${endpoint}`, config)
    .then((response) => response.json());
}

export { client };
