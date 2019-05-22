import React from "react";
import Layout from "../components/layout";
import Link from "gatsby-link";
import PropTypes from 'prop-types';
import { graphql } from "gatsby";
import Img from "gatsby-image";

const BlogPage = ({ data }) => (
  <Layout>
    <h1 style={{ textAlign: "center" }}>Lattest Posts</h1>
    {data.allMarkdownRemark.edges.map((posts, index) => (
      <div className="blogsMini" key={index} style={{ border: '1px solid gray', padding: '10px', margin: '10px 0' }}>
        <Link to={posts.node.frontmatter.path}>
          <div style={{ width: "100%", display: "flex" }}>
            <div style={{ width: "25%" }}>
              <Img fluid={posts.node.frontmatter.image.childImageSharp.fluid} />
            </div>
            <div style={{ width: "75%", marginLeft: '10px' }}>
              <h3>{posts.node.frontmatter.title}</h3>
              <small>
                Posted by : {posts.node.frontmatter.auther} on{" "}
                {posts.node.frontmatter.date}{" "}
              </small>
              <div className="readmore" style={{ float: "right", bottom: '5px', right: '5px', cursor: 'pointer' }} >
                Read More
            </div>
            </div>
          </div>
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
                  ...GatsbyImageSharpFluid
                }
                fixed(width: 200) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`;
BlogPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({
        node: PropTypes.shape({
          id: PropTypes.string,
          frontmatter: PropTypes.shape({
            title: PropTypes.string,
            path: PropTypes.string,
            date: PropTypes.string,
            image: PropTypes.object,
          })
        })
      }))
    })
  })
};

export default BlogPage;
