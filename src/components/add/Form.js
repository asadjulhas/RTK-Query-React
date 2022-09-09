import Success from "../ui/Success";
import { useAddVideoMutation } from "../../features/api/apiSlice";
import TextArea from "../ui/TextArea";
import TextInput from "../ui/TextInput";
import Error from "../ui/Error";

export default function Form() {
  const [addVideo, {data: video, isLoading, isSuccess, isError}] = useAddVideoMutation()

  const hanldeAddVideoForm = e => {
    e.preventDefault();
    const title = e.target.title.value;
    const author = e.target.author.value;
    const description = e.target.description.value;
    const link = e.target.link.value;
    const thumbnail = e.target.thumbnail.value;
    const date = e.target.date.value;
    const duration = e.target.duration.value;
    const views = e.target.views.value;
    const avatar = 'https://i.postimg.cc/65mz5rJm/circle-cropped.png';
    const unlikes = 13;
    const likes = 41;
    const data = {title, author, description, link, thumbnail, date, duration, views, avatar, unlikes, likes}
    addVideo(data);
      e.target.reset();
  }

    return (
        <form onSubmit={hanldeAddVideoForm} method="POST">
            <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                            <TextInput name='title' title="Video Title" />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <TextInput name='author' title="Author" />
                        </div>

                        <div className="col-span-6">
                            <TextArea name="description" title="Description" />
                        </div>

                        <div className="col-span-6">
                            <TextInput name="link" title="YouTube Video link" />
                        </div>

                        <div className="col-span-6">
                            <TextInput name="thumbnail" title="Thumbnail link" />
                        </div>

                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                            <TextInput name='date' title="Upload Date" />
                        </div>

                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                            <TextInput name="duration" title="Video Duration" />
                        </div>

                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                            <TextInput name='views' title="Video no of views" />
                        </div>
                    </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button id="submit_btn" disabled={isLoading}
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500"
                    >
                        Save
                    </button>
                </div>

               {isSuccess && <Success message="Video was added successfully" />}
               {isError && <Error  message="There is an error adding video!" />}
            </div>
        </form>
    );
}
