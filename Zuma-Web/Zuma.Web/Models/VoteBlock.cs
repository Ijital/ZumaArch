namespace Zuma.Web.Models
{
    public class VoteBlock
    {
        #region Properties

        /// <summary>
        /// Gets or sets unique Guid of vote block across the network of Nodes
        /// </summary>
        public string VoteBlockId { get; set; }

        /// <summary>
        /// Gets or set the block index
        /// </summary>
        public int VoteBlockIndex { get; set; }

        /// <summary>
        /// Gets or sets the vote pack in Json format
        /// </summary>
        public string VotePack { get; set; }

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