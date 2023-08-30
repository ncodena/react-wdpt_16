import React, { useState, useEffect, useRef  } from 'react';
import axios from 'axios';
import domToImage from 'dom-to-image';


const MemeGenerator = () => {

    const [memeImages, setMemeImages] = useState([]);
    const [currentMemeIndex, setCurrentMemeIndex] = useState(0);
    const [topText, setTopText] = useState("");
    const [bottomText, setBottomText] = useState("");
    const [uploadedImage, setUploadedImage] = useState(null);
    const [generatedImage, setGeneratedImage] = useState(null);

    const memeContainerRef = useRef(null);


    useEffect(() => {
        const fetchMemeImages = async () => {
          try {
            const response = await axios.get('https://api.imgflip.com/get_memes');
           setMemeImages(response.data.data.memes);
            console.log(response)
          } catch (error) {
            console.error('Error fetching meme images:', error);
          }
        }
      
        fetchMemeImages();
      }, []);

      console.log(memeImages, 'memeImages')

      const handlePreviousMeme = () => {
        setCurrentMemeIndex((prevIndex) =>
          prevIndex === 0 ? memeImages.length - 1 : prevIndex - 1
        );
      };
    
      const handleNextMeme = () => {
        setCurrentMemeIndex((prevIndex) =>
          (prevIndex + 1) % memeImages.length
        );
      };

      const handleImageUpload = (e) => {
        const uploadedFile = e.target.files[0];
        if (uploadedFile) {
          const fileReader = new FileReader();
          fileReader.onload = () => {
            setUploadedImage(fileReader.result);
          };
          fileReader.readAsDataURL(uploadedFile);
        }
      };

      const generateImage = () => {
        domToImage.toPng(memeContainerRef.current)
          .then(dataUrl => {
            setGeneratedImage(dataUrl);
          })
          .catch(error => {
            console.error('Error generating image:', error);
          });
      };

      const resetImage = () => {
        setGeneratedImage(null);
        setTopText('');
        setBottomText('');
        setUploadedImage(null);
      };

      return (
        <div>
            <div className="button-container">
                <button onClick={handlePreviousMeme}>Previous</button>
                <button onClick={handleNextMeme}>Next</button>
            </div>
            <div className="text-inputs">
                <input
                    type="text"
                    placeholder="Top text"
                    value={topText}
                    onChange={(e) => setTopText(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Bottom text"
                    value={bottomText}
                    onChange={(e) => setBottomText(e.target.value)}
                />
            </div>
            
            <div className="image-upload">
                <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>
        {memeImages.length > 0 ? (
            <div className="meme-container">
                <img
                    className="meme-image"
                    src={memeImages[currentMemeIndex]?.url}
                    alt="Meme"
                />
                <div className="meme-text top-text">{topText}</div>
                <div className="meme-text bottom-text">{bottomText}</div>
            </div>
            
      ) : (
        <p>Loading...</p>
      )}

      {uploadedImage ? (
            <>
                <div className="meme-container" ref={memeContainerRef}>
                    <img
                        className="meme-image"
                        src={uploadedImage}
                        alt="Meme"
                    />
                    <div className="meme-text top-text">{topText}</div>
                    <div className="meme-text bottom-text">{bottomText}</div>
                </div>

                <button onClick={generateImage}>Generate Image</button>
                <button onClick={resetImage}>Reset</button>
                {generatedImage ? <img src={generatedImage} alt="generated_image" /> : null}
            </>
      ) : null}
        </div>
      );
    }

export default MemeGenerator;