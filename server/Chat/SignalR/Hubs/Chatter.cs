using System.Text.Json.Serialization;

namespace Chat.SignalR
{
    public class Chatter
    {
        [JsonPropertyName("group")]
        public string Group { get; set; }

        [JsonPropertyName("connection_id")]
        public string ConnectionId { get; set; }

        [JsonPropertyName("colour")]
        public string Colour { get; set; }
    }
}
