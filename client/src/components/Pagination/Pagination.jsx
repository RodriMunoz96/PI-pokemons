import React from "react";
import style from "./Pagination.module.css";

export default function Pagination(props) {
  const { setCurrentPage, currentPage, nPages } = props;

  const next = () => {
    if (currentPage !== nPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prev = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={style.divContainer}>
      <div>
        <button className={style.buttonStyle} onClick={prev}>
          Prev
        </button>
      </div>
      <div>
        <h3 className={style.paginStyle}>
          {currentPage} / {nPages}
        </h3>
      </div>
      <div>
        <button className={style.buttonStyle} onClick={next}>
          Next
        </button>
      </div>
    </div>
  );
}
