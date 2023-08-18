import { useQuery } from "react-query";
import Card from "../../components/Card/card";
import Loading from "../../components/Loading/loading";
import ErrorMsg from "../../components/Error/error";

function Notes() {
  const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/notes`;

  const { isLoading, error, data } = useQuery("fetchNotes", async () => {
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <button className="min-h-[5rem] bg-orange-400 rounded-3xl flex items-center justify-center text-5xl font-semibold text-white">
        +
      </button>
      {data && data?.map((item) => <Card key={item._id} {...item} />)}
    </div>
  );
}

export default Notes;
