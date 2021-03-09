import { ClubFollowRepository } from "../entity/entity-repository/clubFollowRepository";
import { ClubMemberRepository } from "../entity/entity-repository/clubMemberRepository";
import { FeedFlagRepository } from "../entity/entity-repository/feedFlagRepository";
import { FeedRepotisoty } from "../entity/entity-repository/feedRepository";
import { Feed } from "../entity/model";
import { FeedListResObj } from "../shared/DataTransferObject";

export class FeedService {
  constructor(
    private feedRepository: FeedRepotisoty,
    private clubMemberRepository: ClubMemberRepository,
    private feedFlagRepository: FeedFlagRepository,
    private clubFollowRepository: ClubFollowRepository
  ) {} 

  public async getFeedList(pageNumber: number, user_id?: number): Promise<FeedListResObj[]> {
    const feeds: Feed[] = await this.feedRepository.getFeedList(pageNumber);
    return await Promise.all(feeds.map(async (feed: Feed): Promise<FeedListResObj> => {
      return {
        feedId: feed.id,
        clubName: feed.club.name,
        profileImage: feed.club.profile_image,
        uploadAt: feed.upload_at,
        content: feed.content,
        media: await this.feedRepository.getFeedMedia(feed.id),
        flags: await this.feedRepository.getFeedFlags(feed.id),
        owner: user_id ? await this.clubMemberRepository.checkIsClubMember(feed.club.id, user_id) : false,
        flag: user_id ? await this.feedFlagRepository.checkIsFlaged(feed.id, user_id) : false,
        follow: user_id ? await this.clubFollowRepository.checkIsFollowed(user_id, feed.club.id) : false
      }
    }));
  }
}