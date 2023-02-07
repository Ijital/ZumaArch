using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Zuma.Web.Migrations
{
    /// <inheritdoc />
    public partial class FirstBuild : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "VoteBlocks",
                columns: table => new
                {
                    VoteBlockId = table.Column<string>(type: "TEXT", nullable: false),
                    VoteBlockIndex = table.Column<int>(type: "INTEGER", nullable: false),
                    VotePack = table.Column<string>(type: "TEXT", nullable: false),
                    VotePackHash = table.Column<string>(type: "TEXT", nullable: false),
                    LastVotePackHash = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VoteBlocks", x => x.VoteBlockId);
                });

            migrationBuilder.CreateTable(
                name: "VotePacks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    VoterId = table.Column<string>(type: "TEXT", nullable: true),
                    VoterPU = table.Column<string>(type: "TEXT", nullable: true),
                    VoterAge = table.Column<int>(type: "INTEGER", nullable: true),
                    VoterGender = table.Column<char>(type: "TEXT", nullable: true),
                    VoterOccupation = table.Column<string>(type: "TEXT", nullable: true),
                    VoteId = table.Column<string>(type: "TEXT", nullable: true),
                    VoteDate = table.Column<string>(type: "TEXT", nullable: true),
                    VoteLocation = table.Column<string>(type: "TEXT", nullable: true),
                    VoteForPresident = table.Column<string>(type: "TEXT", nullable: true),
                    VoteForSenate = table.Column<string>(type: "TEXT", nullable: true),
                    VoteForReps = table.Column<string>(type: "TEXT", nullable: true),
                    VoteForGovernor = table.Column<string>(type: "TEXT", nullable: true),
                    VoteForAssembly = table.Column<string>(type: "TEXT", nullable: true),
                    VoteBlockStatus = table.Column<char>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VotePacks", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "VoteBlocks");

            migrationBuilder.DropTable(
                name: "VotePacks");
        }
    }
}
