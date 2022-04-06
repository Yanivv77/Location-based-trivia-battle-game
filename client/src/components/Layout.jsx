import React from 'react'

function Layout({ children }) {
  return (
    <div>
      <div className="content font-mont">key="{children}"</div>
    </div>
  )
}

export default Layout
