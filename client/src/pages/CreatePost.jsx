
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
export default function CreatePost() {

    const [title, setTitle] = React.useState('');
    const [summary, setSummary] = React.useState('');
    const [content, setContent] = React.useState('');
    const [files, setFiles] = React.useState('');
    return (
        <form>
            <input type="title" placeholder={'Title'} value={title} onChange={ev => setTitle(ev.target.value)}/>
            <input type="summary" placeholder={'Summary'} value={summary} onchange = {ev => setSummary(ev.target.value)}/>
            <input type="file" />
            <ReactQuill value={content} onchange={newValue => setContent(newValue)} />
            <button style={{marginTop:'5px'}}>CreatePost</button>
            
        </form>
    )}