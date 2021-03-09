import { ClubFollowRepository } from "../entity/entity-repository/clubFollowRepository";
import { ClubMemberRepository } from "../entity/entity-repository/clubMemberRepository";
import { FeedRepotisoty } from "../entity/entity-repository/feedRepository";
import { UserRepository } from "../entity/entity-repository/userReposiotry";
import { FeedService } from "../service/feed.service";
import { BusinessLogic } from "../shared/BusinessLogicInterface";
import { FeedListResObj } from "../shared/DataTransferObject";

export class FeedController {
  private feedService: FeedService = new FeedService(
    FeedRepotisoty.getQueryRepository(),
    ClubMemberRepository.getQueryRepository(),
    ClubFollowRepository.getQueryRepository(),
    UserRepository.getQueryRepository()
  );

  public getFeedList: BusinessLogic = async (req, res, next) => {
    const feeds: FeedListResObj[] = await this.feedService.getFeedList(+req.query.page, req.decoded ? +req.decoded.sub : 0);
    res.status(200).json(feeds);
  } 
}