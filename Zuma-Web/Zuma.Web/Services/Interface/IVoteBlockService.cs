using Zuma.Web.Models;

namespace Zuma.Web.Services.Interface
{
    public interface IVoteBlockService
    {
        /// <summary>
        /// Saves vote block to Storage
        /// </summary>
        public Task SaveVoteBlockAsync(VoteBlock voteBlock);

        /// <summary>
        /// Gets the last vote block
        /// </summary>
        public Task<VoteBlock> GetLastVoteBlockAsync();
    }
}
