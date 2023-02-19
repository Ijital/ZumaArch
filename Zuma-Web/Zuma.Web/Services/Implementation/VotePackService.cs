using Zuma.Web.Helpers;
using Zuma.Web.Models;
using Zuma.Web.Repositories.Implementation;
using Zuma.Web.Services.Interface;

namespace Zuma.Web.Services.Implementation
{
    public class VotePackService : IVotePackService
    {
        private IDataRepository<VotePack> _votePackRepo;

        public VotePackService(IDataRepository<VotePack> votePackRepo)
        {
            _votePackRepo = votePackRepo;
        }

        public async Task<IEnumerable<VotePack>> GetVotePacksAsync()
        {
            return await _votePackRepo.GetAllAsync();
        }

        public async Task<IEnumerable<string>> SaveVotePacksAsync(IEnumerable<VotePack> votePacks)
        {
            // check to make sure no votepack id has already been saved then 
           // Report any ones that have been recieved
            await _votePackRepo.SaveAllAsync(votePacks);
            return null;// votePacks.Select(voter => voter.VoterId);
        }

        public async Task MineVotePacksAsync(string blockId,int voteLga,IEnumerable<string> votePackIds)
        {
           var voteBlock = await this.GetVoteBlock(blockId, voteLga, votePackIds);
           // Call VoteBlock Serice to save to database
        }

        private async Task<VoteBlock> GetVoteBlock(string blockId, int voteLga, IEnumerable<string> votePackIds)
        {
            var pendingVotePacks = await _votePackRepo.GetEntitiesAsync(votePackIds);
            var votePacksJson = SerializationHelper.GetJson(pendingVotePacks);

           return new VoteBlock()
            {
                Id = blockId,
                VoteBlockLG = voteLga,
                VotePacks = votePacksJson,
                VotePackHash = HashHelper.GetHash(votePacksJson),
                LastVotePackHash = HashHelper.GetHash(blockId)
            };
        }
    }
}
