# GitHub Profile Explorer

A React + Next.js project to fetch and display GitHub repositories for a given user, with sorting, pagination, and favorites functionality.

---

## Features Implemented

- **Fetch GitHub User Profile Data**: Retrieve Profile picture
Name
Username
Bio
Location
Number of followers
Number of following
Total public repositories
- **Fetch GitHub Repositories**: Retrieve public repositories of a specified GitHub user.  
- **Sorting**: Sort repositories by:
  - Recently Updated
  - Stars
  - Name  
- **Favorites**: Mark/unmark repositories as favorites and store them locally.  
- **Pagination**: Navigate through repositories page by page (for users with many repos).  
- **Dark/Light Mode**: Supports both dark and light UI themes.  
- **Responsive Design**: Works well on mobile, tablet, and desktop.
- **Loading/Error States**: Handles these cases.

## Notes

- GitHub API rate limits apply for unauthenticated requests. To avoid limits, consider adding a GitHub token in .env.local and updating the getGitHubRepos fetch function.
- Favorites are stored in local storage and persist across sessions on the same browser.
## Setup Instructions

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd <repo-folder>
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
