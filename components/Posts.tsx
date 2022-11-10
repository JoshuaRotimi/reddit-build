import {
  ArrowDownIcon,
  ArrowUpIcon,
  BookmarkIcon,
  ChatBubbleBottomCenterIcon,
  EllipsisHorizontalIcon,
  GiftIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import Avatar from "./Avatar";
import TimeAgo from "react-timeago";
import Link from "next/link";
import { Jelly } from "@uiball/loaders";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_VOTES_BY_POST_ID } from "../graphql/queries";
import { ADD_VOTE } from "../graphql/mutations";

type Props = {
  post: Post;
};
const Posts = ({ post }: Props) => {
  const [vote, setVote] = useState<boolean>();
  const { data: session } = useSession();

  const { data, loading } = useQuery(GET_VOTES_BY_POST_ID, {
    variables: {
      post_id: post?.id,
    },
  });

  const [addVotes] = useMutation(ADD_VOTE, {
    refetchQueries: [GET_VOTES_BY_POST_ID, "getVotesUsingPost_id"],
  });

  useEffect(() => {
    const votes: VotesList[] = data?.getVotesUsingPost_id;

    const userVote = votes?.find(
      (vote) => vote.username === session?.user?.name
    )?.upvote;

    setVote(userVote);
  }, [data]);

  const upVote = async (isUpVote: boolean) => {
    if (!session) {
      toast("You will need to sign in to vote!");
      return;
    }

    if (vote && isUpVote) return;
    if (vote === false && !isUpVote) return;
    console.log("...voting", isUpVote);

    const {
      data: { insertVote: newVote },
    } = await addVotes({
      variables: {
        post_id: post.id,
        username: session?.user?.name,
        upvote: isUpVote,
      },
    });

    console.log("placed vote", data);
  };

  const displayVote = (data: any) => {
    const votes: VotesList[] = data?.getVotesUsingPost_id;
    const displayNumber = votes?.reduce(
      (total, vote) => (vote.upvote ? (total += 1) : (total -= 1)),
      0
    );
    if (votes?.length === 0) return 0;
    if (displayNumber === 0) {
      return votes[0]?.upvote ? 1 : -1;
    }

    return displayNumber;
  };

  if (!post)
    return (
      <div className={"flex w-full items-center justify-center p-10 text-xl"}>
        <Jelly size={50} color={"#ff4501"} />
      </div>
    );

  return (
    <div
      className={
        "rounded-md my-4 flex cursor-pointer border border-gray-300 bg-white shadow-sm hover:border hover:border-gray-600"
      }
    >
      <div
        className={
          "flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400"
        }
      >
        {/*Votes*/}
        <ArrowUpIcon
          onClick={() => upVote(true)}
          className={`voteButtons hover:text-blue-400 ${
            vote && "text-blue-400"
          }`}
        />
        <p className={"text-black font-bold text-xs"}>{displayVote(data)}</p>
        <ArrowDownIcon
          onClick={() => upVote(false)}
          className={`voteButtons hover:text-red-400 ${vote && "text-red-400"}`}
        />
      </div>
      <Link href={`/post/${post.id}`}>
        <div className={"p-3 pb-1"}>
          {/*Header*/}
          <div className={"flex items-center space-x-2"}>
            <Avatar seed={post.subreddit?.topic} />
            <p className={"text-sm text-gray-400"}>
              <Link href={`/subreddit/${post.subreddit?.topic}`}>
                <span
                  className={
                    "font-bold text-black hover:text-blue-400 hover:underline"
                  }
                >
                  r/{post.subreddit?.topic}
                </span>
              </Link>{" "}
              . Posted by u/{post.username} <TimeAgo date={post.created_at} />
            </p>
          </div>
          {/*Body*/}

          <div className={"py-4"}>
            <h2 className={"text-xl font-semibold"}>{post.title}</h2>
            <p className={"mt-2 text-sm font-light"}>{post.body}</p>
          </div>
          {/*Image*/}
          <img className={"w-full"} src={post.image} alt="" />
          {/*Footer*/}
          <div className="flex space-x-4 text-gray-400">
            <div className="postButtons">
              <ChatBubbleBottomCenterIcon className={"h-6 w-6"} />
              <p>{post.commentList.length} Comments</p>
            </div>

            <div className="postButtons">
              <GiftIcon className={"h-6 w-6"} />
              <p>Award</p>
            </div>

            <div className="postButtons">
              <ShareIcon className={"h-6 w-6"} />
              <p>Share</p>
            </div>

            <div className="postButtons">
              <BookmarkIcon className={"h-6 w-6"} />
              <p>Save</p>
            </div>

            <div className="postButtons">
              <EllipsisHorizontalIcon className={"h-6 w-6"} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Posts;
