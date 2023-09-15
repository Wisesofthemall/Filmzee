import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import SkeletonCard from "./SkeletonCard";
type Props = {};

function VideoSkeleton({}: Props) {
  const map = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="flex-wrap">
      <Grid container wrap="wrap">
        {map.map((a) => (
          <SkeletonCard key={a} n={a} />
        ))}
      </Grid>
    </div>
  );
}

export default VideoSkeleton;
