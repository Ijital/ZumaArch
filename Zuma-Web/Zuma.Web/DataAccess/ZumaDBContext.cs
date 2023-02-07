namespace Zuma.Web.DataAccess
{
    using Microsoft.EntityFrameworkCore;
    using Zuma.Web.Models;

    public class ZumaDBContext : DbContext
    {
        public ZumaDBContext(DbContextOptions<ZumaDBContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {

        }

        /// <summary>
        /// Gets or Sets VotePack Entities
        /// </summary>
        public DbSet<VotePack> VotePacks { get; set; }

        /// <summary>
        /// Gets or Sets VoteBlock Entities
        /// </summary>
        public DbSet<VoteBlock> VoteBlocks { get; set; }
    }
}
