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

        // The action allows for a litl of vote packs to be recieved in
        // order to reduce the number of network post request made frm 
        // the polling units
        public async Task SaveAllAsync(IEnumerable<DataEntity> entities)
        {
            await _context.Set<DataEntity>().AddRangeAsync(entities);
            _context.SaveChanges();
        }

        public async Task<IEnumerable<DataEntity>> GetAllAsync()
        {
            return await _context.Set<DataEntity>().ToListAsync();
        }

        // Better this way than having to fetch the entire data set and fitering
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


