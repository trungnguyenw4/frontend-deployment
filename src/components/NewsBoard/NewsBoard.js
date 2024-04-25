import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem';
import './NewsItem.css'; 
import { NEWS_URL } from '../../apiConfig';


const NewsBoard = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const url = NEWS_URL;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        // Filter out news with empty titles and removed articles
        const filteredArticles = data.articles.filter(news => news.title && !isRemoved(news.url)); 
        setArticles(filteredArticles);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  
  const isRemoved = (url) => {
   
    return url && (url.includes('removed.com') || url.includes('/removed/'));
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="news-board">
      
      <div className="news-container">
        {articles.map((news, index) => (
          <NewsItem
            key={index}
            title={news.title}
          
            src={news.urlToImage}
            url={news.url}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsBoard;

