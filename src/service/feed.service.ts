import { ClubFollowRepository } from "../entity/entity-repository/clubFollowRepository";
import { ClubMemberRepository } from "../entity/entity-repository/clubMemberRepository";
import { FeedRepotisoty } from "../entity/entity-repository/feedRepository";
import { FeedListDefaultResObj, FeedListResObj } from "../shared/DataTransferObject";

export class FeedService {
  constructor(
    private feedRepository: FeedRepotisoty,
    private clubFollowRepository: ClubFollowRepository,
    private clubMemberRepository: ClubMemberRepository
  ) {} 

  public async getFeedList(pageNumber: number, user_id?: number): Promise<FeedListResObj> {
    const defaultResults: FeedListDefaultResObj[] = await this.feedRepository.getFeedList(pageNumber);
    if(user_id) {

    } else {

    }
  }
}