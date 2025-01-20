namespace Chat.Configuration
{
    public class Config
    {
        public string[]? AllowedUrls { get; set; }
        public KestrelSettings? Kestrel { get; set; }
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
