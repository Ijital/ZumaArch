using Microsoft.EntityFrameworkCore;
using Zuma.Web.DataAccess;

namespace Zuma.Web.Repositories.Implementation
{
    public class DataRepository<DataEntity> : IDataRepository<DataEntity> where DataEntity : class
    {
        private readonly ZumaDBContext _context;

        public DataRepository(ZumaDBContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<DataEntity>> GetAllAsync()
        {
            return await _context.Set<DataEntity>().ToListAsync();
        }

        public async Task<DataEntity> GetByIdAsync(string id)
        {
            return await _context.FindAsync<DataEntity>(id);
        }

        public async Task<DataEntity> SaveAsync(DataEntity entity)
        {
            await _context.AddAsync<DataEntity>(entity);
            return entity;
        }

        public async Task<DataEntity> UpdateAsync(DataEntity entity)
        {
            await Task.Run(() => { _context.Update<DataEntity>(entity); });
            return entity;
        }
    }
}


