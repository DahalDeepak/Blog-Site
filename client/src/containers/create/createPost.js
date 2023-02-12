import React, { useContext, useEffect, useState } from "react";
import { AddCircle as Add } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../../context/dataProvider";
import { API } from "../../API/api";
import {
  styled,
  Box,
  TextareaAutosize,
  Button,
  InputBase,
  FormControl,
} from "@mui/material";

const Container = styled(Box)(({ theme }) => ({
  margin: "50px 100px",

  [theme.breakpoints.down("md")]: {
    margin: 0,
  },
}));

const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});

const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

const InputTextField = styled(InputBase)`
  flex: 1;
  margin: 0 30px;
  font-size: 25px;
`;
// border: none;
// solid 1px grey
const Textarea = styled(TextareaAutosize)`
  width: 98%;
  min-height: 20%;

  margin: 2px;
  margin-top: 30px;
  font-size: 18px;
  &:focus-visible {
    outline: none;
  }
`;

const initialPost = {
  title: "",
  description: "",
  picture: "",
  email: "",
  categories: "",
  createdDate: new Date(),
};

const CreatePost = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState(null);
  const { account } = useContext(DataContext);

  const url = post.picture
    ? post.picture
    : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";
  // "https://source.unsplash.com/random"
  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
        // console.log(file)
        const response = await API.uploadFile(data);
        post.picture = response.data;
        setPost.picture(file)
      }
    };
    getImage();
    console.log("called");
    post.categories = location.search?.split("=")[1] || "All";
    post.email = account.email;
  }, [file]);
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const savePost = async () => {
    await API.createPost(post);
    navigate("/");
  };

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  const saveFile = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };
  // (e) => setFile(e.target.files[0])
  return (
    <div>
      <Container>
        <Image src={url} alt="post" />

        <StyledFormControl>
          <label htmlFor="fileInput">
            <Add fontSize="large" color="action" />
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={saveFile}
          />
          <InputTextField
            onChange={(e) => handleChange(e)}
            name="title"
            placeholder="Title"
          />
          <Button
            onClick={() => savePost()}
            variant="contained"
            color="primary"
          >
            Publish
          </Button>
        </StyledFormControl>

        <Textarea
          rowsMin={4}
          
          placeholder="Write your blog here"
          name="description"
          onChange={(e) => handleChange(e)}
        />
      </Container>
    </div>
  );
};

export default CreatePost;
