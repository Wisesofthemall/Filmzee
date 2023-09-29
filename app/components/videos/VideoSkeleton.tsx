import React from "react";
import Grid from "@mui/material/Grid";
import SkeletonCard from "./SkeletonCard";
type Props = {};

function VideoSkeleton({}: Props) {
  const map = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  return (
    <div className="flex-wrap p-3">
      <Grid container wrap="wrap" className="h-full">
        {map.map((a) => (
          <SkeletonCard key={a} n={a} />
        ))}
      </Grid>
    </div>
  );
}

export default VideoSkeleton;
