import React from "react";
import Image from "next/image";
import styles from "./avatar-group.module.scss";

interface Props {
  imageUrls: string[];
}

const AvatarGroup: React.FC<Props> = ({ imageUrls }) => {
  return (
    <div className={styles.container}>
      {imageUrls.slice(0, 3).map((url, id) => (
        <Image src={url} height={25} width={25} alt="avatar" key={id} />
      ))}
      {imageUrls.length > 3 && (
        <span className={styles.count}>+{imageUrls.length - 3}</span>
      )}
    </div>
  );
};

export default AvatarGroup;
