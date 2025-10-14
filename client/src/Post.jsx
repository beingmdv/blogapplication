export default function Post({title, summary, cover, content, createdAt, author}) {
    return(
              <div className="post">
        <div className="images">

          <img src={'http://127.0.0.1:4000'+cover} alt="" />
        </div>
        <div className="texts">
          <h2>{title}</h2>
          <p className="info">
            <a href="" className="author">Madhav Gupta</a>
            <time dateTime="2025-10-11">{createdAt}</time>
          </p>
          <p className='summary'>{summary}</p>

        </div>
      </div>
    )
}