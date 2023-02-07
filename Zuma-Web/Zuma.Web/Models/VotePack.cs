namespace Zuma.Web.Models
{
    public class VotePack
    {
        public int Id { get; set; }

        public string? VoterId { get; set; }

        public string? VoterPU { get; set; }

        public int? VoterAge { get; set; }

        public char? VoterGender { get; set; }

        public string? VoterOccupation { get; set; }

        public string? VoteId { get; set; }

        public string? VoteDate { get; set; }

        public string? VoteLocation { get; set; }

        public string? VoteForPresident { get; set; }

        public string? VoteForSenate { get; set; }

        public string? VoteForReps { get; set; }

        public string? VoteForGovernor { get; set; }

        public string? VoteForAssembly { get; set; }

        public char? VoteBlockStatus { get; set; }
    }
}