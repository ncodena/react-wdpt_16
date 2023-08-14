const SingleNews = ({article}) => {

    return (
      <div key={article.objectID}>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            {article.title}
          </a>
        </div>
    )
}
  
export default SingleNews