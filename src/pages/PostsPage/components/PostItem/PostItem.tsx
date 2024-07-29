import React from "react";
import { Typography } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";

import s from "./PostItem.module.scss";

interface PostItemProps {
  title: string;
  tags: Array<string>;
  body: string;
}

const PostItem = ({ title, tags, body }: PostItemProps) => {
  return (
    <div className={s.PostItem}>
      <div className={s.PostItem__content}>
        <FaceIcon color={"primary"} className={s.PostItem__avatar} />
        <div>
          <Typography color={"primary"} variant="h5">
            {title}
          </Typography>
          <Typography variant="subtitle1" color={"primary"}>
            {tags.map((tag) => "#" + tag).join("")}
          </Typography>
        </div>
      </div>
      <Typography className={s.PostItem__text} variant="body1">
        {body}
      </Typography>
    </div>
  );
};

export default PostItem;
