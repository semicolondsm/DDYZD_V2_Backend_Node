import { ClubFollowRepository } from "../entity/entity-repository/clubFollowRepository";
import { ClubRepository } from "../entity/entity-repository/clubRepository";
import { ClubUserViewRepository } from "../entity/entity-repository/clubUserViewRepository";
import { ClubTagViewRepository } from "../entity/entity-repository/clubViewRepository";
import { OptionsRepository } from "../entity/entity-repository/optionRepository";
import { SupplyRepository } from "../entity/entity-repository/supplyRepository";
import { UserRepository } from "../entity/entity-repository/userReposiotry";
import { Club, Supply } from "../entity/model";
import { ClubService } from "../service/club.service";
import { BusinessLogic } from "../shared/BusinessLogicInterface";
import { ClubInfoResObj, ClubListResObj, ClubMemberResObj } from "../shared/DataTransferObject";
import { ClubRecruitmentInfoResObj } from "./../shared/DataTransferObject";

export class ClubController {
  private clubService: ClubService = new ClubService(
    ClubTagViewRepository.getQueryRepository(),
    ClubUserViewRepository.getQueryRepository(),
    ClubRepository.getQueryRepository(),
    UserRepository.getQueryRepository(),
    ClubFollowRepository.getQueryRepository(),
    SupplyRepository.getQueryRepository(),
    OptionsRepository.getQueryRepository()
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

  public showClubsMember: BusinessLogic = async (req, res, next) => {
    const members: ClubMemberResObj[] = await this.clubService.showClubsMember(+req.params.club_id);
    res.status(200).json(members);
  }

  public showClubRecruitments: BusinessLogic = async (req, res, next) => {
    const recruitments: ClubRecruitmentInfoResObj = await this.clubService.showClubRecruitments(+req.params.club_id);
    res.status(200).json(recruitments);
  }

  public showClubStatus: BusinessLogic = async (req, res, next) => {
    const status: Club = await this.clubService.showClubStatus(+req.params.club_id);
    res.status(200).json(status);
  }

  public showClubSupplies: BusinessLogic = async (req, res, next) => {
    const supplies: Supply[] = await this.clubService.showClubSupplies(+req.params.club_id);
    res.status(200).json(supplies);
  }

  public requestClubSupplies: BusinessLogic = async (req, res, next) => {
    await this.clubService.requestClubSupplies(+req.params.club_id, +req.decoded.sub, req.body);
    res.status(200).json({ msg: "success" });
  }
}