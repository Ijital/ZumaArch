using System.Security.Cryptography;
using System.Text;

namespace Zuma.Web.Helpers
{
    public static class HashHelper
    {
        /// <summary>
        /// Gets the hash of specified data
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static string GetHash(string data)
        {
            using var sha256Hash = SHA256.Create();
            var bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(data));
            var builder = new StringBuilder();
            bytes.ToList().ForEach(bit => builder.Append(bit.ToString("x2")));
            return builder.ToString();
        }
    }
}
