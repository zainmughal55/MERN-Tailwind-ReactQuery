import { useQuery } from "react-query";

function Notes() {
  const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/notes`;
  const { isLoading, error, data } = useQuery("fetchNotes", async () => {
    const res = await fetch(baseUrl);
    return res.json();
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-14">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 mr-2 text-gray-300 animate-spin  fill-orange-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-14">
        <h2 className="font-semibold text-sm firstRowEllipsis">
          Something went wrong with server. Kindly check after a while!
        </h2>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
      <button className="bg-orange-400 rounded-3xl flex items-center justify-center text-5xl font-semibold text-white">
        +
      </button>
      {data &&
        data?.map((item) => (
          <div
            key={item._id}
            className="bg-slate-200 rounded-3xl p-5 flex flex-col gap-2"
          >
            <div className="w-fit flex items-center gap-1 ml-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 flex-no-shrink fill-current"
                viewBox="0 0 26 21.458"
              >
                <path
                  id="edit_note_FILL0_wght400_GRAD0_opsz48"
                  d="M65.695-295.461V-298l7.725-7.725,2.539,2.539-7.725,7.725Zm-12.875-7.51v-2.146H63.549v2.146ZM77.5-304.724l-2.539-2.539,1.037-1.037a1.016,1.016,0,0,1,.751-.286,1.016,1.016,0,0,1,.751.286l1.037,1.037a1.016,1.016,0,0,1,.286.751,1.016,1.016,0,0,1-.286.751ZM52.82-308.872v-2.146H69.629v2.146Zm0-5.9v-2.146H69.629v2.146Z"
                  transform="translate(-52.82 316.919)"
                />
              </svg>
              <svg
                className="h-4 w-4 flex-no-shrink fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 23.111 26"
              >
                <path
                  id="delete_FILL0_wght400_GRAD0_opsz48"
                  d="M163.647-814a2.086,2.086,0,0,1-1.53-.636,2.086,2.086,0,0,1-.636-1.53V-836.75H160v-2.167h6.789V-840h9.533v1.083h6.789v2.167h-1.481v20.583a2.079,2.079,0,0,1-.65,1.517,2.079,2.079,0,0,1-1.517.65Zm15.817-22.75H163.647v20.583h15.817Zm-11.989,17.478h2.167v-14.408h-2.167Zm5.994,0h2.167v-14.408h-2.167Zm-9.822-17.478v0Z"
                  transform="translate(-160 840)"
                />
              </svg>
            </div>
            <div className="space-y-2">
              <h2 className="font-semibold text-sm firstRowEllipsis">
                {item.title}
              </h2>
              <p className="text-sm secondRowEllipsis">{item.description}</p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 flex-no-shrink fill-current ml-auto mt-auto"
              viewBox="0 0 32.533 22.182"
            >
              <path
                id="visibility_FILL0_wght400_GRAD0_opsz48"
                d="M56.271-782.624a6.05,6.05,0,0,0,4.45-1.834,6.072,6.072,0,0,0,1.83-4.455,6.051,6.051,0,0,0-1.834-4.451,6.072,6.072,0,0,0-4.455-1.83,6.05,6.05,0,0,0-4.45,1.834,6.072,6.072,0,0,0-1.83,4.455,6.051,6.051,0,0,0,1.834,4.45A6.072,6.072,0,0,0,56.271-782.624Zm-.013-2.144a3.973,3.973,0,0,1-2.93-1.21,4.016,4.016,0,0,1-1.2-2.939,3.973,3.973,0,0,1,1.21-2.93,4.016,4.016,0,0,1,2.939-1.2,3.973,3.973,0,0,1,2.93,1.21,4.016,4.016,0,0,1,1.2,2.939,3.973,3.973,0,0,1-1.21,2.93A4.016,4.016,0,0,1,56.258-784.769Zm.009,6.95a16.569,16.569,0,0,1-9.76-3.068A18.693,18.693,0,0,1,40-788.909a18.694,18.694,0,0,1,6.507-8.023A16.57,16.57,0,0,1,56.267-800a16.57,16.57,0,0,1,9.76,3.068,18.694,18.694,0,0,1,6.507,8.023,18.693,18.693,0,0,1-6.507,8.022A16.569,16.569,0,0,1,56.267-777.818ZM56.267-788.909Zm-.006,8.873a14.877,14.877,0,0,0,8.232-2.422,15.713,15.713,0,0,0,5.712-6.451A15.728,15.728,0,0,0,64.5-795.36a14.846,14.846,0,0,0-8.226-2.422,14.876,14.876,0,0,0-8.232,2.422,15.978,15.978,0,0,0-5.749,6.451,15.992,15.992,0,0,0,5.743,6.451A14.847,14.847,0,0,0,56.26-780.036Z"
                transform="translate(-40 800)"
              />
            </svg>
          </div>
        ))}
    </div>
  );
}

export default Notes;
