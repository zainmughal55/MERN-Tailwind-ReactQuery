import { useQuery } from "react-query";
import Loading from "../../components/Loading/loading";
import ErrorMsg from "../../components/Error/error";
import { Link, useParams } from "react-router-dom";

export default function Note() {
  const { id } = useParams();
  const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/notes/${id}`;
  const { isLoading, error, data } = useQuery("fetchNote", async () => {
    const res = await fetch(baseUrl);
    return res.json();
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMsg />;
  }

  return (
    <>
      {data && (
        <div className="space-y-3">
          <div className=" flex items-center justify-between">
            <h2 className="font-semibold text-lg">{data.title}</h2>
            <Link
              className="hover:bg-orange-500 hover:text-white border-2 border-orange-600 py-1 px-4 rounded-3xl transition-all"
              to=".."
            >
              Back
            </Link>
          </div>
          <p className="text-base text-justify">{data.description}</p>
        </div>
      )}
    </>
  );
}
