import React, { useEffect, useState } from 'react'
import Page from './Page'
import Axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import LoadingIcon from './LoadingIcon'
import Post from './Post'

function ProfilePosts() {
  const { username } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()

    async function fetchPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/posts`, { cancelToken: ourRequest.token })
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
      {posts.map(post => {
        return <Post noAuthor={true} post={post} key={post._id} />
      })}
    </div>
  )
}

export default ProfilePosts
