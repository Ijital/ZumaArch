using Microsoft.AspNetCore.Mvc;
using Zuma.Web.Models;
using Zuma.Web.Repositories.Implementation;

namespace Zuma.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VotePacksController : ControllerBase
    {
        private readonly IDataRepository<VotePack> _votePacks;

        public VotePacksController(IDataRepository<VotePack> repository)
        {
            _votePacks = repository;
        }

        // GET: api/VotePacks
        [HttpGet]
        public async Task<IEnumerable<VotePack>> GetVotePacks()
        {
            return await _votePacks.GetAllAsync();
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

        //// PUT: api/VotePacks/5
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutVotePack(int id, VotePack votePack)
        //{
        //    if (id != votePack.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(votePack).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!VotePackExists(id))
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

        //// POST: api/VotePacks
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPost]
        //public async Task<ActionResult<VotePack>> PostVotePack(VotePack votePack)
        //{
        //    _context.VotePacks.Add(votePack);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetVotePack", new { id = votePack.Id }, votePack);
        //}

        //// DELETE: api/VotePacks/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteVotePack(int id)
        //{
        //    var votePack = await _context.VotePacks.FindAsync(id);
        //    if (votePack == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.VotePacks.Remove(votePack);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        //private bool VotePackExists(int id)
        //{
        //    return _context.VotePacks.Any(e => e.Id == id);
        //}
    }
}
