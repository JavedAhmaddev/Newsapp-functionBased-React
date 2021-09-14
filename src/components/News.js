import React, { useEffect , useState} from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"

 

const News= (props)=> {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    


    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
   const update = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pagesize}`;
        
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(50);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }


    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)}- NewsMonkey`
        update();
        //eslint-disable-next-line
    
    }, [])
    

    const fetchMoreData = async () => {
        
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pagesize}`;
        setPage(page+1)
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
       
        
    };

    
        return (

            <>

                <h1 className="text-center" style={{ color: "blue", marginTop: "70px", marginBottom: "15px" }} > NewsMonkey-Top {capitalizeFirstLetter(props.category)} Headline</h1>
                {loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={!loading && <Spinner />}>
                    <div className="container">
                        <div className="row">
                            {articles && articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <Newsitem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 90) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}

                        </div>
                    </div>
                </InfiniteScroll>

            </>
            

        )
    
}

News.defaultProps = {

    country: 'in',
    pagesize: '6',
    category: 'general',

}
News.propTypes = {
    country: PropTypes.string.isRequired,
    pagesize: PropTypes.number.isRequired,
    category: PropTypes.string,
}

export default News