import React from 'react'
import { LeaderboardSharp as Statistics } from '@mui/icons-material/'
import { LeaderboardSharp as Follow } from '@mui/icons-material'
import { LeaderboardSharp as half } from '@mui/icons-material'
import { Link } from '@mui/material'

function Helps() {
  const IconsArr = [Statistics, Follow, half]

  return (
    <>
      <article className="cocktail">
        <div className="img-container">
          <img src={image} alt={name} />
        </div>
        <div className="cocktail-footer">
          <h3>{name}</h3>
          <h4>{glass}</h4>
          <p>{info}</p>
          <Link to={`/cocktail/${id}`} className="btn btn-primary btn-details">
            details
          </Link>
        </div>
      </article>
      ) }
    </>
  )
}

export default Helps
