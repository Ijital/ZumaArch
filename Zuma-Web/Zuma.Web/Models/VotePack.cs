namespace Zuma.Web.Models
{
    public class VotePack
    {
        /// <summary>
        /// Gets or sets Vote Pack id,assigned the value of voter's Vin
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets voter's registered Polling Unit
        /// </summary>
        public string? VoterPU { get; set; }

        /// <summary>
        /// Gets or sets Voter's age
        /// </summary>
        public int? VoterAge { get; set; }

        /// <summary>
        /// Gets or sets voters gender
        /// </summary>
        public char? VoterGender { get; set; }

        /// <summary>
        /// Gets or sets Voter's occupation
        /// </summary>
        public string? VoterOccupation { get; set; }

        /// <summary>
        /// Gets or sets the date time of vote pack creation
        /// </summary>
        public string? VoteDate { get; set; }

        /// <summary>
        /// Gets or set Location where vote pack is cast
        /// </summary>
        public string?  VoteLocation { get; set; }

        /// <summary>
        /// Gets or sets voter's selection in presidential election
        /// </summary>
        public string? VoteForPresident { get; set; }

        /// <summary>
        /// Gets or sets voter's selection in Senatorial election
        /// </summary>
        public string? VoteForSenate { get; set; }

        /// <summary>
        /// Gets or sets voter's selection in House of reps election
        /// </summary>
        public string? VoteForReps { get; set; }

        /// <summary>
        /// Gets or sets voters selection in Gubernatorial election
        /// </summary>
        public string? VoteForGovernor { get; set; }

        /// <summary>
        /// Get or sets voter's selection in House of Assembly election
        /// </summary>
        public string? VoteForAssembly { get; set; }

        /// <summary>
        /// Gets or sets value indicating of vote pack has been added to the block chain
        /// </summary>
        public int VotePackStatus { get; set; }
    }
}