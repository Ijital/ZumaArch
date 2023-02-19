namespace Zuma.Web.Repositories.Implementation
{
    public interface IDataRepository<DataEntity>
    {
        /// <summary>
        /// Saves an entity object to data storage
        /// </summary> 
        Task SaveAllAsync(IEnumerable<DataEntity> entities);

        /// <summary>
        /// Gets all entity records from data storage
        /// </summary>     
        Task<IEnumerable<DataEntity>> GetAllAsync();

        /// <summary>
        /// Removes all entity records from data storage
        /// </summary>     
        Task RemoveEntitiesAsync(IEnumerable<DataEntity> entities);

        /// <summary>
        /// Gets all entities by filter id 
        /// </summary>
        Task<IEnumerable<DataEntity>> GetEntitiesAsync(IEnumerable<string> entityIds);


        /// <summary>
        /// Gets Entity records by a filter 
        /// </summary>
        //Task<DataEntity> GetByIdAsync(string id);

        /// <summary>
        /// Updates the status of a Vote pack from Pending to blocked B
        /// </summary>
        //Task<DataEntity> UpdateAsync(IEnumerable<DataEntity> entities);
    }
}

