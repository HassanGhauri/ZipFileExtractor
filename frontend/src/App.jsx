/* eslint-disable no-unused-vars */
import react, { useState } from "react";
import "./App.css";
import JSZip from 'jszip';
import { FaCloudUploadAlt } from "react-icons/fa";
import { BsFillFileZipFill } from "react-icons/bs";

function unzip(files) {
  var file = files;

  var reader = new FileReader();
  reader.onload = function (event) {
    var zip = new JSZip();
    zip.loadAsync(event.target.result).then(function (zip) {
      var filePromises = [];

      Object.keys(zip.files).forEach(function (filename) {
        var file = zip.files[filename];
        if (!file.dir) {
          filePromises.push(
            file.async('blob').then(function (blob) {
              var a = document.createElement('a');
              a.href = window.URL.createObjectURL(blob);
              a.download = filename;
              a.click();
            })
          )
        }
      })
    })
  }
  reader.readAsArrayBuffer(file);
}

function App() {
  const [file, setFile] = useState();
  const [name,setName] = useState("Upload");
  const fileHandler = (e) => {
    setName(e.target.files[0].name);
    setFile(e.target.files[0]);
  };
  const extract = ()=>{
    unzip(file)  
  }
  return (
    <div>
      <div className="navbar">
        <p>File Extractor</p>
      </div>
      <div className="heading">
        <h2>Welcome to File extractor!</h2> 
        <p>An efficient file extraction application which facilitates easy file extraction.</p>
      </div>

      <div className="file-portion">
        {/* <input type="file" onChange={(e) => setFile(e.target.files[0])} /> */}
        <label htmlFor="file-input">
          {file ? (
            <div className="file-img">
              <span><BsFillFileZipFill/></span>
              <p>{name}</p>
            </div>
          ) : (
            <div className="file-default">
              <span>
                <FaCloudUploadAlt />
              </span>
              <p>{name}</p>
            </div>
          )}
        </label>
        <input
          onChange={fileHandler}
          type="file"
          id="file-input"
          hidden
          style={{ display: "none" }}
        />
        <button onClick={extract}>Extract</button>
      </div>
    </div>
  );
}

export default App;
