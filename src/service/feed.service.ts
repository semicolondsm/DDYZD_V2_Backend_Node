import { ClubFollowRepository } from "../entity/entity-repository/clubFollowRepository";
import { ClubMemberRepository } from "../entity/entity-repository/clubMemberRepository";
import { FeedRepotisoty } from "../entity/entity-repository/feedRepository";

export class FeedService {
  constructor(
    private feedRepository: FeedRepotisoty,
    private clubFollowRepository: ClubFollowRepository,
    private clubMemberRepository: ClubMemberRepository
  ) {} 

  public async getFeedList(pageNumber: number, user_id?: number) {
    
  }
}