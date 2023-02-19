using Newtonsoft.Json;

namespace Zuma.Web.Helpers
{
    public static class SerializationHelper
    {
        public static string GetJson(Object obj)
        {
           return  JsonConvert.SerializeObject(obj);
        }
       
    }
}
