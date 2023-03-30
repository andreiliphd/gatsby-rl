import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Menu from "../components/menu"
import parse from "html-react-parser"

const Layout = ({ isHomePage, children }) => {
  const {
    wp: {
      generalSettings: { title },
    },
  } = useStaticQuery(graphql`
    query LayoutQuery {
      wp {
        generalSettings {
          title
          description
        }
      }
    }
  `)

  return (
    <div className="global-wrapper" data-is-root-path={isHomePage}>
      <header className="global-header">
      <Menu />
        {isHomePage ? (
          <h1 className="main-heading">
            <Link to="/">{parse(title)}</Link>
          </h1>
        ) : (
          <Link className="header-link-home" to="/">
            {title}
          </Link>
        )}
      </header>

      <main>{children}</main>

      <footer>
        © {new Date().getFullYear()}, Создано с помощью
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
        {` `}
        и <a href="https://reinforcementlearning.ru">.RL - reinforcementlearning.ru</a>
      </footer>
    </div>
  )
}

export default Layout
