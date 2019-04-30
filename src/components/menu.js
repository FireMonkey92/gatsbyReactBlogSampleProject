import React from "react"
import Link from 'gatsby-link'
const Menu = () => (

  <div
    style={{
      background: "#f4f4f4",
      paddingTop: "10px",
    }}>
    <ul style={{ listStyle: "none", display: "flex",  justifyContent: 'center' }}>
        <li><Link style={{ padding: "15px 10px" }} to='/' >Home</Link> </li>
        <li><Link style={{ padding: "15px 10px" }} to='/services' >Services</Link> </li>
        <li><Link style={{ padding: "15px 10px" }} to='/about' >About</Link> </li>
        <li><Link style={{ padding: "15px 10px" }} to='/blogs' >Blogs</Link> </li>
    </ul>
  </div>
)
export default Menu
