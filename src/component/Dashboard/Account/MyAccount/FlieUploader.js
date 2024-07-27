import React, { Fragment, useState } from "react";
import Message from "./Message";
import Progress from "./Progress";
import axios from "axios";

const FlieUploader = () => {
  const [logoFile, setLogoFile] = useState("");
  const [logoFilename, setLogoFilename] = useState("Choose File");
  const [uploadedLogoFile, setUploadedLogoFile] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = (e) => {
    setLogoFile(e.target.files[0]);
    setLogoFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", logoFile);

    try {
      const res = await axios.post(
        "https://api.flyfarint.com/v.1.0.0/Accounts/test.php?agentId=FFIB-1036",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            setUploadPercentage(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );
          },
        }
      );

      // Clear percentage
      setTimeout(() => setUploadPercentage(0), 10000);

      const { fileName, filePath } = res.data;

      setUploadedLogoFile({ fileName, filePath });

      setMessage("File Uploaded");
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("There was a problem with the server");
      } else {
        setMessage(err.response.data.msg);
      }
      setUploadPercentage(0);
    }
  };

  return (
    <Fragment>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {logoFilename}
          </label>
        </div>
        <Progress percentage={uploadPercentage} />
        // Returns true if the request was successful.
        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block mt-4"
        />
      </form>
      {uploadedLogoFile ? (
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <h3 className="text-center">{uploadedLogoFile.fileName}</h3>
            <img
              style={{ width: "100%" }}
              src={uploadedLogoFile.filePath}
              alt=""
            />
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default FlieUploader;
