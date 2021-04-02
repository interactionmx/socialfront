import React, { useEffect, useState } from 'react'
import Page from './Page'
import Axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import LoadingIcon from './LoadingIcon'

function ProfileFollowers(props) {
  const { username } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()

    async function fetchPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/followers`, { cancelToken: ourRequest.token })
        setPosts(response.data)
        setIsLoading(false)
      } catch {
        console.log('error')
      }
    }

    fetchPosts()
    return () => {
      ourRequest.cancel()
    }
  }, [])

  if (isLoading) return <LoadingIcon />

  return (
    <div className="list-group">
      {posts.map((follower, index) => {
        return (
          <Link to={`/profile/${follower.username}`} key={index} className="list-group-item list-group-item-action">
            <img className="avatar-tiny" src={follower.avatar} />
            {follower.username}
          </Link>
        )
      })}
    </div>
  )
}

export default ProfileFollowers
