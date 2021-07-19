import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { components } from "../../components/blog/detail/viewBlog";
import { useHistory, useParams } from "react-router-dom";
const ReactMarkdown = require("react-markdown");
const gfm = require("remark-gfm");

const UpdateBlog = () => {
  const [data, setData] = useState({
    title: "",
    content: "",
    markdown: "",
    category: "React",
    displayPicture: "",
  });

  const history = useHistory();

  const { id } = useParams();

  const access_token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/blog/${id}`).then((response) => {
      setData({
        title: response.data.title,
        content: response.data.content,
        markdown: response.data.markdown,
        category: response.data.category,
        displayPicture: response.data.displayPicture,
      });
    });
  }, [id]);

  const OnChangeValue = (e) => {
    const { value, name } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const postDataToServer = (data) => {
    axios
      .put(`http://localhost:5000/api/blog/update/${id}`, data, {
        headers: {
          Authorization: access_token,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          swal({
            title: "Success!",
            text: "Blog has been updated successfully!",
            icon: "success",
            button: "Okay!",
          });

          history.push(`/dashboard`);
        }
      });
  };

  function handleSubmit(e) {
    e.preventDefault();
    var formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("category", data.category);
    formData.append("displayPicture", data.displayPicture);
    formData.append("markdown", data.markdown);
    postDataToServer(formData);
  }

  return (
    <>
      <div className="col-md-8 container-fluid my-markdown-custom-font">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Title
            </label>
            <input
              type="text"
              required
              value={data.title}
              name="title"
              onChange={OnChangeValue}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Content
            </label>
            <textarea
              type="text"
              required
              value={data.content}
              name="content"
              onChange={OnChangeValue}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Display Image URL
            </label>
            <input
              type="text"
              required
              value={data.displayPicture}
              name="displayPicture"
              onChange={OnChangeValue}
              className="form-control"
            />
          </div>
          <div id="emailHelp" className="form-text mb-3">
            Please use a valid link preferably https.
          </div>
          <div className="row">
            <div className="col-md-6">
              <label for="exampleFormControlTextarea1" className="form-label">
                Markdown
              </label>
              <textarea
                required
                className="form-control"
                value={data.markdown}
                name="markdown"
                onChange={OnChangeValue}
                id="exampleFormControlTextarea1"
                rows="4"
              ></textarea>
            </div>
            <div className="col-md-6">
              <label for="exampleFormControlTextarea1" className="form-label">
                Live Preview
              </label>
              <div className="shadow">
                <ReactMarkdown
                  components={components}
                  remarkPlugins={[gfm]}
                  children={data.markdown}
                  renderers={{
                    link: (href, title, children) => (
                      <a href={href} target="_blank" rel="noopener noreferrer">
                        {children}
                      </a>
                    ),
                  }}
                />
              </div>
            </div>
          </div>
          <center>
            <div className="p-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </center>
        </form>
        {JSON.stringify(data)}
      </div>
    </>
  );
};

export default UpdateBlog;
