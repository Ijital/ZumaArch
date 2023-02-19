using Zuma.Web.Models;

namespace Zuma.Web.Services.Interface
{
    public interface IVotePackService
    {   /// <summary>
        /// Saves a Vote Pack and returns the Id of saved vote packs
        /// </summary>
        Task<IEnumerable<string>> SaveVotePacksAsync(IEnumerable<VotePack> votePacks);

        /// <summary>
        /// Get All votes packs
        /// </summary>
        Task<IEnumerable<VotePack>> GetVotePacksAsync();

        /// <summary>
        /// Update status of Vote Packs and returns list of updated vote packs
        /// </summary>
        Task MineVotePacksAsync(string blockId, int voteLga,IEnumerable<string> votePacks);
    }
}
