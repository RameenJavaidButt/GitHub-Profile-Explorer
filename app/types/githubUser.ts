export type GitHubUser = {
  avatar_url: string;
  name: string | null;
  login: string;
  bio: string | null;
  location: string | null;
  followers: number;
  following: number;
  public_repos: number;
};
