import * as React from "react"
import { Link, graphql } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo";
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const BlogPostContentfulTemplate = (pageContext) => {
  const post = pageContext.data.contentfulPost
  const siteTitle = pageContext.data.site.siteMetadata?.title || `Title`
  const { previousPostId, nextPostId } = pageContext.pageContext;
  const theObject = JSON.parse(post.content.raw);
  const html = documentToReactComponents(theObject);
  const image = getImage(pageContext.data.contentfulPost.image)
  console.log('data:', pageContext.data)
  console.log('post', post)
  return (
    <Layout location={pageContext.location} title={siteTitle}>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.title}</h1>
          <h3>{post.subtitle}</h3>
        </header>
        <section
          itemProp="articleBody"
        />
        <GatsbyImage image={image} alt={pageContext.data.contentfulPost.author} />
        <div className="article-html">
          {html}
        </div>
        <hr />
        <footer style={{color:"black"}}>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li style={{color:"black"}}>
            {previousPostId && (
              <Link to={`/${previousPostId.slug}`} itemProp="url" rel="previousPostId">
                ← {previousPostId.title}
              </Link>
            )}
          </li>
          <li style={{color:"black"}}>
            {nextPostId && (
              <Link to={`/${nextPostId.slug}`} itemProp="url" rel="nextPostId">
                {nextPostId.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostContentfulTemplate
//here check the 'author' after 'title' in the siteMetaData
export const pageQuery = graphql`
  query ContentfulBlogPostBySlug($slug:String!) {
    site {
      siteMetadata {
        title
        
      }
    }
    contentfulPost(slug:{eq:$slug}){
      title
      author
      subtitle
      image {
        gatsbyImageData(
          width: 630
          height:400
          )
      }
      content{
        raw
      }
    }
  }
`
