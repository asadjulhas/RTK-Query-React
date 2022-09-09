import { useEffect, useState } from "react";
import { useGetVideosQuery } from "../../features/api/apiSlice";
import Error from "../ui/Error";
import VideoLoader from "../ui/loaders/VideoLoader";
import Video from "./Video";

export default function Videos() {
  const [skip, setSkip] = useState(true)
  const {data: videos, isLoading, isError, refetch} = useGetVideosQuery(undefined, {
    refetchOnMountOrArgChange: false,
    // pollingInterval: 500
    // skip: skip
  });

  

  if(isLoading) {
    return <>
     <VideoLoader/>
     <VideoLoader/>
     <VideoLoader/>
     <VideoLoader/>
     <VideoLoader/>
     <VideoLoader/>
     <VideoLoader/>
    </>
  }
  if(isError) {
    return <Error />
  }

  
    return (
        <>
            {videos && videos.map(video => <Video key={video.id} video={video} />)}
            {/* {skip && <button onClick={()=>setSkip(false)}>Load Data</button>}
            {<button onClick={()=>refetch()}>Reload Data</button>} */}
        </>
    );
}
