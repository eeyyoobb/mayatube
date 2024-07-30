"use client";

import { Channel, Video } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import VideoCard from "@/components/shared/VideoCard";

interface VideoWithChannel extends Video {
  channel: Channel;
}

const SearchResults = () => {
  const params = useSearchParams();
  const searchQuery = params.get("searchQuery") || "";

  const [videos, setVideos] = useState<VideoWithChannel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!searchQuery) return; // Prevent search if query is empty

    setLoading(true);
    axios
      .get("/api/videos", { params: { searchQuery } })
      .then((response) => {
        setVideos(response.data as VideoWithChannel[]);
      })
      .catch(() => toast.error("Could not fetch videos"))
      .finally(() => setLoading(false));
  }, [searchQuery]);

  return (
    <div className="w-4/5 mx-auto flex flex-col gap-4 items-center pb-4">
      {loading ? (
        <p>Loading...</p>
      ) : videos.length ? (
        videos.map((video) => (
          <VideoCard
            key={video.id}
            isVertical={false}
            video={video}
            channel={video.channel}
            includeDescription
            channelAvatar
          />
        ))
      ) : (
        <p>No videos found</p>
      )}
    </div>
  );
};

const SearchPage = () => {
  return (
    <Suspense fallback={<p>Loading search results...</p>}>
      <SearchResults />
    </Suspense>
  );
};

export default SearchPage;
