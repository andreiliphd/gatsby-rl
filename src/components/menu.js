/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


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
  const parsedTree = parseNested(tree, 1);
  return parsedTree;
}
let res = [];
let parseNested = (obj, level) => {
  let resnes = [];
  console.log("obj");
  console.log(obj);
  for (let i of obj) {
    console.log("i");
    console.log(i);
    if (!(i["children"].length !== 0)) {
      if (level === 1) {
        res.push(<Nav.Link href={i.path}>{i.label}</Nav.Link>);
        resnes = [];
      } else {
        resnes.push(<NavDropdown.Item href={i.path}>{i.label}</NavDropdown.Item>);
        console.log("accumulated resnes");
        console.log(resnes);
      }
    } else {
      let ret = parseNested(i["children"], level + 1);
      if (level === 1) {
        res.push(<NavDropdown title={i.label} id="basic-nav-dropdown">{ret}</NavDropdown>);
      } else {
        console.log("resnes before return");
        console.log(resnes);
        resnes.push([<NavDropdown title={i.label} id="basic-nav-dropdown">{ret}</NavDropdown>]);
        ret = [];

        console.log("resnes after return");
        console.log(resnes);
      }
    }
  }
  if (level === 1) {
    return res;
  } else {
    return resnes;
  }
  
  // return ([<Nav.Link href="#home">Home</Nav.Link>, <Nav.Link href="#home">Home</Nav.Link>])

};


  return (
    <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand href="#home">.RL</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">

      {flatListToHierarchical(allWpMenuItem.nodes)}
      </Nav>
     </Navbar.Collapse>
    </Container>
    </Navbar>

        //   {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        //     <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        //     <NavDropdown.Item href="#action/3.2">
        //       Another action
        //     </NavDropdown.Item>
        //     <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        //       <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        //       <NavDropdown.Item href="#action/3.2">
        //         Another action
        //       </NavDropdown.Item>
        //     </NavDropdown>
        //     <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        //     <NavDropdown.Divider />
        //     <NavDropdown.Item href="#action/3.4">
        //       Separated link
        //     </NavDropdown.Item>
        //   </NavDropdown>
        // </>   */}
  
  )
}

export default Menu
