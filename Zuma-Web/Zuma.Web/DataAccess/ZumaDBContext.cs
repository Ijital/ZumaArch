using Microsoft.EntityFrameworkCore;
using Zuma.Web.Models;

namespace Zuma.Web.DataAccess
{
    public class ZumaDBContext : DbContext
    {
        public ZumaDBContext(DbContextOptions<ZumaDBContext> options) : base(options) { }
       
        protected override void OnModelCreating(ModelBuilder builder)
        {
           
        }

        public DbSet<VotePack> VotePacks { get; set; }
        public DbSet<VoteBlock> VoteBlocks { get; set; }
    }
}

