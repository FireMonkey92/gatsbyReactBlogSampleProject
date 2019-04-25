import React from "react"
import Link from "gatsby-link"
import { graphql } from "gatsby"
import Layout from "../components/layout"

const TemplateBlogPost = ({ data }) => {
  const post = data.markdownRemark
  if (post) {
    return (
      <Layout>
        <div>
          <div>
            <Link to="/blogs">Go Back</Link>
          </div>
          <br/>
          <hr />
          <div>
            <h1>{post.frontmatter.title}</h1>
            <h4>
              Posted By: {post.frontmatter.auther} on {post.frontmatter.date}
            </h4>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>
          This Is Blog Post
        </div>
      </Layout>
    )
  } else {
    return (
      <Layout>
        <div
          style={{
            textAlign: "center",
          }}
        >
          <h2>Loading...!!</h2>
          <h4>Take deep Breath</h4>
        </div>
      </Layout>
    )
  }
}

export const postQuery = graphql`
  query BlogpostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        date
        auther
      }
    }
  }
`

export default TemplateBlogPost
