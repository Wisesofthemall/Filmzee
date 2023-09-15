import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

type Props = {
  n: number;
};

function SkeletonCard({ n }: Props) {
  const junk = n;
  return (
    <div className=" m-2">
      <Stack spacing={0}>
        {/* For variant="text", adjust the height via font-size */}

        <Skeleton
          variant="rectangular"
          width={210}
          height={200}
          className="rounded-lg"
        />

        <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={200} />

        {/* For other variants, adjust the size with `width` and `height` */}

        <div className="">
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={150} />
        </div>
      </Stack>
    </div>
  );
}

export default SkeletonCard;
