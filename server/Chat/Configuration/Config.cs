namespace Chat.Configuration
{
    public class Config
    {
        public ConnectionStrings? ConnectionStrings { get; set; }
        public KestrelSettings? Kestrel { get; set; }
    }

    public class ConnectionStrings
    {
        public string? DefaultConnection { get; set; }
    }

    public class KestrelSettings
    {
        public Endpoints? Endpoints { get; set; }
    }

    public class Endpoints
    {
        public HttpEndpoint? Http { get; set; }
    }

    public class HttpEndpoint
    {
        public string? Url { get; set; }
    }
}
