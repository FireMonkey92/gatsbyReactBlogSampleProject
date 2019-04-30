const path = require("path")
// create pages For all the blogs
exports.createPages = ({ actions : {createPage} , graphql }) => {
  // const { createPage } = actions 
  //  component ro resolve from a particuller path  that points to our page tamplate for displaying post page according to path we recieve
  const postTemplate = path.resolve("src/templets/blog-post.js")
  return graphql(`
    query {
      allMarkdownRemark(sort: {fields : [frontmatter___date], order : ASC}) {
        edges {
          node {
            html
            id
            frontmatter {
              title
              path
              date
              auther
            }
          }
        }
      }
    }
  `).then(res => {
    if (res.errors) {
      //   incase of responce comes with errors
      return Promise.reject(res.errors)
    }
    // else create page using node create page api , For each node comes in responce
    res.data.allMarkdownRemark.edges.forEach(({ node }) => {
      // console.log(node)
      createPage({
        path: node.frontmatter.path,
        component: postTemplate
      })
    })
  })
}
