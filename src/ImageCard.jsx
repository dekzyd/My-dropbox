import { Card, Flex, Heading, Image, Button } from "@aws-amplify/ui-react";

export function ImageCard({ item, index, imageKeys, deleteImage }) {
  return (
    <Card lineHeight="small" border={"2px solid #66ff99"}>
      <Flex gap="xxs" direction="column">
        <Image
          alt={imageKeys[index]?.key}
          width="300"
          height="300"
          src={item}
          sizes="50vw"
          style={{ borderRadius: "medium", objectFit: "contain" }}
        ></Image>
        <Flex alignItems="center">
          <Heading level={2} isTruncated={true}>
            {imageKeys[index]?.key}
          </Heading>
          <Button onClick={deleteImage}>Delete</Button>
        </Flex>
      </Flex>
    </Card>
  );
}
