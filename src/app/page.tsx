
import getTrendingVideos from "@/actions/getTrendingVideos";
import VideoCard from "@/components/shared/VideoCard";
import QuizzesArea from "@/components/quiz/QuizzesArea";



 export default async function Home() {
 const trendingVideos = await getTrendingVideos();
 const maxVideos = trendingVideos.slice(0, 4);



        
  return  (
    <div className="flex flex-col">
       <div className="mx-12 sm:mx-24 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
       {maxVideos.length > 0 ? (
          maxVideos.map((trendingVideo) => (
              <VideoCard
                key={trendingVideo.id}
                video={trendingVideo}
                channel={trendingVideo.channel}
                channelAvatar
              />
            ))
          ):(
         "No videos found"
        )} 
        </div>
        <div>
        <QuizzesArea/>
        </div>
        <h1> Fill the form and start working with us today</h1>
    </div>
    
   );
}
