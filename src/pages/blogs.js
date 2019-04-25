import React from "react"
import Layout from "../components/layout"
import Link from "gatsby-link"
import { graphql } from "gatsby"

const BlogPage = ({data}) => (
  <Layout>
    <h1 style={{ textAlign: "center"}}>Lattest Posts</h1>
    {data.allMarkdownRemark.edges.map(posts => (
        <div key={posts.node.id}>
            <h3>{posts.node.frontmatter.title}</h3>
            <small>Posted by : { posts.node.frontmatter.auther} on { posts.node.frontmatter.date} </small>
            <br/>
            <br/>
            <Link to={posts.node.frontmatter.path}>Read More</Link>
            <br/>
            <br/>
            <hr/>                        
        </div>
    ))}
  </Layout>
)

export const pageQuery = graphql`
  query BlogIndexQuery {
    allMarkdownRemark {
      edges {
        node {
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
`

export default BlogPage
