"use client";

import Avatar from "@/Common/Avatar";
import { Channel, Comment as PrismaComment } from "@prisma/client";
import dayjs from "@/vendor/dayjs";

interface CommentProps {
  comment: PrismaComment & { channel: Channel };
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div className="flex items-start gap-2">
      <Avatar imageSrc={comment.channel.imageSrc} />
      <div className="flex flex-col gap-1">
        <div className="flex gap-2 items-center text-sm">
          <p className="font-medium">@{comment.channel.handle}</p>
          <p className="font-light text-neutral-400">
            {dayjs(comment.createdAt).fromNow()}
          </p>
        </div>
        <p>{comment.text}</p>
      </div>
    </div>
  );
};

export default Comment;
