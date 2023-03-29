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
  {
    allWpMenuItem {
      nodes {
        id
        label
        title
        path
        parentId
      }
    }
  }
    `)
const baseUrl = "https://www.reinforcementlearning.ru";

const flatListToHierarchical = (
  data = [],
  { idKey = "id", parentKey = "parentId", childrenKey = "children" } = {}
) => {
  const tree = []
  const childrenOf = {}
  data.forEach(item => {
    const newItem = { ...item }
    const { [idKey]: id, [parentKey]: parentId = 0 } = newItem
    childrenOf[id] = childrenOf[id] || []
    newItem[childrenKey] = childrenOf[id]
    parentId
      ? (childrenOf[parentId] = childrenOf[parentId] || []).push(newItem)
      : tree.push(newItem)
  })
  return tree
}

  return (    
    <div className="menu">
          {flatListToHierarchical(allWpMenuItem.nodes).map(element => {
            console.log(element);
            return (
            <div className="menu-item">
            <a href={baseUrl + element.path}>{element.label}</a>  
            </div>
            )
          })}
    </div>
  )
}

export default Menu
