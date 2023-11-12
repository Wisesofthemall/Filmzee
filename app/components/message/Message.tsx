import useImageModal from "@/app/hooks/useImageModal";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import React from "react";

type Props = { message: any; loginUser: any; setImage: any };

function Message({ message, loginUser, setImage }: Props) {
  const imageModal = useImageModal();

  const handleImageExpander = (image: string) => {
    setImage(image);
    imageModal.onOpen();
  };
  return (
    <div className="mx-1">
      {message.image && (
        <div
          onClick={() => handleImageExpander(message.image)}
          className={`${
            loginUser?.localId === message.sender.localId
              ? " flex justify-end "
              : " "
          }my-2  mt-auto`}
        >
          <Image
            alt="filmz image"
            className=" rounded-lg cursor-pointer mt-auto"
            src={message.image}
            width={260}
            height={260}
          />
        </div>
      )}
      <div
        className={`${
          loginUser?.localId === message.sender.localId ? "ml-auto" : "mx-1"
        } w-fit `}
      >
        {message.text && (
          <div className="rounded-lg p-2 bg-blue-950 mr-1 text-end  font-semibold w-fit">
            {message.text}
          </div>
        )}
      </div>
      <div className="text-xs  font-semibold text-blue-400 px-2 text-end">
        {formatDistanceToNow(message.createdAt.toDate(), {
          addSuffix: true,
        })}
      </div>
    </div>
  );
}

export default Message;
