import './App.css';
import FileUpload from './components/FileUpload';
import * as mobilenet from "@tensorflow-models/mobilenet";
import '@tensorflow/tfjs-backend-webgl';
import {useState, useEffect} from 'react';
import { set } from 'express/lib/application';

function App() {
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [model, setModel] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [results, setResults] = useState([]);

  const loadModel = async () => {
    setIsModelLoading(true);
    try {
      const model = await mobilenet.load();
      setModel(model);
      setIsModelLoading(false);
    } catch (error) {
      console.log(error);
      console.log("set model failed");
      setIsModelLoading(false);
    }
  }

  useEffect(() => {
    loadModel()
  }, []) // load model only when app is being loaded

  if (isModelLoading) {
    return <h2>Model Loading...</h2>
  }

  console.log(imageURL);

  return (
    <div className="header">
      <h1>Flower Identification</h1>
      <FileUpload imageURL={imageURL} setImageURL={setImageURL} model={model}
        results={results} setResults={setResults}></FileUpload>
    </div>
  );
}

export default App;
