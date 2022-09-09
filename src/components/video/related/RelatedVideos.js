import { useGetRelatedVIdeoQuery } from "../../../features/api/apiSlice";
import RelatedVideo from "./RelatedVideo";
import RelatedVideoLoader from '../../ui/loaders/RelatedVideoLoader'

export default function RelatedVideos({id, title}) {
  const {data: videos, isLoading, isError} = useGetRelatedVIdeoQuery({id, title});
    return (
        <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
            
            {isLoading ? <><RelatedVideoLoader /><RelatedVideoLoader /><RelatedVideoLoader /></> : videos.map(video => <RelatedVideo key={video.id} video={video} />)}
        </div>
    );
}
