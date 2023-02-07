namespace Zuma.Web.Repositories.Implementation
{
    public interface IDataRepository<DataEntity>
    {
        /// <summary>
        /// Saves an entity object to data storage
        /// </summary> 
        Task SaveAsync(DataEntity entity);

        /// <summary>
        /// Gets all entity records from data storage
        /// </summary>     
        Task<IEnumerable<DataEntity>> GetAllAsync();

        /// <summary>
        /// Gets Entity records by a filter 
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        Task<IEnumerable<DataEntity>> GetByFilterAsync(string filter);

        /// <summary>
        /// Removes Blocked votes from pending votes record
        /// </summary>
        /// <param name="vote"></param>
        /// <returns></returns>
        Task Update(IEnumerable<DataEntity> items);
    }
}

