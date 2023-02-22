namespace Zuma.Web.Controllers
{
    #region Usings

    using Microsoft.AspNetCore.Mvc;
    using Zuma.Web.Models;
    using Zuma.Web.Repositories.Implementation;

    #endregion

    [Route("api/[controller]")]
    [ApiController]
    public class VoteBlocksController : ControllerBase
    {
        private readonly IDataRepository<VoteBlock> _voteBlocksRepository;

        public VoteBlocksController(IDataRepository<VoteBlock> voteBlocks)
        {
            _voteBlocksRepository = voteBlocks;
        }

        // GET: api/VoteBlocks
        [HttpGet]
        // Endpoint used to retrieve the entire block chain
        public async Task<ActionResult<IEnumerable<VoteBlock>>> GetVoteBlocks()
        {
            var result = await _voteBlocksRepository.GetAllAsync();
            return Ok(result);
        }













        //// PUT: api/VoteBlocks/5
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutVoteBlock(string id, VoteBlock voteBlock)
        //{
        //    if (id != voteBlock.VoteBlockId)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(voteBlock).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!VoteBlockExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        //// POST: api/VoteBlocks
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPost]
        //public async Task<ActionResult<VoteBlock>> PostVoteBlock(VoteBlock voteBlock)
        //{
        //    _context.VoteBlocks.Add(voteBlock);
        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateException)
        //    {
        //        if (VoteBlockExists(voteBlock.VoteBlockId))
        //        {
        //            return Conflict();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return CreatedAtAction("GetVoteBlock", new { id = voteBlock.VoteBlockId }, voteBlock);
        //}

        //// DELETE: api/VoteBlocks/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteVoteBlock(string id)
        //{
        //    var voteBlock = await _context.VoteBlocks.FindAsync(id);
        //    if (voteBlock == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.VoteBlocks.Remove(voteBlock);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        //private bool VoteBlockExists(string id)
        //{
        //    return _context.VoteBlocks.Any(e => e.VoteBlockId == id);
        //}
    }
}
