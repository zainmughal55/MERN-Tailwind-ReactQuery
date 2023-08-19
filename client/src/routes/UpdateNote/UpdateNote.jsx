import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading/loading";
import ErrorMsg from "../../components/Error/error";

const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/notes`;

function UpdateNote() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const { isLoading, error } = useQuery("fetchNote", async () => {
    const res = await fetch(`${baseUrl}/${id}`);
    const data = await res.json();
    setTitle(data.title);
    setDescription(data.description);
  });

  const updateNote = useMutation(() => {
    return fetch(`${baseUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        description: description,
      }),
    }).then(() => {
      navigate("..");
    });
  });

  if (isLoading || updateNote.isLoading) {
    return <Loading />;
  }

  if (error || updateNote.isError) {
    return <ErrorMsg />;
  }

  return (
    <>
      <form onSubmit={updateNote.mutateAsync} className="space-y-3">
        <input
          className="w-full text-orange-700 placeholder:text-white/50 font-semibold text-lg outline-none p-2 rounded-2xl bg-orange-300"
          placeholder="Title"
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required={true}
        />
        <textarea
          name="description"
          id="description"
          rows={10}
          cols={30}
          className="w-full text-orange-700 placeholder:text-white/50 font-semibold text-lg outline-none p-2 rounded-2xl bg-orange-300"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required={true}
        ></textarea>
        <div className="space-x-3 w-fit ml-auto">
          <button
            type="submit"
            className="hover:bg-orange-500 hover:text-white border-2 border-orange-600 py-1 px-4 rounded-3xl transition-all"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => navigate("..")}
            className="hover:bg-orange-500 hover:text-white border-2 border-orange-600 py-1 px-4 rounded-3xl transition-all"
          >
            Back
          </button>
        </div>
      </form>
    </>
  );
}

export default UpdateNote;
