import { useSession } from "next-auth/react";
import Avatar from "./Avatar";
import { LinkIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ADD_POST, ADD_SUBREDDIT } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import client from "../apollo-client/apollo-client";
import { GET_ALL_POSTS, GET_SUBREDDIT_BY_TOPIC } from "../graphql/queries";
import toast from "react-hot-toast";

type FormData = {
  postTitle: string;
  postBody: string;
  postImage: string;
  subreddit: string;
};

type Props = {
  subreddit?: string;
};

const PostBox = ({ subreddit }: Props) => {
  const { data: session } = useSession();
  const [imageBox, setImageBox] = useState<boolean>(false);
  const [addPost] = useMutation(ADD_POST, {
    refetchQueries: [GET_ALL_POSTS, "getPostList"],
  });
  const [addSubreddit] = useMutation(ADD_SUBREDDIT);

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(async (formData) => {
    const notification = toast.loading("Creating new post ...");
    try {
      const {
        data: { getSubredditListByTopic },
      } = await client.query({
        query: GET_SUBREDDIT_BY_TOPIC,
        variables: {
          topic: subreddit || formData.subreddit,
        },
      });

      console.log(getSubredditListByTopic);

      const subredditExists = getSubredditListByTopic.length > 0;

      if (!subredditExists) {
        console.log("Creating a new sub reddit");

        const {
          data: { insertSubreddit: newSubreddit },
        } = await addSubreddit({
          variables: {
            topic: formData.subreddit,
          },
        });

        console.log("Creating Post...");
        const image = formData.postImage || "";

        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            body: formData.postBody,
            image: image,
            subreddit_id: newSubreddit.id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        });

        console.log("new Post Added", newPost);
      } else {
        console.log("Using existing subreddit");
        console.log(getSubredditListByTopic);

        const image = formData.postImage || "";

        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            body: formData.postBody,
            image: image,
            subreddit_id: getSubredditListByTopic[0].id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        });

        console.log("New post added", newPost);
      }
      setValue("postBody", "");
      setValue("postTitle", "");
      setValue("postImage", "");
      setValue("subreddit", "");

      toast.success("New Post Created!", {
        id: notification,
      });
    } catch (e) {
      toast.error("Whoops! Something went wrong", {
        id: notification,
      });
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      action=""
      className={
        "sticky top-20 bg-white z-50 rounded-md border border-gray-300 p-2"
      }
    >
      <div className={"flex items-center space-x-3"}>
        <Avatar seed={"James"} />

        <input
          {...register("postTitle", { required: true })}
          disabled={!session}
          className={"flex-1 rounded-md bg-gray-50 p-2 pl-5 outline-none"}
          type="text"
          placeholder={
            session
              ? subreddit
                ? `Create a post in ${subreddit}`
                : `Enter new post`
              : `Sign In to Post new Content!`
          }
        />
        <PhotoIcon
          onClick={() => setImageBox(!imageBox)}
          className={`h-6 text-gray-300 cursor-pointer ${
            imageBox && "text-blue-300"
          }`}
        />
        <LinkIcon className={`h-6 text-gray-300 cursor-pointer`} />
      </div>
      {!!watch("postTitle") && (
        <div className={"flex flex-col py-2"}>
          <div className={"flex items-center px-2"}>
            <p className={"min-w-[90px]"}>Body:</p>
            <input
              className={"m-2 flex-1 bg-blue-50 p-2 outline-none"}
              {...register("postBody")}
              type="text"
              placeholder={"Text (optional)"}
            />
          </div>

          {!subreddit && (
            <div className={"flex items-center px-2"}>
              <p className={"min-w-[90px]"}>Subreddit:</p>
              <input
                className={"m-2 flex-1 bg-blue-50 p-2 outline-none"}
                {...register("subreddit", { required: true })}
                type="text"
                placeholder={"i.e. VueJS"}
              />
            </div>
          )}

          {imageBox && (
            <div className={"flex items-center px-2"}>
              <p className={"min-w-[90px]"}>Image URL:</p>
              <input
                className={"m-2 flex-1 bg-blue-50 p-2 outline-none"}
                {...register("postImage")}
                type="text"
                placeholder={"Optional..."}
              />
            </div>
          )}

          {Object.keys(errors).length > 0 && (
            <div className={"space-y-2 p-2 text-red-500"}>
              {errors.postTitle?.type === "required" && (
                <p>A Post Title is required</p>
              )}

              {errors.subreddit?.type === "required" && (
                <p>A Subreddit is required</p>
              )}
            </div>
          )}

          {!!watch("postTitle") && (
            <button
              type={"submit"}
              className={"w-full rounded-full bg-blue-400 p-2 text-white"}
            >
              Create Post
            </button>
          )}
        </div>
      )}
    </form>
  );
};

export default PostBox;
