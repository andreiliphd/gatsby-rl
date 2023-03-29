/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"


const Menu = () => {
  const { allWpMenuItem } = useStaticQuery(graphql`
  query menus {
    allWpMenuItem {
        nodes {
          label
          path
        }
      }
  }
  `)
const baseUrl = "https://www.reinforcementlearning.ru";

  return (
    <div className="menu">
        <p>
          {allWpMenuItem.nodes.map(element => {
            return (
            <h5><a href={baseUrl + element.path}>{element.label}</a></h5>  )
          })}
        </p>
    </div>
  )
}

export default Menu
