import { ClubFollowRepository } from "../entity/entity-repository/clubFollowRepository";
import { ClubRepository } from "../entity/entity-repository/clubRepository";
import { ClubTagViewRepository } from "../entity/entity-repository/clubViewRepository";
import { UserRepository } from "../entity/entity-repository/userReposiotry";
import { ClubService } from "../service/club.service";
import { BusinessLogic } from "../shared/BusinessLogicInterface";
import { ClubInfoResObj, ClubListResObj } from "../shared/DataTransferObject";

export class ClubController {
  private clubService: ClubService = new ClubService(
    ClubTagViewRepository.getQueryRepository(),
    ClubRepository.getQueryRepository(),
    UserRepository.getQueryRepository(),
    ClubFollowRepository.getQueryRepository()
  );

  public showClubList: BusinessLogic = async  (req, res, next) => {
    const clubs: ClubListResObj[] = await this.clubService.showClubList();
    res.status(200).json(clubs);
  }

  public showClubInfo: BusinessLogic = async (req, res, next) => {
    const club: ClubInfoResObj = await this.clubService.showClubInfo(+req.params.club_id);
    res.status(200).json(club);
  }

  public followClubHandler: BusinessLogic = async (req, res, next) => {
    await this.clubService.followClubHandler(+req.decoded.sub, +req.params.club_id);
    res.status(200).json({ message: "User following club now" })
  }

  public unfollowClub: BusinessLogic = async (req, res, next) => {
    await this.clubService.unfollowClub(+req.decoded.sub, +req.params.club_id);
    res.status(200).json({ message: "User unfollowing club now" });
  }
}