import React, {useRef, useState} from 'react';
// import "./styles.css";
import axios from 'axios';

async function postImage({image}) {
  const formData = new FormData();
  formData.append("image", image);

  const result = await axios.post('/images', formData, { headers: {'Content-Type': 'multipart/form-data'}});
  console.log("result", result);
  return result.data;
}

const FileUpload = (props) => {

  const [file, setFile] = useState();
  const [images, setImages] = useState([]);

  const {imageURL, setImageURL, model, results, setResults} = props;

  const submit = async event => {
    event.preventDefault();
    try {
      const result = await postImage({image: file});
      console.log("result", result);
      setImages([result.image, ...images]);
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  }

  const uploadImage = (e) => {
    console.log(e);
    const {files} = e.target;
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setImageURL(url);

    } else {
      setImageURL(null);
    }

    // upload image to s3 bucket
    const file = e.target.files[0];
		setFile(file);
  }

  const imageRef = useRef();

  const identify = async () => {
    const classifyResults = await model.classify(imageRef.current);
    setResults(classifyResults);
  }

  return (
    <div className="inputHolder">
      <form onSubmit={submit}>
        <input type="file" accept="image/*" capture="camera" className="uploadInput"
        onChange={uploadImage}/>
        <button type="submit">Submit</button>
      </form>
      <div>
        <div className="mainWrapper">
          <div className="mainContent">
            <div className="imageHolder">
              {imageURL && <img src ={imageURL} alt="Upload Preview"
              crossOrigin="anonymous" ref={imageRef}/>}
            </div>

            {results.length > 0 && <div className='resultsHolder'>
              {results.map((result, index) => {
                  return (
                    <div className='result' key={result.className}>
                        <span className='name'>{result.className}</span>
                        <span className='confidence'>Confidence level: {(result.probability * 100).toFixed(2)}% {index === 0 && <span className='bestGuess'>Best Guess</span>}</span>
                    </div>
                  )
              })}
            </div>}
          </div>
          {imageURL && <button className="button" onClick={identify}>Identify Image</button>}
        </div>
      </div>
    </div>
  );
}

export default FileUpload;
