import { ClubFollowRepository } from "../entity/entity-repository/clubFollowRepository";
import { ClubMemberRepository } from "../entity/entity-repository/clubMemberRepository";
import { FeedFlagRepository } from "../entity/entity-repository/feedFlagRepository";
import { FeedRepotisoty } from "../entity/entity-repository/feedRepository";
import { FeedService } from "../service/feed.service";
import { BusinessLogic } from "../shared/BusinessLogicInterface";
import { FeedListResObj } from "../shared/DataTransferObject";
import { BadRequestError } from "../shared/exception";

export class FeedController {
  private feedService: FeedService = new FeedService(
    FeedRepotisoty.getQueryRepository(),
    ClubMemberRepository.getQueryRepository(),
    FeedFlagRepository.getQueryRepository(),
    ClubFollowRepository.getQueryRepository()
  );

  public getFeedList: BusinessLogic = async (req, res, next) => {
    if(!req.query.page) {
      next(new BadRequestError())
    }
    const feeds: FeedListResObj[] = await this.feedService.getFeedList(+req.query.page, req.decoded ? +req.decoded.sub : 0);
    res.status(200).json(feeds);
  } 
}