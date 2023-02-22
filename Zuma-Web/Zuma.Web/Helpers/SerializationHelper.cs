namespace Zuma.Web.Helpers
{
    using Newtonsoft.Json;

    public static class SerializationHelper
    {
        public static string GetJson(Object obj)
        {
            return JsonConvert.SerializeObject(obj);
        }
    }
}
