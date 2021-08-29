const path = require(`path`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post-contentful.js`)

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allContentfulPost{
          edges{
            node{
              id
              slug
              title
              subtitle
              image {
                gatsbyImageData(width: 10)
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allContentfulPost.edges

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].node
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].node
      console.log('previousPostId',previousPostId)
      createPage({
        path: post.node.slug,
        component: blogPost,
        context: {
          slug:post.node.slug,
          previousPostId,
          nextPostId,
        },
      })
    })
  }
}
