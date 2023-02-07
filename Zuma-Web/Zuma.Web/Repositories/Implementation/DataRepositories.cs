using Microsoft.EntityFrameworkCore;
using System.Data;
using Zuma.Web.DataAccess;

namespace Zuma.Web.Repositories.Implementation
{
    public class DataRepository<DataEntity> : IDataRepository<DataEntity> where DataEntity:class
    {
        private readonly ZumaDBContext _context;
        private DbSet<DataEntity> _entities;


        public DataRepository(ZumaDBContext context)
        {
            _context = context;
            _entities = _context.Set<DataEntity>();
        }
        public async Task<IEnumerable<DataEntity>> GetAllAsync()
        {
            return await _entities.ToListAsync();
        }

        public Task<IEnumerable<DataEntity>> GetByFilterAsync(string filter)
        {
            throw new NotImplementedException();
        }

        public async Task<DataEntity> SaveAsync(DataEntity entity)
        {
            await _entities.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public Task Update(IEnumerable<DataEntity> items)
        {
            throw new NotImplementedException();
        }

        Task IDataRepository<DataEntity>.SaveAsync(DataEntity entity)
        {
            throw new NotImplementedException();
        }
    }
}
