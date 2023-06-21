import "./App.css";
import "@aws-amplify/ui-react/styles.css";

import { useState, useEffect } from "react";

import { Storage } from "aws-amplify";
import {
  withAuthenticator,
  FileUploader,
  Collection,
} from "@aws-amplify/ui-react";

import Navbar from "./Navbar";
import { ImageCard } from "./ImageCard";

function App({ signOut, user }) {
  const [imageKeys, setImageKeys] = useState([]);
  const [images, setImages] = useState([]);
  const [levels, setLevels] = useState("protected");

  const fetchImages = async () => {
    const { results } = await Storage.list("", { level: levels });
    setImageKeys(results);
    const s3Images = await Promise.all(
      results.map(
        async (image) => await Storage.get(image.key, { level: levels })
      )
    );
    setImages(s3Images);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const onSuccess = (event) => {
    const { key } = event;
    fetchImages();
  };

  const deleteImage = async (key) => {
    await Storage.remove(key, { level: levels });
    fetchImages();
  };

  return (
    <>
      <Navbar signOut={signOut} user={user} />
      <FileUploader
        accessLevel={levels}
        acceptedFileTypes={["image/*"]}
        variation="drop"
        onSuccess={onSuccess}
      />
      <Collection
        items={images}
        type="grid"
        padding="2rem"
        boxShadow="0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
        maxWidth="1100px"
        margin="0 auto"
        justifyContent="center"
        templateColumns={{
          base: "minmax(0, 500px)",
          medium: "repeat(2, minmax(0, 1fr))",
          large: "repeat(3, minmax(0, 1fr))",
        }}
        gap="small"
      >
        {(item, index) => (
          <ImageCard
            key={index}
            imageKeys={imageKeys}
            item={item}
            index={index}
            deleteImage={() => deleteImage(imageKeys[index]?.key)}
          />
        )}
      </Collection>
    </>
  );
}

export default withAuthenticator(App);
