using Microsoft.EntityFrameworkCore;
using Zuma.Web.DataAccess;
using Zuma.Web.Models;

namespace Zuma.Web.Repositories.Implementation
{
    public class DataRepository<DataEntity> : IDataRepository<DataEntity> where DataEntity : class
    {
        private readonly ZumaDBContext _context;

        public DataRepository(ZumaDBContext context)
        {
            _context = context;
        }

        // The method allows for multiple data entities to be recieved and saved in one request
        // limiting the depency on the internet by e.g  the polling unit in transmitting votes
        // the polling units can should only transmit votes in batches of 100
        public async Task SaveAllAsync(IEnumerable<DataEntity> entities)
        {
            await _context.Set<DataEntity>().AddRangeAsync(entities);
            _context.SaveChanges();
        }

        // 
        public async Task<IEnumerable<DataEntity>> GetAllAsync()
        {
            return await _context.Set<DataEntity>().ToListAsync();
        }

        // Better this way than having to fetch the entire data set and fitering
        // The database records (Votes) would be indexed by 
        public async Task<IEnumerable<DataEntity>> GetEntitiesAsync(IEnumerable<string> entityIds)
        {
            List<DataEntity> items = new List<DataEntity>();
            foreach (var id in entityIds)
            {
                items.Add(await _context.Set<DataEntity>().FindAsync(id));
            }
            return items;
        }


        public async Task RemoveEntitiesAsync(IEnumerable<DataEntity> entities)
        {
            _context.Set<DataEntity>().RemoveRange(entities);
            _context.SaveChanges();
        }




        //public async Task<DataEntity> GetByIdAsync(string id)
        //{
        //    return await _context.FindAsync<DataEntity>(id);
        //}



        //public async Task<DataEntity> UpdateAsync(IEnumerable<DataEntity> entities)
        //{
        //    await Task.Run(() => { _context.Update<DataEntity>(entity); });
        //    _context.SaveChanges();
        //    return entity;
        //}
    }
}


