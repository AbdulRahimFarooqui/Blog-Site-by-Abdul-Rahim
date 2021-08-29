import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo";
import styled from 'styled-components';

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const posts = data.allContentfulPost.edges;

  const images = [];
  data.allContentfulPost.edges.map((val, ind) => {
    images[ind] = getImage(val.node.image);
  })

  const Post = styled.div`
  display:flex;
  height:fit-content;
  width:fit-content;
  cursor:pointer;
  box-shadow: 0 1px 2px rgba(0,0,0,0.15);
  transition: box-shadow 0.3s ease-in-out;
  :hover{
    box-shadow: 0 5px 15px rgba(0,0,0,0.8);
  }
  `;

  const PostImage = styled.div`
  flex:25%;
  margin-right:1rem;
  margin-top:30px;
  `;

  const PostText = styled.div`
  flex:75%;
  `;

  const UpperDiv = styled.div`
  background-image: linear-gradient(to right, #020024, #090979 40%, #00d4ff);
  `;

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  else {
    return (
      <UpperDiv>
        <Layout location={location} title={siteTitle}>
            <Seo title="All posts" />
          <Bio />

          <ol style={{ listStyle: `none` }}>
            {posts.map((post, ind) => {
              const title = post.node.title || post.node.slug
              console.log('images[', ind, ']: ', images[ind])
              return (
                <Post key={post.node.slug}>
                  <PostImage>
                    <GatsbyImage image={images[ind]} alt={data.allContentfulPost.author} />
                  </PostImage>
                  <PostText>
                    <article
                      className="post-list-item"
                      itemScope
                      itemType="http://schema.org/Article"
                    >
                      <header>
                        <h2 className="Titleh2">
                          <Link to={post.node.slug} itemProp="url">
                            <span itemProp="headline">{title}</span>
                          </Link>
                        </h2>
                      </header>
                      <section>
                        <p>{post.node.subtitle}</p>
                      </section>
                    </article>
                  </PostText>
                </Post>
              )
            })}
          </ol>
        </Layout>
      </UpperDiv>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulPost{
      edges{
        node{
          title
          subtitle
          image {
            gatsbyImageData(
              width: 630
              height:400
              )
          }
          author
          slug
        }
      }
    }
  }
`
