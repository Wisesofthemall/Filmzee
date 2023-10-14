import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

type Props = {};

function SkeletonCard({}: Props) {
  return (
    <div className=" m-2">
      <Stack spacing={0}>
        {/* For variant="text", adjust the height via font-size */}

        <Skeleton
          variant="rectangular"
          width={400}
          height={500}
          className="rounded-lg"
          sx={{ bgcolor: "grey.800" }}
        />

        <Skeleton
          variant="text"
          sx={{ fontSize: "1rem", bgcolor: "grey.800" }}
          width={250}
        />

        {/* For other variants, adjust the size with `width` and `height` */}

        <div className="">
          <Skeleton
            variant="text"
            sx={{ fontSize: "1rem", bgcolor: "grey.800" }}
            width={200}
          />
        </div>
      </Stack>
    </div>
  );
}

export default SkeletonCard;
