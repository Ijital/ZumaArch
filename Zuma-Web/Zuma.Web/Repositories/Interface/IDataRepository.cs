namespace Zuma.Web.Repositories.Implementation
{
    public interface IDataRepository<DataEntity>
    {
        /// <summary>
        /// Saves an entity object to data storage
        /// </summary> 
        Task<DataEntity> SaveAsync(DataEntity entity);

        /// <summary>
        /// Gets all entity records from data storage
        /// </summary>     
        Task<IEnumerable<DataEntity>> GetAllAsync();

        /// <summary>
        /// Gets Entity records by a filter 
        /// </summary>
        Task<DataEntity> GetByIdAsync(string id);

        /// <summary>
        /// Updates the status of a Vote pack from Pending to blocked B
        /// </summary>
        Task<DataEntity> UpdateAsync(DataEntity item);
    }
}

