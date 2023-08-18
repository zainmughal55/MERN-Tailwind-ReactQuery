import { useMutation, useQuery } from "react-query";
import Card from "../../components/Card/card";
import Loading from "../../components/Loading/loading";
import ErrorMsg from "../../components/Error/error";
import { useState } from "react";

const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/notes`;

function Notes() {
  const [refetch, setRefetch] = useState(false);

  const { isLoading, error, data } = useQuery(
    ["fetchNotes", refetch],
    async () => {
      const res = await fetch(baseUrl);
      return res.json();
    }
  );

  const { mutateAsync } = useMutation((id) => {
    return fetch(`${baseUrl}/${id}`, { method: "DELETE" });
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
      {data &&
        data?.map((item) => (
          <Card
            key={item._id}
            mutateAsync={mutateAsync}
            setRefetch={setRefetch}
            {...item}
          />
        ))}
    </div>
  );
}

export default Notes;
