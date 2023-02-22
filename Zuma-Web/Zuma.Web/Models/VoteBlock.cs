namespace Zuma.Web.Models
{
    public class VoteBlock
    {
        #region Properties
        /// <summary>
        /// Gets or sets Vote block Id.This is assinged the Vin of the Vote Pack from which the block is mined
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public int VoteBlockLG { get; set; }

        /// <summary>
        /// Gets or sets the vote pack in Json format
        /// </summary>
        public string VotePacks { get; set; }

        /// <summary>
        /// Gets or sets the current block`s hash
        /// </summary>
        public string VotePackHash { get; set; }

        /// <summary>
        /// Gets or sets the previous block`s hash
        /// </summary>
        public string LastVotePackHash { get; set; }

        #endregion
    }
}