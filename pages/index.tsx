import Head from "next/head";
import PostBox from "../components/PostBox";
import Feed from "../components/Feed";
import { useQuery } from "@apollo/client";
import { GET_SUBREDDITS_WITH_LIMIT } from "../graphql/queries";
import Community from "../components/Community";

export default function Home() {
  const { data } = useQuery(GET_SUBREDDITS_WITH_LIMIT, {
    variables: {
      limit: 10,
    },
  });

  const subreddits: Subreddit[] = data?.getSubredditListLimit;
  return (
    <div className={"max-w-5xl my-7 mx-auto"}>
      <Head>
        <title>Reddit App</title>
      </Head>
      <PostBox />

      <div className="flex">
        <Feed />
        <div
          className={
            "sticky top-36 mt-9 mx-5 hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline"
          }
        >
          <p className={"text-md mb-1 p-4 pb-3 font-bold"}>Top Communities</p>
          <div>
            {subreddits?.map((subreddit, index) => (
              <Community
                key={subreddit.id}
                index={index}
                topic={subreddit?.topic}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
