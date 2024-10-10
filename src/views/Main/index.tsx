import React, { useEffect, useState } from "react";
import "./style.css";
import Top3Item from "components/Top3Item";
import { BoardListItem } from "types/interface";
import { latestBoardListMock, top3BoardListMock } from "mocks";
import BoardItem from "components/BoardItem";
import Pagination from "components/Pagination";
import { useNavigate } from "react-router-dom";
import { SEARCH_PATH } from "constant";
import {
  getLatestBoardListRequest,
  getPopularListRequest,
  getTop3BoardListRequest,
} from "apis";
import {
  GetLatestBoardListResponseDto,
  GetTop3BoardListResponseDto,
} from "apis/response/board";
import { ResponseDto } from "apis/response";
import { usePagination } from "hooks";
import PaginationDetail from "components/PaginationDetail";
import { GetPopularListResponseDto } from "apis/search";

// component: 메인 화면 컴포넌트 //
export default function Main() {
  // function: 네비게이트 함수 //
  const navigate = useNavigate();
  // function: navigate를 이용해 상세 페이지로 이동
  const onBoardItemClick = (boardNumber: number) => {
    navigate(`/board/detail/${boardNumber}`);
  };
  //component: 메인 화면 상단 컴포넌트 //
  const MainTop = () => {
    // state: 주간 top3 게시물 리스트 상태 //
    const [top3BoardList, setTop3BoardList] = useState<BoardListItem[]>([]);

    // function: get top 3 board list response 처리 함수 //
    const getTop3BoardListResponse = (
      responseBody: GetTop3BoardListResponseDto | ResponseDto | null
    ) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === "DBE") alert("데이터베이스 오류입니다.");
      if (code !== "SU") return;

      const { top3List } = responseBody as GetTop3BoardListResponseDto;
      setTop3BoardList(top3List);
    };

    // effect: 첫 마운트 시 실행될 함수 //
    useEffect(() => {
      getTop3BoardListRequest().then(getTop3BoardListResponse);
    }, []);

    // render: 메인 화면 상단 컴포넌트 렌더링 //
    return (
      <div id="main-top-wrapper">
        <div className="main-top-container">
          <div className="main-top-title">
            {"Play Fit에서\n오늘의 운동 이야기를 기록해보세요"}
          </div>
          <div className="main-top-contents-box">
            <div className="main-top-contents-title">{"주간 TOP 3 게시글"}</div>
            <div className="main-top-contents">
              {top3BoardList.map((top3ListItem) => (
                <Top3Item top3ListItem={top3ListItem} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  //component: 메인 화면 하단 컴포넌트 //
  const MainBottom = () => {
    // state: 페이지 네이션 관련 상태 //
    const {
      currentPage,
      currentSection,
      viewList,
      viewPageList,
      totalSection,
      setCurrentPage,
      setCurrentSection,
      setTotalList,
    } = usePagination<BoardListItem>(5);
    // state: 게시물 개수 상태 //
    const [count, setCount] = useState<number>(0);
    // state: 인기 검색어 리스트 상태 //
    const [popularWordList, setPopularWordList] = useState<string[]>([]);

    // function get latest board List Response 처리 함수 //
    const getLatestBoardListResponse = (
      responseBody: GetLatestBoardListResponseDto | ResponseDto | null
    ) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === "DBE") alert("데이터베이스 오류입니다.");
      if (code !== "SU") return;

      const { latestList } = responseBody as GetLatestBoardListResponseDto;
      setTotalList(latestList);
      setCount(latestList.length);
    };

    // function : get popular list response 처리 함수 //
    const getPopularListResponse = (
      responseBody: GetPopularListResponseDto | ResponseDto | null
    ) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === "DBE") alert("데이터베이스 오류입니다.");
      if (code !== "SU") return;

      const { popularWordList } = responseBody as GetPopularListResponseDto;
      setPopularWordList(popularWordList);
    };

    // event handler: 인기 검색어 클릭 이벤트 처리 //
    const onPopularWordClickHandler = (word: string) => {
      navigate(SEARCH_PATH(word));
    };

    // effect: 첫 마운트 시 실행될 함수 //
    useEffect(() => {
      getLatestBoardListRequest().then(getLatestBoardListResponse);
      getPopularListRequest().then(getPopularListResponse);
    }, []);

    // render: 메인 화면 하단 컴포넌트 렌더링 //
    return (
      <div id="main-bottom-wrapper">
        <div className="main-bottom-container">
          <div className="main-bottom-title">{"최신 게시물"}</div>
          <div className="main-bottom-contents-box">
            <div className="main-bottom-current-contents">
              {viewList.map((boardListItem) => (
                <div
                  key={boardListItem.boardNumber}
                  onClick={() => onBoardItemClick(boardListItem.boardNumber)}
                >
                  <BoardItem boardListItem={boardListItem} />
                </div>
              ))}
            </div>
            <div className="main-bottom-popular-box">
              <div className="main-bottom-popular-card">
                <div className="main-bottom-popular-card-box">
                  <div className="main-bottom-popular-card-title">
                    {"인기 검색어"}
                  </div>
                  <div className="main-bottom-popular-card-contents">
                    {popularWordList.map((word) => (
                      <div
                        className="word-badge"
                        onClick={() => onPopularWordClickHandler(word)}
                      >
                        {word}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-bottom-pagination-box">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalItems={count} // 총 게시물 수
              itemsPerPage={5} // 한 페이지당 게시물 수
            />
          </div>
        </div>
      </div>
    );
  };

  // render: 메인 화면 컴포넌트 렌더링 //
  return (
    <>
      <MainTop />
      <MainBottom />
    </>
  );
}
