import { useQuery } from "@apollo/client";
import { GET_ALL_POSTS, GET_ALL_POST_BY_TOPIC } from "../graphql/queries";
import Posts from "./Posts";
import { Jelly } from "@uiball/loaders";

type Props = {
  topic?: string;
};

const Feed = ({ topic }: Props) => {
  const { data } = useQuery(topic ? GET_ALL_POST_BY_TOPIC : GET_ALL_POSTS, {
    variables: topic
      ? {
          topic: topic,
        }
      : null,
  });
  const posts: Post[] = !topic ? data?.getPostList : data?.getPostListByTopic;

  if (!posts)
    return (
      <div className={"flex w-full items-center justify-center p-10 text-xl"}>
        <Jelly size={50} color={"#ff4501"} />
      </div>
    );

  return (
    <div className={"mt-5"}>
      {posts?.map((post) => (
        <Posts key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
