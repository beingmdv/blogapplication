import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Usercontext";



const API = "http://127.0.0.1:4000";



export default function CreatePost() {


    const { userInfo } = useContext(UserContext);
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [files, setFiles] = useState(null);

    async function createNewPost(ev) {
        const data = new FormData();
        data.set("title", title);
        data.set("summary", summary);
        data.set("content", content);
        data.append("files", files[0]);



        ev.preventDefault();
        try {
            const response = await fetch(`${API}/post`, {

                method: "POST",
                credentials: "include",
                body: data,

                // body: JSON.stringify({ title, summary, content }),
                // headers: { "Content-Type": "application/json" }
            });
            const resData = await response.json().catch(() => ({}));
            console.log("create post response:", resData);
            if (response.ok) {
                setRedirect(true);
            } else {
                alert(resData?.error || "could not create post");
            }
        } catch (e) {
            console.error(e);
            alert("could not reach server. check backend.");
        }
    }

    if (!userInfo) return <Navigate to="/login" />;
    if (redirect) return <Navigate to="/" />;

    return (
        <form className="create-post" onSubmit={createNewPost}>
            <h1>Create a post</h1>
            <input type="text" placeholder="Title" value={title} onChange={ev => setTitle(ev.target.value)} />

            <input type="text"
                placeholder="Summary"
                value={summary}
                onChange={ev => setSummary(ev.target.value)} />


            <input type="file" onChange={ev => setFiles(ev.target.files)} placeholder="
      Featured PHoto" name="featured photo" id="" />
            <textarea
                placeholder="Content"
                value={content}
                onChange={ev => setContent(ev.target.value)}
            />

            <button>Create post</button>

        </form>
    );
}
