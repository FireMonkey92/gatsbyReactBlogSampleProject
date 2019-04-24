import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
// const checkWidth = window.screen.width;

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>Welcome to my website</h1>
    <p>This is the sample site for gatsby crash course</p>
    <div style={{ maxWidth: `300px`, margin:`0 auto` ,  marginBottom: `1.45rem` }}>
      <Image />
    <Link to='/about'> About us</Link>
    </div>
  </Layout>
)
export default IndexPage
