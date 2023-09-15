import React from "react";
import { Skeleton, Stack } from "@chakra-ui/react";
type Props = {};

function VideoSkeleton({}: Props) {
  return (
    <div>
      <Stack>
        <Skeleton height="70px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    </div>
  );
}

export default VideoSkeleton;
