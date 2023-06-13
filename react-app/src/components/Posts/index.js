import { useDispatch, useSelector, Sort  } from "react-redux"
import { useEffect, useState} from "react"
import {Link } from "react-router-dom"
import { getPostsThunk } from "../../store/posts"


const CurrentPosts = () => {
    const dispatch = useDispatch()

    const postsObj= useSelector(state => state.posts.allPosts)

    useEffect(()=>{
        dispatch(getPostsThunk())
    }, [dispatch ])

    if (!postsObj) return (<h2>Loading</h2>)

    return (
        <div>
            <div>
                <h2>Feed</h2>

            </div>
        </div>

    )

}

export default CurrentPosts
