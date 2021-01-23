import { BusinessLogic } from "../shared/BusinessLogicInterface";
import { ClubListResObj } from "../shared/DataTransferObject";
import { ClubTagViewRepository } from './../entity/entity-repository/clubViewRepository';

const showClubList: BusinessLogic = async  (req, res, next) => {
  const clubs: ClubListResObj[] = await ClubTagViewRepository.getQueryRepository().findAllClub();
  clubs.forEach(club => {
    const serializedClubtags: string = club.clubtag as string;
    club.clubtag = serializedClubtags.split(",");
  });
  res.status(200).json(clubs);
}

export { showClubList }