namespace Zuma.Web.Controllers
{
    #region Usings
    using Microsoft.AspNetCore.Mvc;
    using Zuma.Web.Models;
    using Zuma.Web.Services.Interface;
    #endregion

    [Route("api/[controller]")]
    [ApiController]
    public class VotePacksController : ControllerBase
    {
        private readonly IVotePackService _voteService;

        public VotePacksController(IVotePackService votePackRepo)
        {
            _voteService = votePackRepo;
        }

        // GET: api/VotePacks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VotePack>>> GetVotePacks()
        {
            return Ok(await _voteService.GetVotePacksAsync());
        }

        //POST: api/VotePacks
        [HttpPost]
        public async Task<ActionResult<IEnumerable<string>>> SaveVotePacks(IEnumerable<VotePack> votePacks)
        {
           return Ok( await _voteService.SaveVotePacksAsync(votePacks));
        }
   
        //POST: api/VotePacks
        [HttpPost]
        //The endpoint will be used by the INEC to broadcast a list of votePacks intended to be block
        public async Task<ActionResult<IEnumerable<string>>> MineVotePacks(string blockId, int voteLga, IEnumerable<string> votePacksIds)
        {
            return Ok(_voteService.MineVotePacksAsync(blockId, voteLga, votePacksIds));
        }


        //// GET: api/VotePacks/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<VotePack>> GetVotePack(int id)
        //{
        //    var votePack = await _context.VotePacks.FindAsync(id);

        //    if (votePack == null)
        //    {
        //        return NotFound();
        //    }

        //    return votePack;
        //}

    }
}
