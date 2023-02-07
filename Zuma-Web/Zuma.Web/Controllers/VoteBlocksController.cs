using Microsoft.AspNetCore.Mvc;
using Zuma.Web.Models;
using Zuma.Web.Repositories.Implementation;

namespace Zuma.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VoteBlocksController : ControllerBase
    {
        private readonly IDataRepository<VoteBlock> _voteBlocks;

        public VoteBlocksController(IDataRepository<VoteBlock> voteBlocks)
        {
            _voteBlocks = voteBlocks;
        }

        // GET: api/VoteBlocks
        [HttpGet]
        public async Task<IEnumerable<VoteBlock>> GetVoteBlocks()
        {
            return await _voteBlocks.GetAllAsync();
        }






        //// GET: api/VoteBlocks/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<VoteBlock>> GetVoteBlock(string id)
        //{
        //    var voteBlock = await _context.VoteBlocks.FindAsync(id);

        //    if (voteBlock == null)
        //    {
        //        return NotFound();
        //    }

        //    return voteBlock;
        //}

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
