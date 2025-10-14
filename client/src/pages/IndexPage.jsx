import { useEffect } from "react"
import Post from "../Post"

import { useState } from "react";


export default function Indexpage(){

const [posts, setPosts] = useState([]);

useEffect(() => {

    fetch('http://127.0.0.1:4000/post').then(response =>
        
         { response.json().then(posts => {
            setPosts(posts);
        console.log(posts);
    });
});
}, [])


    return (
        <>
            {posts.length > 0 && posts.map(post => (
                <Post {...post} />
            ))}
        </>
    )
}