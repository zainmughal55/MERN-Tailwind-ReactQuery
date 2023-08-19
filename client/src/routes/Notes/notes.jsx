import { useMutation, useQuery } from "react-query";
import Card from "../../components/Card/card";
import Loading from "../../components/Loading/loading";
import ErrorMsg from "../../components/Error/error";
import { useState } from "react";
import { Link } from "react-router-dom";

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

  const deleteNote = useMutation((id) => {
    return fetch(`${baseUrl}/${id}`, { method: "DELETE" }).then(() => {
      setRefetch((prev) => !prev);
    });
  });

  if (isLoading || deleteNote.isLoading) {
    return <Loading />;
  }

  if (error || deleteNote.isError) {
    return <ErrorMsg />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <Link
        className="min-h-[5rem] bg-orange-400 rounded-3xl flex items-center justify-center text-5xl font-semibold text-white"
        to={"/create-note"}
      >
        +
      </Link>
      {data &&
        data?.map((item) => (
          <Card key={item._id} mutateAsync={deleteNote.mutateAsync} {...item} />
        ))}
    </div>
  );
}

export default Notes;
