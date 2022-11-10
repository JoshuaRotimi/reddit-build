import { gql } from "@apollo/client";

export const GET_SUBREDDIT_BY_TOPIC = gql`
  query MyQuery($topic: String!) {
    getSubredditListByTopic(topic: $topic) {
      id
      topic
    }
  }
`;

export const GET_SUBREDDITS_WITH_LIMIT = gql`
  query MyQuery($limit: Int!) {
    getSubredditListLimit(limit: $limit) {
      created_at
      id
      topic
    }
  }
`;

export const GET_VOTES_BY_POST_ID = gql`
  query MyQuery($post_id: ID!) {
    getVotesUsingPost_id(id: $post_id) {
      id
      created_at
      post_id
      upvote
      username
    }
  }
`;

export const GET_POSTS_BY_ID = gql`
  query MyQuery($post_id: ID!) {
    getPostListByPostId(post_id: $post_id) {
      id
      created_at
      body
      title
      username
      subreddit_id
      image
      commentList {
        created_at
        id
        post_id
        text
        username
      }
      subreddit {
        created_at
        id
        topic
      }
      votesList {
        created_at
        id
        post_id
        upvote
        username
      }
    }
  }
`;

export const GET_ALL_POSTS = gql`
  query MyQuery {
    getPostList {
      id
      created_at
      body
      title
      username
      subreddit_id
      image
      commentList {
        created_at
        id
        post_id
        text
        username
      }
      subreddit {
        created_at
        id
        topic
      }
      votesList {
        created_at
        id
        post_id
        upvote
        username
      }
    }
  }
`;

export const GET_ALL_POST_BY_TOPIC = gql`
  query MyQuery($topic: String!) {
    getPostListByTopic(topic: $topic) {
      id
      created_at
      body
      title
      username
      subreddit_id
      image
      commentList {
        created_at
        id
        post_id
        text
        username
      }
      subreddit {
        created_at
        id
        topic
      }
      votesList {
        created_at
        id
        post_id
        upvote
        username
      }
    }
  }
`;
