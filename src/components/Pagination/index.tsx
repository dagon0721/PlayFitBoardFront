import React, { Dispatch, SetStateAction } from "react";
import "./style.css";

// interface: 페이지네이션 컴포넌트 Properties //
interface Props {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalItems: number; // 총 아이템 수 추가
  itemsPerPage: number; // 한 페이지당 아이템 수 추가
}

// component: 페이지네이션 컴포넌트 //
export default function Pagination(props: Props) {
  const { currentPage, setCurrentPage, totalItems, itemsPerPage } = props;

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // event handler: 페이지 클릭 이벤트 처리 //
  const onPageClickHandler = (page: number) => {
    setCurrentPage(page);
  };

  // event handler: 이전 클릭 이벤트 처리 //
  const onPreviousClickHandler = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // event handler: 다음 클릭 이벤트 처리 //
  const onNextClickHandler = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // render: 페이지네이션 컴포넌트 렌더링//
  return (
    <div id="pagination-wrapper">
      <div className="pagination-change-link-box">
        <div
          className="pagination-change-link-text"
          onClick={onPreviousClickHandler}
        >
          {"이전"}
        </div>
      </div>
      <div className="pagination-divider">{"|"}</div>

      {/* 페이지 번호 렌더링 */}
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) =>
        page === currentPage ? (
          <div className="pagination-text-active" key={page}>
            {page}
          </div>
        ) : (
          <div
            className="pagination-text"
            onClick={() => onPageClickHandler(page)}
            key={page}
          >
            {page}
          </div>
        )
      )}

      <div className="pagination-divider">{"|"}</div>
      <div className="pagination-change-link-box">
        <div
          className="pagination-change-link-text"
          onClick={onNextClickHandler}
        >
          {"다음"}
        </div>
      </div>
    </div>
  );
}
