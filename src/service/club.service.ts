import { ClubFollowRepository } from "../entity/entity-repository/clubFollowRepository";
import { ClubRepository } from "../entity/entity-repository/clubRepository";
import { UserRepository } from "../entity/entity-repository/userReposiotry";
import { Club, ClubFollow, User } from "../entity/model";
import { ClubInfoResObj, ClubListResObj, ClubMemberResObj, ClubRecruitmentInfoResObj } from "../shared/DataTransferObject";
import { BadRequestError } from "../shared/exception";
import { ClubTagViewRepository } from "./../entity/entity-repository/clubViewRepository";
import { ClubUserViewRepository } from "./../entity/entity-repository/clubUserViewRepository";

export class ClubService {
  constructor(
    private clubTagViewRepository: ClubTagViewRepository,
    private clubUserViewRepository: ClubUserViewRepository,
    private clubRepository: ClubRepository,
    private userRepository: UserRepository,
    private clubFollowRepository: ClubFollowRepository
  ) {}

  public async showClubList(): Promise<ClubListResObj[]> {
    const clubs: ClubListResObj[] = await this.clubTagViewRepository.findAllClub();
    clubs.forEach(club => {
      const serializedClubtags: string = club.clubtag as string;
      club.clubtag = serializedClubtags.split(",");
    });
    return clubs;
  }
  
  public async showClubInfo(club_id: number): Promise<ClubInfoResObj> {
    const club: ClubInfoResObj = await this.clubRepository.findInfoById(club_id);
    if(!club) {
      throw new BadRequestError();
    }
    club.clubtag = await this.clubTagViewRepository.findClubTagsById(club_id);
    return club;
  }
  
  public async followClubHandler(user_id: number, club_id: number) {
    const userRecord: User = await this.userRepository.findOne(user_id);
    const clubRecord: Club = await this.clubRepository.findOne(club_id);
    if(!userRecord || !clubRecord) {
      throw new BadRequestError();
    }
    await this.clubFollowRepository.createClubFollow(userRecord, clubRecord);
  }

  public async unfollowClub(user_id: number, club_id: number) {
    const userRecord: User = await this.userRepository.findOne(user_id);
    const clubRecord: Club = await this.clubRepository.findOne(club_id);
    const existRecord: ClubFollow = await this.clubFollowRepository.findOne({
      user: userRecord,
      club: clubRecord
    });
    if(!userRecord || !clubRecord || !existRecord) {
      throw new BadRequestError();
    }
    await this.clubFollowRepository.deleteClubFollow(userRecord, clubRecord);
  }

  public async showClubsMember(club_id: number): Promise<ClubMemberResObj[]> {
    const members: ClubMemberResObj[] = await this.clubUserViewRepository.findClubsMember(club_id);
    if(!members) {
      throw new BadRequestError();
    } 
    return members;
  }

  public async showClubRecruitments(club_id: number): Promise<ClubRecruitmentInfoResObj> {
    const recruitment: Club = await this.clubRepository.findClubRecruitments(club_id);
    if(!recruitment) {
      throw new BadRequestError()
    } 
    return {
      major: recruitment.majors.map(major => major.majorname),
      closeat: recruitment.close_at,
    };
  }
}