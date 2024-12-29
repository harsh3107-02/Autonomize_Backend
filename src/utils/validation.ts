export const validateGithubUsername = (username: string) => {
  const githubUsernameRegex = /^[a-zA-Z0-9-]{1,39}$/;
  return githubUsernameRegex.test(username);
};
