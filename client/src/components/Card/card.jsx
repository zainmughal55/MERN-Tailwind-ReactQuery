import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import EditSvg from "./../../assets/icons/edit.svg";
import DeleteSvg from "./../../assets/icons/delete.svg";
import EyeSvg from "./../../assets/icons/eye.svg";

function Card({ _id, title, description, mutateAsync }) {
  return (
    <div className="bg-slate-200 rounded-3xl p-5 flex flex-col gap-2">
      <div className="w-fit flex items-center gap-1 ml-auto">
        <Link to={`/update-note/${_id}`}>
          <img
            src={EditSvg}
            alt="edit btn"
            className="h-4 w-4 flex-no-shrink fill-current"
          />
        </Link>
        <img
          onClick={() => {
            mutateAsync(_id);
          }}
          src={DeleteSvg}
          alt="delete btn"
          className="h-4 w-4 flex-no-shrink fill-current"
        />
      </div>
      <div className="space-y-2">
        <h2 className="font-semibold text-sm firstRowEllipsis">{title}</h2>
        <p className="text-sm secondRowEllipsis">{description}</p>
      </div>
      <Link to={`/${_id}`} className="ml-auto mt-auto">
        <img
          src={EyeSvg}
          className="h-4 w-4 flex-no-shrink fill-current"
          alt="eye btn"
        />
      </Link>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  mutateAsync: PropTypes.func,
};

export default Card;
