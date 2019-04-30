import React from "react"
import Layout from "../components/layout"
import Link from "gatsby-link"
import { graphql } from "gatsby"
import Img from "gatsby-image"

const BlogPage = ({ data }) => (
  <Layout>
    <h1 style={{ textAlign: "center" }}>Lattest Posts</h1>
    {data.allMarkdownRemark.edges.map((posts, index) => (
      <div key={index} style={{ border : '1px solid gray' , padding: '10px', margin: '10px 0' , height: '170px'}}>
      <Link to={posts.node.frontmatter.path}> 
      <div style={{ width: "100%", display: "flex" }}>
          <div style={{ width: "25%" }}>
            <Img fluid={posts.node.frontmatter.image.childImageSharp.fluid} />
          </div>
          <div style={{ width: "75%" , marginLeft :  '10px' }}>
            <h3>{posts.node.frontmatter.title}</h3>
            <small>
              Posted by : {posts.node.frontmatter.auther} on{" "}
              {posts.node.frontmatter.date}{" "}
            </small>
            <Link style={{ float : "right" , bottom : '5px' , right : '5px'}} to={posts.node.frontmatter.path}>Read More</Link>
          </div>
        </div>
        <br />
        <br />
        <br />
        </Link>
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
            image {
              childImageSharp {
                fluid {
                  base64
                  src
                  srcSet
                  sizes
                  aspectRatio
                  originalImg
                  originalName
                  presentationWidth
                  presentationHeight
                }
                fixed(width: 200) {
                  aspectRatio
                  base64
                  width
                  src
                  height
                  srcSet
                  originalName
                }
              }
            }
          }
        }
      }
    }
  }
`

export default BlogPage
