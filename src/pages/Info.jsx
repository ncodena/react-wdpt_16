import React, { useState, useEffect, useRef  } from 'react';
import * as contentful from 'contentful';

const MemeGenerator = () => {
  const [post, setPost] = useState([]);

      useEffect (() => {
        fetchMeme();        
    }, []);
    
      const fetchMeme = async() =>{   
        const client = contentful.createClient({
            space: 'j5kj5ai9aiyy',
            environment: 'master',
            accessToken: 'Kw_V0NMTZILCfsbKKI185uZGRsxYQFFx-EpSKADx9pM'
        })

        const response = await client.getEntries();
        setPost(response.items)
    
        }

      return (
        <div>
    {post.length ? post.map((item, index)  => (
        <div key={index}> 
        <h3>{item.fields.authorName} </h3>
    {Object.keys(item.fields).length && Object.keys(item.fields.authorImage.fields).length ?
    <img src={`https:${item.fields.authorImage.fields.file.url}`} />
    :null
    }

        <h4>{item.fields.bookTitle}</h4>
    {Object.keys(item.fields).length && Object.keys(item.fields.bookImages.fields).length ? 
        <img src={`https:${item.fields.bookImages.fields.file.url}`} />
    :null
    }
        <p>{item.fields.bookInformation}</p>

        </div>
    )):null}

    </div>
      );
    }

export default MemeGenerator;