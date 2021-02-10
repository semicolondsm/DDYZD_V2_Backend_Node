import { ClubFollowRepository } from "../entity/entity-repository/clubFollowRepository";
import { ClubRepository } from "../entity/entity-repository/clubRepository";
import { UserRepository } from "../entity/entity-repository/userReposiotry";
import { Club, ClubFollow, User } from "../entity/model";
import { BusinessLogic } from "../shared/BusinessLogicInterface";
import { ClubListResObj } from "../shared/DataTransferObject";
import { BadRequestError } from "../shared/exception";
import { ClubTagViewRepository } from './../entity/entity-repository/clubViewRepository';

const showClubList: BusinessLogic = async  (req, res, next) => {
  const clubs: ClubListResObj[] = await ClubTagViewRepository.getQueryRepository().findAllClub();
  clubs.forEach(club => {
    const serializedClubtags: string = club.clubtag as string;
    club.clubtag = serializedClubtags.split(",");
  });
  res.status(200).json(clubs);
}

const followClub: BusinessLogic = async (req, res, next) => {
  const userRecord: User = await UserRepository.getQueryRepository().findOne(+req.decoded.sub);
  const clubRecord: Club = await ClubRepository.getQueryRepository().findOne(+req.params.club_id);
  const existRecord: ClubFollow = await ClubFollowRepository.getQueryRepository().findOne({
    user: userRecord,
    club: clubRecord
  });

  if(!userRecord || !clubRecord || existRecord) {
    return next(new BadRequestError());
  }

  await ClubFollowRepository.getQueryRepository().createClubFollow(userRecord, clubRecord);
  res.status(200).json({ message: "User following club now" })
}

const unfollowClub: BusinessLogic = async (req, res, next) => {
  const userRecord: User = await UserRepository.getQueryRepository().findOne(+req.decoded.sub);
  const clubRecord: Club = await ClubRepository.getQueryRepository().findOne(+req.params.club_id);
  const existRecord: ClubFollow = await ClubFollowRepository.getQueryRepository().findOne({
    user: userRecord,
    club: clubRecord
  });

  if(!userRecord || !clubRecord || !existRecord) {
    return next(new BadRequestError());
  }

  await ClubFollowRepository.getQueryRepository().deleteClubFollow(userRecord, clubRecord);
  res.status(200).json({ message: "User unfollowing club now" });
}

export { 
  showClubList,
  followClub,
  unfollowClub
}