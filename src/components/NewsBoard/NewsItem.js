import React from 'react'
import './NewsItem.css'; // Import CSS file for styling

const NewsItem = ({title, src, url}) => {
return (
<div className='news-card'>
      <div className='news-image-container'>
        <img src={src ? src : "healthy-jpg.jpeg"} className='news-image' alt='News' />
      </div>
      <div className='news-content'>
        <h5 className='news-title'>{title}</h5>
        
        <a href={url} className='news-button'>
          Read More
        </a>
      </div>
    </div>
)
}

export default NewsItem;

