import { BoardListItem } from "types/interface";
import ResponseDto from "../response.dto";

export default interface GetLikedBoardsResponseDto extends ResponseDto {
  likedBoards: BoardListItem[]; // 유저가 좋아요를 누른 게시물 리스트
}
