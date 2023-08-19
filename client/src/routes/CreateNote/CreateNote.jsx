import { useRef } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/loading";
import ErrorMsg from "../../components/Error/error";

const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/notes`;

function CreateNote() {
  const titleRef = useRef("");
  const descriptionRef = useRef("");
  const navigate = useNavigate();

  const addNote = useMutation(() => {
    return fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: titleRef.current,
        description: descriptionRef.current,
      }),
    }).then(() => {
      navigate("..");
    });
  });

  if (addNote.isLoading) {
    return <Loading />;
  }

  if (addNote.isError) {
    return <ErrorMsg />;
  }

  return (
    <>
      <form onSubmit={addNote.mutateAsync} className="space-y-3">
        <input
          className="w-full text-orange-700 placeholder:text-white/50 font-semibold text-lg outline-none p-2 rounded-2xl bg-orange-300"
          placeholder="Title"
          type="text"
          name="title"
          id="title"
          onChange={(e) => (titleRef.current = e.target.value)}
          required={true}
        />
        <textarea
          name="description"
          id="description"
          required={true}
          rows={10}
          cols={30}
          className="w-full text-orange-700 placeholder:text-white/50 font-semibold text-lg outline-none p-2 rounded-2xl bg-orange-300"
          placeholder="Description"
          onChange={(e) => (descriptionRef.current = e.target.value)}
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

export default CreateNote;
