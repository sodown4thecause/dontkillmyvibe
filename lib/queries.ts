import { gql } from '@apollo/client';

export const GET_ALL_POSTS = gql`
  query GetAllPosts($first: Int = 100) {
    posts(first: $first, where: { status: PUBLISH }) {
      nodes {
        id
        title
        slug
        excerpt
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        author {
          node {
            name
          }
        }
      }
    }
  }
`;

export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: String!) {
    postBy(slug: $slug) {
      id
      title
      content
      excerpt
      date
      modified
      slug
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      tags {
        nodes {
          name
          slug
        }
      }
      author {
        node {
          name
          avatar {
            url
          }
        }
      }
    }
  }
`;

export const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    categories(first: 100) {
      nodes {
        id
        name
        slug
        count
      }
    }
  }
`;

export const GET_POSTS_BY_CATEGORY = gql`
  query GetPostsByCategory($slug: String!, $first: Int = 100) {
    category(id: $slug, idType: SLUG) {
      id
      name
      slug
      posts(first: $first, where: { status: PUBLISH }) {
        nodes {
          id
          title
          slug
          excerpt
          date
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
          author {
            node {
              name
            }
          }
        }
      }
    }
  }
`;

export const SEARCH_POSTS = gql`
  query SearchPosts($search: String!, $first: Int = 100) {
    posts(first: $first, where: { search: $search, status: PUBLISH }) {
      nodes {
        id
        title
        slug
        excerpt
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`;
