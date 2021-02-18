import { ClubFollowRepository } from "../entity/entity-repository/clubFollowRepository";
import { ClubRepository } from "../entity/entity-repository/clubRepository";
import { UserRepository } from "../entity/entity-repository/userReposiotry";
import { Club, ClubFollow, ClubHead, Supply, User } from "../entity/model";
import { ClubInfoResObj, ClubListResObj, ClubMemberResObj, ClubRecruitmentInfoResObj, ModifyClubSuppliesDto, SupplyClubItemDto } from "../shared/DataTransferObject";
import { BadRequestError, ForbiddenError } from "../shared/exception";
import { ClubTagViewRepository } from "./../entity/entity-repository/clubViewRepository";
import { ClubUserViewRepository } from "./../entity/entity-repository/clubUserViewRepository";
import { SupplyRepository } from "../entity/entity-repository/supplyRepository";
import { OptionsRepository } from "../entity/entity-repository/optionRepository";
import { ClubHeadRepository } from "../entity/entity-repository/clubHeadRepository";
import { ClubUserView } from "../entity/view";

export class ClubService {
  constructor(
    private clubTagViewRepository: ClubTagViewRepository,
    private clubUserViewRepository: ClubUserViewRepository,
    private clubRepository: ClubRepository,
    private userRepository: UserRepository,
    private clubFollowRepository: ClubFollowRepository,
    private supplyRepository: SupplyRepository,
    private optionRepositoty: OptionsRepository,
    private clubHeadRepository: ClubHeadRepository
  ) {}

  public async showClubList(): Promise<ClubListResObj[]> {
    const clubs: ClubListResObj[] = await this.clubTagViewRepository.findAllClub();
    clubs.forEach(club => {
      const serializedClubtags: string = club.clubtag as string;
      club.clubtag = serializedClubtags.split(",");
    });
    return clubs;
  }
  
  public async showClubInfo(club_id: number, user_id: number): Promise<ClubInfoResObj> {
    const club: ClubInfoResObj = await this.clubRepository.findInfoById(club_id);
    if(!club) {
      throw new BadRequestError();
    }
    club.clubtag = await this.clubTagViewRepository.findClubTagsById(club_id);
    if(!user_id) {
      club.owner = false;
      return club;
    }
    const clubHead: ClubHead = await this.clubHeadRepository.findOne({ where: { 
      club: await this.clubRepository.findOne({ where: { club_id } }),  
      user: await this.userRepository.findOne({ where: { user_id } })
    }});
    club.owner = !!clubHead;
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
    const head: ClubMemberResObj = await this.clubHeadRepository.findClubHead(club_id);
    const members: ClubMemberResObj[] = await this.clubUserViewRepository.findClubsMember(club_id, head.user_id);
    if(!members) {
      throw new BadRequestError();
    } 
    members.unshift(head);
    return members;
  }

  public async showClubRecruitments(club_id: number): Promise<ClubRecruitmentInfoResObj> {
    const recruitment: Club = await this.clubRepository.findClubRecruitments(club_id);
    if(!recruitment) {
      throw new BadRequestError();
    } 
    return {
      major: recruitment.majors.map(major => major.majorname),
      closeat: recruitment.close_at,
    };
  }

  public async showClubStatus(club_id: number): Promise<Club> {
    const status: Club = await this.clubRepository.findClubStatus(club_id);
    if(!status) {
      throw new BadRequestError();
    }
    return status;
  }

  public async showClubSupplies(club_id: number): Promise<Supply[]> {
    const supplies: Supply[] = await this.clubRepository.findClubSupplies(club_id);
    if(!supplies) {
      throw new BadRequestError();
    } 
    return supplies;
  }

  public async requestClubSupplies(club_id: number, user_id: number, data: SupplyClubItemDto) {
    const club: Club = await this.clubRepository.findOne({ where: { club_id } });
    const user: User = await this.userRepository.findOne({ where: { user_id } });
    if(club.current_budget - data.price < 0) {
      throw new BadRequestError("예산 초과"); 
    } 
    const supply: Supply = await this.supplyRepository.createNewSupply(club, user, data);
    if(data.option) {
      await this.optionRepositoty.createNewOption(data.option, supply);
    }
  }

  public async modifyClubSupplies(club_id: number, supply_id: number, user_id: number, { count, price = 0 }: ModifyClubSuppliesDto) {
    if(await this.checkIsNotClubMember(club_id, user_id)) {
      throw new ForbiddenError();
    }
    const supply: Supply = await this.supplyRepository.findOneSupplyWithClubWithUser(supply_id);
    if(!supply || supply.club.club_id !== club_id || supply.user.user_id !== user_id) {
      throw new ForbiddenError();
    } else if(supply.club.current_budget - price < 0) {
      throw new BadRequestError("예산 초과");
    } 
    supply.price = price ? price : supply.price;
    supply.count = count ? count : supply.count;
    await this.supplyRepository.manager.save(supply);
  }

  public async removeClubSupplies(club_id: number, supply_id: number, user_id: number) {
    if(await this.checkIsNotClubMember(club_id, user_id)) {
      throw new ForbiddenError();
    }
    const supply: Supply = await this.supplyRepository.findOneSupplyWithClubWithUser(supply_id);
    if(!supply || supply.club.club_id !== club_id || supply.user.user_id !== user_id) {
      throw new ForbiddenError();
    }
    await this.supplyRepository.delete(supply);
  }

  private async checkIsNotClubMember(club_id: number, user_id: number): Promise<boolean> {
    const clubAndUser: ClubUserView = await this.clubUserViewRepository.findOne({
      where: { club_id, user_id, result: 1 }
    });
    return !clubAndUser;
  }
}