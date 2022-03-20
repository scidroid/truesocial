import { Button, InputWrapper, Input } from "@mantine/core";
import { useState, useEffect } from "react";
import { Widget } from "@uploadcare/react-widget";
import { createNFTPost } from "../utils/posts";
import { getProfile } from "../utils/profile";
import styles from "../styles/New.module.css";

const New = () => {
  const [profileData, setProfileData] = useState();

  useEffect(() => {
    const profile = getProfile();
    console.log(profile);
    setProfileData("BC1YLhTeFwESq7qcpfRXVwVzXDXTcLMNn6rZdBbLCLwCBPYB78YSMjW");
  }, []);

  const [image, setImage] = useState(null);
  const [text, setText] = useState("");

  const handleSubmit = async () => {
    console.log(image);
    const res = await fetch("http://192.168.100.175:8000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: image,
        text: text,
        pkey: profileData,
      }),
    });

    const data = await res.json();

    const nft = createNFTPost(profileData, text, image, data.emotion[0]);

    console.log(nft);
  };

  return (
    <section className={styles.new}>
      <h1>New Post</h1>
      <Widget
        publicKey="624de14caf2cf3c7f75c"
        tabs="camera file url"
        previewStep="true"
        onChange={(e) => setImage(e.cdnUrl)}
      />
      <InputWrapper
        size="xl"
        id="input"
        required
        label="Share Your Message"
        description="This text will be visible in the post"
      >
        <Input
          size="xl"
          id="input"
          onChange={(e) => setText(e.target.value)}
          placeholder="Your message"
        />
      </InputWrapper>
      <Button size="lg" onClick={() => handleSubmit()}>
        Submit
      </Button>
    </section>
  );
};

export default New;
